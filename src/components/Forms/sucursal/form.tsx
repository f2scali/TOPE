import FormGenerator, { FormProps } from '@/components/core/form/generator';
import { emptyToUndefined } from '@/components/core/form/utils';
import { Button } from '@/components/ui/button';
import { thunks } from '@/redux/slices/sucursal/thunks';
import { thunks as CLThunks } from '@/redux/slices/clientes/thunks';

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
} from '@/redux/slices/sucursal/sucursal.slice';

interface SucursalFormProps extends FormProps {
  setLocalSearch?: (value: string) => void;
}
const SucursalForm: FC<SucursalFormProps> = ({
  isEdit,
  initialValues = {},
  setLocalSearch,
}) => {
  const location = useLocation();

  const stateId = location.state?.id;
  const dispatch = useDispatch<AppDispatch>();
  const { clientes } = useSelector((state: RootState) => state.clientes);
  const { loadingPayload } = useSelector((state: RootState) => state.sucursal);
  useEffect(() => {
    dispatch(CLThunks.fetchAllClientes());
  }, []);

  const formFields = [
    {
      name: 'codSucursal',
      label: 'COD',
      type: FieldType.Text,
      default: '',
      hidden: isEdit,
      required: false,
      schema: z.preprocess(
        (value) => (value === '' ? null : value),
        z.string().nullable()
      ),
    },

    {
      name: 'Detalle',
      label: 'Detalle',
      type: FieldType.Text,
      default: '',
      required: true,
      schema: z.preprocess(emptyToUndefined, z.string()),
    },

    {
      name: 'Direccion',
      label: 'Dirección',
      default: '',
      type: FieldType.Text,
      required: true,
      schema: z.preprocess(emptyToUndefined, z.string()),
    },

    {
      name: 'Telefono',
      label: 'Teléfono',
      default: '',
      type: FieldType.Text,
      required: true,
      schema: z.preprocess(emptyToUndefined, z.string()),
    },
    {
      name: 'id_Cliente',
      label: 'Cliente',
      type: FieldType.Select,
      default: undefined,
      required: true,
      schema: z.preprocess(
        (value) => (value ? Number(value) : undefined),
        z.number()
      ),
      options:
        clientes.map((lp) => ({
          value: lp.id,
          label: lp.Descripcion,
        })) || [],
    },
  ] as const;
  const formGenerator = new FormGenerator<typeof formFields>(formFields);
  const schema = z.object(formGenerator.schema);

  type FormSchemaType = z.infer<typeof schema>;

  const defaultValues = { ...formGenerator.defaultValues, ...initialValues };

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues,
  });

  const onSubmit = async (data: FormSchemaType) => {
    const action = isEdit
      ? thunks.editSucursal({ id: stateId, data })
      : thunks.createSucursal(data);

    const result = await dispatch(action as any);

    if (result.meta.requestStatus === 'rejected') {
      const reduxError = result.payload || 'Ocurrió un error inesperado';
      form.setError('root', { message: reduxError });
    }
    if (result.meta.requestStatus === 'fulfilled') {
      if (!isEdit) {
        dispatch(
          thunks.fetchSucursal({ currentPage: 1, search: '', limit: 10 })
        );
        dispatch(setCurrentPage(1));
        dispatch(setSearch(''));
        dispatch(setLimit(10));
        setLocalSearch && setLocalSearch('');
        form.reset();
      }
    }
  };
  return (
    <form
      className="flex flex-col mb-10 w-full"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <div className="grid gap-x-3 md:grid-cols-3 text-center md:text-left  lg:grid-cols-5">
        {formGenerator.fields(form)}
      </div>
      {form.formState.errors.root && (
        <div className="text-red-500 text-sm mt-2">
          {form.formState.errors.root.message}
        </div>
      )}
      {loadingPayload ? (
        <ButtonLoading className="w-full md:w-[200px] mt-4" />
      ) : (
        <Button className="w-full md:w-[200px] mt-4" type="submit">
          {isEdit ? 'Guardar cambios' : 'Crear sucursal '}
        </Button>
      )}
    </form>
  );
};

export default SucursalForm;
