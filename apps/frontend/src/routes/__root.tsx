import { createRootRouteWithContext } from '@tanstack/react-router';
import Navigation from '../app/components/navigation';
import { NavigationContext } from '../app/components/common/types';
import { NavProvider } from '../app/context/navContext';

export const Route = createRootRouteWithContext<NavigationContext>()({
  component: () => (
    <NavProvider>
      <Navigation />
    </NavProvider>
  ),
});
