
import { supabase } from '@/lib/supabase';

// Function to check if a table exists
export const tableExists = async (tableName: string): Promise<boolean> => {
  const { data, error } = await supabase
    .from('information_schema.tables')
    .select('table_name')
    .eq('table_schema', 'public')
    .eq('table_name', tableName);
  
  return !error && data && data.length > 0;
};

// Create Supabase tables if they don't exist
export const initializeTables = async () => {
  try {
    // Check if the usuarios table exists
    const usuariosExists = await tableExists('usuarios');
    if (!usuariosExists) {
      await supabase.rpc('create_usuarios_table');
    }

    // Check if other tables exist and create them if needed
    const tablesData = [
      { name: 'setores', createFunction: 'create_setores_table' },
      { name: 'fiscais', createFunction: 'create_fiscais_table' },
      { name: 'gestores', createFunction: 'create_gestores_table' },
      { name: 'contratos', createFunction: 'create_contratos_table' },
      { name: 'convenios', createFunction: 'create_convenios_table' },
      { name: 'ordens_de_servico', createFunction: 'create_ordens_de_servico_table' },
      { name: 'medicoes', createFunction: 'create_medicoes_table' },
      { name: 'aditivos', createFunction: 'create_aditivos_table' },
      { name: 'apostilas', createFunction: 'create_apostilas_table' }
    ];

    for (const table of tablesData) {
      const exists = await tableExists(table.name);
      if (!exists) {
        await supabase.rpc(table.createFunction);
      }
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
    // Setup RLS policies for all tables
    await supabase.rpc('setup_rls_policies');
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
    // Check if admin user exists
    const { data, error } = await supabase
      .from('usuarios')
      .select('*')
      .eq('tipo_usuario', 'admin')
      .limit(1);
    
    if (error) {
      throw error;
    }
    
    // If no admin user exists, create one
    if (!data || data.length === 0) {
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
        throw authError;
      }
      
      if (authData.user) {
        // Add to usuarios table
        await supabase.from('usuarios').insert([{
          id: authData.user.id,
          nome: 'Administrador',
          email,
          senha: '',
          tipo_usuario: 'admin'
        }]);
        
        console.log('Initial admin user created successfully');
      }
    }
    
    return true;
  } catch (error) {
    console.error('Error creating initial admin user:', error);
    return false;
  }
};

// Initialize everything
export const initializeSupabase = async () => {
  try {
    await initializeTables();
    await setupRLSPolicies();
    await createInitialAdminUser('admin@example.com', 'admin123');
    return true;
  } catch (error) {
    console.error('Error initializing Supabase:', error);
    return false;
  }
};
