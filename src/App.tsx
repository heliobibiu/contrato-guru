
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { Layout } from "@/components/Layout";

// Pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Contracts from "./pages/Contracts";
import ContractForm from "./pages/ContractForm";
import Agreements from "./pages/Agreements";
import AgreementForm from "./pages/AgreementForm";
import Documents from "./pages/Documents";
import Kanban from "./pages/Kanban";
import NotFound from "./pages/NotFound";
import Index from "./pages/Index";
import RegisterData from "./pages/RegisterData";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Root route */}
            <Route path="/" element={<Index />} />
            
            {/* Protected routes */}
            <Route element={<Layout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/contracts" element={<Contracts />} />
              <Route path="/contract/new" element={<ContractForm />} />
              <Route path="/contract/:id/edit" element={<ContractForm />} />
              <Route path="/agreements" element={<Agreements />} />
              <Route path="/agreement/new" element={<AgreementForm />} />
              <Route path="/agreement/:id/edit" element={<AgreementForm />} />
              <Route path="/documents" element={<Documents />} />
              <Route path="/register-data" element={<RegisterData />} />
              <Route path="/cadastros" element={<Navigate to="/register-data" replace />} />
              <Route path="/kanban" element={<Kanban />} />
            </Route>
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
