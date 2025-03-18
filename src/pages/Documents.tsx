
import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import {
  Download,
  FileText,
  FolderPlus,
  MessageSquareText,
  Pencil,
  Plus,
  Save,
  Sparkles,
  Trash2,
} from "lucide-react";

// Sample data for document templates
const documentTemplates = [
  {
    id: "template-001",
    name: "Contrato Padrão",
    description: "Modelo básico de contrato com cláusulas essenciais",
    content: `CONTRATO Nº [NUMERO_CONTRATO]
    
CONTRATO DE [OBJETO_RESUMIDO] QUE ENTRE SI CELEBRAM O ESTADO DE ALAGOAS, POR INTERMÉDIO DA SECRETARIA DE ESTADO DA INFRAESTRUTURA, E A EMPRESA [NOME_EMPRESA].

O ESTADO DE ALAGOAS, por intermédio da SECRETARIA DE ESTADO DA INFRAESTRUTURA, inscrita no CNPJ sob o nº XX.XXX.XXX/XXXX-XX, com sede na [ENDEREÇO], neste ato representada pelo Secretário de Estado, Sr. [NOME_SECRETARIO], inscrito no CPF sob o nº [CPF], conforme autorização governamental publicada no Diário Oficial do Estado de Alagoas em [DATA_PUBLICACAO], doravante denominada CONTRATANTE, e a empresa [NOME_EMPRESA], inscrita no CNPJ sob o nº [CNPJ_EMPRESA], estabelecida na [ENDEREÇO_EMPRESA], representada pelo Sr. [NOME_REPRESENTANTE], inscrito no CPF sob o nº [CPF_REPRESENTANTE], de acordo com a representação legal que lhe é outorgada por [PROCURAÇÃO/CONTRATO SOCIAL], doravante denominada CONTRATADA, têm entre si justo e acordado, e celebram o presente contrato para [OBJETO_DETALHADO], que se regerá pelas normas da Lei Federal nº 8.666/1993 e pelas seguintes cláusulas e condições:

CLÁUSULA PRIMEIRA – DO OBJETO
O presente Contrato tem por objeto a contratação de empresa especializada para [OBJETO_DETALHADO], conforme especificações contidas no Edital de [MODALIDADE_LICITACAO] nº [NUMERO_LICITACAO].

CLÁUSULA SEGUNDA – DO VALOR DO CONTRATO
O valor global deste contrato é de R$ [VALOR_CONTRATO] ([VALOR_CONTRATO_EXTENSO]).

CLÁUSULA TERCEIRA – DA VIGÊNCIA
O presente contrato terá vigência de [PRAZO_VIGENCIA] meses, contados a partir da data de sua assinatura, podendo ser prorrogado nos termos do artigo 57 da Lei 8.666/93.

[...]`,
    createdAt: "2023-07-15",
  },
  {
    id: "template-002",
    name: "Termo Aditivo de Prazo",
    description: "Modelo para prorrogação de prazo contratual",
    content: `TERMO ADITIVO Nº [NUMERO_ADITIVO]
    
TERMO ADITIVO AO CONTRATO Nº [NUMERO_CONTRATO] FIRMADO ENTRE O ESTADO DE ALAGOAS, POR INTERMÉDIO DA SECRETARIA DE ESTADO DA INFRAESTRUTURA, E A EMPRESA [NOME_EMPRESA], PARA PRORROGAÇÃO DO PRAZO DE VIGÊNCIA.

O ESTADO DE ALAGOAS, por intermédio da SECRETARIA DE ESTADO DA INFRAESTRUTURA, inscrita no CNPJ sob o nº XX.XXX.XXX/XXXX-XX, com sede na [ENDEREÇO], neste ato representada pelo Secretário de Estado, Sr. [NOME_SECRETARIO], inscrito no CPF sob o nº [CPF], doravante denominada CONTRATANTE, e a empresa [NOME_EMPRESA], inscrita no CNPJ sob o nº [CNPJ_EMPRESA], estabelecida na [ENDEREÇO_EMPRESA], representada pelo Sr. [NOME_REPRESENTANTE], inscrito no CPF sob o nº [CPF_REPRESENTANTE], doravante denominada CONTRATADA, celebram o presente TERMO ADITIVO mediante as seguintes cláusulas e condições:

CLÁUSULA PRIMEIRA – DO OBJETO
O presente Termo Aditivo tem por objeto a prorrogação do prazo de vigência do Contrato nº [NUMERO_CONTRATO], firmado em [DATA_ASSINATURA_CONTRATO], por mais [PRAZO_PRORROGACAO] meses.

CLÁUSULA SEGUNDA – DA PRORROGAÇÃO
O prazo de vigência do Contrato fica prorrogado por mais [PRAZO_PRORROGACAO] meses, a contar de [DATA_INICIO_PRORROGACAO], com término previsto para [DATA_FIM_PRORROGACAO].

CLÁUSULA TERCEIRA – DA JUSTIFICATIVA
A presente prorrogação justifica-se em razão de [JUSTIFICATIVA_PRORROGACAO].

CLÁUSULA QUARTA – DA RATIFICAÇÃO
Permanecem ratificadas as demais cláusulas e condições do Contrato original, não alteradas pelo presente Termo Aditivo.

[...]`,
    createdAt: "2023-08-25",
  },
  {
    id: "template-003",
    name: "Termo Aditivo de Valor",
    description: "Modelo para acréscimo de valor contratual",
    content: `TERMO ADITIVO Nº [NUMERO_ADITIVO]
    
TERMO ADITIVO AO CONTRATO Nº [NUMERO_CONTRATO] FIRMADO ENTRE O ESTADO DE ALAGOAS, POR INTERMÉDIO DA SECRETARIA DE ESTADO DA INFRAESTRUTURA, E A EMPRESA [NOME_EMPRESA], PARA ACRÉSCIMO DE VALOR.

O ESTADO DE ALAGOAS, por intermédio da SECRETARIA DE ESTADO DA INFRAESTRUTURA, inscrita no CNPJ sob o nº XX.XXX.XXX/XXXX-XX, com sede na [ENDEREÇO], neste ato representada pelo Secretário de Estado, Sr. [NOME_SECRETARIO], inscrito no CPF sob o nº [CPF], doravante denominada CONTRATANTE, e a empresa [NOME_EMPRESA], inscrita no CNPJ sob o nº [CNPJ_EMPRESA], estabelecida na [ENDEREÇO_EMPRESA], representada pelo Sr. [NOME_REPRESENTANTE], inscrito no CPF sob o nº [CPF_REPRESENTANTE], doravante denominada CONTRATADA, celebram o presente TERMO ADITIVO mediante as seguintes cláusulas e condições:

CLÁUSULA PRIMEIRA – DO OBJETO
O presente Termo Aditivo tem por objeto o acréscimo de valor ao Contrato nº [NUMERO_CONTRATO], firmado em [DATA_ASSINATURA_CONTRATO].

CLÁUSULA SEGUNDA – DO ACRÉSCIMO
Fica acrescido ao valor do Contrato o montante de R$ [VALOR_ACRESCIMO] ([VALOR_ACRESCIMO_EXTENSO]), correspondente a [PERCENTUAL_ACRESCIMO]% do valor inicial atualizado do contrato, passando o valor total de R$ [VALOR_ATUAL] para R$ [VALOR_FINAL].

CLÁUSULA TERCEIRA – DA JUSTIFICATIVA
O presente acréscimo justifica-se em razão de [JUSTIFICATIVA_ACRESCIMO].

CLÁUSULA QUARTA – DA DOTAÇÃO ORÇAMENTÁRIA
As despesas decorrentes do presente Termo Aditivo correrão à conta da seguinte dotação orçamentária: [DOTACAO_ORCAMENTARIA].

CLÁUSULA QUINTA – DA RATIFICAÇÃO
Permanecem ratificadas as demais cláusulas e condições do Contrato original, não alteradas pelo presente Termo Aditivo.

[...]`,
    createdAt: "2023-09-10",
  },
];

