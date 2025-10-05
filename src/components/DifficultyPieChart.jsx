import { Cell, Pie, PieChart, ResponsiveContainer, Legend } from 'recharts';

const radian = Math.PI / 180;
const colours = ['#00C49F', '#FFBB28', '#EC4343FF'];

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-(midAngle ?? 0) * radian);
  const y = cy + radius * Math.sin(-(midAngle ?? 0) * radian);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${((percent ?? 1) * 100).toFixed(0)}%`}
    </text>
  );
};

export default function DifficultyPieChart({distribution, chartTitle}) {
  const data = Object.entries(distribution).map(([name, value]) => ({ name, value }));
  return (
    <ResponsiveContainer width="100%" height="100%">
      <h3>{chartTitle}</h3>
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          isAnimationActive={true}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${entry.name}`} fill={colours[index % colours.length]} />
          ))}
        </Pie>
        <Legend iconType="circle" iconSize={10} />
      </PieChart>
    </ResponsiveContainer>
  );
}