
import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabase';

// Using the provided Supabase credentials
const supabaseUrl = 'https://ftwuxkrkczwlvnmdsfpy.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ0d3V4a3JrY3p3bHZubWRzZnB5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI0MDUyMzgsImV4cCI6MjA1Nzk4MTIzOH0.rrR_7lYUYe2TJwcvWkRVw0yy4O7XPfg3EFsu9DlUlIw';

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);
