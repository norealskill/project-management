import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiHelper } from '../common/apiHelper';
import { TaskCreateArgs } from './common/types';

export function useCreateTask() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newTask: TaskCreateArgs) => {
      return fetch(apiHelper('task'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTask),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  return mutation;
}
