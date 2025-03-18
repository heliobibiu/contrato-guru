
import { useAuth } from "@/contexts/AuthContext";
import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, BarChartHorizontal, Calendar, Clock, FileText, HandCoins, Handshake, TrendingUp } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart as RechartBar, Bar, PieChart, Pie, Cell } from 'recharts';

// Sample data for charts
const contractsByMonth = [
  { name: 'Jan', contratos: 4, convenios: 2 },
  { name: 'Fev', contratos: 3, convenios: 3 },
  { name: 'Mar', contratos: 5, convenios: 1 },
  { name: 'Abr', contratos: 7, convenios: 4 },
  { name: 'Mai', contratos: 2, convenios: 3 },
  { name: 'Jun', contratos: 6, convenios: 2 },
  { name: 'Jul', contratos: 8, convenios: 3 },
  { name: 'Ago', contratos: 9, convenios: 1 },
  { name: 'Set', contratos: 5, convenios: 0 },
  { name: 'Out', contratos: 7, convenios: 2 },
  { name: 'Nov', contratos: 4, convenios: 3 },
  { name: 'Dez', contratos: 6, convenios: 1 },
];

const contractsByStatus = [
  { name: 'Em andamento', value: 42 },
  { name: 'Concluídos', value: 28 },
  { name: 'Paralisados', value: 15 },
  { name: 'Em aditamento', value: 10 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const contractsByRegion = [
  { name: 'Maceió', value: 25 },
  { name: 'Arapiraca', value: 18 },
  { name: 'Palmeira dos Índios', value: 12 },
  { name: 'Delmiro Gouveia', value: 10 },
  { name: 'Penedo', value: 8 },
  { name: 'Rio Largo', value: 7 },
  { name: 'Outros', value: 20 },
];

const expiringContracts = [
  { id: 'CT-2023-056', name: 'Pavimentação Rua Principal', company: 'Construtora Alpha LTDA', expiresIn: 15 },
  { id: 'CT-2023-104', name: 'Reforma Escola Municipal', company: 'Engenharia Beta S/A', expiresIn: 22 },
  { id: 'CT-2023-078', name: 'Drenagem Bairro Norte', company: 'Construtora Ômega LTDA', expiresIn: 30 },
];

const Dashboard = () => {
  const { user } = useAuth();
  
  return (
    <>
      <PageHeader
        title={`Bem-vindo, ${user?.name}!`}
        description="Visualize o panorama geral dos contratos e convênios"
      />
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Contratos Ativos</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
            <p className="text-xs text-muted-foreground">
              +8% em relação ao mês anterior
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Convênios Ativos</CardTitle>
            <Handshake className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">27</div>
            <p className="text-xs text-muted-foreground">
              +5% em relação ao mês anterior
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Valor Total</CardTitle>
            <HandCoins className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 78,5M</div>
            <p className="text-xs text-muted-foreground">
              +12% em relação ao mês anterior
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Contratos a Vencer</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">
              Nos próximos 30 dias
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="overview" className="mt-6">
        <TabsList>
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="contracts">Contratos</TabsTrigger>
          <TabsTrigger value="agreements">Convênios</TabsTrigger>
          <TabsTrigger value="regions">Regiões</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-4">
              <CardHeader>
                <CardTitle>Contratos e Convênios por Mês</CardTitle>
                <CardDescription>Evolução dos contratos e convênios em 2023</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart
                    data={contractsByMonth}
                    margin={{
                      top: 5,
                      right: 10,
                      left: 10,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="contratos"
                      stroke="#3B82F6"
                      activeDot={{ r: 8 }}
                    />
                    <Line type="monotone" dataKey="convenios" stroke="#10B981" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Status dos Contratos</CardTitle>
                <CardDescription>Distribuição dos contratos por status</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={contractsByStatus}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {contractsByStatus.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Contratos a Vencer</CardTitle>
              <CardDescription>Contratos que estão próximos do vencimento</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {expiringContracts.map((contract) => (
                  <div key={contract.id} className="flex items-center border-b pb-4 last:border-0 last:pb-0">
                    <div className="mr-4 rounded-full bg-primary/10 p-2">
                      <Calendar className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">{contract.name}</p>
                      <p className="text-sm text-muted-foreground">{contract.company}</p>
                    </div>
                    <div className="font-medium">
                      <span className={`rounded-full px-2 py-1 text-xs ${
                        contract.expiresIn <= 15 
                          ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' 
                          : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                      }`}>
                        {contract.expiresIn} dias
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="contracts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Evolução dos Contratos</CardTitle>
              <CardDescription>Quantidade de contratos firmados ao longo do tempo</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={contractsByMonth}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="contratos" name="Contratos" fill="#3B82F6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="agreements" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Evolução dos Convênios</CardTitle>
              <CardDescription>Quantidade de convênios firmados ao longo do tempo</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={contractsByMonth}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="convenios" name="Convênios" fill="#10B981" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="regions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Contratos por Município</CardTitle>
              <CardDescription>Distribuição dos contratos por municípios</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <RechartBar
                  layout="vertical"
                  data={contractsByRegion}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 80,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" name="Contratos" fill="#8884d8" />
                </RechartBar>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  );
};

export default Dashboard;
