
import { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  BarChart3, 
  FileText, 
  LayoutDashboard, 
  ListTodo, 
  LogOut, 
  Menu, 
  Settings, 
  ShieldCheck, 
  UserCircle, 
  Users,
  FileSpreadsheet,
  FolderKanban,
  BellRing,
  Building2,
  Handshake,
  FileSignature
} from "lucide-react";
import { 
  Sheet,
  SheetContent,
  SheetTrigger
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

interface SidebarLinkProps {
  to: string;
  icon: React.ElementType;
  label: string;
  requiredRoles?: Array<"admin" | "gerencial" | "padrao">;
  onClick?: () => void;
}

const SidebarLink = ({ to, icon: Icon, label, requiredRoles, onClick }: SidebarLinkProps) => {
  const location = useLocation();
  const { user } = useAuth();
  
  // Check if user has permission to see this link
  if (requiredRoles && user && !requiredRoles.includes(user.role) && user.role !== 'admin') {
    return null;
  }
  
  const isActive = location.pathname === to;

  return (
    <NavLink 
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        cn(
          "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
          isActive 
            ? "bg-sidebar-accent text-sidebar-accent-foreground" 
            : "text-sidebar-foreground hover:bg-sidebar-accent/50"
        )
      }
    >
      <Icon className="h-5 w-5" />
      <span>{label}</span>
    </NavLink>
  );
};

export function Sidebar() {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  
  const closeMenu = () => setOpen(false);
  
  return (
    <>
      {/* Mobile Trigger */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="bg-sidebar p-0 w-[280px]">
            <MobileSidebar user={user} onLogout={handleLogout} onClose={closeMenu} />
          </SheetContent>
        </Sheet>
      </div>
      
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex h-screen w-64 flex-col bg-sidebar fixed left-0 top-0 border-r border-sidebar-border">
        <DesktopSidebar user={user} onLogout={handleLogout} />
      </aside>
    </>
  );
}

interface SidebarContentProps {
  user: any;
  onLogout: () => void;
  onClose?: () => void;
}

function MobileSidebar({ user, onLogout, onClose }: SidebarContentProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-2 p-4">
        <Building2 className="h-6 w-6 text-sidebar-foreground" />
        <h2 className="font-semibold text-sidebar-foreground text-lg">Contrato Guru</h2>
      </div>
      
      <Separator className="bg-sidebar-border" />
      
      <div className="flex items-center p-4">
        <Avatar className="h-10 w-10">
          <AvatarImage src={`https://avatar.vercel.sh/${user?.email || 'user'}.png`} alt={user?.name || 'Usuário'} />
          <AvatarFallback>{user?.name?.[0] || 'U'}</AvatarFallback>
        </Avatar>
        <div className="ml-3">
          <p className="text-sm font-medium text-sidebar-foreground">{user?.name || 'Usuário'}</p>
          <p className="text-xs text-sidebar-foreground/60">{user?.role === 'admin' ? 'Administrador' : user?.role === 'gerencial' ? 'Gerencial' : 'Usuário Padrão'}</p>
        </div>
      </div>
      
      <Separator className="bg-sidebar-border" />
      
      <nav className="flex-1 p-4 space-y-1 overflow-auto">
        <SidebarLink to="/dashboard" icon={LayoutDashboard} label="Dashboard" onClick={onClose} />
        <SidebarLink to="/contracts" icon={FileText} label="Contratos" onClick={onClose} />
        <SidebarLink to="/agreements" icon={Handshake} label="Convênios" onClick={onClose} />
        <SidebarLink to="/register-data" icon={FileSpreadsheet} label="Cadastros" onClick={onClose} />
        <SidebarLink to="/documents" icon={FileSignature} label="Documentos" onClick={onClose} />
        <SidebarLink to="/kanban" icon={FolderKanban} label="Kanban" onClick={onClose} />
        <SidebarLink to="/alerts" icon={BellRing} label="Alertas" onClick={onClose} />
        
        {/* Admin only */}
        <SidebarLink to="/users" icon={Users} label="Usuários" requiredRoles={['admin']} onClick={onClose} />
        <SidebarLink to="/roles" icon={ShieldCheck} label="Permissões" requiredRoles={['admin']} onClick={onClose} />
      </nav>
      
      <div className="p-4 space-y-2">
        <Separator className="bg-sidebar-border" />
        <div className="flex items-center justify-between">
          <Button variant="ghost" className="w-full justify-start text-sidebar-foreground" onClick={onClose}>
            <UserCircle className="mr-2 h-5 w-5" />
            Perfil
          </Button>
          <ThemeToggle />
        </div>
        <Button variant="ghost" className="w-full justify-start text-sidebar-foreground" onClick={onLogout}>
          <LogOut className="mr-2 h-5 w-5" />
          Sair
        </Button>
      </div>
    </div>
  );
}

function DesktopSidebar({ user, onLogout }: SidebarContentProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-2 p-6">
        <Building2 className="h-6 w-6 text-sidebar-foreground" />
        <h2 className="font-semibold text-sidebar-foreground text-lg">Contrato Guru</h2>
      </div>
      
      <Separator className="bg-sidebar-border" />
      
      <div className="flex items-center p-6">
        <Avatar className="h-10 w-10">
          <AvatarImage src={`https://avatar.vercel.sh/${user?.email || 'user'}.png`} alt={user?.name || 'Usuário'} />
          <AvatarFallback>{user?.name?.[0] || 'U'}</AvatarFallback>
        </Avatar>
        <div className="ml-3">
          <p className="text-sm font-medium text-sidebar-foreground">{user?.name || 'Usuário'}</p>
          <p className="text-xs text-sidebar-foreground/60">{user?.role === 'admin' ? 'Administrador' : user?.role === 'gerencial' ? 'Gerencial' : 'Usuário Padrão'}</p>
        </div>
      </div>
      
      <Separator className="bg-sidebar-border" />
      
      <nav className="flex-1 p-4 space-y-1 overflow-auto">
        <SidebarLink to="/dashboard" icon={LayoutDashboard} label="Dashboard" />
        <SidebarLink to="/contracts" icon={FileText} label="Contratos" />
        <SidebarLink to="/agreements" icon={Handshake} label="Convênios" />
        <SidebarLink to="/register-data" icon={FileSpreadsheet} label="Cadastros" />
        <SidebarLink to="/documents" icon={FileSignature} label="Documentos" />
        <SidebarLink to="/kanban" icon={FolderKanban} label="Kanban" />
        <SidebarLink to="/alerts" icon={BellRing} label="Alertas" />
        
        {/* Admin only */}
        <SidebarLink to="/users" icon={Users} label="Usuários" requiredRoles={['admin']} />
        <SidebarLink to="/roles" icon={ShieldCheck} label="Permissões" requiredRoles={['admin']} />
      </nav>
      
      <div className="p-4 space-y-2">
        <Separator className="bg-sidebar-border" />
        <div className="flex items-center justify-between">
          <Button variant="ghost" className="w-full justify-start text-sidebar-foreground">
            <UserCircle className="mr-2 h-5 w-5" />
            Perfil
          </Button>
          <ThemeToggle />
        </div>
        <Button variant="ghost" className="w-full justify-start text-sidebar-foreground" onClick={onLogout}>
          <LogOut className="mr-2 h-5 w-5" />
          Sair
        </Button>
      </div>
    </div>
  );
}
