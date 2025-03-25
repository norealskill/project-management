import { useForm } from '@tanstack/react-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ProjectCreateArgs } from '../api/types';
import { apiHelper } from '../api/common';

const CreateProjectForm = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newProject: ProjectCreateArgs) => {
      return fetch(apiHelper('project'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProject),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });

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
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6">
        <h2 className="text-2xl font-semibold text-gray-800 text-center">
          Create Project
        </h2>
        <form
          className="mt-4 space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <div>
            <form.Field
              name="name"
              validators={{
                onChange: ({ value }) =>
                  !value
                    ? 'A project must have a name'
                    : value.length < 3
                    ? 'Project name must be more than three characters in length'
                    : undefined,
                onChangeAsyncDebounceMs: 500,
                onChangeAsync: async ({ value }) => {
                  await new Promise((resolve) => setTimeout(resolve, 1000));
                  return (
                    value.includes('error') && 'No "error" allowed in title'
                  );
                },
              }}
              children={(field) => {
                return (
                  <>
                    <label
                      className="block text-sm font-medium text-gray-700"
                      htmlFor={field.name}
                    >
                      Project Name:
                    </label>
                    <input
                      className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  </>
                );
              }}
            />
          </div>
          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => (
              <>
                <button
                  className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition"
                  type="submit"
                  disabled={!canSubmit}
                >
                  {isSubmitting ? '...' : 'Submit'}
                </button>
                <button
                  className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition"
                  type="reset"
                  onClick={() => form.reset()}
                >
                  Reset
                </button>
              </>
            )}
          />
        </form>
      </div>
    </div>
  );
};

export default CreateProjectForm;
