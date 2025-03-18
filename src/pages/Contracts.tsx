
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, MoreHorizontal, FileText, Pencil, Trash2, Eye } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

// Sample data for contracts
const contractsData = [
  {
    id: "CT-2023-001",
    processNumber: "PROC-2023-001",
    object: "Pavimentação da Av. Principal - Maceió",
    company: "Construtora Alpha LTDA",
    signDate: new Date("2023-03-15"),
    endDate: new Date("2024-03-15"),
    value: 1250000,
    status: "Em andamento",
    department: "Obras Urbanas",
    manager: "Carlos Silva",
    supervisor: "Ana Oliveira",
    city: "Maceió"
  },
  {
    id: "CT-2023-002",
    processNumber: "PROC-2023-010",
    object: "Reforma da Escola Municipal Beira Rio",
    company: "Construções Beta S/A",
    signDate: new Date("2023-04-20"),
    endDate: new Date("2023-12-20"),
    value: 850000,
    status: "Concluído",
    department: "Educação",
    manager: "Mariana Santos",
    supervisor: "João Ferreira",
    city: "Arapiraca"
  },
  {
    id: "CT-2023-003",
    processNumber: "PROC-2023-015",
    object: "Construção de Ponte sobre o Rio São Francisco",
    company: "Engenharia Gama LTDA",
    signDate: new Date("2023-02-10"),
    endDate: new Date("2024-08-10"),
    value: 4500000,
    status: "Em andamento",
    department: "Infraestrutura",
    manager: "Ricardo Nunes",
    supervisor: "Fernanda Lima",
    city: "Penedo"
  },
  {
    id: "CT-2023-004",
    processNumber: "PROC-2023-022",
    object: "Ampliação do Hospital Municipal",
    company: "Construtora Delta S/A",
    signDate: new Date("2023-06-05"),
    endDate: new Date("2024-06-05"),
    value: 3200000,
    status: "Em andamento",
    department: "Saúde",
    manager: "Paulo Mendes",
    supervisor: "Carla Moreira",
    city: "Palmeira dos Índios"
  },
  {
    id: "CT-2023-005",
    processNumber: "PROC-2023-030",
    object: "Saneamento Básico - Bairro Esperança",
    company: "Saneamento Epsilon LTDA",
    signDate: new Date("2023-05-12"),
    endDate: new Date("2024-05-12"),
    value: 1850000,
    status: "Em andamento",
    department: "Saneamento",
    manager: "Luiza Costa",
    supervisor: "Roberto Alves",
    city: "Maceió"
  },
  {
    id: "CT-2023-006",
    processNumber: "PROC-2023-035",
    object: "Revitalização da Orla",
    company: "Construtora Ômega LTDA",
    signDate: new Date("2023-07-25"),
    endDate: new Date("2023-12-25"),
    value: 950000,
    status: "Paralisado",
    department: "Turismo",
    manager: "Marcos Vinicius",
    supervisor: "Teresa Cristina",
    city: "Maragogi"
  },
  {
    id: "CT-2023-007",
    processNumber: "PROC-2023-040",
    object: "Construção de Creche Municipal",
    company: "Construções Sigma LTDA",
    signDate: new Date("2023-01-30"),
    endDate: new Date("2023-09-30"),
    value: 780000,
    status: "Concluído",
    department: "Educação",
    manager: "Juliana Pereira",
    supervisor: "André Santos",
    city: "Delmiro Gouveia"
  }
];

const Contracts = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  
  // Filter contracts based on search term
  const filteredContracts = contractsData.filter(contract => 
    contract.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contract.object.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contract.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contract.city.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const getStatusBadge = (status: string) => {
    switch(status) {
      case "Em andamento":
        return <Badge className="bg-blue-500 hover:bg-blue-600">{status}</Badge>;
      case "Concluído":
        return <Badge className="bg-green-500 hover:bg-green-600">{status}</Badge>;
      case "Paralisado":
        return <Badge className="bg-yellow-500 hover:bg-yellow-600">{status}</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };
  
  return (
    <>
      <PageHeader
        title="Contratos"
        description="Gerencie todos os contratos do sistema"
        actions={
          <Button onClick={() => navigate("/contract/new")}>
            <Plus className="mr-2 h-4 w-4" />
            Novo Contrato
          </Button>
        }
      />
      
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar contratos..."
                className="w-full pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Número</TableHead>
                  <TableHead>Objeto</TableHead>
                  <TableHead>Empresa</TableHead>
                  <TableHead>Município</TableHead>
                  <TableHead>Data de Assinatura</TableHead>
                  <TableHead>Valor (R$)</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredContracts.length > 0 ? (
                  filteredContracts.map((contract) => (
                    <TableRow key={contract.id}>
                      <TableCell className="font-medium">{contract.id}</TableCell>
                      <TableCell className="max-w-[200px] truncate" title={contract.object}>
                        {contract.object}
                      </TableCell>
                      <TableCell>{contract.company}</TableCell>
                      <TableCell>{contract.city}</TableCell>
                      <TableCell>
                        {format(contract.signDate, "dd/MM/yyyy", { locale: ptBR })}
                      </TableCell>
                      <TableCell>
                        {contract.value.toLocaleString('pt-BR')}
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(contract.status)}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Abrir menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Ações</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => navigate(`/contract/${contract.id}`)}>
                              <Eye className="mr-2 h-4 w-4" />
                              Visualizar
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => navigate(`/contract/${contract.id}/edit`)}>
                              <Pencil className="mr-2 h-4 w-4" />
                              Editar
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => navigate(`/contract/${contract.id}/additives`)}>
                              <FileText className="mr-2 h-4 w-4" />
                              Aditivos
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Excluir
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="h-24 text-center">
                      Nenhum contrato encontrado.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default Contracts;
