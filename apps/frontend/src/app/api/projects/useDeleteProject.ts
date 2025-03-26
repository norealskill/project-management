import { apiHelper } from '../common';

export async function useDeleteProject(projectId: number) {
  const response = await fetch(apiHelper(`project/${projectId}`), {
    method: 'DELETE',
  });

  if (!response.ok) throw new Error('Failed to delete project');

  return response.json();
}
