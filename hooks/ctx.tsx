import { useContext, createContext, type PropsWithChildren, useEffect, useState, useCallback } from 'react';
import { useStorageState } from './useStorageState';
import { GoogleSignin, isErrorWithCode, isSuccessResponse, statusCodes } from '@react-native-google-signin/google-signin';
import { insertUser } from "../app/(tabs)/db-service"; 


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
                  const user = response.data.user;
                  setSession(JSON.stringify(user));

                  insertUser(
                    user.id || "",  // Ensure a fallback empty string if null
                    user.name || "Unknown", // Provide a default value
                    user.email || "No email",
                    user.photo || "" // Ensure a fallback for null photos
                );
                

              } else {
                  console.error("Sign in was cancelled");
              }
          } catch (error) {
              console.error("Error signing in:", error);
          }
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
