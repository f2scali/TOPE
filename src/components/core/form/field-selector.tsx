/**
 *  Split anchors are used to split the code by the CLI.
 *  When adding a new Component to the switch, add an anchor
 *  followed by the name of the component like this:
 *
 *   //split//select
 *
 *  Then make sure you update the CLI to handle the new component
 *  accordingly in:
 *
 *   ./packages/cli/src/transformers/selector-transformer.ts
 *   ./packages/cli/src/transformers/config/index.ts
 *
 *  Note: All comments in this file are cleared when pulled by
 *  the CLI.
 */

//split//select
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
//split//text
import { Input } from '@/components/ui/input';
//split//textarea
import { Textarea } from '@/components/ui/textarea';
//split//checkbox
import { Checkbox } from '@/components/ui/checkbox';
import { FormDescription, FormItem, FormMessage } from '@/components/ui/form';
//split//date-picker
// import DatePicker from "./date-picker";
//split//combo-select
// import ComboSelect from "./combo-select";

//split//body
import type { z } from 'zod';
import type { ControllerRenderProps, Path } from 'react-hook-form';
import { cn } from '@/lib/utils';

import FieldWrapper from './field-wrapper';
import { FieldType, type FieldDataType } from '@/types/form-generator.types';

type FieldSchema<T extends FieldDataType> =
  T['schema'] extends z.ZodType<unknown> ? z.infer<T['schema']> : never;

interface FieldSelectorProps<T extends FieldDataType> {
  fieldData: T;
  field: ControllerRenderProps<FieldSchema<T>, Path<FieldSchema<T>>>;
}

function FieldSelector<T extends FieldDataType>({
  fieldData,
  field,
}: FieldSelectorProps<T>) {
  switch (fieldData.type) {
    //split//select
    case FieldType.Select:
      return (
        <FieldWrapper
          className={fieldData.className}
          label={fieldData.label}
          description={fieldData.description}
          htmlFor={fieldData.name}
        >
          <Select
            onValueChange={field.onChange}
            value={(field.value as string) ?? ''}
            defaultValue="test"
            required={fieldData.required}
            data-testid={fieldData.testId}
            aria-invalid={!!fieldData.error} // Marca el campo como inválido si hay error
            aria-describedby={
              fieldData.error ? `${fieldData.name}-error` : undefined
            }
          >
            <SelectTrigger id={fieldData.name}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {fieldData.options.map((option) => {
                const label =
                  typeof option === 'string' ? option : option.label;
                const value =
                  typeof option === 'string' ? option : option.value;
                return (
                  <SelectItem key={value + label} value={value + ''}>
                    {label}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </FieldWrapper>
      );
    //split//text
    case FieldType.Text:
      return (
        <FieldWrapper
          className={fieldData.className}
          label={fieldData.label}
          description={fieldData.description}
          htmlFor={fieldData.name}
        >
          <Input
            id={fieldData.name}
            {...field}
            data-testid={fieldData.testId}
          />
        </FieldWrapper>
      );
    case FieldType.Number:
      return (
        <FieldWrapper
          className={fieldData.className}
          label={fieldData.label}
          description={fieldData.description}
          htmlFor={fieldData.name}
        >
          <Input
            {...field}
            type="number"
            id={fieldData.name}
            data-testid={fieldData.testId}
          />
        </FieldWrapper>
      );
    //split//textarea
    case FieldType.Textarea:
      return (
        <FieldWrapper
          className={fieldData.className}
          label={fieldData.label}
          description={fieldData.description}
          htmlFor={fieldData.name}
        >
          <Textarea
            {...field}
            rows={fieldData.rows ?? 4}
            className="resize-none"
            maxLength={512}
            id={fieldData.name}
            data-testid={fieldData.testId}
          />
        </FieldWrapper>
      );
    //split//checkbox
    case FieldType.Checkbox:
      return (
        <FormItem
          className={cn(
            'flex h-full flex-col justify-center gap-2 py-6',
            fieldData.className
          )}
          aria-label={fieldData.label + ' field'}
        >
          <div className="flex items-center justify-between">
            <label
              htmlFor={fieldData.name}
              className="text-lg text-muted-foreground"
            >
              {fieldData.label}
            </label>
            <Checkbox
              id={fieldData.name}
              checked={field.value as boolean}
              onCheckedChange={field.onChange}
              className="size-5 border-2"
              data-testid={fieldData.testId}
            />
          </div>
          <FormMessage />
          {fieldData.description && (
            <FormDescription className="text-xs">
              {fieldData.description}
            </FormDescription>
          )}
        </FormItem>
      );
    //split//date-picker
    // case FieldType.DatePicker:
    //   return (
    //     <FormItem
    //       className={cn(
    //         "flex h-full flex-col justify-center gap-2",
    //         fieldData.className,
    //       )}
    //       aria-label={fieldData.label + " field"}
    //     >
    //       <div className="flex items-center justify-between">
    //         <label
    //           htmlFor={fieldData.name}
    //           className="text-lg text-muted-foreground"
    //         >
    //           {fieldData.label}
    //         </label>
    //         <DatePicker
    //           required={fieldData.required}
    //           id={fieldData.name}
    //           date={field.value as Date}
    //           onChange={field.onChange}
    //           allowFuture={fieldData.allowFuture}
    //           data-testid={fieldData.testId}
    //         />
    //       </div>
    //       <FormMessage />
    //       {fieldData.description && (
    //         <FormDescription className="text-xs">
    //           {fieldData.description}
    //         </FormDescription>
    //       )}
    //     </FormItem>
    //   );
    //split//combo-select
    // case FieldType.ComboSelect:
    //   return (
    //     <FieldWrapper
    //       className={fieldData.className}
    //       label={fieldData.label}
    //       description={fieldData.description}
    //       htmlFor={fieldData.name}
    //     >
    //       <ComboSelect
    //         required={fieldData.required}
    //         id={fieldData.name}
    //         data-testid={fieldData.testId}
    //         value={field.value as string}
    //         onChange={field.onChange}
    //         options={fieldData.options}
    //         selectMessage={fieldData.selectMessage}
    //         searchMessage={fieldData.searchMessage}
    //         notFoundMessage={fieldData.notFoundMessage}
    //       />
    //     </FieldWrapper>
    //   );
    //split//body
    default:
      return null;
  }
}

export default FieldSelector;
