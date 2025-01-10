import FormGenerator, { FormProps } from '@/components/core/form/generator';
import { emptyToUndefined } from '@/components/core/form/utils';
import { Button } from '@/components/ui/button';
import { ButtonLoading } from '@/components/ui/button-loading';
import { thunks } from '@/redux/slices/tipoCliente/thunks';
import {
  setCurrentPage,
  setLimit,
  setSearch,
} from '@/redux/slices/tipoCliente/tipoCliente.slice';
import { AppDispatch, RootState } from '@/redux/store/store';
import { FieldType } from '@/types/form-generator.types';
import { zodResolver } from '@hookform/resolvers/zod';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { z } from 'zod';

interface TipoClientesFormProps extends FormProps {
  setLocalSearch?: (value: string) => void;
}
const TipoClientesForm: FC<TipoClientesFormProps> = ({
  initialValues = {},
  isEdit,
  setLocalSearch,
}) => {
  const location = useLocation();

  const stateId = location.state?.id;
  const dispatch = useDispatch<AppDispatch>();
  const { loadingPayload } = useSelector(
    (state: RootState) => state.tipoCliente
  );
  const formFields = [
    {
      name: 'codTipoCliente',
      label: 'Codigo',
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
      ? thunks.updateTipoCliente({ id: stateId, data })
      : thunks.createTipoCliente(data);
    const result = await dispatch(action as any);
    if (result.meta.requestStatus === 'rejected') {
      const reduxError = result.payload || 'Ocurrió un error inesperado';
      form.setError('root', { message: reduxError });
    }

    if (result.meta.requestStatus === 'fulfilled') {
      if (isEdit) {
        alert('Tipo de cliente actualizado correctamente');
      }
      if (!isEdit) {
        dispatch(
          thunks.fetchTipoCliente({ currentPage: 1, search: '', limit: 10 })
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
          {isEdit ? 'Guardar cambios' : 'Crear Tipo'}
        </Button>
      )}
    </form>
  );
};

export default TipoClientesForm;
