import ProjectCreateForm from '../../app/components/projectCreateForm';
import Drawer from '../../app/components/drawer';
import ListProjects from '../../app/components/projectLists';
import { createFileRoute } from '@tanstack/react-router';
import { useNav } from '../../app/context/navContext';
import { useEffect, useState } from 'react';

export const Route = createFileRoute('/projects/')({
  component: RouteComponent,
});

function RouteComponent() {
  const { setCtaButton } = useNav();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    setCtaButton({
      key: 'addProject',
      label: 'Add Project',
      onClick: () => setIsOpen(true),
    });
    return () => setCtaButton(null);
  }, [setCtaButton]);

  return (
    <>
      <Drawer
        buttonText="Add Project"
        drawerTitle="Create Project"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      >
        <ProjectCreateForm />
      </Drawer>
      <ListProjects />
    </>
  );
}
