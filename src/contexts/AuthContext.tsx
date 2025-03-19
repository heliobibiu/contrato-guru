import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';

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

// Mock users for development when Supabase is not configured
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
  // Since we have the Supabase credentials, we can consider it configured
  const isSupabaseConfigured = true;

  useEffect(() => {
    const initializeAuth = async () => {
      if (isSupabaseConfigured) {
        try {
          console.log("Verificando sessão do Supabase...");
          // Check Supabase session
          const { data: { session }, error: sessionError } = await supabase.auth.getSession();
          
          if (sessionError) {
            console.error("Erro ao verificar sessão:", sessionError);
            setLoading(false);
            return;
          }
          
          if (session) {
            console.log("Sessão encontrada, buscando dados do usuário...");
            try {
              const { data: userData, error } = await supabase
                .from('usuarios')
                .select('*')
                .eq('id', session.user.id)
                .single();
              
              if (error) {
                console.error("Erro ao buscar dados do usuário:", error);
                setLoading(false);
                return;
              }
              
              if (userData) {
                console.log("Dados do usuário encontrados:", userData);
                setUser({
                  id: userData.id,
                  name: userData.nome,
                  email: userData.email,
                  role: mapRoleFromDatabase(userData.tipo_usuario),
                });
              } else {
                console.log("Nenhum dado de usuário encontrado na tabela usuarios");
              }
            } catch (error) {
              console.error("Exceção ao buscar dados do usuário:", error);
            }
          } else {
            console.log("Nenhuma sessão ativa encontrada");
          }
        } catch (error) {
          console.error("Erro ao inicializar autenticação:", error);
        }
      } else {
        // Fallback to localStorage for mock data
        const storedUser = localStorage.getItem('contratoGuruUser');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      }
      setLoading(false);
    };

    initializeAuth();

    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log("Evento de autenticação:", event, session ? "com sessão" : "sem sessão");
        
        if (event === 'SIGNED_IN' && session) {
          try {
            const { data: userData, error } = await supabase
              .from('usuarios')
              .select('*')
              .eq('id', session.user.id)
              .single();
            
            if (error) {
              console.error("Erro ao buscar dados do usuário após login:", error);
              return;
            }
            
            if (userData) {
              console.log("Dados do usuário após login:", userData);
              const loggedInUser = {
                id: userData.id,
                name: userData.nome,
                email: userData.email,
                role: mapRoleFromDatabase(userData.tipo_usuario),
              };
              setUser(loggedInUser);
              localStorage.setItem('contratoGuruUser', JSON.stringify(loggedInUser));
            } else {
              console.log("Nenhum dado de usuário encontrado na tabela usuarios após login");
            }
          } catch (error) {
            console.error("Exceção ao buscar dados do usuário após login:", error);
          }
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
          localStorage.removeItem('contratoGuruUser');
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [isSupabaseConfigured]);

  // Map database role to application role
  const mapRoleFromDatabase = (databaseRole: string): UserRole => {
    console.log("Mapeando papel do banco de dados:", databaseRole);
    switch (databaseRole) {
      case 'admin':
        return 'admin';
      case 'gerente':
        return 'gerencial';
      default:
        return 'padrao';
    }
  };

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      if (isSupabaseConfigured) {
        console.log(`Tentando login com Supabase: ${email}`);
        // Supabase authentication
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          console.error("Erro de login Supabase:", error);
          toast.error(`Credenciais inválidas! Erro: ${error.message}`);
          throw error;
        }

        if (data.user) {
          console.log("Autenticação bem-sucedida, buscando dados do usuário");
          try {
            const { data: userData, error: userError } = await supabase
              .from('usuarios')
              .select('*')
              .eq('id', data.user.id)
              .single();
            
            if (userError) {
              console.error("Erro ao buscar dados do usuário:", userError);
              toast.error('Erro ao buscar dados do usuário');
              throw userError;
            }
            
            if (!userData) {
              console.error("Usuário não encontrado na tabela usuarios");
              toast.error('Usuário não encontrado no sistema');
              throw new Error('Usuário não encontrado');
            }

            console.log("Dados do usuário encontrados:", userData);
            const loggedInUser = {
              id: userData.id,
              name: userData.nome,
              email: userData.email,
              role: mapRoleFromDatabase(userData.tipo_usuario),
            };

            setUser(loggedInUser);
            localStorage.setItem('contratoGuruUser', JSON.stringify(loggedInUser));
            toast.success('Login realizado com sucesso!');
          } catch (error) {
            console.error("Exceção ao buscar dados do usuário:", error);
            throw error;
          }
        }
      } else {
        // Mock authentication
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
      if (isSupabaseConfigured) {
        // Register with Supabase Auth
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              nome: name
            }
          }
        });

        if (error) {
          toast.error('Erro ao cadastrar usuário');
          throw error;
        }

        if (data.user) {
          // Add user to the usuarios table
          const { error: insertError } = await supabase
            .from('usuarios')
            .insert([
              {
                id: data.user.id,
                nome: name,
                email: email,
                senha: '',  // We don't store the actual password, Supabase Auth manages authentication
                tipo_usuario: 'padrao',  // Default role
              }
            ]);

          if (insertError) {
            toast.error('Erro ao salvar dados do usuário');
            throw insertError;
          }

          const newUser = {
            id: data.user.id,
            name,
            email,
            role: 'padrao' as UserRole,
          };
          
          setUser(newUser);
          localStorage.setItem('contratoGuruUser', JSON.stringify(newUser));
          toast.success('Cadastro realizado com sucesso!');
        }
      } else {
        // Mock register
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Check if user already exists
        if (MOCK_USERS.some(u => u.email === email)) {
          toast.error('Este e-mail já está em uso!');
          throw new Error('E-mail já existe');
        }

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
      }
    } catch (error) {
      console.error('Erro ao cadastrar:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    if (isSupabaseConfigured) {
      await supabase.auth.signOut();
    }
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
