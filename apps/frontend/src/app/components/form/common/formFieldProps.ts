import { AnyFieldApi } from '@tanstack/react-form';

export type FormFieldProps = {
  field: AnyFieldApi;
  label: string;
  required?: boolean;
  error?: string;
};
