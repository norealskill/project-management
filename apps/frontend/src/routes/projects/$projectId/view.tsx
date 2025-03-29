import { useEffect } from 'react';
import { useNav } from '../../../app/context/navContext';
import { createFileRoute /*, useNavigate */ } from '@tanstack/react-router';
import { useMutation } from '@tanstack/react-query';
import { useDeleteProject } from '../../../app/api/projects/useDeleteProject';

export const Route = createFileRoute('/projects/$projectId/view')({
  component: RouteComponent,
});

function RouteComponent() {
  //const navigate = useNavigate({ from: '/projets' });
  const { setCtaButton } = useNav();
  const { projectId } = Route.useParams();

  const mutation = useMutation({
    mutationFn: useDeleteProject,
    onSuccess: () => {
      //navigate({ to: '../projects' });
      window.location.replace('/projects');
    },
  });

  useEffect(() => {
    setCtaButton({
      key: 'deleteProject',
      label: 'Delete Project',
      onClick: () => mutation.mutate(projectId),
    });
    return () => setCtaButton(null);
  }, [setCtaButton]);

  return <div>{`Hello "/projects/${projectId}/view"!`}</div>;
}
