
import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from "lucide-react";

// This page will contain multiple registration forms for different entities
// Each tab will display a different form

const RegisterData = () => {
  const [activeTab, setActiveTab] = useState("fornecedores");

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
            <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 mb-8">
              <TabsTrigger value="fornecedores">Fornecedores</TabsTrigger>
              <TabsTrigger value="municipios">Municípios</TabsTrigger>
              <TabsTrigger value="ordens">Ordens</TabsTrigger>
              <TabsTrigger value="processos">Processos SEI</TabsTrigger>
              <TabsTrigger value="fiscais">Fiscais</TabsTrigger>
              <TabsTrigger value="setores">Setores</TabsTrigger>
            </TabsList>
            
            <Separator className="mb-8" />
            
            <TabsContent value="fornecedores" className="space-y-4">
              <Alert>
                <Info className="h-4 w-4" />
                <AlertTitle>Módulo em desenvolvimento</AlertTitle>
                <AlertDescription>
                  O cadastro de fornecedores está em fase de implementação. Em breve você poderá
                  registrar e gerenciar as empresas fornecedoras aqui.
                </AlertDescription>
              </Alert>
              
              {/* Placeholder for future fornecedores form */}
              <div className="border border-dashed border-muted-foreground/50 p-8 rounded-lg text-center text-muted-foreground">
                Formulário de cadastro de fornecedores será implementado aqui.
              </div>
            </TabsContent>
            
            <TabsContent value="municipios" className="space-y-4">
              <Alert>
                <Info className="h-4 w-4" />
                <AlertTitle>Módulo em desenvolvimento</AlertTitle>
                <AlertDescription>
                  O cadastro de municípios está em fase de implementação. Em breve você poderá
                  registrar e gerenciar os municípios conveniados aqui.
                </AlertDescription>
              </Alert>
              
              {/* Placeholder for future municipios form */}
              <div className="border border-dashed border-muted-foreground/50 p-8 rounded-lg text-center text-muted-foreground">
                Formulário de cadastro de municípios será implementado aqui.
              </div>
            </TabsContent>
            
            <TabsContent value="ordens" className="space-y-4">
              <Alert>
                <Info className="h-4 w-4" />
                <AlertTitle>Módulo em desenvolvimento</AlertTitle>
                <AlertDescription>
                  O cadastro de ordens (inicial de serviço, de paralisação, de reinício) está em fase de implementação. 
                  Em breve você poderá registrar e gerenciar as ordens aqui.
                </AlertDescription>
              </Alert>
              
              {/* Placeholder for future ordens form */}
              <div className="border border-dashed border-muted-foreground/50 p-8 rounded-lg text-center text-muted-foreground">
                Formulário de cadastro de ordens será implementado aqui.
              </div>
            </TabsContent>
            
            <TabsContent value="processos" className="space-y-4">
              <Alert>
                <Info className="h-4 w-4" />
                <AlertTitle>Módulo em desenvolvimento</AlertTitle>
                <AlertDescription>
                  O cadastro de processos do SEI está em fase de implementação. Em breve você poderá
                  registrar e gerenciar os processos aqui.
                </AlertDescription>
              </Alert>
              
              {/* Placeholder for future processos form */}
              <div className="border border-dashed border-muted-foreground/50 p-8 rounded-lg text-center text-muted-foreground">
                Formulário de cadastro de processos será implementado aqui.
              </div>
            </TabsContent>
            
            <TabsContent value="fiscais" className="space-y-4">
              <Alert>
                <Info className="h-4 w-4" />
                <AlertTitle>Módulo em desenvolvimento</AlertTitle>
                <AlertDescription>
                  O cadastro de fiscais e gerentes está em fase de implementação. Em breve você poderá
                  registrar e gerenciar os fiscais e gerentes aqui.
                </AlertDescription>
              </Alert>
              
              {/* Placeholder for future fiscais form */}
              <div className="border border-dashed border-muted-foreground/50 p-8 rounded-lg text-center text-muted-foreground">
                Formulário de cadastro de fiscais e gerentes será implementado aqui.
              </div>
            </TabsContent>
            
            <TabsContent value="setores" className="space-y-4">
              <Alert>
                <Info className="h-4 w-4" />
                <AlertTitle>Módulo em desenvolvimento</AlertTitle>
                <AlertDescription>
                  O cadastro de setores está em fase de implementação. Em breve você poderá
                  registrar e gerenciar os setores aqui.
                </AlertDescription>
              </Alert>
              
              {/* Placeholder for future setores form */}
              <div className="border border-dashed border-muted-foreground/50 p-8 rounded-lg text-center text-muted-foreground">
                Formulário de cadastro de setores será implementado aqui.
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterData;
