import ProjectCreateForm from '../../app/components/projectCreateForm';
import Drawer from '../../app/components/drawer';
import ListProjects from '../../app/components/projectLists';
import { createFileRoute } from '@tanstack/react-router';
import { useNav } from '../../app/context/navContext';
import { useEffect, useRef, useState } from 'react';

export const Route = createFileRoute('/projects/')({
  component: RouteComponent,
});

function RouteComponent() {
  const { setCtaButton } = useNav();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const formRef = useRef<HTMLFormElement | null>(null);

  useEffect(() => {
    setCtaButton({
      key: 'addProject',
      label: 'Add Project',
      onClick: () => setIsOpen(true),
    });
    return () => setCtaButton(null);
  }, [setCtaButton]);

  const onSubmit = () => {
    console.log('submit me baby');
    formRef.current && formRef.current.requestSubmit();
    setIsOpen(false);
  };

  const onCancel = () => {
    formRef.current && formRef.current.reset();
  };

  return (
    <>
      <Drawer
        buttonText="Add Project"
        drawerTitle="Create Project"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onSubmit={onSubmit}
        onCancel={onCancel}
      >
        <ProjectCreateForm formRef={formRef} />
      </Drawer>
      <ListProjects />
    </>
  );
}
