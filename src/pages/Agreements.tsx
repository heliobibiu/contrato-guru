
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { 
  MoreHorizontal, 
  Plus, 
  Search, 
  FileText, 
  Pencil, 
  Trash,
  Filter
} from "lucide-react";

// Mock data for agreements
const mockAgreements = [
  {
    id: "1",
    numero: "001/2023",
    processo: "SEI-12345/2023",
    dataAssinatura: "2023-03-15",
    dataPublicacao: "2023-03-17",
    objeto: "Construção de ponte sobre o rio Mundaú",
    convenente: "Governo Federal",
    conveniado: "Secretaria de Infraestrutura de Alagoas",
    valor: 5000000.00,
    contrapartida: 500000.00,
    vigencia: "2023-03-15",
    dataFinal: "2025-03-15",
    status: "Em andamento"
  },
  {
    id: "2",
    numero: "002/2023",
    processo: "SEI-12346/2023",
    dataAssinatura: "2023-04-20",
    dataPublicacao: "2023-04-22",
    objeto: "Revitalização da orla de Maceió",
    convenente: "Governo Estadual",
    conveniado: "Secretaria de Infraestrutura de Alagoas",
    valor: 3000000.00,
    contrapartida: 300000.00,
    vigencia: "2023-04-20",
    dataFinal: "2024-10-20",
    status: "Em andamento"
  },
  {
    id: "3",
    numero: "003/2023",
    processo: "SEI-12347/2023",
    dataAssinatura: "2023-05-10",
    dataPublicacao: "2023-05-12",
    objeto: "Construção de hospital regional em Palmeira dos Índios",
    convenente: "Ministério da Saúde",
    conveniado: "Secretaria de Infraestrutura de Alagoas",
    valor: 8000000.00,
    contrapartida: 800000.00,
    vigencia: "2023-05-10",
    dataFinal: "2025-05-10",
    status: "Em andamento"
  },
  {
    id: "4",
    numero: "004/2023",
    processo: "SEI-12348/2023",
    dataAssinatura: "2023-06-05",
    dataPublicacao: "2023-06-07",
    objeto: "Pavimentação de rodovias no agreste alagoano",
    convenente: "Ministério dos Transportes",
    conveniado: "Secretaria de Infraestrutura de Alagoas",
    valor: 12000000.00,
    contrapartida: 1200000.00,
    vigencia: "2023-06-05",
    dataFinal: "2024-12-05",
    status: "Em andamento"
  },
  {
    id: "5",
    numero: "005/2023",
    processo: "SEI-12349/2023",
    dataAssinatura: "2023-07-15",
    dataPublicacao: "2023-07-17",
    objeto: "Construção de escolas técnicas na região do sertão",
    convenente: "Ministério da Educação",
    conveniado: "Secretaria de Infraestrutura de Alagoas",
    valor: 6000000.00,
    contrapartida: 600000.00,
    vigencia: "2023-07-15",
    dataFinal: "2025-01-15",
    status: "Em andamento"
  }
];

export default function Agreements() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Filter agreements based on search term and status
  const filteredAgreements = mockAgreements.filter((agreement) => {
    const matchesSearch = 
      agreement.numero.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agreement.objeto.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agreement.convenente.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agreement.conveniado.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || agreement.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  const handleEditAgreement = (id: string) => {
    navigate(`/agreement/${id}/edit`);
  };
  
  const handleDeleteAgreement = (id: string) => {
    // In a real app, you would delete from your backend
    toast({
      title: "Convênio excluído",
      description: `O convênio #${id} foi excluído com sucesso.`,
    });
  };
  
  const handleViewDetails = (id: string) => {
    navigate(`/agreement/${id}`);
  };
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Convênios"
        description="Gerencie os convênios da Secretaria de Infraestrutura"
      />
      
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Pesquisar convênios..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="Em andamento">Em andamento</SelectItem>
                <SelectItem value="Concluído">Concluído</SelectItem>
                <SelectItem value="Cancelado">Cancelado</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Button onClick={() => navigate("/agreement/new")}>
            <Plus className="mr-2 h-4 w-4" />
            Novo Convênio
          </Button>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Convênios</CardTitle>
          <CardDescription>
            Total de {filteredAgreements.length} convênios encontrados.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Número</TableHead>
                  <TableHead>Objeto</TableHead>
                  <TableHead>Convenente</TableHead>
                  <TableHead className="hidden md:table-cell">Conveniado</TableHead>
                  <TableHead className="hidden md:table-cell">Data Assinatura</TableHead>
                  <TableHead className="text-right">Valor</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAgreements.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-4 text-muted-foreground">
                      Nenhum convênio encontrado.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredAgreements.map((agreement) => (
                    <TableRow key={agreement.id}>
                      <TableCell>{agreement.numero}</TableCell>
                      <TableCell className="max-w-[200px] truncate" title={agreement.objeto}>
                        {agreement.objeto}
                      </TableCell>
                      <TableCell>{agreement.convenente}</TableCell>
                      <TableCell className="hidden md:table-cell">{agreement.conveniado}</TableCell>
                      <TableCell className="hidden md:table-cell">{formatDate(agreement.dataAssinatura)}</TableCell>
                      <TableCell className="text-right">{formatCurrency(agreement.valor)}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Ações</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleViewDetails(agreement.id)}>
                              <FileText className="mr-2 h-4 w-4" />
                              Ver Detalhes
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleEditAgreement(agreement.id)}>
                              <Pencil className="mr-2 h-4 w-4" />
                              Editar
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDeleteAgreement(agreement.id)}>
                              <Trash className="mr-2 h-4 w-4" />
                              Excluir
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