const Documents = () => {
  const [templates, setTemplates] = useState(documentTemplates);
  const [searchTerm, setSearchTerm] = useState("");
  const [newTemplate, setNewTemplate] = useState({
    name: "",
    description: "",
    content: "",
  });
  const [editingTemplate, setEditingTemplate] = useState<null | {
    id: string;
    name: string;
    description: string;
    content: string;
  }>(null);
  const [generatedDocument, setGeneratedDocument] = useState<null | string>(null);
  const [generationPrompt, setGenerationPrompt] = useState("");
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null);
  
  // Filter templates based on search term
  const filteredTemplates = templates.filter(
    (template) =>
      template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleSaveTemplate = () => {
    if (!newTemplate.name || !newTemplate.content) {
      toast.error("Nome e conteúdo do modelo são obrigatórios!");
      return;
    }
    
    const newId = `template-${(templates.length + 1).toString().padStart(3, "0")}`;
    
    setTemplates([
      ...templates,
      {
        id: newId,
        name: newTemplate.name,
        description: newTemplate.description,
        content: newTemplate.content,
        createdAt: new Date().toISOString().split("T")[0],
      },
    ]);
    
    setNewTemplate({
      name: "",
      description: "",
      content: "",
    });
    
    toast.success("Modelo de documento adicionado com sucesso!");
  };
  
  const handleUpdateTemplate = () => {
    if (!editingTemplate) return;
    
    setTemplates(
      templates.map((template) =>
        template.id === editingTemplate.id
          ? {
              ...template,
              name: editingTemplate.name,
              description: editingTemplate.description,
              content: editingTemplate.content,
            }
          : template
      )
    );
    
    setEditingTemplate(null);
    toast.success("Modelo atualizado com sucesso!");
  };
  
  const handleDeleteTemplate = (id: string) => {
    setTemplates(templates.filter((template) => template.id !== id));
    toast.success("Modelo removido com sucesso!");
  };
  
  const handleGenerateDocument = () => {
    if (!selectedTemplateId) {
      toast.error("Selecione um modelo de documento!");
      return;
    }
    
    const selectedTemplate = templates.find((t) => t.id === selectedTemplateId);
    if (!selectedTemplate) return;
    
    // Simulate AI document generation based on the template
    setTimeout(() => {
      let content = selectedTemplate.content;
      
      // Simple placeholder replacements (in a real app, this would be done via AI and more sophisticated)
      content = content.replace("[NUMERO_CONTRATO]", "CT-2023-105");
      content = content.replace("[OBJETO_RESUMIDO]", "PAVIMENTAÇÃO ASFÁLTICA");
      content = content.replace("[NOME_EMPRESA]", "CONSTRUTORA EXEMPLO LTDA");
      content = content.replace("[OBJETO_DETALHADO]", "execução de pavimentação asfáltica em diversas ruas do município de Maceió, incluindo drenagem superficial e sinalização horizontal e vertical");
      content = content.replace("[VALOR_CONTRATO]", "1.500.000,00");
      content = content.replace("[VALOR_CONTRATO_EXTENSO]", "um milhão e quinhentos mil reais");
      content = content.replace("[PRAZO_VIGENCIA]", "12");
      
      // Add some AI-generated content based on prompt (simulated)
      if (generationPrompt) {
        content += `\n\n/* Conteúdo adicional baseado no prompt: "${generationPrompt}" */\n\n`;
        content += `A CONTRATADA compromete-se a executar os serviços com a máxima qualidade e em conformidade com as normas técnicas vigentes, utilizando materiais de primeira qualidade e mão de obra especializada. Todos os serviços serão executados sob a supervisão direta do Fiscal designado pela CONTRATANTE, que verificará a conformidade com as especificações técnicas constantes no Projeto Básico e no Memorial Descritivo.`;
      }
      
      setGeneratedDocument(content);
      toast.success("Documento gerado com sucesso!");
    }, 1500);
  };
  
  const handleDownloadDocument = () => {
    if (!generatedDocument) return;
    
    const blob = new Blob([generatedDocument], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "documento_gerado.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success("Documento baixado com sucesso!");
  };
  
  return (
    <>
      <PageHeader
        title="Gerenciamento de Documentos"
        description="Crie e gerencie modelos de documentos e gere novos documentos com base nestes modelos"
      />
      
      <Tabs defaultValue="templates" className="space-y-4">
        <TabsList>
          <TabsTrigger value="templates">
            <FileText className="h-4 w-4 mr-2" />
            Modelos de Documentos
          </TabsTrigger>
          <TabsTrigger value="generator">
            <Sparkles className="h-4 w-4 mr-2" />
            Gerador de Documentos
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="templates" className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="relative w-full max-w-sm">
              <Input
                type="search"
                placeholder="Buscar modelos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Novo Modelo
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[625px]">
                <DialogHeader>
                  <DialogTitle>Adicionar Novo Modelo de Documento</DialogTitle>
                  <DialogDescription>
                    Crie um novo modelo de documento para usar no sistema
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Nome
                    </Label>
                    <Input
                      id="name"
                      value={newTemplate.name}
                      onChange={(e) => setNewTemplate({ ...newTemplate, name: e.target.value })}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="description" className="text-right">
                      Descrição
                    </Label>
                    <Input
                      id="description"
                      value={newTemplate.description}
                      onChange={(e) =>
                        setNewTemplate({ ...newTemplate, description: e.target.value })
                      }
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="content" className="text-right">
                      Conteúdo
                    </Label>
                    <Textarea
                      id="content"
                      value={newTemplate.content}
                      onChange={(e) =>
                        setNewTemplate({ ...newTemplate, content: e.target.value })
                      }
                      className="col-span-3"
                      rows={12}
                      placeholder="Digite o conteúdo do modelo aqui. Use [PLACEHOLDERS] para dados variáveis."
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={handleSaveTemplate}>
                    <Save className="h-4 w-4 mr-2" />
                    Salvar Modelo
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredTemplates.length > 0 ? (
              filteredTemplates.map((template) => (
                <Card key={template.id} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center justify-between">
                      <span>{template.name}</span>
                      <div className="flex items-center space-x-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <Pencil className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[625px]">
                            <DialogHeader>
                              <DialogTitle>Editar Modelo de Documento</DialogTitle>
                              <DialogDescription>
                                Atualize os detalhes do modelo
                              </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-name" className="text-right">
                                  Nome
                                </Label>
                                <Input
                                  id="edit-name"
                                  value={editingTemplate?.name || ""}
                                  onChange={(e) =>
                                    setEditingTemplate(
                                      editingTemplate
                                        ? { ...editingTemplate, name: e.target.value }
                                        : null
                                    )
                                  }
                                  className="col-span-3"
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-description" className="text-right">
                                  Descrição
                                </Label>
                                <Input
                                  id="edit-description"
                                  value={editingTemplate?.description || ""}
                                  onChange={(e) =>
                                    setEditingTemplate(
                                      editingTemplate
                                        ? { ...editingTemplate, description: e.target.value }
                                        : null
                                    )
                                  }
                                  className="col-span-3"
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-content" className="text-right">
                                  Conteúdo
                                </Label>
                                <Textarea
                                  id="edit-content"
                                  value={editingTemplate?.content || ""}
                                  onChange={(e) =>
                                    setEditingTemplate(
                                      editingTemplate
                                        ? { ...editingTemplate, content: e.target.value }
                                        : null
                                    )
                                  }
                                  className="col-span-3"
                                  rows={12}
                                />
                              </div>
                            </div>
                            <DialogFooter>
                              <Button onClick={handleUpdateTemplate}>
                                <Save className="h-4 w-4 mr-2" />
                                Atualizar Modelo
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteTemplate(template.id)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </CardTitle>
                    <CardDescription>{template.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="text-sm text-muted-foreground mb-2">
                      Criado em: {new Date(template.createdAt).toLocaleDateString("pt-BR")}
                    </div>
                    <div className="h-20 overflow-hidden text-sm text-muted-foreground border-t pt-2">
                      <p className="line-clamp-3">{template.content}</p>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={() => {
                        setSelectedTemplateId(template.id);
                        document.getElementById("generator-tab")?.click();
                      }}
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      Usar este Modelo
                    </Button>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="col-span-3 flex items-center justify-center h-32 border rounded-lg">
                <div className="text-center">
                  <FolderPlus className="h-8 w-8 mx-auto text-muted-foreground" />
                  <p className="mt-2 text-muted-foreground">Nenhum modelo encontrado</p>
                </div>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="generator" id="generator-tab" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Gerador de Documentos</CardTitle>
              <CardDescription>
                Utilize modelos e IA para gerar documentos personalizados
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="template-select">Modelo de Documento</Label>
                    <select
                      id="template-select"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      value={selectedTemplateId || ""}
                      onChange={(e) => setSelectedTemplateId(e.target.value)}
                    >
                      <option value="">Selecione um modelo</option>
                      {templates.map((template) => (
                        <option key={template.id} value={template.id}>
                          {template.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="ai-prompt">Instruções para a IA</Label>
                    <Textarea
                      id="ai-prompt"
                      placeholder="Descreva detalhes adicionais para a IA personalizar o documento..."
                      className="min-h-[120px]"
                      value={generationPrompt}
                      onChange={(e) => setGenerationPrompt(e.target.value)}
                    />
                  </div>
                  
                  <Button 
                    className="w-full" 
                    onClick={handleGenerateDocument}
                    disabled={!selectedTemplateId}
                  >
                    <Sparkles className="h-4 w-4 mr-2" />
                    Gerar Documento
                  </Button>
                </div>
                
                <div className="border rounded-md p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium">Visualização do Documento</h3>
                    {generatedDocument && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={handleDownloadDocument}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Baixar
                      </Button>
                    )}
                  </div>
                  <ScrollArea className="h-[300px] w-full rounded-md border p-4">
                    {generatedDocument ? (
                      <pre className="text-sm whitespace-pre-wrap">{generatedDocument}</pre>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                        <MessageSquareText className="h-8 w-8 mb-2" />
                        <p>Gere um documento para visualizá-lo aqui</p>
                      </div>
                    )}
                  </ScrollArea>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  );
};

export default Documents;
