import React, { createContext, useContext, useState } from 'react';
import { UserRole } from '../types';

interface AuthContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  userEmail: string;
  userName: string;
  userDistrict: string;
  loginAsDemoRole: (role: UserRole) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<UserRole>('consumer');
  const [userEmail, setUserEmail] = useState<string>('public@consumer.gov.in');
  const [userName, setUserName] = useState<string>('Public Guest');
  const [userDistrict, setUserDistrict] = useState<string>('Kakinada');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const loginAsDemoRole = (targetRole: UserRole) => {
    setRole(targetRole);
    setIsAuthenticated(true);

    switch (targetRole) {
      case 'business':
        setUserEmail('business@demo.com');
        setUserName('ABC Retail Store (P. Venkatachalam)');
        setUserDistrict('Kakinada');
        break;
      case 'inspector':
        setUserEmail('inspector@demo.com');
        setUserName('Shri R. V. Rao (Sr. Legal Metrology Inspector)');
        setUserDistrict('Kakinada');
        break;
      case 'admin':
        setUserEmail('admin@demo.com');
        setUserName('Controller of Legal Metrology AP');
        setUserDistrict('Andhra Pradesh State HQ');
        break;
      case 'consumer':
      default:
        setUserEmail('public@consumer.gov.in');
        setUserName('Public Citizen');
        setUserDistrict('Kakinada');
        setIsAuthenticated(false);
        break;
    }
  };

  const logout = () => {
    setRole('consumer');
    setIsAuthenticated(false);
    setUserEmail('public@consumer.gov.in');
    setUserName('Public Guest');
  };

  return (
    <AuthContext.Provider value={{ role, setRole, userEmail, userName, userDistrict, loginAsDemoRole, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
