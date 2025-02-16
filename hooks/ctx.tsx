import { useContext, createContext, type PropsWithChildren, useEffect } from 'react';
import { useStorageState } from './useStorageState';
import { GoogleSignin, isErrorWithCode, isSuccessResponse, statusCodes } from '@react-native-google-signin/google-signin';
import { createUser, getUserByGoogleId } from '@/db/user';

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
          // Call the google sign in method
          const user = await googleSignIn();
          if (!user) throw new Error('User not found');

          // Check if the db has the user
          const dbUser = await getUserByGoogleId(user.id);

          if (dbUser) {
            // Set the session to be the userID
            setSession(dbUser.id);
          } else {
            // Create the user
            const newUser = await createUser({
              g_id: user.id,
              username: user.name || user.givenName + ' ' + user.familyName,
              email: user.email,
              profile_pic: user.photo,
            });
            setSession(newUser.toString());
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

const googleSignIn = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    const response = await GoogleSignin.signIn();

    if (isSuccessResponse(response)) {
      return response.data.user;
    } else {
      console.error('Sign in was cancelled');
    }
  } catch (error) {
    if (isErrorWithCode(error)) {
      switch (error.code) {
        case statusCodes.IN_PROGRESS:
          console.error("Sign-in already in progress");
          break;
        case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
          console.error(
            "Play services are not available. Please install Play services from the Play Store."
          );
          break;
        default:
          console.error("An error occurred while signing in");
          break;
      }
    } else {
      console.error("An error occurred while signing in");
    }
  }
}