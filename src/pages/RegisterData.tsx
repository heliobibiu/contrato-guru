
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { format } from "date-fns";
import { CalendarIcon, Building, MapPin, ClipboardList, FileText, User, Layers } from "lucide-react";

import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { useAuthorization } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";

// Schema for Fornecedor form
const fornecedorSchema = z.object({
  nome: z.string().min(1, { message: "Nome é obrigatório" }),
  cnpj: z.string().min(14, { message: "CNPJ deve ter 14 caracteres" }).max(18),
  contato: z.string().min(1, { message: "Contato é obrigatório" }),
  email: z.string().email({ message: "Email inválido" }),
  telefone: z.string().min(1, { message: "Telefone é obrigatório" }),
  endereco: z.string().min(1, { message: "Endereço é obrigatório" }),
});

// Schema for Municipio form
const municipioSchema = z.object({
  nome: z.string().min(1, { message: "Nome é obrigatório" }),
  estado: z.string().min(2, { message: "Estado é obrigatório" }).max(2),
  codigo_ibge: z.string().optional(),
  regiao: z.string().optional(),
});

// Schema for Ordem de Serviço form
const ordemServicoSchema = z.object({
  contrato_id: z.string().min(1, { message: "Contrato é obrigatório" }),
  numero_ordem: z.string().min(1, { message: "Número da ordem é obrigatório" }),
  data_emissao: z.date({ required_error: "Data de emissão é obrigatória" }),
  descricao: z.string().min(1, { message: "Descrição é obrigatória" }),
});

// Schema for Processo SEI form
const processoSeiSchema = z.object({
  numero: z.string().min(1, { message: "Número do processo é obrigatório" }),
  tipo: z.string().min(1, { message: "Tipo é obrigatório" }),
  data_abertura: z.date({ required_error: "Data de abertura é obrigatória" }),
  interessado: z.string().min(1, { message: "Interessado é obrigatório" }),
  assunto: z.string().min(1, { message: "Assunto é obrigatório" }),
  situacao: z.string().min(1, { message: "Situação é obrigatória" }),
});

// Schema for Fiscal form
const fiscalSchema = z.object({
  usuario_id: z.string().min(1, { message: "Usuário é obrigatório" }),
  matricula: z.string().min(1, { message: "Matrícula é obrigatória" }),
  especialidade: z.string().min(1, { message: "Especialidade é obrigatória" }),
});

// Schema for Setor form
const setorSchema = z.object({
  nome_setor: z.string().min(1, { message: "Nome do setor é obrigatório" }),
  descricao: z.string().optional(),
});

// Mock data for selects
const contratos = [
  { id: "1", numero: "CT-001/2023", fornecedor: "Empresa A" },
  { id: "2", numero: "CT-002/2023", fornecedor: "Empresa B" },
];

const usuarios = [
  { id: "1", nome: "João Silva", email: "joao@example.com" },
  { id: "2", nome: "Maria Santos", email: "maria@example.com" },
  { id: "3", nome: "Pedro Oliveira", email: "pedro@example.com" },
];

const tiposProcesso = [
  "Licitação",
  "Dispensa",
  "Inexigibilidade",
  "Administrativo",
  "Pagamento",
];

const situacoesProcesso = [
  "Em Andamento",
  "Concluído",
  "Suspenso",
  "Arquivado",
  "Cancelado",
];

