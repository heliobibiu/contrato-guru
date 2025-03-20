
import { supabase } from '@/integrations/supabase/client';

// Function to check if a table exists using RPC
export const tableExists = async (tableName: string): Promise<boolean> => {
  try {
    // Usando query SQL direta em vez de RPC
    const { data, error } = await supabase
      .from('information_schema.tables')
      .select('table_name')
      .eq('table_schema', 'public')
      .eq('table_name', tableName)
      .single();
    
    if (error) {
      console.error(`Error checking if table ${tableName} exists:`, error);
      return false;
    }
    
    return data !== null;
  } catch (error) {
    console.error(`Error checking if table ${tableName} exists:`, error);
    return false;
  }
};

// Create Supabase tables if they don't exist
export const initializeTables = async () => {
  try {
    // Primeiro verificamos se a tabela usuarios existe como um teste básico
    const usuariosExists = await tableExists('usuarios');
    
    if (!usuariosExists) {
      console.log('Tables do not exist, creating them...');
      // Use forced type casting for RPC calls
      const { error } = await (supabase.rpc as any)(
        'initialize_database_tables'
      );
      
      if (error) {
        console.error('Error in initialize_database_tables:', error);
        throw error;
      }
    } else {
      console.log('Tables already exist, skipping initialization');
    }
    
    console.log('Database tables initialized successfully');
    return true;
  } catch (error) {
    console.error('Error initializing database tables:', error);
    return false;
  }
};

// Create policies for role-based access control
export const setupRLSPolicies = async () => {
  try {
    // Use forced type casting for RPC calls
    const { error } = await (supabase.rpc as any)(
      'setup_rls_policies'
    );
    
    if (error) {
      console.error('Error in setup_rls_policies:', error);
      throw error;
    }
    
    console.log('RLS policies configured successfully');
    return true;
  } catch (error) {
    console.error('Error setting up RLS policies:', error);
    return false;
  }
};

// Create initial admin user
export const createInitialAdminUser = async (email: string, password: string) => {
  try {
    // Check if admin user exists - use a safer method that doesn't rely on specific table types
    const { data: userExists, error: checkError } = await (supabase.rpc as any)(
      'check_admin_exists'
    );
    
    if (checkError) {
      console.error('Error in check_admin_exists:', checkError);
      throw checkError;
    }
    
    // If no admin user exists, create one
    if (!userExists) {
      console.log('No admin exists, creating...');
      
      // Create user in Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            nome: 'Administrador',
            tipo_usuario: 'admin'
          }
        }
      });
      
      if (authError) {
        console.error('Error creating admin auth user:', authError);
        throw authError;
      }
      
      if (authData.user) {
        // Add to usuarios table using RPC to avoid type issues
        const { error: rpcError } = await (supabase.rpc as any)(
          'create_admin_user',
          {
            user_id: authData.user.id,
            user_email: email,
            user_name: 'Administrador'
          }
        );
        
        if (rpcError) {
          console.error('Error in create_admin_user RPC:', rpcError);
          throw rpcError;
        }
        
        console.log('Initial admin user created successfully');
      }
    } else {
      console.log('Admin user already exists');
    }
    
    return true;
  } catch (error) {
    console.error('Error creating initial admin user:', error);
    return false;
  }
};

// Also create test users for gerencial and padrao roles
export const createTestUsers = async () => {
  try {
    // Create gerente user if it doesn't exist
    const { data: gerenteCheck, error: gerenteCheckError } = await supabase
      .from('usuarios')
      .select('*')
      .eq('email', 'gerente@example.com')
      .maybeSingle();
    
    if (gerenteCheckError) {
      console.error('Error checking for gerente user:', gerenteCheckError);
    }
    
    if (!gerenteCheck) {
      console.log('Creating gerente test user...');
      const { data: gerenteAuth, error: gerenteAuthError } = await supabase.auth.signUp({
        email: 'gerente@example.com',
        password: 'gerente123',
        options: {
          data: {
            nome: 'Gerente',
            tipo_usuario: 'gerente'
          }
        }
      });
      
      if (gerenteAuthError) {
        console.error('Error creating gerente auth user:', gerenteAuthError);
      } else if (gerenteAuth.user) {
        const { error: gerenteInsertError } = await supabase
          .from('usuarios')
          .insert([{
            id: gerenteAuth.user.id,
            nome: 'Gerente',
            email: 'gerente@example.com',
            senha: '',
            tipo_usuario: 'gerente'
          }]);
        
        if (gerenteInsertError) {
          console.error('Error inserting gerente user:', gerenteInsertError);
        } else {
          console.log('Gerente test user created');
        }
      }
    }
    
    // Create padrao user if it doesn't exist
    const { data: padraoCheck, error: padraoCheckError } = await supabase
      .from('usuarios')
      .select('*')
      .eq('email', 'usuario@example.com')
      .maybeSingle();
    
    if (padraoCheckError) {
      console.error('Error checking for padrao user:', padraoCheckError);
    }
    
    if (!padraoCheck) {
      console.log('Creating padrao test user...');
      const { data: padraoAuth, error: padraoAuthError } = await supabase.auth.signUp({
        email: 'usuario@example.com',
        password: 'usuario123',
        options: {
          data: {
            nome: 'Usuário',
            tipo_usuario: 'padrao'
          }
        }
      });
      
      if (padraoAuthError) {
        console.error('Error creating padrao auth user:', padraoAuthError);
      } else if (padraoAuth.user) {
        const { error: padraoInsertError } = await supabase
          .from('usuarios')
          .insert([{
            id: padraoAuth.user.id,
            nome: 'Usuário',
            email: 'usuario@example.com',
            senha: '',
            tipo_usuario: 'padrao'
          }]);
        
        if (padraoInsertError) {
          console.error('Error inserting padrao user:', padraoInsertError);
        } else {
          console.log('Padrao test user created');
        }
      }
    }
    
    return true;
  } catch (error) {
    console.error('Error creating test users:', error);
    return false;
  }
};

// Initialize everything
export const initializeSupabase = async () => {
  try {
    console.log('Initializing Supabase...');
    await initializeTables();
    await setupRLSPolicies();
    await createInitialAdminUser('admin@example.com', 'admin123');
    await createTestUsers();
    console.log('Supabase initialization complete');
    return true;
  } catch (error) {
    console.error('Error initializing Supabase:', error);
    return false;
  }
};
