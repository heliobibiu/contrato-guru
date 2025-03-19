
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";

const Index = () => {
  const { isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();
  // We now have the Supabase credentials directly in the code
  const isSupabaseConfigured = true;

  useEffect(() => {
    const checkSession = async () => {
      if (isSupabaseConfigured) {
        // If Supabase is configured, check for an active session
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session) {
          navigate("/dashboard");
        } else {
          navigate("/login");
        }
      } else if (!loading) {
        // If Supabase is not configured, use the local auth state
        if (isAuthenticated) {
          navigate("/dashboard");
        } else {
          navigate("/login");
        }
      }
    };
    
    checkSession();
  }, [isAuthenticated, navigate, loading, isSupabaseConfigured]);

  // Simple loading state while redirect happens
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
        <p className="text-muted-foreground">Carregando o sistema...</p>
      </div>
    </div>
  );
};

export default Index;
