
import { Sidebar } from "@/components/Sidebar";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

export function Layout() {
  const { isAuthenticated, loading } = useAuth();
  
  // If still loading auth state, show nothing
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }
  
  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <main className="flex-1 lg:ml-64">
        <div className="container mx-auto p-4 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
