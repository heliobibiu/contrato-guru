import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
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
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { Clipboard, Eye, MoreHorizontal, Pencil, Search } from "lucide-react";
import { toast } from "sonner";

interface Contract {
  id: string;
  number: string;
  object: string;
  company: string;
  value: number;
  endDate: Date;
  status: "Em andamento" | "Concluído" | "Paralisado" | "Em aditamento";
  department: string;
}

interface KanbanColumn {
  id: string;
  title: string;
  contracts: Contract[];
}

// Sample data for Kanban board
const initialColumns: KanbanColumn[] = [
  {
    id: "obras-urbanas",
    title: "Obras Urbanas",
    contracts: [
      {
        id: "contract-1",
        number: "CT-2023-001",
        object: "Pavimentação da Av. Principal - Maceió",
        company: "Construtora Alpha LTDA",
        value: 1250000,
        endDate: new Date("2024-03-15"),
        status: "Em andamento",
        department: "Obras Urbanas",
      },
      {
        id: "contract-5",
        number: "CT-2023-005",
        object: "Saneamento Básico - Bairro Esperança",
        company: "Saneamento Epsilon LTDA",
        value: 1850000,
        endDate: new Date("2024-05-12"),
        status: "Em andamento",
        department: "Obras Urbanas",
      },
    ],
  },
  {
    id: "infraestrutura",
    title: "Infraestrutura",
    contracts: [
      {
        id: "contract-3",
        number: "CT-2023-003",
        object: "Construção de Ponte sobre o Rio São Francisco",
        company: "Engenharia Gama LTDA",
        value: 4500000,
        endDate: new Date("2024-08-10"),
        status: "Em andamento",
        department: "Infraestrutura",
      },
    ],
  },
  {
    id: "educacao",
    title: "Educação",
    contracts: [
      {
        id: "contract-2",
        number: "CT-2023-002",
        object: "Reforma da Escola Municipal Beira Rio",
        company: "Construções Beta S/A",
        value: 850000,
        endDate: new Date("2023-12-20"),
        status: "Concluído",
        department: "Educação",
      },
      {
        id: "contract-7",
        number: "CT-2023-007",
        object: "Construção de Creche Municipal",
        company: "Construções Sigma LTDA",
        value: 780000,
        endDate: new Date("2023-09-30"),
        status: "Concluído",
        department: "Educação",
      },
    ],
  },
  {
    id: "saude",
    title: "Saúde",
    contracts: [
      {
        id: "contract-4",
        number: "CT-2023-004",
        object: "Ampliação do Hospital Municipal",
        company: "Construtora Delta S/A",
        value: 3200000,
        endDate: new Date("2024-06-05"),
        status: "Em andamento",
        department: "Saúde",
      },
    ],
  },
  {
    id: "turismo",
    title: "Turismo",
    contracts: [
      {
        id: "contract-6",
        number: "CT-2023-006",
        object: "Revitalização da Orla",
        company: "Construtora Ômega LTDA",
        value: 950000,
        endDate: new Date("2023-12-25"),
        status: "Paralisado",
        department: "Turismo",
      },
    ],
  },
];