const RegisterData = () => {
  const [activeTab, setActiveTab] = useState("fornecedores");
  const canEdit = useAuthorization(['admin', 'gerencial']);
  
  // Form for Fornecedores
  const fornecedorForm = useForm<z.infer<typeof fornecedorSchema>>({
    resolver: zodResolver(fornecedorSchema),
    defaultValues: {
      nome: "",
      cnpj: "",
      contato: "",
      email: "",
      telefone: "",
      endereco: "",
    },
  });
  
  // Form for Municipios
  const municipioForm = useForm<z.infer<typeof municipioSchema>>({
    resolver: zodResolver(municipioSchema),
    defaultValues: {
      nome: "",
      estado: "",
      codigo_ibge: "",
      regiao: "",
    },
  });
  
  // Form for Ordens de Serviço
  const ordemForm = useForm<z.infer<typeof ordemServicoSchema>>({
    resolver: zodResolver(ordemServicoSchema),
    defaultValues: {
      contrato_id: "",
      numero_ordem: "",
      descricao: "",
    },
  });
  
  // Form for Processos SEI
  const processoForm = useForm<z.infer<typeof processoSeiSchema>>({
    resolver: zodResolver(processoSeiSchema),
    defaultValues: {
      numero: "",
      tipo: "",
      interessado: "",
      assunto: "",
      situacao: "",
    },
  });
  
  // Form for Fiscais
  const fiscalForm = useForm<z.infer<typeof fiscalSchema>>({
    resolver: zodResolver(fiscalSchema),
    defaultValues: {
      usuario_id: "",
      matricula: "",
      especialidade: "",
    },
  });
  
  // Form for Setores
  const setorForm = useForm<z.infer<typeof setorSchema>>({
    resolver: zodResolver(setorSchema),
    defaultValues: {
      nome_setor: "",
      descricao: "",
    },
  });
  
  // Form submit handlers
  const onFornecedorSubmit = (data: z.infer<typeof fornecedorSchema>) => {
    console.log("Fornecedor data:", data);
    toast.success("Fornecedor cadastrado com sucesso!");
    fornecedorForm.reset();
  };
  
  const onMunicipioSubmit = (data: z.infer<typeof municipioSchema>) => {
    console.log("Município data:", data);
    toast.success("Município cadastrado com sucesso!");
    municipioForm.reset();
  };
  
  const onOrdemSubmit = (data: z.infer<typeof ordemServicoSchema>) => {
    console.log("Ordem de Serviço data:", data);
    toast.success("Ordem de serviço cadastrada com sucesso!");
    ordemForm.reset();
  };
  
  const onProcessoSubmit = (data: z.infer<typeof processoSeiSchema>) => {
    console.log("Processo SEI data:", data);
    toast.success("Processo SEI cadastrado com sucesso!");
    processoForm.reset();
  };
  
  const onFiscalSubmit = (data: z.infer<typeof fiscalSchema>) => {
    console.log("Fiscal data:", data);
    toast.success("Fiscal cadastrado com sucesso!");
    fiscalForm.reset();
  };
  
  const onSetorSubmit = (data: z.infer<typeof setorSchema>) => {
    console.log("Setor data:", data);
    toast.success("Setor cadastrado com sucesso!");
    setorForm.reset();
  };
  
  return (
    <div className="space-y-6">
      <PageHeader
        title="Cadastros"
        description="Cadastro de informações básicas para o sistema"
        breadcrumbs={[
          { label: "Início", href: "/dashboard" },
          { label: "Cadastros", href: "/cadastros" },
        ]}
      />
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-3 lg:grid-cols-6 w-full">
          <TabsTrigger value="fornecedores" className="flex items-center gap-2">
            <Building className="h-4 w-4" />
            <span className="hidden sm:inline">Fornecedores</span>
          </TabsTrigger>
          <TabsTrigger value="municipios" className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
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
            <Layers className="h-4 w-4" />
            <span className="hidden sm:inline">Setores</span>
          </TabsTrigger>
        </TabsList>
        
        {/* Fornecedores Tab */}
        <TabsContent value="fornecedores">
          <Card>
            <CardContent className="pt-6">
              <Form {...fornecedorForm}>
                <form onSubmit={fornecedorForm.handleSubmit(onFornecedorSubmit)} className="space-y-6">
                  <h2 className="text-xl font-bold">Cadastro de Fornecedores</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={fornecedorForm.control}
                      name="nome"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nome da Empresa</FormLabel>
                          <FormControl>
                            <Input placeholder="Nome da empresa" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={fornecedorForm.control}
                      name="cnpj"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>CNPJ</FormLabel>
                          <FormControl>
                            <Input placeholder="00.000.000/0000-00" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={fornecedorForm.control}
                      name="contato"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nome do Contato</FormLabel>
                          <FormControl>
                            <Input placeholder="Nome do contato" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={fornecedorForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>E-mail</FormLabel>
                          <FormControl>
                            <Input placeholder="email@exemplo.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={fornecedorForm.control}
                      name="telefone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Telefone</FormLabel>
                          <FormControl>
                            <Input placeholder="(00) 00000-0000" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={fornecedorForm.control}
                    name="endereco"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Endereço</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Endereço completo" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="flex justify-end">
                    <Button 
                      type="submit" 
                      disabled={!canEdit}
                      className="w-full md:w-auto"
                    >
                      Cadastrar Fornecedor
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Municípios Tab */}
        <TabsContent value="municipios">
          <Card>
            <CardContent className="pt-6">
              <Form {...municipioForm}>
                <form onSubmit={municipioForm.handleSubmit(onMunicipioSubmit)} className="space-y-6">
                  <h2 className="text-xl font-bold">Cadastro de Municípios</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={municipioForm.control}
                      name="nome"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nome do Município</FormLabel>
                          <FormControl>
                            <Input placeholder="Nome do município" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={municipioForm.control}
                      name="estado"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>UF</FormLabel>
                          <FormControl>
                            <Input placeholder="Sigla do estado (ex: AL)" maxLength={2} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={municipioForm.control}
                      name="codigo_ibge"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Código IBGE</FormLabel>
                          <FormControl>
                            <Input placeholder="Código IBGE" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={municipioForm.control}
                      name="regiao"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Região</FormLabel>
                          <FormControl>
                            <Input placeholder="Região do estado" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="flex justify-end">
                    <Button 
                      type="submit" 
                      disabled={!canEdit}
                      className="w-full md:w-auto"
                    >
                      Cadastrar Município
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Ordens de Serviço Tab */}
        <TabsContent value="ordens">
          <Card>
            <CardContent className="pt-6">
              <Form {...ordemForm}>
                <form onSubmit={ordemForm.handleSubmit(onOrdemSubmit)} className="space-y-6">
                  <h2 className="text-xl font-bold">Cadastro de Ordens de Serviço</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={ordemForm.control}
                      name="contrato_id"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Contrato</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione um contrato" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {contratos.map((contrato) => (
                                <SelectItem key={contrato.id} value={contrato.id}>
                                  {contrato.numero} - {contrato.fornecedor}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={ordemForm.control}
                      name="numero_ordem"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Número da Ordem</FormLabel>
                          <FormControl>
                            <Input placeholder="Número da ordem de serviço" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={ordemForm.control}
                      name="data_emissao"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Data de Emissão</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w-full pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, "dd/MM/yyyy")
                                  ) : (
                                    <span>Selecione uma data</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                initialFocus
                                className={cn("p-3 pointer-events-auto")}
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={ordemForm.control}
                    name="descricao"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Descrição</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Descrição da ordem de serviço" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="flex justify-end">
                    <Button 
                      type="submit" 
                      disabled={!canEdit}
                      className="w-full md:w-auto"
                    >
                      Cadastrar Ordem de Serviço
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Processos SEI Tab */}
        <TabsContent value="processos">
          <Card>
            <CardContent className="pt-6">
              <Form {...processoForm}>
                <form onSubmit={processoForm.handleSubmit(onProcessoSubmit)} className="space-y-6">
                  <h2 className="text-xl font-bold">Cadastro de Processos SEI</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={processoForm.control}
                      name="numero"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Número do Processo</FormLabel>
                          <FormControl>
                            <Input placeholder="Número do processo SEI" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={processoForm.control}
                      name="tipo"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tipo do Processo</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione o tipo" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {tiposProcesso.map((tipo) => (
                                <SelectItem key={tipo} value={tipo}>
                                  {tipo}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={processoForm.control}
                      name="data_abertura"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Data de Abertura</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w-full pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, "dd/MM/yyyy")
                                  ) : (
                                    <span>Selecione uma data</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                initialFocus
                                className={cn("p-3 pointer-events-auto")}
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={processoForm.control}
                      name="interessado"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Interessado</FormLabel>
                          <FormControl>
                            <Input placeholder="Nome do interessado" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={processoForm.control}
                      name="situacao"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Situação</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione a situação" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {situacoesProcesso.map((situacao) => (
                                <SelectItem key={situacao} value={situacao}>
                                  {situacao}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={processoForm.control}
                    name="assunto"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Assunto</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Assunto do processo" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="flex justify-end">
                    <Button 
                      type="submit" 
                      disabled={!canEdit}
                      className="w-full md:w-auto"
                    >
                      Cadastrar Processo SEI
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Fiscais Tab */}
        <TabsContent value="fiscais">
          <Card>
            <CardContent className="pt-6">
              <Form {...fiscalForm}>
                <form onSubmit={fiscalForm.handleSubmit(onFiscalSubmit)} className="space-y-6">
                  <h2 className="text-xl font-bold">Cadastro de Fiscais</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={fiscalForm.control}
                      name="usuario_id"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Usuário</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione um usuário" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {usuarios.map((usuario) => (
                                <SelectItem key={usuario.id} value={usuario.id}>
                                  {usuario.nome} ({usuario.email})
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={fiscalForm.control}
                      name="matricula"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Matrícula</FormLabel>
                          <FormControl>
                            <Input placeholder="Número da matrícula" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={fiscalForm.control}
                      name="especialidade"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Especialidade</FormLabel>
                          <FormControl>
                            <Input placeholder="Especialidade do fiscal" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="flex justify-end">
                    <Button 
                      type="submit" 
                      disabled={!canEdit}
                      className="w-full md:w-auto"
                    >
                      Cadastrar Fiscal
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Setores Tab */}
        <TabsContent value="setores">
          <Card>
            <CardContent className="pt-6">
              <Form {...setorForm}>
                <form onSubmit={setorForm.handleSubmit(onSetorSubmit)} className="space-y-6">
                  <h2 className="text-xl font-bold">Cadastro de Setores</h2>
                  
                  <FormField
                    control={setorForm.control}
                    name="nome_setor"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome do Setor</FormLabel>
                        <FormControl>
                          <Input placeholder="Nome do setor" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={setorForm.control}
                    name="descricao"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Descrição</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Descrição do setor" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="flex justify-end">
                    <Button 
                      type="submit" 
                      disabled={!canEdit}
                      className="w-full md:w-auto"
                    >
                      Cadastrar Setor
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RegisterData;
