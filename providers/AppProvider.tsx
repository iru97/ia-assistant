import { Session } from '@supabase/supabase-js';
import { createContext, useContext } from 'react';

interface IAppContext {}

export const AppContext = createContext({} as IAppContext);

export const useApp = () => {
  const appState = useContext(AppContext);

  return {};
};
