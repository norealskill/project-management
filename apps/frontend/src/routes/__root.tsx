import { createRootRoute } from '@tanstack/react-router';
import Navigation from '../app/components/navigation';

export const Route = createRootRoute({
  component: () => <Navigation />,
});
