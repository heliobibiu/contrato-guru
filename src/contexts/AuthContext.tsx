
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';

export type UserRole = 'admin' | 'gerencial' | 'padrao';

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

// Mock users for demonstration
const MOCK_USERS = [
  {
    id: '1',
    name: 'Administrador',
    email: 'admin@example.com',
    password: 'admin123',
    role: 'admin' as UserRole,
  },
  {
    id: '2',
    name: 'Gerente',
    email: 'gerente@example.com',
    password: 'gerente123',
    role: 'gerencial' as UserRole,
    department: 'Contratos',
  },
  {
    id: '3',
    name: 'Usuário',
    email: 'usuario@example.com',
    password: 'usuario123',
    role: 'padrao' as UserRole,
  },
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is stored in localStorage on initial load
    const storedUser = localStorage.getItem('contratoGuruUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const foundUser = MOCK_USERS.find(
        u => u.email === email && u.password === password
      );
      
      if (foundUser) {
        const { password, ...userWithoutPassword } = foundUser;
        setUser(userWithoutPassword);
        localStorage.setItem('contratoGuruUser', JSON.stringify(userWithoutPassword));
        toast.success('Login realizado com sucesso!');
      } else {
        toast.error('Credenciais inválidas!');
        throw new Error('Credenciais inválidas');
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if user already exists
      if (MOCK_USERS.some(u => u.email === email)) {
        toast.error('Este e-mail já está em uso!');
        throw new Error('E-mail já existe');
      }

      // In a real app, you would make an API call to register the user
      // For demo purposes, we'll just set the user
      const newUser = {
        id: (MOCK_USERS.length + 1).toString(),
        name,
        email,
        role: 'padrao' as UserRole, // New users get default role
      };
      
      setUser(newUser);
      localStorage.setItem('contratoGuruUser', JSON.stringify(newUser));
      toast.success('Cadastro realizado com sucesso!');
    } catch (error) {
      console.error('Erro ao cadastrar:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('contratoGuruUser');
    toast.info('Logout realizado com sucesso!');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Hook for role-based access control
export const useAuthorization = (requiredRole: UserRole | UserRole[]) => {
  const { user } = useAuth();
  
  if (!user) return false;
  
  const roles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
  
  // Admin has access to everything
  if (user.role === 'admin') return true;
  
  // Check if user's role is in the required roles
  return roles.includes(user.role);
};
