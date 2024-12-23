import FormGenerator from '@/components/core/form/generator';
import { emptyToUndefined } from '@/components/core/form/utils';
import { Button } from '@/components/ui/button';
import { thunks } from '@/redux/slices/tipoCliente/thunks';
import { thunks as VDThunks } from '@/redux/slices/vendedor/thunks';
import { thunks as LPThunks } from '@/redux/slices/listaPrecios/thunks';

import { AppDispatch, RootState } from '@/redux/store/store';
import { FieldType } from '@/types/form-generator.types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { z } from 'zod';

const ClientesForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { tiposCliente } = useSelector((state: RootState) => state.tipoCliente);
  const { listaPrecios } = useSelector(
    (state: RootState) => state.listaPrecios
  );
  const { vendedores } = useSelector((state: RootState) => state.vendedores);
  useEffect(() => {
    dispatch(thunks.fetchAllTipoCliente());
    dispatch(LPThunks.fetchAllListaPrecio());
    dispatch(VDThunks.fetchAllVendedores());
  }, []);

  const formFields = [
    {
      name: 'nit',
      label: 'NIT',
      type: FieldType.Text,
      default: '',
      required: true,
      schema: z.preprocess(emptyToUndefined, z.string()),
    },

    {
      name: 'Descripcion',
      label: 'Descripción',
      type: FieldType.Text,
      default: '',
      required: true,
      schema: z.preprocess(emptyToUndefined, z.string()),
    },

    {
      name: 'id_Tipo_Cliente',
      label: 'Tipo de Cliente',
      type: FieldType.Select,
      default: undefined,
      required: true,
      schema: z.preprocess(
        (value) => (value ? Number(value) : undefined),
        z.number()
      ),
      options:
        tiposCliente.map((tipo) => ({
          value: tipo.id,
          label: tipo.Detalle,
        })) || [],
    },

    {
      name: 'id_Lista_Precio',
      label: 'Lista de Precio',
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

    {
      name: 'id_Vendedor',
      label: 'Vendedor',
      type: FieldType.Select,
      default: undefined,
      required: true,
      schema: z.preprocess(
        (value) => (value ? Number(value) : undefined),
        z.number()
      ),
      options:
        vendedores.map((vendedor) => ({
          value: vendedor.id,
          label: vendedor.NOMBRE + ' ' + vendedor.APELLIDO,
        })) || [],
    },
  ] as const;
  const formGenerator = new FormGenerator<typeof formFields>(formFields);
  const schema = z.object(formGenerator.schema);

  type FormSchemaType = z.infer<typeof schema>;

  const defaultValues = formGenerator.defaultValues;

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues,
  });

  const onSubmit = (data: FormSchemaType) => {
    console.log(data);
    form.reset();
  };
  return (
    <form
      className="flex flex-col mb-10 w-full"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <div className="grid gap-x-3 md:grid-cols-3 text-center md:text-left  lg:grid-cols-5">
        {formGenerator.fields(form)}
      </div>

      <Button className="w-full md:w-[200px] mt-4" type="submit">
        Crear cliente
      </Button>
    </form>
  );
};

export default ClientesForm;
