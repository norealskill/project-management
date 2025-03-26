import { useForm } from '@tanstack/react-form';
import { useCreateProject } from '../api/projects/useCreateProject';

const CreateProjectForm = () => {
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
    <div className="flex min-h-full min-w-full items-center justify-center bg-gray-100">
      <div className="w-full max-w-lg rounded-2xl border border-gray-200 bg-white p-8 shadow-2xl">
        <h2 className="text-center text-3xl font-bold text-gray-900">
          Create Project
        </h2>
        <form
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
                  <div className="flex items-center space-x-4">
                    <label
                      className="text-sm font-medium whitespace-nowrap text-gray-700"
                      htmlFor={field.name}
                    >
                      Project Title:
                    </label>
                    <input
                      className="flex-1 rounded-lg border border-gray-300 px-4 py-3 shadow-sm transition focus:ring-4 focus:ring-blue-300 focus:outline-none"
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
                  <div className="flex justify-end text-zinc-400">
                    <p className="text-sm text-gray-500 -mt-5">Required</p>
                  </div>
                </>
              );
            }}
          />
          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => (
              <div className="flex space-x-4">
                <button
                  className="w-1/2 rounded-lg bg-blue-600 px-4 py-3 text-white shadow-md transition-all hover:bg-blue-700"
                  type="submit"
                  disabled={!canSubmit}
                >
                  {isSubmitting ? '...' : 'Submit'}
                </button>
                <button
                  className="w-1/2 rounded-lg bg-gray-200 px-4 py-3 text-gray-700 shadow-md transition-all hover:bg-gray-300"
                  type="reset"
                  onClick={() => form.reset()}
                >
                  Reset
                </button>
              </div>
            )}
          />
        </form>
      </div>
    </div>
  );
};

export default CreateProjectForm;
