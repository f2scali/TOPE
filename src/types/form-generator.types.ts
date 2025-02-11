import { ReactNode } from 'react';
import type { z } from 'zod';
export type defaultValueTypes = (string | number | boolean | Date) | undefined;

export const enum FieldType {
  Text = 'text',
  Number = 'number',
  Select = 'select',
  Textarea = 'textarea',
  Checkbox = 'checkbox',
  DatePicker = 'date-picker',
  ComboSelect = 'combo-select',
}

type GenericFieldType = {
  name: string;
  label: string;
  schema: z.ZodTypeAny;
  hidden?: boolean;
  className?: string;
  description?: string | ReactNode | null;
  required: boolean;
  testId?: string;
};

export type TextFieldType = GenericFieldType & {
  type: FieldType.Text;
  default?: string;
};

export type NumberFieldType = GenericFieldType & {
  type: FieldType.Number;
  default?: number;
};

export type SelectFieldType = GenericFieldType & {
  type: FieldType.Select;
  default?: string | number;
  error?: any;
  options:
    | readonly string[]
    | readonly { value: string | number; label: string }[];
};

export type TextareaFieldType = GenericFieldType & {
  type: FieldType.Textarea;
  rows?: number;
  default?: string;
};

export type CheckboxFieldType = GenericFieldType & {
  type: FieldType.Checkbox;
  default?: boolean;
};

export type DatePickerFieldType = GenericFieldType & {
  type: FieldType.DatePicker;
  default?: Date;
  allowFuture?: boolean;
};

export type ComboSelect = GenericFieldType & {
  type: FieldType.ComboSelect;
  default?: string;
  options: readonly { value: string; label: string }[] | readonly string[];
  searchMessage?: string;
  notFoundMessage?: string;
  selectMessage?: string;
};

export type FieldDataType =
  | TextFieldType
  | NumberFieldType
  | SelectFieldType
  | TextareaFieldType
  | CheckboxFieldType;

export type FormSchema<T extends readonly FieldDataType[]> = {
  [K in T[number]['name']]: z.infer<Extract<T[number], { name: K }>['schema']>;
};