const Kanban = () => {
  const [columns, setColumns] = useState<KanbanColumn[]>(initialColumns);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDepartment, setFilterDepartment] = useState<string | null>(null);
  const navigate = useNavigate();
  
  // Filter contracts based on search term and department filter
  const filteredColumns = columns.map((column) => {
    let filteredContracts = column.contracts;
    
    if (searchTerm) {
      filteredContracts = filteredContracts.filter(
        (contract) =>
          contract.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
          contract.object.toLowerCase().includes(searchTerm.toLowerCase()) ||
          contract.company.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (filterDepartment) {
      filteredContracts = filteredContracts.filter(
        (contract) => contract.department === filterDepartment
      );
    }
    
    return {
      ...column,
      contracts: filteredContracts,
    };
  });
  
  // Filter columns that have contracts after filtering
  const visibleColumns = filterDepartment
    ? filteredColumns.filter((column) => column.title === filterDepartment)
    : filteredColumns;
  
  const handleDragStart = (e: React.DragEvent, contractId: string, fromColumnId: string) => {
    e.dataTransfer.setData("contractId", contractId);
    e.dataTransfer.setData("fromColumnId", fromColumnId);
  };
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };
  
  const handleDrop = (e: React.DragEvent, toColumnId: string) => {
    e.preventDefault();
    
    const contractId = e.dataTransfer.getData("contractId");
    const fromColumnId = e.dataTransfer.getData("fromColumnId");
    
    if (fromColumnId === toColumnId) return;
    
    const updatedColumns = columns.map((column) => {
      // Remove from source column
      if (column.id === fromColumnId) {
        return {
          ...column,
          contracts: column.contracts.filter((contract) => contract.id !== contractId),
        };
      }
      
      // Add to target column
      if (column.id === toColumnId) {
        const contractToMove = columns
          .find((col) => col.id === fromColumnId)
          ?.contracts.find((contract) => contract.id === contractId);
        
        if (contractToMove) {
          // Update department
          const updatedContract = {
            ...contractToMove,
            department: column.title,
          };
          
          return {
            ...column,
            contracts: [...column.contracts, updatedContract],
          };
        }
      }
      
      return column;
    });
    
    setColumns(updatedColumns);
    toast.success("Contrato movido com sucesso!");
  };
  
  const departments = Array.from(
    new Set(columns.flatMap((column) => column.contracts.map((contract) => contract.department)))
  );
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Em andamento":
        return "bg-blue-500";
      case "Concluído":
        return "bg-green-500";
      case "Paralisado":
        return "bg-yellow-500";
      case "Em aditamento":
        return "bg-purple-500";
      default:
        return "bg-gray-500";
    }
  };
  
  const getDaysRemaining = (endDate: Date) => {
    const today = new Date();
    const diffTime = endDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };
  
  return (
    <>
      <PageHeader
        title="Kanban de Contratos"
        description="Visualize e gerencie contratos por departamento"
      />
      
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col md:flex-row gap-4 justify-between">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar contratos..."
              className="w-full pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 md:items-center">
            <Select
              value={filterDepartment || ""}
              onValueChange={(value) => setFilterDepartment(value || null)}
            >
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Todos os Departamentos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os Departamentos</SelectItem>
                {departments.map((dept) => (
                  <SelectItem key={dept} value={dept}>
                    {dept}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Button variant="outline" onClick={() => navigate("/dashboard")}>
              Voltar para Dashboard
            </Button>
          </div>
        </div>
        
        <div className="flex overflow-x-auto pb-4 md:pb-0 space-x-4">
          {visibleColumns.map((column) => (
            <div
              key={column.id}
              className="flex-shrink-0 w-80 flex flex-col bg-muted rounded-lg p-2"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, column.id)}
            >
              <div className="p-2 mb-2">
                <h3 className="font-semibold flex items-center">
                  <span className="mr-2">{column.title}</span>
                  <Badge variant="outline" className="rounded-full">
                    {column.contracts.length}
                  </Badge>
                </h3>
              </div>
              
              <ScrollArea className="h-[calc(100vh-280px)]">
                <div className="p-1 space-y-2">
                  {column.contracts.length > 0 ? (
                    column.contracts.map((contract) => (
                      <div
                        key={contract.id}
                        className="bg-card rounded-md shadow-sm border p-3 cursor-move"
                        draggable
                        onDragStart={(e) => handleDragStart(e, contract.id, column.id)}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-medium">
                            {contract.number}
                          </span>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-6 w-6">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Ações</DropdownMenuLabel>
                              <DropdownMenuItem onClick={() => navigate(`/contract/${contract.id}`)}>
                                <Eye className="h-4 w-4 mr-2" />
                                Visualizar
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => navigate(`/contract/${contract.id}/edit`)}>
                                <Pencil className="h-4 w-4 mr-2" />
                                Editar
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => {
                                navigator.clipboard.writeText(contract.number);
                                toast.success("Número do contrato copiado!");
                              }}>
                                <Clipboard className="h-4 w-4 mr-2" />
                                Copiar Número
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                        
                        <h4 className="font-medium text-sm line-clamp-2 mb-2" title={contract.object}>
                          {contract.object}
                        </h4>
                        
                        <div className="text-xs text-muted-foreground mb-2">
                          {contract.company}
                        </div>
                        
                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center">
                            <span className={`w-2 h-2 rounded-full ${getStatusColor(contract.status)} mr-1`}></span>
                            <span>{contract.status}</span>
                          </div>
                          
                          <div>
                            <span className={`px-1.5 py-0.5 rounded ${
                              getDaysRemaining(contract.endDate) < 30
                                ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                                : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                            }`}>
                              {getDaysRemaining(contract.endDate)} dias
                            </span>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="flex items-center justify-center h-20 text-muted-foreground bg-card/50 rounded-md">
                      <p className="text-sm">Sem contratos</p>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Kanban;
