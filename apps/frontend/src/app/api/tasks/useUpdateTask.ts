import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiHelper } from '../common/apiHelper';
import { TaskUpdateArgs } from './common/types';

export function useUpdateTask() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (updateTask: TaskUpdateArgs) => {
      return fetch(apiHelper('task'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateTask),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  return mutation;
}
