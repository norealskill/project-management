import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Project } from '../api/projects/common/types';
import { apiHelper } from '../api/common/apiHelper';
import EmptyState from './emptyState';
import { useDeleteProject } from '../api/projects/useDeleteProject';
import { localeDateStringOptions } from './common/utilityFunctions';

const ListProjects = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: useDeleteProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });

  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
  }

  const { isPending, error, data } = useQuery({
    queryKey: ['projects'],
    queryFn: () => fetch(apiHelper('project')).then((res) => res.json()),
  });

  if (isPending) return 'Loading...';

  if (error) return 'An error has occurred: ' + error.message;

  if (!isPending && !data) return <EmptyState model="project" />;

  const statuses: Record<string, string> = {
    Completed: 'text-white bg-black ring-black',
    'In Progress': 'text-black-600 bg-green-50 ring-green-600/20',
    'On Hold': 'text-black-800 bg-yellow-50 ring-yellow-600/20',
    'Not Started': 'text-black-800 bg-gray-50 ring-gray-600/20',
  };

  return (
    <ul className="divide-y divide-gray-100">
      {data.map((project: Project) => {
        return (
          <a
            key={project.id}
            href={`/projects/${project.id}/view`}
            className="hidden rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50 sm:block"
          >
            <li
              key={project.id}
              className="flex items-center justify-between gap-x-6 py-5"
            >
              <div className="min-w-0">
                <div className="flex items-start gap-x-3">
                  <p className="text-sm/6 font-semibold text-gray-900">
                    {project.name}
                  </p>
                  <p
                    className={classNames(
                      statuses[project.status],
                      'mt-0.5 rounded-md px-1.5 py-0.5 text-xs font-medium whitespace-nowrap ring-1 ring-inset'
                    )}
                  >
                    {project.status}
                  </p>
                </div>
                <div className="mt-1 flex items-center gap-x-2 text-xs/5 text-gray-500">
                  <p className="whitespace-nowrap">
                    Due on{' '}
                    {project.due && (
                      <time dateTime={project.due.toLocaleDateString()}>
                        {project.due.toLocaleDateString()}
                      </time>
                    )}
                  </p>
                  <svg viewBox="0 0 2 2" className="size-0.5 fill-current">
                    <circle r={1} cx={1} cy={1} />
                  </svg>
                  <p className="truncate">Owned by {project.owner?.email}</p>
                </div>
              </div>
              <p>
                {new Date(project.created).toLocaleDateString(
                  'en-US',
                  localeDateStringOptions
                )}
              </p>
            </li>
          </a>
        );
      })}
    </ul>
  );
};

export default ListProjects;
