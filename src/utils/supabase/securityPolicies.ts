
import { supabase } from '@/integrations/supabase/client';

// Create policies for role-based access control
export const setupRLSPolicies = async (): Promise<boolean> => {
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
