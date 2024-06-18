import { Session } from '@supabase/supabase-js';
import { createContext, useContext } from 'react';

interface IAuthContext {
  session?: Session;
}

export const AuthContext = createContext({} as IAuthContext);

export const useAuth = () => {
  const userState = useContext(AuthContext);
  const getUser = () => userState.session?.user;
  const setUser = (session?: Session) => {
    userState.session = session;
  };

  /* return <AuthContext.Provider value={}>{props.children}</AuthContext.Provider>; */
  return {
    getUser,
    setUser,
    user: userState.session?.user,
  };
};
