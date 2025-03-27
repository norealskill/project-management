import { useForm } from '@tanstack/react-form';
import { useCreateProject } from '../api/projects/useCreateProject';
import { RefObject } from 'react';

type FormProps = {
  formRef: RefObject<HTMLFormElement>;
};

const ProjectCreateForm: React.FC<FormProps> = (props) => {
  const { formRef } = props;

  const mutation = useCreateProject();

  const form = useForm({
    defaultValues: {
      name: '',
    },
    onSubmit: async ({ value }) => {
      mutation.mutate(value);
      form.reset();
    },
  });

  return (
    <form
      ref={formRef}
      className="mt-6 space-y-5"
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
            <>
              <div className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                <label
                  className="block text-sm/6 font-medium text-gray-900 sm:mt-1.5"
                  htmlFor={field.name}
                >
                  Project Title:
                </label>
                <div className="sm:col-span-2">
                  <input
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  {field.state.meta.errors ? (
                    <em role="alert">{field.state.meta.errors.join(', ')}</em>
                  ) : null}
                </div>
              </div>
              <p className="flex justify-end text-sm text-gray-500 -mt-10 mr-7">
                Required
              </p>
            </>
          );
        }}
      />
    </form>
  );
};

export default ProjectCreateForm;
