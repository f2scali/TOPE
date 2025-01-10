import FormGenerator, { FormProps } from '@/components/core/form/generator';
import { emptyToUndefined } from '@/components/core/form/utils';
import { Button } from '@/components/ui/button';
import { thunks } from '@/redux/slices/detalleLista/thunks';
import { thunks as LPThunks } from '@/redux/slices/listaPrecios/thunks';
import { thunks as PThunks } from '@/redux/slices/productos/thunks';

import { AppDispatch, RootState } from '@/redux/store/store';
import { FieldType } from '@/types/form-generator.types';
import { zodResolver } from '@hookform/resolvers/zod';
import { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { z } from 'zod';
import { ButtonLoading } from '@/components/ui/button-loading';
import { useLocation } from 'react-router-dom';
import {
  setCurrentPage,
  setLimit,
  setSearch,
} from '@/redux/slices/detalleLista/detalleLista.slice';

interface DetalleListaFormProps extends FormProps {
  setLocalSearch?: (value: string) => void;
}
const DetalleListaForm: FC<DetalleListaFormProps> = ({
  isEdit,
  initialValues = {},
  setLocalSearch,
}) => {
  const location = useLocation();

  const stateId = location.state?.id;
  const dispatch = useDispatch<AppDispatch>();
  const { listaPrecios } = useSelector(
    (state: RootState) => state.listaPrecios
  );
  const { productos } = useSelector((state: RootState) => state.productos);
  const { loadingPayload } = useSelector(
    (state: RootState) => state.detalleLista
  );
  useEffect(() => {
    dispatch(PThunks.fetchAllProductos());
    dispatch(LPThunks.fetchAllListaPrecio());
  }, []);

  const formFields = [
    {
      name: 'cod_ListaPrecio',
      label: 'COD Lista de Precio',
      type: FieldType.Text,
      default: '',
      required: true,
      schema: z.preprocess(emptyToUndefined, z.string()),
    },

    {
      name: 'PRECIO',
      label: 'Precio',
      type: FieldType.Text,
      default: '',
      required: true,
      schema: z.preprocess(emptyToUndefined, z.union([z.string(), z.number()])),
    },

    {
      name: 'id_producto',
      label: 'Producto perteneciente',
      type: FieldType.Select,
      default: undefined,
      required: true,
      schema: z.preprocess(
        (value) => (value ? Number(value) : undefined),
        z.number()
      ),
      options:
        productos.map((tipo) => ({
          value: tipo.id,
          label: tipo.descripcion,
        })) || [],
    },

    {
      name: 'idListaPrecio',
      label: 'Lista perteneciente',
      type: FieldType.Select,
      default: undefined,
      required: true,
      schema: z.preprocess(
        (value) => (value ? Number(value) : undefined),
        z.number()
      ),
      options:
        listaPrecios.map((lp) => ({
          value: lp.id,
          label: lp.DETALLE,
        })) || [],
    },
  ] as const;
  const formGenerator = new FormGenerator<typeof formFields>(formFields);
  const schema = z.object(formGenerator.schema).superRefine((data, ctx) => {
    let precio = data.PRECIO as string;

    if (typeof precio === 'string') {
      precio = precio.replace(/['.]/g, '');
      precio = precio.replace(',', '.');
    }
    const precioNumber = parseFloat(precio);
    if (isNaN(precioNumber)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'El precio debe ser un número',
        path: ['precio'],
      });

      return false;
    }

    data.PRECIO = precioNumber;
    return data;
  });

  type FormSchemaType = z.infer<typeof schema>;

  const defaultValues = { ...formGenerator.defaultValues, ...initialValues };

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues,
  });

  const onSubmit = async (data: FormSchemaType) => {
    const action = isEdit
      ? thunks.updateDetalleLista({ id: stateId, data })
      : thunks.createDetalleLista(data);

    const result = await dispatch(action as any);

    if (result.meta.requestStatus === 'rejected') {
      const reduxError = result.payload || 'Ocurrió un error inesperado';
      form.setError('root', { message: reduxError });
    }
    if (result.meta.requestStatus === 'fulfilled') {
      if (!isEdit) {
        dispatch(
          thunks.fetchDetalleLista({ currentPage: 1, search: '', limit: 10 })
        );
        dispatch(setCurrentPage(1));
        dispatch(setSearch(''));
        dispatch(setLimit(10));
        setLocalSearch && setLocalSearch('');
        form.reset();
      }
    }
  };
  const formStateErrors = form?.formState?.errors?.root;
  return (
    <form
      className="flex flex-col mb-10 w-full"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <div className="grid gap-x-3 md:grid-cols-3 text-center md:text-left  lg:grid-cols-5">
        {formGenerator.fields(form)}
      </div>
      {formStateErrors?.message && (
        <div className="text-red-500 text-sm mt-2">
          {Array.isArray(formStateErrors.message) ? (
            formStateErrors.message.map((error: string) => (
              <div key={error}>{error}</div>
            ))
          ) : (
            <div>{formStateErrors.message}</div>
          )}
        </div>
      )}
      {loadingPayload ? (
        <ButtonLoading className="w-full md:w-[200px] mt-4" />
      ) : (
        <Button className="w-full md:w-[200px] mt-4" type="submit">
          {isEdit ? 'Guardar cambios' : 'Crear detalle de lista'}
        </Button>
      )}
    </form>
  );
};

export default DetalleListaForm;
