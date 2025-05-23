import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiHelper } from '../common/apiHelper';
import { ProjectCreateArgs } from './common/types';

export function useCreateProject() {
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

  return mutation;
}
