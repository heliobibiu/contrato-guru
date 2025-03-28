
import { supabase } from '@/integrations/supabase/client';

// Create initial admin user
export const createInitialAdminUser = async (email: string, password: string): Promise<boolean> => {
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

// Create test users for gerencial and padrao roles
export const createTestUsers = async (): Promise<boolean> => {
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
