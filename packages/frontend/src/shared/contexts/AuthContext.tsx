/**
 * Auth Context
 * 
 * Provides authentication state and methods throughout the app
 */

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User as FirebaseUser, onAuthStateChanged, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../../firebase';
import { registerUser, loginUser, logoutUser } from '../../services/firebase.service';

interface IAuthContext {
  currentUser: FirebaseUser | null;
  loading: boolean;
  signup: (email: string, password: string, displayName: string) => Promise<FirebaseUser>;
  login: (email: string, password: string) => Promise<FirebaseUser>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<IAuthContext | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

interface IAuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: IAuthProviderProps) => {
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signup = async (email: string, password: string, displayName: string) => {
    return await registerUser(email, password, displayName);
  };

  const login = async (email: string, password: string) => {
    return await loginUser(email, password);
  };

  const logout = async () => {
    return await logoutUser();
  };

  const resetPassword = async (email: string) => {
    return await sendPasswordResetEmail(auth, email);
  };

  const value: IAuthContext = {
    currentUser,
    loading,
    signup,
    login,
    logout,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
