import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Brush, ResponsiveContainer, Legend } from 'recharts';

import themeToken from '@lib/theme/tokens';

import { chartData } from '../utils/chartData';

function ChartWidget() {
  return (
    <ResponsiveContainer width="100%" height={800}>
      <LineChart width={500} height={800} data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="bids" stroke={themeToken.green} fill={themeToken.green} strokeWidth={3} />
        <Line type="monotone" dataKey="asks" stroke={themeToken.red} fill={themeToken.red} strokeWidth={3} />
        <Brush />
        <Legend
          layout="vertical"
          verticalAlign="top"
          wrapperStyle={{
            top: 50,
            left: 80,
          }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default ChartWidget;
