import { FieldDataType } from '@/types/form-generator.types';
import { z } from 'zod';
import type { Path, UseFormReturn } from 'react-hook-form';
import { Form, FormField } from '@/components/ui/form';
import FieldSelector from './field-selector';

export interface FormProps {
  isEdit?: boolean;
  initialValues?: any;
}

type FormSchema<T extends readonly FieldDataType[]> = {
  [K in T[number]['name']]: z.infer<Extract<T[number], { name: K }>['schema']>;
};

type ReducedCollectionType<
  T extends readonly FieldDataType[],
  P extends keyof T[number]
> = {
  [K in T[number]['name']]: Extract<T[number], { name: K }>[P];
};

class FormGenerator<T extends readonly FieldDataType[]> {
  readonly formData: T;
  readonly schema: ReducedCollectionType<T, 'schema'>;
  readonly defaultValues: ReducedCollectionType<T, 'default'>;

  constructor(formData: T) {
    this.formData = formData;
    this.schema = formData.reduce((acc, field) => {
      acc[field.name as keyof typeof acc] = field.schema;
      return acc;
    }, {} as ReducedCollectionType<T, 'schema'>);
    this.defaultValues = formData.reduce((acc, field) => {
      acc[field.name as keyof typeof acc] = field.default;
      return acc;
    }, {} as ReducedCollectionType<T, 'default'>);
  }

  fields(form: UseFormReturn<FormSchema<T>>) {
    return (
      <Form {...form}>
        {this.formData.map((fieldData) =>
          fieldData.hidden ? null : (
            <FormField
              aria-label={fieldData.label}
              key={fieldData.name}
              control={form.control}
              name={fieldData.name as Path<FormSchema<T>>}
              render={({ field }) => (
                <FieldSelector fieldData={fieldData} field={field} />
              )}
            />
          )
        )}
      </Form>
    );
  }
}

export default FormGenerator;
