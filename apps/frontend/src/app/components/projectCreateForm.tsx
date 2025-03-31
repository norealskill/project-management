import { useForm } from '@tanstack/react-form';
import { useCreateProject } from '../api/projects/useCreateProject';
import { RefObject } from 'react';
import InputText from './form/input';
import SelectList from './form/selectList';
import TextArea from './form/textArea';
import Calendar from './form/calendar';

type FormProps = {
  formRef: RefObject<HTMLFormElement>;
};

const ProjectCreateForm: React.FC<FormProps> = (props) => {
  const { formRef } = props;

  const mutation = useCreateProject();

  const form = useForm({
    defaultValues: {
      name: '',
      description: '',
      due: '',
      status: 'Not Started',
    },
    onSubmit: async ({ value }) => {
      mutation.mutate(value);
      form.reset();
    },
  });

  return (
    <form
      ref={formRef}
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      <form.Field
        name="name"
        validators={{
          onChange: ({ value }) =>
            !value
              ? 'A project must have a name'
              : value.length < 3
              ? 'Project name must be more than three characters in length'
              : undefined,
        }}
        children={(field) => {
          return (
            <div className="sm:grid sm:grid-cols-1 sm:gap-1 sm:space-y-1 sm:px-6 sm:pt-5">
              <InputText
                field={field}
                label="Project Name"
                required={true}
                error={field.state.meta.errors.join(', ')}
              />
            </div>
          );
        }}
      />
      <form.Field
        name="description"
        children={(field) => {
          return (
            <div className="sm:grid sm:grid-cols-1 sm:gap-1 sm:px-6">
              <TextArea
                field={field}
                label="Description"
                required={false}
                error={field.state.meta.errors.join(', ')}
              />
            </div>
          );
        }}
      />
      <form.Field
        name="status"
        children={(field) => {
          return (
            <div className="sm:grid sm:grid-cols-1 sm:gap-4 sm:px-6">
              <SelectList
                field={field}
                label="Status"
                required={true}
                error={field.state.meta.errors.join(', ')}
              />
            </div>
          );
        }}
      />
      <form.Field
        name="due"
        children={(field) => {
          return (
            <div className="sm:grid sm:grid-cols-1 sm:gap-1 sm:px-6">
              <Calendar
                field={field}
                label="Due"
                required={false}
                error={field.state.meta.errors.join(', ')}
              />
            </div>
          );
        }}
      />
    </form>
  );
};

export default ProjectCreateForm;
