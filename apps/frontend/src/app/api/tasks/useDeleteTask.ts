import { apiHelper } from '../common/apiHelper';

export async function useDeleteTask(taskId: number) {
  const response = await fetch(apiHelper(`task/${taskId}`), {
    method: 'DELETE',
  });

  if (!response.ok) throw new Error('Failed to delete task');

  return response.json();
}
