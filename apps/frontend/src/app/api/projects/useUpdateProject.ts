import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiHelper } from '../common/apiHelper';
import { ProjectUpdateArgs } from './common/types';

export function useUpdateTask() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (updateProject: ProjectUpdateArgs) => {
      return fetch(apiHelper('task'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateProject),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  return mutation;
}
