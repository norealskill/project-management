import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiHelper } from '../api/common';
import { Project } from '../api/types';
import { useDeleteProject } from '../api/projects/useDeleteProject';
import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

const ListProjects = () => {
  const columns: ColumnDef<Project>[] = [];

  const { isPending, error, data } = useQuery({
    queryKey: ['projects'],
    queryFn: () => fetch(apiHelper('project')).then((res) => res.json()),
  });

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: useDeleteProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });

  if (isPending) return 'Loading...';

  if (error) return 'An error has occurred: ' + error.message;

  return (
    <div className="container mx-auto p-6">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="py-3 px-6 text-left">ID</th>
              <th className="py-3 px-6 text-left">Project Name</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="hover:bg-gray-100 transition">
                <td className="py-3 px-6">{row.original.id}</td>
                <td className="py-3 px-6">{row.original.name}</td>
                <td className="py-3 px-6 text-center">
                  <button className="text-white bg-green-500 hover:bg-green-600 px-3 py-1 rounded-lg transition">
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
  );
};

export default ListProjects;
