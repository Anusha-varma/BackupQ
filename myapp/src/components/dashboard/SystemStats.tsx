import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { ArrowDownIcon, ArrowUpIcon, Users, Clock, AlertTriangle, Server } from 'lucide-react';
import { useQueue } from '../../context/QueueContext';

const SystemStats = () => {
  const { userCount, queueStatus } = useQueue();
  const [stats, setStats] = useState({
    responseTime: 0,
    errorRate: 0,
    serverLoad: 0,
    availableSlots: 0,
  });

  useEffect(() => {
    const responseTime = Math.min(2000, 200 + userCount / 10);
    const errorRate = Math.min(5, (userCount / 1000) * 5);
    const serverLoad = Math.min(100, (userCount / 2000) * 100);
    const availableSlots = Math.max(0, 1000 - Math.floor(userCount / 2));

    setStats({
      responseTime,
      errorRate,
      serverLoad,
      availableSlots,
    });
  }, [userCount, queueStatus]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Response Time */}
      <Card className="bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow duration-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-900 dark:text-white">
            Avg. Response Time
          </CardTitle>
          <Clock className="h-4 w-4 text-gray-500 dark:text-gray-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">{Math.round(stats.responseTime)}ms</div>
          <p className="text-xs">
            {stats.responseTime > 1000 ? (
              <span className="text-rose-500 flex items-center">
                <ArrowUpIcon className="mr-1 h-3 w-3" />
                {Math.round((stats.responseTime - 500) / 5)}% above threshold
              </span>
            ) : (
              <span className="text-emerald-500 flex items-center">
                <ArrowDownIcon className="mr-1 h-3 w-3" />
                Healthy response time
              </span>
            )}
          </p>
        </CardContent>
      </Card>

      {/* Error Rate */}
      <Card className="bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow duration-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-900 dark:text-white">
            Error Rate
          </CardTitle>
          <AlertTriangle className="h-4 w-4 text-gray-500 dark:text-gray-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.errorRate.toFixed(2)}%</div>
          <p className="text-xs">
            {stats.errorRate > 2 ? (
              <span className="text-rose-500 flex items-center">
                <ArrowUpIcon className="mr-1 h-3 w-3" />
                {Math.round(stats.errorRate * 50)}% increase
              </span>
            ) : (
              <span className="text-emerald-500 flex items-center">
                <ArrowDownIcon className="mr-1 h-3 w-3" />
                Below threshold
              </span>
            )}
          </p>
        </CardContent>
      </Card>

      {/* Server Load */}
      <Card className="bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow duration-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-900 dark:text-white">
            Server Load
          </CardTitle>
          <Server className="h-4 w-4 text-gray-500 dark:text-gray-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">{Math.round(stats.serverLoad)}%</div>
          <p className="text-xs">
            {stats.serverLoad > 70 ? (
              <span className="text-amber-500 flex items-center">
                <ArrowUpIcon className="mr-1 h-3 w-3" />
                High load detected
              </span>
            ) : (
              <span className="text-emerald-500 flex items-center">
                <ArrowDownIcon className="mr-1 h-3 w-3" />
                Normal operating levels
              </span>
            )}
          </p>
        </CardContent>
      </Card>

      {/* Available Slots */}
      <Card className="bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow duration-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-900 dark:text-white">
            Available Slots
          </CardTitle>
          <Users className="h-4 w-4 text-gray-500 dark:text-gray-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.availableSlots}</div>
          <p className="text-xs">
            {stats.availableSlots < 200 ? (
              <span className="text-rose-500 flex items-center">
                <ArrowDownIcon className="mr-1 h-3 w-3" />
                Limited availability
              </span>
            ) : (
              <span className="text-emerald-500 flex items-center">
                <ArrowUpIcon className="mr-1 h-3 w-3" />
                Plenty of slots available
              </span>
            )}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SystemStats;
