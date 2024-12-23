import FormGenerator from '@/components/core/form/generator';
import { emptyToUndefined } from '@/components/core/form/utils';
import { Button } from '@/components/ui/button';
import { FieldType } from '@/types/form-generator.types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

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
    schema: z.string(),
    options: ['nacionales', 'extranjero'],
  },

  {
    name: 'id_Lista_Precio',
    label: 'Lista de Precio',
    type: FieldType.Select,
    default: undefined,
    required: true,
    schema: z.string(),
    options: ['LIBRE', 'CLINICAS HOSPITALES', 'TEST'],
  },

  {
    name: 'id_Vendedor',
    label: 'Vendedor',
    type: FieldType.Select,
    default: undefined,
    required: true,
    schema: z.string(),
    options: ['ana perez'],
  },
] as const;
const ClientesForm = () => {
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
