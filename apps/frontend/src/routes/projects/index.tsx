import CreateProjectForm from '../../app/components/createProjectForm';
import Drawer from '../../app/components/drawer';
import ListProjects from '../../app/components/listProjects';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/projects/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <Drawer buttonText="Add Project">
        <CreateProjectForm />
      </Drawer>
      <ListProjects />
    </>
  );
}
