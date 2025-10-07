import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import MixBarCustomTooltip from './MixBarCustomTooltip';

const DistributionMixBarChart = ({data}) => {
    if (!data || Object.keys(data).length === 0) {
        return <p>No data available to display the chart</p>;
    }
    const chartData = Object.entries(data).map(([category, counts]) => ({
        name: category,
        easy: counts.easy || 0,
        medium: counts.medium || 0,
        hard: counts.hard || 0,
    }));

  return (
    <>
      <h2>Distribution of Questions by All Categories and Difficulties</h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={500}
          data={chartData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 200,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" angle={-45} textAnchor="end" interval={0} />
          <YAxis />
          <Tooltip content={<MixBarCustomTooltip />} />
          <Legend verticalAlign='top' height={36} />
          <Bar dataKey="easy" stackId="a" fill="#00C49F" />
          <Bar dataKey="medium" stackId="a" fill="#FFBB28" />
          <Bar dataKey="hard" stackId="a" fill="#F16F6F" />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

export default DistributionMixBarChart;