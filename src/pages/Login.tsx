
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Building2 } from "lucide-react";
import { initializeSupabase } from "@/utils/supabaseInit";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { supabase } from "@/integrations/supabase/client";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [initializing, setInitializing] = useState(true);
  const [initError, setInitError] = useState<string | null>(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  // Initialize Supabase on first load
  useEffect(() => {
    const init = async () => {
      try {
        console.log("Iniciando inicialização do banco de dados...");
        const success = await initializeSupabase();
        console.log("Inicialização do banco de dados concluída:", success);
        
        if (!success) {
          setInitError("Erro ao inicializar o banco de dados. Verifique os logs do console para mais detalhes.");
        }
      } catch (error) {
        console.error("Erro ao inicializar o Supabase:", error);
        setInitError("Erro ao inicializar o banco de dados: " + (error instanceof Error ? error.message : String(error)));
      } finally {
        setInitializing(false);
      }
    };
    
    init();
  }, []);

  const handleForceLogin = async () => {
    try {
      setIsSubmitting(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        console.error("Erro no login direto:", error);
        toast.error("Erro no login direto: " + error.message);
        return;
      }
      
      if (data.user) {
        toast.success("Login realizado com sucesso via login direto!");
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Exceção no login direto:", error);
      toast.error("Erro inesperado: " + (error instanceof Error ? error.message : String(error)));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error("Por favor, preencha todos os campos");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      console.log(`Tentando login com: ${email}`);
      await login(email, password);
      navigate("/dashboard");
    } catch (error) {
      console.error("Erro de login através do contexto Auth:", error);
      
      // Tente login direto com Supabase como fallback
      toast.info("Tentando login direto com Supabase...");
      await handleForceLogin();
    } finally {
      setIsSubmitting(false);
    }
  };

  if (initializing) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/40 p-4">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-muted-foreground">Inicializando o banco de dados...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/40 p-4">
      <div className="max-w-md w-full">
        <div className="mb-6 text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-primary rounded-full p-3">
              <Building2 className="h-6 w-6 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-2xl font-bold">Contrato Guru</h1>
          <p className="text-muted-foreground">Sistema de Gestão de Contratos e Convênios</p>
          <p className="text-sm text-muted-foreground">Secretaria de Infraestrutura de Alagoas</p>
        </div>
        
        {initError && (
          <Alert variant="destructive" className="mb-4">
            <AlertTitle>Erro na inicialização</AlertTitle>
            <AlertDescription>{initError}</AlertDescription>
          </Alert>
        )}
        
        <Card>
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>
              Entre com suas credenciais para acessar o sistema
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Senha</Label>
                  <Link 
                    to="/forgot-password" 
                    className="text-sm text-primary hover:underline"
                  >
                    Esqueceu a senha?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isSubmitting}
              >
                {isSubmitting ? "Autenticando..." : "Entrar"}
              </Button>
              <p className="text-center text-sm text-muted-foreground">
                Não tem uma conta?{" "}
                <Link to="/register" className="text-primary hover:underline">
                  Cadastre-se
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>
        
        <div className="mt-6 text-center text-sm text-muted-foreground">
          <p>
            Para fins de demonstração, use:
          </p>
          <p>
            Admin: admin@example.com / admin123
          </p>
          <p>
            Gerencial: gerente@example.com / gerente123
          </p>
          <p>
            Padrão: usuario@example.com / usuario123
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
