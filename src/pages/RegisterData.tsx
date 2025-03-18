
import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { 
  CalendarIcon, 
  Save, 
  Building2, 
  Users, 
  FileText, 
  ClipboardList, 
  User, 
  Briefcase 
} from "lucide-react";

// This page contains multiple registration forms for different entities
// Each tab displays a different form based on the database schema

const RegisterData = () => {
  const [activeTab, setActiveTab] = useState("fornecedores");

  // Form states
  const [fornecedor, setFornecedor] = useState({
    numero_contrato: "",
    fornecedor: "",
    fiscal_id: "",
    gestor_id: "",
    setor_id: "",
    data_inicio_execucao: new Date(),
    data_termino_execucao: new Date(),
    valor_original: "",
    status: "ativo"
  });

  const [municipio, setMunicipio] = useState({
    nome: "",
    estado: "AL",
    populacao: "",
    codigo_ibge: ""
  });

  const [ordem, setOrdem] = useState({
    contrato_id: "",
    numero_ordem: "",
    data_emissao: new Date(),
    descricao: ""
  });

  const [processo, setProcesso] = useState({
    numero_processo: "",
    assunto: "",
    data_abertura: new Date(),
    interessado: "",
    situacao: "Em andamento"
  });

  const [fiscal, setFiscal] = useState({
    usuario_id: "",
    matricula: "",
    especialidade: ""
  });

  const [setor, setSetor] = useState({
    nome_setor: "",
    descricao: ""
  });

  // Sample data for selects
  const fiscaisList = [
    { id: "1", nome: "Ana Oliveira" },
    { id: "2", nome: "João Ferreira" },
    { id: "3", nome: "Fernanda Lima" },
  ];

  const gestoresList = [
    { id: "1", nome: "Carlos Silva" },
    { id: "2", nome: "Mariana Santos" },
    { id: "3", nome: "Ricardo Nunes" },
  ];

  const setoresList = [
    { id: "1", nome: "Obras Urbanas" },
    { id: "2", nome: "Infraestrutura" },
    { id: "3", nome: "Saneamento" },
  ];

  const contratosList = [
    { id: "1", numero: "CT-2023-001" },
    { id: "2", numero: "CT-2023-002" },
    { id: "3", numero: "CT-2023-003" },
  ];

  const usuariosList = [
    { id: "1", nome: "Marcos Vinicius" },
    { id: "2", nome: "Juliana Pereira" },
    { id: "3", nome: "Roberto Alves" },
  ];

  // Handle input changes
  const handleFornecedorChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFornecedor(prev => ({ ...prev, [name]: value }));
  };

  const handleFornecedorSelectChange = (name: string, value: string) => {
    setFornecedor(prev => ({ ...prev, [name]: value }));
  };

  const handleFornecedorDateChange = (name: string, date: Date | undefined) => {
    if (date) {
      setFornecedor(prev => ({ ...prev, [name]: date }));
    }
  };

  const handleMunicipioChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setMunicipio(prev => ({ ...prev, [name]: value }));
  };

  const handleOrdemChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setOrdem(prev => ({ ...prev, [name]: value }));
  };

  const handleOrdemSelectChange = (name: string, value: string) => {
    setOrdem(prev => ({ ...prev, [name]: value }));
  };

  const handleOrdemDateChange = (name: string, date: Date | undefined) => {
    if (date) {
      setOrdem(prev => ({ ...prev, [name]: date }));
    }
  };

  const handleProcessoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProcesso(prev => ({ ...prev, [name]: value }));
  };

  const handleProcessoDateChange = (name: string, date: Date | undefined) => {
    if (date) {
      setProcesso(prev => ({ ...prev, [name]: date }));
    }
  };

  const handleFiscalChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFiscal(prev => ({ ...prev, [name]: value }));
  };

  const handleFiscalSelectChange = (name: string, value: string) => {
    setFiscal(prev => ({ ...prev, [name]: value }));
  };

  const handleSetorChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSetor(prev => ({ ...prev, [name]: value }));
  };

  // Form submission handlers
  const handleSubmitFornecedor = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Fornecedor cadastrado com sucesso");
    console.log("Fornecedor data:", fornecedor);
  };

  const handleSubmitMunicipio = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Município cadastrado com sucesso");
    console.log("Município data:", municipio);
  };

  const handleSubmitOrdem = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Ordem de Serviço cadastrada com sucesso");
    console.log("Ordem data:", ordem);
  };

  const handleSubmitProcesso = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Processo SEI cadastrado com sucesso");
    console.log("Processo data:", processo);
  };

  const handleSubmitFiscal = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Fiscal cadastrado com sucesso");
    console.log("Fiscal data:", fiscal);
  };

  const handleSubmitSetor = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Setor cadastrado com sucesso");
    console.log("Setor data:", setor);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Cadastros"
        description="Gerencie os cadastros do sistema"
      />

      <Card>
        <CardHeader>
          <CardTitle>Cadastros do Sistema</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 mb-8">
              <TabsTrigger value="fornecedores" className="flex items-center gap-2">
                <Building2 className="h-4 w-4" />
                <span className="hidden sm:inline">Fornecedores</span>
              </TabsTrigger>
              <TabsTrigger value="municipios" className="flex items-center gap-2">
                <Building2 className="h-4 w-4" />
                <span className="hidden sm:inline">Municípios</span>
              </TabsTrigger>
              <TabsTrigger value="ordens" className="flex items-center gap-2">
                <ClipboardList className="h-4 w-4" />
                <span className="hidden sm:inline">Ordens</span>
              </TabsTrigger>
              <TabsTrigger value="processos" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                <span className="hidden sm:inline">Processos SEI</span>
              </TabsTrigger>
              <TabsTrigger value="fiscais" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span className="hidden sm:inline">Fiscais</span>
              </TabsTrigger>
              <TabsTrigger value="setores" className="flex items-center gap-2">
                <Briefcase className="h-4 w-4" />
                <span className="hidden sm:inline">Setores</span>
              </TabsTrigger>
            </TabsList>
            
            <Separator className="mb-8" />
            
            {/* Fornecedores Form */}
            <TabsContent value="fornecedores" className="space-y-6">
              <form onSubmit={handleSubmitFornecedor} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="numero_contrato">Número do Contrato</Label>
                    <Input
                      id="numero_contrato"
                      name="numero_contrato"
                      value={fornecedor.numero_contrato}
                      onChange={handleFornecedorChange}
                      placeholder="Ex: CT-2023-001"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fornecedor">Nome do Fornecedor</Label>
                    <Input
                      id="fornecedor"
                      name="fornecedor"
                      value={fornecedor.fornecedor}
                      onChange={handleFornecedorChange}
                      placeholder="Nome da empresa fornecedora"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fiscal_id">Fiscal Responsável</Label>
                    <Select
                      value={fornecedor.fiscal_id}
                      onValueChange={(value) => handleFornecedorSelectChange("fiscal_id", value)}
                    >
                      <SelectTrigger id="fiscal_id">
                        <SelectValue placeholder="Selecione um fiscal" />
                      </SelectTrigger>
                      <SelectContent>
                        {fiscaisList.map((fiscal) => (
                          <SelectItem key={fiscal.id} value={fiscal.id}>
                            {fiscal.nome}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gestor_id">Gestor Responsável</Label>
                    <Select
                      value={fornecedor.gestor_id}
                      onValueChange={(value) => handleFornecedorSelectChange("gestor_id", value)}
                    >
                      <SelectTrigger id="gestor_id">
                        <SelectValue placeholder="Selecione um gestor" />
                      </SelectTrigger>
                      <SelectContent>
                        {gestoresList.map((gestor) => (
                          <SelectItem key={gestor.id} value={gestor.id}>
                            {gestor.nome}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="setor_id">Setor Responsável</Label>
                    <Select
                      value={fornecedor.setor_id}
                      onValueChange={(value) => handleFornecedorSelectChange("setor_id", value)}
                    >
                      <SelectTrigger id="setor_id">
                        <SelectValue placeholder="Selecione um setor" />
                      </SelectTrigger>
                      <SelectContent>
                        {setoresList.map((setor) => (
                          <SelectItem key={setor.id} value={setor.id}>
                            {setor.nome}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select
                      value={fornecedor.status}
                      onValueChange={(value) => handleFornecedorSelectChange("status", value)}
                    >
                      <SelectTrigger id="status">
                        <SelectValue placeholder="Selecione o status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ativo">Ativo</SelectItem>
                        <SelectItem value="inativo">Inativo</SelectItem>
                        <SelectItem value="suspenso">Suspenso</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label>Data de Início de Execução</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !fornecedor.data_inicio_execucao && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {fornecedor.data_inicio_execucao ? (
                            format(fornecedor.data_inicio_execucao, "dd/MM/yyyy", { locale: ptBR })
                          ) : (
                            <span>Selecione a data</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={fornecedor.data_inicio_execucao}
                          onSelect={(date) => handleFornecedorDateChange("data_inicio_execucao", date)}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Data de Término de Execução</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !fornecedor.data_termino_execucao && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {fornecedor.data_termino_execucao ? (
                            format(fornecedor.data_termino_execucao, "dd/MM/yyyy", { locale: ptBR })
                          ) : (
                            <span>Selecione a data</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={fornecedor.data_termino_execucao}
                          onSelect={(date) => handleFornecedorDateChange("data_termino_execucao", date)}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="valor_original">Valor Original (R$)</Label>
                    <Input
                      id="valor_original"
                      name="valor_original"
                      value={fornecedor.valor_original}
                      onChange={handleFornecedorChange}
                      placeholder="Ex: 100000.00"
                      type="number"
                      min="0"
                      step="0.01"
                      required
                    />
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button type="submit" className="flex items-center gap-2">
                    <Save className="h-4 w-4" />
                    Salvar Fornecedor
                  </Button>
                </div>
              </form>
            </TabsContent>
            
            {/* Municípios Form */}
            <TabsContent value="municipios" className="space-y-6">
              <form onSubmit={handleSubmitMunicipio} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="nome">Nome do Município</Label>
                    <Input
                      id="nome"
                      name="nome"
                      value={municipio.nome}
                      onChange={handleMunicipioChange}
                      placeholder="Ex: Maceió"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="estado">Estado</Label>
                    <Select
                      value={municipio.estado}
                      onValueChange={(value) => setMunicipio(prev => ({ ...prev, estado: value }))}
                    >
                      <SelectTrigger id="estado">
                        <SelectValue placeholder="Selecione o estado" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="AL">Alagoas</SelectItem>
                        <SelectItem value="BA">Bahia</SelectItem>
                        <SelectItem value="CE">Ceará</SelectItem>
                        <SelectItem value="MA">Maranhão</SelectItem>
                        <SelectItem value="PB">Paraíba</SelectItem>
                        <SelectItem value="PE">Pernambuco</SelectItem>
                        <SelectItem value="PI">Piauí</SelectItem>
                        <SelectItem value="RN">Rio Grande do Norte</SelectItem>
                        <SelectItem value="SE">Sergipe</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="populacao">População</Label>
                    <Input
                      id="populacao"
                      name="populacao"
                      value={municipio.populacao}
                      onChange={handleMunicipioChange}
                      placeholder="Ex: 1000000"
                      type="number"
                      min="0"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="codigo_ibge">Código IBGE</Label>
                    <Input
                      id="codigo_ibge"
                      name="codigo_ibge"
                      value={municipio.codigo_ibge}
                      onChange={handleMunicipioChange}
                      placeholder="Ex: 2704302"
                    />
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button type="submit" className="flex items-center gap-2">
                    <Save className="h-4 w-4" />
                    Salvar Município
                  </Button>
                </div>
              </form>
            </TabsContent>
            
            {/* Ordens Form */}
            <TabsContent value="ordens" className="space-y-6">
              <form onSubmit={handleSubmitOrdem} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="contrato_id">Contrato</Label>
                    <Select
                      value={ordem.contrato_id}
                      onValueChange={(value) => handleOrdemSelectChange("contrato_id", value)}
                    >
                      <SelectTrigger id="contrato_id">
                        <SelectValue placeholder="Selecione um contrato" />
                      </SelectTrigger>
                      <SelectContent>
                        {contratosList.map((contrato) => (
                          <SelectItem key={contrato.id} value={contrato.id}>
                            {contrato.numero}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="numero_ordem">Número da Ordem</Label>
                    <Input
                      id="numero_ordem"
                      name="numero_ordem"
                      value={ordem.numero_ordem}
                      onChange={handleOrdemChange}
                      placeholder="Ex: OS-2023-001"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Data de Emissão</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !ordem.data_emissao && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {ordem.data_emissao ? (
                            format(ordem.data_emissao, "dd/MM/yyyy", { locale: ptBR })
                          ) : (
                            <span>Selecione a data</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={ordem.data_emissao}
                          onSelect={(date) => handleOrdemDateChange("data_emissao", date)}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="descricao">Descrição</Label>
                  <Textarea
                    id="descricao"
                    name="descricao"
                    value={ordem.descricao}
                    onChange={handleOrdemChange}
                    placeholder="Descreva a ordem de serviço"
                    rows={4}
                    required
                  />
                </div>
                
                <div className="flex justify-end">
                  <Button type="submit" className="flex items-center gap-2">
                    <Save className="h-4 w-4" />
                    Salvar Ordem de Serviço
                  </Button>
                </div>
              </form>
            </TabsContent>
            
            {/* Processos SEI Form */}
            <TabsContent value="processos" className="space-y-6">
              <form onSubmit={handleSubmitProcesso} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="numero_processo">Número do Processo</Label>
                    <Input
                      id="numero_processo"
                      name="numero_processo"
                      value={processo.numero_processo}
                      onChange={handleProcessoChange}
                      placeholder="Ex: SEI-12345/2023"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="interessado">Interessado</Label>
                    <Input
                      id="interessado"
                      name="interessado"
                      value={processo.interessado}
                      onChange={handleProcessoChange}
                      placeholder="Nome do interessado"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Data de Abertura</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !processo.data_abertura && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {processo.data_abertura ? (
                            format(processo.data_abertura, "dd/MM/yyyy", { locale: ptBR })
                          ) : (
                            <span>Selecione a data</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={processo.data_abertura}
                          onSelect={(date) => handleProcessoDateChange("data_abertura", date)}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="situacao">Situação</Label>
                    <Select
                      value={processo.situacao}
                      onValueChange={(value) => setProcesso(prev => ({ ...prev, situacao: value }))}
                    >
                      <SelectTrigger id="situacao">
                        <SelectValue placeholder="Selecione a situação" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Em andamento">Em andamento</SelectItem>
                        <SelectItem value="Concluído">Concluído</SelectItem>
                        <SelectItem value="Arquivado">Arquivado</SelectItem>
                        <SelectItem value="Suspenso">Suspenso</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="assunto">Assunto</Label>
                  <Textarea
                    id="assunto"
                    name="assunto"
                    value={processo.assunto}
                    onChange={handleProcessoChange}
                    placeholder="Assunto do processo"
                    rows={4}
                    required
                  />
                </div>
                
                <div className="flex justify-end">
                  <Button type="submit" className="flex items-center gap-2">
                    <Save className="h-4 w-4" />
                    Salvar Processo SEI
                  </Button>
                </div>
              </form>
            </TabsContent>
            
            {/* Fiscais Form */}
            <TabsContent value="fiscais" className="space-y-6">
              <form onSubmit={handleSubmitFiscal} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="usuario_id">Usuário</Label>
                    <Select
                      value={fiscal.usuario_id}
                      onValueChange={(value) => handleFiscalSelectChange("usuario_id", value)}
                    >
                      <SelectTrigger id="usuario_id">
                        <SelectValue placeholder="Selecione um usuário" />
                      </SelectTrigger>
                      <SelectContent>
                        {usuariosList.map((usuario) => (
                          <SelectItem key={usuario.id} value={usuario.id}>
                            {usuario.nome}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="matricula">Matrícula</Label>
                    <Input
                      id="matricula"
                      name="matricula"
                      value={fiscal.matricula}
                      onChange={handleFiscalChange}
                      placeholder="Ex: 12345"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="especialidade">Especialidade</Label>
                    <Input
                      id="especialidade"
                      name="especialidade"
                      value={fiscal.especialidade}
                      onChange={handleFiscalChange}
                      placeholder="Ex: Engenharia Civil"
                      required
                    />
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button type="submit" className="flex items-center gap-2">
                    <Save className="h-4 w-4" />
                    Salvar Fiscal
                  </Button>
                </div>
              </form>
            </TabsContent>
            
            {/* Setores Form */}
            <TabsContent value="setores" className="space-y-6">
              <form onSubmit={handleSubmitSetor} className="space-y-6">
                <div className="grid grid-cols-1 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="nome_setor">Nome do Setor</Label>
                    <Input
                      id="nome_setor"
                      name="nome_setor"
                      value={setor.nome_setor}
                      onChange={handleSetorChange}
                      placeholder="Ex: Diretoria de Obras"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="descricao">Descrição</Label>
                    <Textarea
                      id="descricao"
                      name="descricao"
                      value={setor.descricao}
                      onChange={handleSetorChange}
                      placeholder="Descreva as funções do setor"
                      rows={4}
                      required
                    />
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button type="submit" className="flex items-center gap-2">
                    <Save className="h-4 w-4" />
                    Salvar Setor
                  </Button>
                </div>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterData;
