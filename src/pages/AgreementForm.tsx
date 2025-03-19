
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarIcon, ArrowLeft, Save } from "lucide-react";

import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useAuthorization } from "@/contexts/AuthContext";
import { convenioService, fiscalService, gestorService, setorService } from "@/services/supabase-service";
import { dateToString } from "@/services/dateUtils";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

// Agreement form validation schema
const agreementSchema = z.object({
  numero_convenio: z.string().min(1, { message: "Número do convênio é obrigatório" }),
  participante_origem: z.string().min(1, { message: "Participante de origem é obrigatório" }),
  participante_destino: z.string().min(1, { message: "Participante de destino é obrigatório" }),
  fiscal_id: z.string().min(1, { message: "Fiscal é obrigatório" }),
  gestor_id: z.string().min(1, { message: "Gestor é obrigatório" }),
  setor_id: z.string().min(1, { message: "Setor é obrigatório" }),
  data_inicio: z.date({ required_error: "Data de início é obrigatória" }),
  data_termino: z.date({ required_error: "Data de término é obrigatória" }),
  valor_total: z.coerce.number().min(0, { message: "Valor total é obrigatório" }),
  status: z.string().min(1, { message: "Status é obrigatório" }),
});

type AgreementFormValues = z.infer<typeof agreementSchema>;

const statusOptions = [
  "Em andamento",
  "Concluído",
  "Cancelado",
  "Suspenso",
  "Em elaboração"
];

export default function AgreementForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = id !== "new";
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
  
  // Fetch agreement data if in edit mode
  const { data: agreementData, isLoading: agreementLoading } = useQuery({
    queryKey: ['convenio', id],
    queryFn: async () => {
      if (!isEditMode) return null;
      const result = await convenioService.getById(id as string);
      if (result.error) throw result.error;
      return result.data;
    },
    enabled: isEditMode && !!import.meta.env.VITE_SUPABASE_URL
  });
  
  const form = useForm<AgreementFormValues>({
    resolver: zodResolver(agreementSchema),
    defaultValues: {
      numero_convenio: "",
      participante_origem: "",
      participante_destino: "",
      fiscal_id: "",
      gestor_id: "",
      setor_id: "",
      valor_total: 0,
      status: "Em andamento",
    },
  });
  
  // Update form with agreement data when available
  useEffect(() => {
    if (agreementData) {
      form.reset({
        ...agreementData,
        data_inicio: new Date(agreementData.data_inicio),
        data_termino: new Date(agreementData.data_termino),
        valor_total: agreementData.valor_total,
      });
    }
  }, [agreementData, form]);
  
  const onSubmit = async (data: AgreementFormValues) => {
    if (!canEdit) {
      toast.error("Você não tem permissão para editar convênios");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Convert dates to string format for Supabase
      const agreementData = {
        ...data,
        data_inicio: dateToString(data.data_inicio),
        data_termino: dateToString(data.data_termino),
      };
      
      if (import.meta.env.VITE_SUPABASE_URL) {
        if (isEditMode) {
          await convenioService.update(id as string, agreementData);
        } else {
          await convenioService.create(agreementData);
        }
      } else {
        // Mock API call for development
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log("Form data:", agreementData);
      }
      
      toast.success(isEditMode 
        ? `O convênio ${data.numero_convenio} foi atualizado com sucesso` 
        : `O convênio foi criado com sucesso`
      );
      
      navigate("/agreements");
    } catch (error) {
      console.error("Erro ao salvar convênio:", error);
      toast.error("Erro ao salvar convênio. Tente novamente.");
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
  
  if (agreementLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <PageHeader
        title={isEditMode ? "Editar Convênio" : "Novo Convênio"}
        description={isEditMode 
          ? `Editar informações do convênio` 
          : "Cadastre um novo convênio no sistema"}
        breadcrumbs={[
          { label: "Início", href: "/dashboard" },
          { label: "Convênios", href: "/agreements" },
          { label: isEditMode ? "Editar" : "Novo", href: "#" },
        ]}
      />
      
      <Button 
        variant="outline" 
        onClick={() => navigate("/agreements")}
        className="mb-6"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Voltar para convênios
      </Button>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Informações Gerais</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="numero_convenio"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Número do Convênio</FormLabel>
                        <FormControl>
                          <Input placeholder="Ex: 001/2023" {...field} />
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
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="participante_origem"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Participante de Origem</FormLabel>
                        <FormControl>
                          <Input placeholder="Ex: Governo Federal" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="participante_destino"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Participante de Destino</FormLabel>
                        <FormControl>
                          <Input placeholder="Ex: Secretaria de Infraestrutura de Alagoas" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Responsáveis</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <FormField
                    control={form.control}
                    name="fiscal_id"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Fiscal</FormLabel>
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
                        <FormLabel>Gestor</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione um gestor" />
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
                        <FormLabel>Setor</FormLabel>
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
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Datas e Valores</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="data_inicio"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Início da Vigência</FormLabel>
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
                                  format(field.value, "dd/MM/yyyy", { locale: ptBR })
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
                    name="data_termino"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Fim da Vigência</FormLabel>
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
                                  format(field.value, "dd/MM/yyyy", { locale: ptBR })
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
                
                <Separator />
                
                <FormField
                  control={form.control}
                  name="valor_total"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Valor Total (R$)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="0.00"
                          step="0.01"
                          min="0"
                          {...field}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button 
                  type="submit"
                  size="lg"
                  disabled={isSubmitting || !canEdit}
                >
                  <Save className="mr-2 h-4 w-4" />
                  {isSubmitting ? "Salvando..." : (isEditMode ? "Atualizar Convênio" : "Cadastrar Convênio")}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </form>
      </Form>
    </div>
  );
}
