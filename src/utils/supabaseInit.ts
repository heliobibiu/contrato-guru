
import { supabase } from '@/integrations/supabase/client';

// Function to check if a table exists using RPC
export const tableExists = async (tableName: string): Promise<boolean> => {
  try {
    // Use a type assertion here to handle the type issue
    const { data, error } = await supabase
      .rpc('check_table_exists', { table_name: tableName } as any);
    
    return !error && data === true;
  } catch (error) {
    console.error(`Error checking if table ${tableName} exists:`, error);
    return false;
  }
};

// Create Supabase tables if they don't exist
export const initializeTables = async () => {
  try {
    // Use direct SQL execution instead of trying to create tables programmatically
    // This approach avoids type issues
    const { error } = await supabase.rpc('initialize_database_tables' as any);
    
    if (error) {
      throw error;
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
    // Use a stored procedure to setup RLS policies
    const { error } = await supabase.rpc('setup_rls_policies' as any);
    
    if (error) {
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
    const { data: userExists, error: checkError } = await supabase.rpc(
      'check_admin_exists' as any
    );
    
    if (checkError) {
      throw checkError;
    }
    
    // If no admin user exists, create one
    if (!userExists) {
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
        // Add to usuarios table using RPC to avoid type issues
        await supabase.rpc('create_admin_user' as any, {
          user_id: authData.user.id,
          user_email: email,
          user_name: 'Administrador'
        });
        
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
