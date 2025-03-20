
import { initializeTables } from './supabase/tableOperations';
import { setupRLSPolicies } from './supabase/securityPolicies';
import { createInitialAdminUser, createTestUsers } from './supabase/userOperations';

// Initialize everything
export const initializeSupabase = async (): Promise<boolean> => {
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

// Export all individual functions for direct access
export { tableExists, initializeTables } from './supabase/tableOperations';
export { setupRLSPolicies } from './supabase/securityPolicies';
export { createInitialAdminUser, createTestUsers } from './supabase/userOperations';
