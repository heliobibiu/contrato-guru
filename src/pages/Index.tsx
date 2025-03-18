
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to dashboard if authenticated, otherwise to login
    if (isAuthenticated) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  // Simple loading state while redirect happens
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
    </div>
  );
};

export default Index;
