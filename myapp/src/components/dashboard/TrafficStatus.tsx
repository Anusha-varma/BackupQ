import { useEffect, useState } from 'react';
import { useQueue } from '../../context/QueueContext';
import { Progress } from '../ui/progress';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { AlertTriangle, CheckCircle, Clock } from 'lucide-react';

const TrafficStatus = () => {
  const { userCount, queueStatus } = useQueue();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const calculatedProgress = Math.min(Math.floor((userCount / 2000) * 100), 100);
    const timer = setTimeout(() => setProgress(calculatedProgress), 100);
    return () => clearTimeout(timer);
  }, [userCount]);

  const getStatusColor = () => {
    switch (queueStatus) {
      case 'low': return 'bg-emerald-500';
      case 'medium': return 'bg-amber-500';
      case 'high': return 'bg-orange-500';
      case 'critical': return 'bg-rose-500';
      default: return 'bg-blue-500';
    }
  };

  const getStatusMessage = () => {
    switch (queueStatus) {
      case 'low': return 'System is operating normally';
      case 'medium': return 'Moderate load - expect minor delays';
      case 'high': return 'High traffic - expect longer wait times';
      case 'critical': return 'System is under critical load';
      default: return 'System status unknown';
    }
  };

  const getStatusIcon = () => {
    switch (queueStatus) {
      case 'low': return <CheckCircle className="h-5 w-5 text-emerald-500" />;
      case 'medium': 
      case 'high': return <Clock className="h-5 w-5 text-amber-500" />;
      case 'critical': return <AlertTriangle className="h-5 w-5 text-rose-500" />;
      default: return null;
    }
  };

  const getEstimatedWaitTime = () => {
    switch (queueStatus) {
      case 'low': return 'No wait time';
      case 'medium': return '~2-5 minutes';
      case 'high': return '~10-15 minutes';
      case 'critical': return '30+ minutes';
      default: return 'Unknown';
    }
  };

  const getProgressClasses = () => {
    switch (queueStatus) {
      case 'low': return 'bg-emerald-500';
      case 'medium': return 'bg-amber-500';
      case 'high': return 'bg-orange-500';
      case 'critical': return 'bg-rose-500';
      default: return 'bg-blue-500';
    }
  };

  return (
    <Card className="bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow duration-200 transform hover:scale-[1.02] rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden animate-float">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-b border-gray-100 dark:border-gray-800">
        <CardTitle className="flex items-center justify-between text-gray-900 dark:text-white">
          <span className="flex items-center">
            <span className="mr-2">💡</span>
            Current Traffic Status
          </span>
          <div className={`h-3 w-3 rounded-full ${getStatusColor()} transition-colors duration-200 animate-pulse`}></div>
        </CardTitle>
        <CardDescription className="text-sm text-gray-500 dark:text-gray-400">
          Live system load monitoring
        </CardDescription>
      </CardHeader>

      <CardContent className="mt-4">
        <div className="space-y-6">
          <div>
            <div className="flex justify-between mb-2">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">System Load</p>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 animate-pulse">{userCount} active users</p>
            </div>
            <div className="h-2 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full ${getProgressClasses()} transition-all duration-1000 animate-pulse`}
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-900 p-5 rounded-md shadow-inner">
            <div className="flex items-center space-x-2 mb-4 animate-pulse">
              {getStatusIcon()}
              <span className="font-medium text-gray-700 dark:text-gray-300">{getStatusMessage()}</span>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="bg-white dark:bg-gray-800 p-3 rounded-md border border-gray-200 dark:border-gray-700 text-sm shadow-sm hover:shadow transition-all duration-200">
                <p className="text-xs text-gray-500 dark:text-gray-400">Current Status</p>
                <p className="font-medium capitalize text-gray-700 dark:text-gray-300 animate-pulse">{queueStatus}</p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-3 rounded-md border border-gray-200 dark:border-gray-700 text-sm shadow-sm hover:shadow transition-all duration-200">
                <p className="text-xs text-gray-500 dark:text-gray-400">Est. Wait Time</p>
                <p className="font-medium text-gray-700 dark:text-gray-300 animate-pulse">{getEstimatedWaitTime()}</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TrafficStatus;