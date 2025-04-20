import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { useQueue } from '../../context/QueueContext';

const generateTimeLabels = () => {
  const now = new Date();
  const labels = [];

  for (let i = 10; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 60000);
    labels.push(time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
  }

  return labels;
};

const TrafficChart = () => {
  const { userCount } = useQueue();
  const [chartData, setChartData] = useState<any[]>([]);
  const [timeLabels] = useState(generateTimeLabels());

  useEffect(() => {
    const initialData = timeLabels.map((time) => ({
      time,
      users: Math.floor(Math.random() * 400) + 100,
    }));

    setChartData(initialData);
  }, [timeLabels]);

  useEffect(() => {
    const interval = setInterval(() => {
      setChartData((prevData) => {
        const newData = [...prevData.slice(1)];
        const now = new Date();
        const newTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const randomFactor = Math.random() * 50 - 25;
        const newUserCount = Math.max(50, userCount + randomFactor);

        newData.push({
          time: newTime,
          users: newUserCount,
        });

        return newData;
      });
    }, 60000);

    return () => clearInterval(interval);
  }, [userCount]);

  return (
    <Card className="col-span-2 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow duration-200 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden transform hover:scale-[1.01] animate-float">
      <CardHeader className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 border-b border-gray-100 dark:border-gray-800">
        <CardTitle className="text-gray-900 dark:text-white flex items-center">
          <span className="mr-2">📊</span>
          Traffic Trends
        </CardTitle>
        <CardDescription className="text-gray-500 dark:text-gray-400">
          User traffic over the last 10 minutes
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="p-6 animate-fade-in">
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart
              data={chartData}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 5,
              }}
            >
              <defs>
                <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0EA5E9" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#0EA5E9" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
              <XAxis
                dataKey="time"
                stroke="#6B7280"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#6B7280"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                width={30}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: 'none',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                }}
                labelStyle={{
                  color: '#374151',
                  fontWeight: 'bold',
                  marginBottom: '5px',
                }}
                itemStyle={{
                  color: '#0EA5E9',
                  padding: '2px 0',
                }}
              />
              <Area
                type="monotone"
                dataKey="users"
                stroke="#0EA5E9"
                fillOpacity={1}
                fill="url(#colorUsers)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default TrafficChart;
