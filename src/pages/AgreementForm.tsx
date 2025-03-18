
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { CalendarIcon, ArrowLeft, Save } from "lucide-react";

// Sample agreement data - would be fetched from API in a real app
const mockAgreement = {
  id: "1",
  numero: "001/2023",
  processo: "SEI-12345/2023",
  dataAssinatura: new Date("2023-03-15"),
  dataPublicacao: new Date("2023-03-17"),
  objeto: "Construção de ponte sobre o rio Mundaú",
  convenente: "Governo Federal",
  conveniado: "Secretaria de Infraestrutura de Alagoas",
  valor: 5000000.00,
  contrapartida: 500000.00,
  vigencia: new Date("2023-03-15"),
  dataFinal: new Date("2025-03-15"),
  status: "Em andamento",
  observacoes: "Este convênio é para construção de ponte sobre o rio Mundaú"
};

const statusOptions = [
  "Em andamento",
  "Concluído",
  "Cancelado"
];

const emptyrAgreement = {
  id: "",
  numero: "",
  processo: "",
  dataAssinatura: new Date(),
  dataPublicacao: new Date(),
  objeto: "",
  convenente: "",
  conveniado: "Secretaria de Infraestrutura de Alagoas",
  valor: 0,
  contrapartida: 0,
  vigencia: new Date(),
  dataFinal: new Date(),
  status: "Em andamento",
  observacoes: ""
};

export default function AgreementForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isEditMode = id !== "new";
  
  const [agreement, setAgreement] = useState(emptyrAgreement);
  
  useEffect(() => {
    if (isEditMode) {
      // In a real app, you would fetch the agreement data here
      // For now, we'll use mock data
      setAgreement(mockAgreement);
    }
  }, [isEditMode]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setAgreement((prev) => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleNumberInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numValue = value === "" ? 0 : parseFloat(value);
    setAgreement((prev) => ({
      ...prev,
      [name]: numValue
    }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setAgreement((prev) => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleDateChange = (name: string, date: Date | undefined) => {
    if (date) {
      setAgreement((prev) => ({
        ...prev,
        [name]: date
      }));
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, you would save the data to your backend
    toast({
      title: isEditMode ? "Convênio atualizado" : "Convênio criado",
      description: isEditMode 
        ? `O convênio ${agreement.numero} foi atualizado com sucesso` 
        : `O convênio foi criado com sucesso`,
    });
    
    navigate("/agreements");
  };
  
  return (
    <div className="space-y-6">
      <PageHeader
        title={isEditMode ? "Editar Convênio" : "Novo Convênio"}
        description={isEditMode 
          ? `Editar informações do convênio ${agreement.numero}` 
          : "Cadastre um novo convênio no sistema"}
      />
      
      <Button 
        variant="outline" 
        onClick={() => navigate("/agreements")}
        className="mb-6"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Voltar para convênios
      </Button>
      
      <form onSubmit={handleSubmit}>
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Informações Gerais</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="numero">Número do Convênio</Label>
                  <Input
                    id="numero"
                    name="numero"
                    value={agreement.numero}
                    onChange={handleInputChange}
                    placeholder="Ex: 001/2023"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="processo">Número do Processo</Label>
                  <Input
                    id="processo"
                    name="processo"
                    value={agreement.processo}
                    onChange={handleInputChange}
                    placeholder="Ex: SEI-12345/2023"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="objeto">Objeto do Convênio</Label>
                <Textarea
                  id="objeto"
                  name="objeto"
                  value={agreement.objeto}
                  onChange={handleInputChange}
                  placeholder="Descreva o objeto do convênio"
                  required
                  rows={3}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="convenente">Convenente</Label>
                  <Input
                    id="convenente"
                    name="convenente"
                    value={agreement.convenente}
                    onChange={handleInputChange}
                    placeholder="Ex: Governo Federal"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="conveniado">Conveniado</Label>
                  <Input
                    id="conveniado"
                    name="conveniado"
                    value={agreement.conveniado}
                    onChange={handleInputChange}
                    placeholder="Ex: Secretaria de Infraestrutura de Alagoas"
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Datas e Valores</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label>Data de Assinatura</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !agreement.dataAssinatura && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {agreement.dataAssinatura ? (
                          format(agreement.dataAssinatura, "dd/MM/yyyy", { locale: ptBR })
                        ) : (
                          <span>Selecione a data</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={agreement.dataAssinatura}
                        onSelect={(date) => handleDateChange("dataAssinatura", date)}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                <div className="space-y-2">
                  <Label>Data de Publicação</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !agreement.dataPublicacao && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {agreement.dataPublicacao ? (
                          format(agreement.dataPublicacao, "dd/MM/yyyy", { locale: ptBR })
                        ) : (
                          <span>Selecione a data</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={agreement.dataPublicacao}
                        onSelect={(date) => handleDateChange("dataPublicacao", date)}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                <div className="space-y-2">
                  <Label>Status</Label>
                  <Select
                    value={agreement.status}
                    onValueChange={(value) => handleSelectChange("status", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o status" />
                    </SelectTrigger>
                    <SelectContent>
                      {statusOptions.map((status) => (
                        <SelectItem key={status} value={status}>
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Início da Vigência</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !agreement.vigencia && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {agreement.vigencia ? (
                          format(agreement.vigencia, "dd/MM/yyyy", { locale: ptBR })
                        ) : (
                          <span>Selecione a data</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={agreement.vigencia}
                        onSelect={(date) => handleDateChange("vigencia", date)}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                <div className="space-y-2">
                  <Label>Fim da Vigência</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !agreement.dataFinal && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {agreement.dataFinal ? (
                          format(agreement.dataFinal, "dd/MM/yyyy", { locale: ptBR })
                        ) : (
                          <span>Selecione a data</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={agreement.dataFinal}
                        onSelect={(date) => handleDateChange("dataFinal", date)}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              
              <Separator />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="valor">Valor do Convênio (R$)</Label>
                  <Input
                    id="valor"
                    name="valor"
                    type="number"
                    value={agreement.valor}
                    onChange={handleNumberInputChange}
                    step="0.01"
                    min="0"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="contrapartida">Contrapartida Financeira (R$)</Label>
                  <Input
                    id="contrapartida"
                    name="contrapartida"
                    type="number"
                    value={agreement.contrapartida}
                    onChange={handleNumberInputChange}
                    step="0.01"
                    min="0"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Observações</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="observacoes">Observações</Label>
                <Textarea
                  id="observacoes"
                  name="observacoes"
                  value={agreement.observacoes}
                  onChange={handleInputChange}
                  placeholder="Observações adicionais sobre o convênio"
                  rows={4}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button 
                type="submit"
                size="lg"
              >
                <Save className="mr-2 h-4 w-4" />
                {isEditMode ? "Salvar Alterações" : "Cadastrar Convênio"}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </form>
    </div>
  );
}
