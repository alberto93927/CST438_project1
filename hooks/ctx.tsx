import { useContext, createContext, type PropsWithChildren, useEffect, useState, useCallback } from 'react';
import { useStorageState } from './useStorageState';
import { GoogleSignin, isErrorWithCode, isSuccessResponse, statusCodes } from '@react-native-google-signin/google-signin';

const AuthContext = createContext<{
  signIn: () => void;
  signOut: () => void;
  session?: string | null;
  isLoading: boolean;
}>({
  signIn: () => null,
  signOut: () => null,
  session: null,
  isLoading: false,
});

export function useSession() {
  const value = useContext(AuthContext);
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useSession must be wrapped in a <SessionProvider />');
    }
  }

  return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState('session');

  useEffect(() => {
    GoogleSignin.configure();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signIn: async () => {
          try {
              await GoogleSignin.hasPlayServices();
              const response = await GoogleSignin.signIn();
              if (isSuccessResponse(response)) {
                  const userSession = JSON.stringify(response.data.user);
                  setSession(userSession);
                  return userSession; // Return user session
              }
          } catch (error) {
              console.error("Sign-in failed:", error);
          }
          return null; // If login fails, return null
      },
      
      
        signOut: async () => {
          try {
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();
            setSession(null);
          } catch (error) {
            console.error('An error occurred while signing out', error);
          }
        },
        session,
        isLoading,
      }}>
      {children}
    </AuthContext.Provider>
  );
}
