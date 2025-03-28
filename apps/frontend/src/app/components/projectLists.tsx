import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiHelper } from '../api/common/apiHelper';
import { Project } from '../api/projects/common/types';
import { useDeleteProject } from '../api/projects/useDeleteProject';
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

const ListProjects = () => {
  const columnHelper = createColumnHelper<Project>();
  const columns = [
    columnHelper.accessor('id', { header: 'ID' }),
    columnHelper.accessor('name', { header: 'Name' }),
    columnHelper.accessor('owner', { header: 'Owner' }),
    columnHelper.accessor('tasks', { header: 'Tasks' }),
  ];

  const { isPending, error, data } = useQuery({
    queryKey: ['projects'],
    queryFn: () => fetch(apiHelper('project')).then((res) => res.json()),
  });

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
  });

  const columnHeaders = table
    .getHeaderGroups()
    .flatMap((headerGroup) =>
      headerGroup.headers.map(
        (header) => header.column.columnDef.header as string
      )
    );

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

  if (isPending) return 'Loading...';

  if (error) return 'An error has occurred: ' + error.message;

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle">
            <table className="min-w-full border-separate border-spacing-0">
              <thead>
                <tr>
                  {columnHeaders.map((header, index) => (
                    <th
                      key={index}
                      scope="col"
                      className="sticky top-0 z-10 border-b border-gray-300 bg-white/75 py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 backdrop-blur-sm backdrop-filter sm:pl-6 lg:pl-8"
                    >
                      {header}
                    </th>
                  ))}
                  <th
                    scope="col"
                    className="sticky top-0 z-10 border-b border-gray-300 bg-white/75 py-3.5 pr-4 pl-3 backdrop-blur-sm backdrop-filter sm:pr-6 lg:pr-8"
                  >
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {table.getRowModel().rows.map((row) => (
                  <tr key={row.original.id}>
                    <td
                      className={classNames(
                        table.getRowCount() !== row.index - 1
                          ? 'border-b border-gray-200'
                          : '',
                        'py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-6 lg:pl-8'
                      )}
                    >
                      {row.original.id}
                    </td>
                    <td
                      className={classNames(
                        table.getRowCount() !== row.index - 1
                          ? 'border-b border-gray-200'
                          : '',
                        'py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-left text-gray-900 sm:pl-6 lg:pl-8'
                      )}
                    >
                      {row.original.name}
                    </td>
                    <td
                      className={classNames(
                        table.getRowCount() !== row.index - 1
                          ? 'border-b border-gray-200'
                          : '',
                        'hidden px-3 py-4 text-sm font-medium whitespace-nowrap text-left text-gray-500 sm:table-cell'
                      )}
                    >
                      {row.original.owner?.email ?? '<Unassigned>'}
                    </td>
                    <td
                      className={classNames(
                        table.getRowCount() !== row.index - 1
                          ? 'border-b border-gray-200'
                          : '',
                        'hidden px-3 py-4 text-sm font-medium whitespace-nowrap text-gray-500 lg:table-cell'
                      )}
                    >
                      {row.original.tasks?.length ?? '0'}
                    </td>
                    <td
                      className={classNames(
                        table.getRowCount() !== row.index - 1
                          ? 'border-b border-gray-200'
                          : '',
                        'relative py-4 pr-4 pl-3 text-right text-sm font-medium whitespace-nowrap sm:pr-8 lg:pr-8'
                      )}
                    >
                      <button
                        type="button"
                        className="text-white bg-blue-500 hover:bg-red-600 px-3 py-1 ml-2 rounded-lg transition"
                      >
                        Edit
                      </button>
                      <button
                        className="text-white bg-red-500 hover:bg-red-600 px-3 py-1 ml-2 rounded-lg transition"
                        onClick={() => mutation.mutate(row.original.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListProjects;
