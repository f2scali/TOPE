import FormGenerator, { FormProps } from '@/components/core/form/generator';
import { emptyToUndefined } from '@/components/core/form/utils';
import { Button } from '@/components/ui/button';
import { ButtonLoading } from '@/components/ui/button-loading';
import {
  setCurrentPage,
  setLimit,
  setSearch,
} from '@/redux/slices/productos/producto.slice';
import { thunks } from '@/redux/slices/productos/thunks';
import { thunks as TIThunks } from '@/redux/slices/inventario/thunks';
import { thunks as LIThunks } from '@/redux/slices/linea/thunks';
import { thunks as UMThunks } from '@/redux/slices/unidadMed/thunks';
import { thunks as CRThunks } from '@/redux/slices/criterios/thunks';
import { AppDispatch, RootState } from '@/redux/store/store';
import { FieldType } from '@/types/form-generator.types';
import { zodResolver } from '@hookform/resolvers/zod';
import { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { z } from 'zod';

interface ProductoFormProps extends FormProps {
  setLocalSearch?: (value: string) => void;
}
const ProductoForm: FC<ProductoFormProps> = ({
  initialValues = {},
  isEdit,
  setLocalSearch,
}) => {
  const location = useLocation();

  const stateId = location.state?.id;
  const dispatch = useDispatch<AppDispatch>();
  const { inventario } = useSelector((state: RootState) => state.inventario);
  const { lineas } = useSelector((state: RootState) => state.lineas);
  const { unidadMed } = useSelector((state: RootState) => state.unidadMed);
  const { criterios } = useSelector((state: RootState) => state.criterios);

  useEffect(() => {
    dispatch(TIThunks.fetchAllInventario());
    dispatch(LIThunks.fetchAllLineas());
    dispatch(UMThunks.fetchAllUnidadMed());
    dispatch(CRThunks.fetchAllCriterios());
  }, []);

  const { loadingPayload } = useSelector((state: RootState) => state.productos);
  const formFields = [
    {
      name: 'id_item',
      label: 'COD Item',
      type: FieldType.Text,
      default: '',
      required: true,
      hidden: isEdit,
      schema: z.preprocess(emptyToUndefined, z.string()),
    },
    {
      name: 'id_ext_item',
      label: 'Extension',
      type: FieldType.Text,
      default: '',
      required: false,
      hidden: isEdit,
      schema: z.string(),
    },
    {
      name: 'descripcion',
      label: 'Descripcion Producto',
      type: FieldType.Text,
      default: '',
      required: true,
      schema: z.preprocess(emptyToUndefined, z.string()),
    },
    {
      name: 'id_referencia',
      label: 'Referencia',
      type: FieldType.Text,
      default: '',
      required: true,
      hidden: isEdit,
      schema: z.preprocess(emptyToUndefined, z.string()),
    },
    {
      name: 'id_inventario',
      label: 'Tipo de Inventario',
      type: FieldType.Select,
      default: '',
      required: true,
      schema: z.preprocess(
        (value) => (value ? Number(value) : undefined),
        z.number()
      ),
      options:
        inventario.map((inv) => ({
          value: inv.id,
          label: inv.Detalle,
        })) || [],
    },
    {
      name: 'id_linea',
      label: 'Linea',
      type: FieldType.Select,
      default: '',
      required: true,
      schema: z.preprocess(
        (value) => (value ? Number(value) : undefined),
        z.number()
      ),
      options:
        lineas.map((linea) => ({
          value: linea.id,
          label: linea.detalle,
        })) || [],
    },
    {
      name: 'unimed_inv_1',
      label: 'Unidad de Medida',
      type: FieldType.Select,
      required: true,
      default: '',
      schema: z.preprocess(
        (value) => (value ? Number(value) : undefined),
        z.number()
      ),
      options:
        unidadMed.map((und) => ({
          value: und.id,
          label: und.Detalle,
        })) || [],
    },
    {
      name: 'id_cricla1',
      label: 'Criterio',
      type: FieldType.Select,
      default: '',
      required: true,
      schema: z.preprocess(
        (value) => (value ? Number(value) : undefined),
        z.number()
      ),
      options:
        criterios.map((criterio) => ({
          value: criterio.id,
          label: criterio.Detalle,
        })) || [],
    },
    {
      name: 'costo',
      label: 'Costo',
      type: FieldType.Text,
      description: 'Costo del producto',
      default: '',
      required: true,
      schema: z.preprocess(emptyToUndefined, z.union([z.string(), z.number()])),
    },
  ] as const;
  const formGenerator = new FormGenerator<typeof formFields>(formFields);
  const schema = z.object(formGenerator.schema).superRefine((data, ctx) => {
    let costo = data.costo as string;

    if (typeof costo === 'string') {
      costo = costo.replace(/['.]/g, '');
      costo = costo.replace(',', '.');
    }
    const costoNumber = parseFloat(costo);
    if (isNaN(costoNumber)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'El costo debe ser un número',
        path: ['costo'],
      });

      return false;
    }

    data.costo = costoNumber;
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
      ? thunks.editProducto({ id: stateId, data })
      : thunks.createProducto(data);
    const result = await dispatch(action as any);
    if (result.meta.requestStatus === 'rejected') {
      const reduxError = result.payload || 'Ocurrió un error inesperado';
      form.setError('root', { message: reduxError });
    }

    if (result.meta.requestStatus === 'fulfilled') {
      if (isEdit) {
        alert('Producto actualizado correctamente');
      }
      if (!isEdit) {
        dispatch(
          thunks.fetchProductos({ currentPage: 1, search: '', limit: 10 })
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
          {isEdit ? 'Guardar cambios' : 'Crear Producto'}
        </Button>
      )}
    </form>
  );
};

export default ProductoForm;
