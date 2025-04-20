import { useQueueOperations } from '../../hooks/useQueueOperations';
import { useUserCount } from '../../hooks/useUserCount';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Users } from 'lucide-react';

const QueueView = () => {
  const { isInQueue, position, joinQueue, leaveQueue } = useQueueOperations();
  const { userCount, increment, decrement, spike, drop } = useUserCount();

  const handleJoin = () => {
    joinQueue();
    increment();
  };

  const handleLeave = () => {
    leaveQueue();
    decrement();
  };

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Virtual Queue System</CardTitle>
        <CardDescription>Join the queue to access the system during high traffic</CardDescription>
      </CardHeader>

      <CardContent>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Users className="h-5 w-5 text-blue-500" />
            <span>{userCount} active users</span>
          </div>
        </div>

        {isInQueue && (
          <div className="bg-blue-50 p-4 rounded-md mb-4">
            <h3 className="font-medium text-blue-700 mb-2">You are in queue</h3>
            {position && (
              <div className="flex items-center justify-between mb-2">
                <span>Your position:</span>
                <span className="font-bold">{position}</span>
              </div>
            )}
          </div>
        )}

        <div className="flex gap-2 mt-4">
          <Button onClick={spike} variant="secondary" className="flex-1">Spike</Button>
          <Button onClick={drop} variant="secondary" className="flex-1">Drop</Button>
        </div>
      </CardContent>

      <CardFooter>
        {isInQueue ? (
          <Button variant="outline" onClick={handleLeave} className="w-full">
            Leave Queue
          </Button>
        ) : (
          <Button onClick={handleJoin} className="w-full">
            Join Queue
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default QueueView;
