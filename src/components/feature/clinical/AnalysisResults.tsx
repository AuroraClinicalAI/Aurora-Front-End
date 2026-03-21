import { Card, CardContent, CardTitle } from "@/components/ui";
import { ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

interface AnalysisResultsProps {
  globalScore: number;
  maxScore: number;
  symptoms: { name: string; value: number }[];
}

export const AnalysisResults = ({ globalScore, maxScore, symptoms }: AnalysisResultsProps) => {
  const chartData = [
    { name: 'Completed', value: globalScore },
    { name: 'Remaining', value: maxScore - globalScore }
  ];

  const COLORS = ['#ea580c', '#f1f5f9'];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Card className="rounded-xl shadow-sm border-zinc-200">
        <div className="p-6">
          <CardTitle className="text-xl font-bold mb-1">Nivel de Depresión</CardTitle>
          <p className="text-xs text-blue-500 font-medium">Puntuación Global: {globalScore}/{maxScore}</p>
        </div>
        <CardContent className="flex justify-center items-center h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={0}
                dataKey="value"
                startAngle={220}
                endAngle={-40}
              >
                {chartData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="rounded-xl shadow-sm border-zinc-200">
        <div className="p-6">
          <CardTitle className="text-xl font-bold mb-1">Síntomas Por Intensidad</CardTitle>
          <p className="text-xs text-blue-500 font-medium">Distribución de síntomas según su severidad</p>
        </div>
        <CardContent className="h-[350px] pb-6">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              layout="vertical"
              data={symptoms}
              margin={{ top: 5, right: 30, left: 60, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} opacity={0.3} />
              <XAxis type="number" hide />
              <YAxis
                type="category"
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fill: '#64748b', fontWeight: 500 }}
                width={100}
              />
              <Tooltip
                cursor={{ fill: '#f8fafc' }}
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
              />
              <Bar
                dataKey="value"
                fill="#14b8a6"
                radius={[0, 4, 4, 0]}
                barSize={24}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};
