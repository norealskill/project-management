import { createContext, ReactNode, useContext, useState } from 'react';
import {
  NavigationContext,
  PrimaryCallToAction,
} from '../components/common/types';

const NavContext = createContext<NavigationContext | undefined>(undefined);

export const useNav = () => {
  const context = useContext(NavContext);
  if (!context) throw new Error('useNav must be used with a NavProvider');
  return context;
};

export const NavProvider = ({ children }: { children: ReactNode }) => {
  const [ctaButton, setCtaButton] = useState<PrimaryCallToAction | null>(null);

  return (
    <NavContext.Provider value={{ ctaButton, setCtaButton }}>
      {children}
    </NavContext.Provider>
  );
};
