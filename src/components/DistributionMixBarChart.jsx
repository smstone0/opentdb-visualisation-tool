import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

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
      <ResponsiveContainer width="100%" height="100%">
        {/* <h3>Distribution of Questions by Category and Difficulty</h3> */}
        <BarChart
          width={500}
          height={300}
          data={chartData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="easy" stackId="a" fill="#00C49F" />
          <Bar dataKey="medium" stackId="a" fill="#FFBB28" />
          <Bar dataKey="hard" stackId="a" fill="#EC4343FF"/>
        </BarChart>
      </ResponsiveContainer>
    );
};

export default DistributionMixBarChart;