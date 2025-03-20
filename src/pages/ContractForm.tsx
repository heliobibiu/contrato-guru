import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";
import { Calendar as CalendarIcon, ChevronLeft, Save } from "lucide-react";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
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
import { Card, CardContent } from "@/components/ui/card";
import { PageHeader } from "@/components/PageHeader";
import { cn } from "@/lib/utils";
import { contratoService, fiscalService, gestorService, setorService } from "@/services/supabase-service";
import { useAuthorization } from "@/contexts/AuthContext";
import { dateToString } from "@/services/dateUtils";

// Form validation schema
const contractFormSchema = z.object({
  numero_contrato: z.string().min(1, { message: "Número do contrato é obrigatório" }),
  fornecedor: z.string().min(1, { message: "Fornecedor é obrigatório" }),
  fiscal_id: z.string().min(1, { message: "Fiscal é obrigatório" }),
  gestor_id: z.string().min(1, { message: "Gestor é obrigatório" }),
  setor_id: z.string().min(1, { message: "Setor é obrigatório" }),
  data_inicio_execucao: z.date({ required_error: "Data de início é obrigatória" }),
  data_termino_execucao: z.date({ required_error: "Data de término é obrigatória" }),
  valor_original: z.string().min(1, { message: "Valor é obrigatório" }),
  status: z.string().min(1, { message: "Status é obrigatório" }),
});

type ContractFormValues = z.infer<typeof contractFormSchema>;

// Status options
const statusOptions = [
  "Em andamento",
  "Concluído",
  "Cancelado",
  "Suspenso",
  "Em elaboração"
];

const ContractForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = id !== undefined && id !== "new";
  const [isSubmitting, setIsSubmitting] = useState(false);
  const canEdit = useAuthorization(['admin', 'gerencial']);
  
  // Fetch data for dropdowns
  const { data: fiscaisData } = useQuery({
    queryKey: ['fiscais'],
    queryFn: async () => {
      const result = await fiscalService.getAll();
      if (result.error) throw result.error;
      return result.data || [];
    },
    enabled: !!import.meta.env.VITE_SUPABASE_URL
  });
  
  const { data: gestoresData } = useQuery({
    queryKey: ['gestores'],
    queryFn: async () => {
      const result = await gestorService.getAll();
      if (result.error) throw result.error;
      return result.data || [];
    },
    enabled: !!import.meta.env.VITE_SUPABASE_URL
  });
  
  const { data: setoresData } = useQuery({
    queryKey: ['setores'],
    queryFn: async () => {
      const result = await setorService.getAll();
      if (result.error) throw result.error;
      return result.data || [];
    },
    enabled: !!import.meta.env.VITE_SUPABASE_URL
  });
  
  // Fetch contract data if in edit mode
  const { data: contractData, isLoading: contractLoading } = useQuery({
    queryKey: ['contrato', id],
    queryFn: async () => {
      if (!isEditMode) return null;
      const result = await contratoService.getById(id as string);
      if (result.error) throw result.error;
      return result.data;
    },
    enabled: isEditMode && !!import.meta.env.VITE_SUPABASE_URL
  });
  
  // Initialize the form with default values
  const form = useForm<ContractFormValues>({
    resolver: zodResolver(contractFormSchema),
    defaultValues: {
      numero_contrato: "",
      fornecedor: "",
      fiscal_id: "",
      gestor_id: "",
      setor_id: "",
      valor_original: "",
      status: "Em andamento",
    },
  });
  
  // Update form with contract data when available
  useEffect(() => {
    if (contractData) {
      form.reset({
        ...contractData,
        data_inicio_execucao: new Date(contractData.data_inicio_execucao),
        data_termino_execucao: new Date(contractData.data_termino_execucao),
        valor_original: contractData.valor_original.toString(),
      });
    }
  }, [contractData, form]);
  
  // Form submission handler
  const onSubmit = async (data: ContractFormValues) => {
    if (!canEdit) {
      toast.error("Você não tem permissão para editar contratos");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Convert to Supabase schema with proper date formatting
      const contractData = {
        ...data,
        data_inicio_execucao: dateToString(data.data_inicio_execucao),
        data_termino_execucao: dateToString(data.data_termino_execucao),
        valor_original: parseFloat(data.valor_original),
        numero_contrato: data.numero_contrato,
        fornecedor: data.fornecedor,
        fiscal_id: data.fiscal_id,
        gestor_id: data.gestor_id,
        setor_id: data.setor_id,
        status: data.status
      };
      
      if (import.meta.env.VITE_SUPABASE_URL) {
        if (isEditMode) {
          await contratoService.update(id as string, contractData);
        } else {
          await contratoService.create(contractData);
        }
      } else {
        // Mock API call for development
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log("Form data:", contractData);
      }
      
      toast.success(isEditMode ? "Contrato atualizado com sucesso!" : "Contrato cadastrado com sucesso!");
      navigate("/contracts");
    } catch (error) {
      console.error("Erro ao salvar contrato:", error);
      toast.error("Erro ao salvar contrato. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Mock data for development when Supabase is not configured
  const mockFiscais = [
    { id: "1", usuario: { nome: "Ana Oliveira" } },
    { id: "2", usuario: { nome: "João Ferreira" } },
    { id: "3", usuario: { nome: "Fernanda Lima" } },
  ];
  
  const mockGestores = [
    { id: "1", usuario: { nome: "Carlos Silva" } },
    { id: "2", usuario: { nome: "Mariana Santos" } },
    { id: "3", usuario: { nome: "Ricardo Nunes" } },
  ];
  
  const mockSetores = [
    { id: "1", nome_setor: "Obras Urbanas" },
    { id: "2", nome_setor: "Infraestrutura" },
    { id: "3", nome_setor: "Educação" },
  ];
  
  // Use mock data if Supabase is not configured
  const fiscais = fiscaisData || mockFiscais;
  const gestores = gestoresData || mockGestores;
  const setores = setoresData || mockSetores;
  
  if (contractLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }
  
  return (
    <>
      <PageHeader
        title={isEditMode ? "Editar Contrato" : "Novo Contrato"}
        description={isEditMode ? "Editar informações do contrato" : "Cadastre um novo contrato no sistema"}
        breadcrumbs={[
          { label: "Início", href: "/dashboard" },
          { label: "Contratos", href: "/contracts" },
          { label: isEditMode ? "Editar Contrato" : "Novo Contrato", href: isEditMode ? `/contract/${id}/edit` : "/contract/new" },
        ]}
        actions={
          <Button variant="outline" onClick={() => navigate("/contracts")}>
            <ChevronLeft className="mr-2 h-4 w-4" />
            Voltar
          </Button>
        }
      />
      
      <Card>
        <CardContent className="p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="numero_contrato"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Número do Contrato</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: CT-2023-001" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="fornecedor"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Fornecedor</FormLabel>
                      <FormControl>
                        <Input placeholder="Nome do fornecedor" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="valor_original"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Valor Original (R$)</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: 1000000.00" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {statusOptions.map((status) => (
                            <SelectItem key={status} value={status}>
                              {status}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="data_inicio_execucao"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Data de Início</FormLabel>
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
                  control={form.control}
                  name="data_termino_execucao"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Data de Término</FormLabel>
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
                  control={form.control}
                  name="fiscal_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Fiscal do Contrato</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione um fiscal" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {fiscais.map((fiscal) => (
                            <SelectItem key={fiscal.id} value={fiscal.id}>
                              {fiscal.usuario?.nome}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="gestor_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gestor do Contrato</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione um gerente" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {gestores.map((gestor) => (
                            <SelectItem key={gestor.id} value={gestor.id}>
                              {gestor.usuario?.nome}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="setor_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Setor Responsável</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione um setor" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {setores.map((setor) => (
                            <SelectItem key={setor.id} value={setor.id}>
                              {setor.nome_setor}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="flex justify-end">
                <Button
                  type="button"
                  variant="outline"
                  className="mr-4"
                  onClick={() => navigate("/contracts")}
                >
                  Cancelar
                </Button>
                <Button type="submit" disabled={isSubmitting || !canEdit}>
                  {isSubmitting ? (
                    "Salvando..."
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      {isEditMode ? "Atualizar Contrato" : "Salvar Contrato"}
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
};

export default ContractForm;
