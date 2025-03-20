
import { supabase } from '@/integrations/supabase/client';

// Function to check if a table exists using a safer approach
export const tableExists = async (tableName: string): Promise<boolean> => {
  try {
    // Using a safer approach to check if a table exists
    const { data, error } = await supabase.rpc('check_table_exists', {
      table_name: tableName
    });
    
    if (error) {
      console.error(`Error checking if table ${tableName} exists:`, error);
      return false;
    }
    
    return data === true;
  } catch (error) {
    console.error(`Error checking if table ${tableName} exists:`, error);
    return false;
  }
};

// Create Supabase tables if they don't exist
export const initializeTables = async (): Promise<boolean> => {
  try {
    // First check if the usuarios table exists as a basic test
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
