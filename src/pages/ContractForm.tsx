
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";
import { Calendar as CalendarIcon, ChevronLeft, Save } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
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

// Form validation schema
const contractFormSchema = z.object({
  processNumber: z.string().min(1, { message: "Número do processo é obrigatório" }),
  contractNumber: z.string().min(1, { message: "Número do contrato é obrigatório" }),
  object: z.string().min(5, { message: "O objeto deve ter pelo menos 5 caracteres" }),
  company: z.string().min(1, { message: "Empresa contratada é obrigatória" }),
  signDate: z.date({ required_error: "Data de assinatura é obrigatória" }),
  publicationDate: z.date({ required_error: "Data de publicação é obrigatória" }),
  startDate: z.date({ required_error: "Data de início é obrigatória" }),
  endDate: z.date({ required_error: "Data de término é obrigatória" }),
  value: z.string().min(1, { message: "Valor é obrigatório" }),
  department: z.string().min(1, { message: "Setor responsável é obrigatório" }),
  manager: z.string().min(1, { message: "Gerente do contrato é obrigatório" }),
  supervisor: z.string().min(1, { message: "Fiscal do contrato é obrigatório" }),
  city: z.string().min(1, { message: "Município é obrigatório" }),
});

type ContractFormValues = z.infer<typeof contractFormSchema>;

// Sample data for selects
const departments = [
  { id: "1", name: "Obras Urbanas" },
  { id: "2", name: "Infraestrutura" },
  { id: "3", name: "Educação" },
  { id: "4", name: "Saúde" },
  { id: "5", name: "Saneamento" },
  { id: "6", name: "Turismo" },
  { id: "7", name: "Transporte" },
];

const managers = [
  { id: "1", name: "Carlos Silva" },
  { id: "2", name: "Mariana Santos" },
  { id: "3", name: "Ricardo Nunes" },
  { id: "4", name: "Paulo Mendes" },
  { id: "5", name: "Luiza Costa" },
  { id: "6", name: "Marcos Vinicius" },
  { id: "7", name: "Juliana Pereira" },
];

const supervisors = [
  { id: "1", name: "Ana Oliveira" },
  { id: "2", name: "João Ferreira" },
  { id: "3", name: "Fernanda Lima" },
  { id: "4", name: "Carla Moreira" },
  { id: "5", name: "Roberto Alves" },
  { id: "6", name: "Teresa Cristina" },
  { id: "7", name: "André Santos" },
];

const cities = [
  { id: "1", name: "Maceió" },
  { id: "2", name: "Arapiraca" },
  { id: "3", name: "Palmeira dos Índios" },
  { id: "4", name: "Rio Largo" },
  { id: "5", name: "Penedo" },
  { id: "6", name: "Maragogi" },
  { id: "7", name: "Delmiro Gouveia" },
  { id: "8", name: "União dos Palmares" },
  { id: "9", name: "São Miguel dos Campos" },
  { id: "10", name: "Marechal Deodoro" },
];

const ContractForm = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Initialize the form with default values
  const form = useForm<ContractFormValues>({
    resolver: zodResolver(contractFormSchema),
    defaultValues: {
      processNumber: "",
      contractNumber: "",
      object: "",
      company: "",
      value: "",
      department: "",
      manager: "",
      supervisor: "",
      city: "",
    },
  });
  
  // Form submission handler
  const onSubmit = async (data: ContractFormValues) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log("Form data:", data);
      toast.success("Contrato cadastrado com sucesso!");
      navigate("/contracts");
    } catch (error) {
      console.error("Erro ao cadastrar contrato:", error);
      toast.error("Erro ao cadastrar contrato. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <>
      <PageHeader
        title="Novo Contrato"
        description="Cadastre um novo contrato no sistema"
        breadcrumbs={[
          { label: "Início", href: "/dashboard" },
          { label: "Contratos", href: "/contracts" },
          { label: "Novo Contrato", href: "/contract/new" },
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
                  name="processNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Número do Processo</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: PROC-2023-001" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="contractNumber"
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
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Empresa Contratada</FormLabel>
                      <FormControl>
                        <Input placeholder="Nome da empresa" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="value"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Valor do Contrato (R$)</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: 1000000,00" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="signDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Data de Assinatura</FormLabel>
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
                            disabled={(date) =>
                              date > new Date() || date < new Date("2000-01-01")
                            }
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
                  name="publicationDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Data de Publicação</FormLabel>
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
                            disabled={(date) =>
                              date > new Date() || date < new Date("2000-01-01")
                            }
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
                  name="startDate"
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
                  name="endDate"
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
                  name="department"
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
                          {departments.map((dept) => (
                            <SelectItem key={dept.id} value={dept.name}>
                              {dept.name}
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
                  name="manager"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gerente do Contrato</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione um gerente" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {managers.map((manager) => (
                            <SelectItem key={manager.id} value={manager.name}>
                              {manager.name}
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
                  name="supervisor"
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
                          {supervisors.map((supervisor) => (
                            <SelectItem key={supervisor.id} value={supervisor.name}>
                              {supervisor.name}
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
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Município</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione um município" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {cities.map((city) => (
                            <SelectItem key={city.id} value={city.name}>
                              {city.name}
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
                control={form.control}
                name="object"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Objeto do Contrato</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Descreva o objeto do contrato"
                        className="min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Descreva detalhadamente o objeto do contrato
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="flex justify-end">
                <Button
                  type="button"
                  variant="outline"
                  className="mr-4"
                  onClick={() => navigate("/contracts")}
                >
                  Cancelar
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    "Salvando..."
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Salvar Contrato
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
