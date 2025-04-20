import { useState } from 'react';
import { useQueue } from '../../context/QueueContext';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../components/ui/card';
import { Slider } from '../../components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Activity, TrendingUp, TrendingDown, BarChart3 } from 'lucide-react';
import { useToast } from '../../hooks/use-toast';

const TrafficSimulator = () => {
  const { userCount, simulateTrafficSpike, simulateTrafficDrop } = useQueue();
  const { toast } = useToast();
  const [customUserCount, setCustomUserCount] = useState<number>(500);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);

  // Simulate gradual load increase
  const simulateGradualIncrease = () => {
    setIsSimulating(true);

    let current = 0;
    const target = customUserCount;
    const step = Math.ceil(target / 10);

    toast({
      title: "Simulation Started",
      description: `Gradually increasing traffic to ${target} users`,
      duration: 3000,
      className: 'bg-white text-slate-900 border border-slate-200 shadow-md'
    });

    const interval = setInterval(() => {
      current += step;
      if (current >= target) {
        clearInterval(interval);
        setIsSimulating(false);

        toast({
          title: "Simulation Complete",
          description: `Traffic increased to ${target} users`,
          duration: 3000,
          className: 'bg-white text-slate-600 border border-red-200 shadow-md',
        });
      }

      simulateTrafficSpike();
    }, 1500);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Activity className="h-5 w-5 mr-2 text-blue-500" />
            Traffic Flow Simulator
          </CardTitle>
          <CardDescription>
            Test the queue system by simulating different traffic patterns
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Tabs defaultValue="quick">
            <TabsList className="mb-4">
              <TabsTrigger value="quick">Quick Simulation</TabsTrigger>
              <TabsTrigger value="custom">Custom Simulation</TabsTrigger>
            </TabsList>

            <TabsContent value="quick">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="py-4">
                    <CardTitle className="text-base flex items-center">
                      <TrendingUp className="h-4 w-4 mr-2 text-red-500" />
                      Traffic Spike
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="py-2">
                    <p className="text-sm text-gray-600">
                      Simulate a sudden influx of 500-1500 users joining the system at once
                    </p>
                  </CardContent>
                  <CardFooter className="pt-0">
                    <Button
                      data-testid="spike-button"
                      onClick={simulateTrafficSpike}
                      className="w-full bg-red-600 hover:bg-red-700 text-white"
                      variant="destructive"
                    >
                      Simulate Spike
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader className="py-4">
                    <CardTitle className="text-base flex items-center">
                      <TrendingDown className="h-4 w-4 mr-2 text-green-500" />
                      Traffic Drop
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="py-2">
                    <p className="text-sm text-gray-600">
                      Simulate users leaving the system, reducing the load by approximately 500 users
                    </p>
                  </CardContent>
                  <CardFooter className="pt-0">
                    <Button
                      data-testid="drop-button"
                      onClick={simulateTrafficDrop}
                      className="w-full bg-green-200 hover:bg-green-400 text-green-800 border border-green-500"
                      variant="outline"
                    >
                      Simulate Drop
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="custom">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center">
                    <BarChart3 className="h-4 w-4 mr-2 text-blue-500" />
                    Custom Traffic Pattern
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">Target User Count</span>
                        <span
                          data-testid="target-user-count"
                          className="text-sm font-medium"
                        >
                          {customUserCount} users
                        </span>
                      </div>
                      <Slider
                        value={[customUserCount]}
                        min={100}
                        max={2000}
                        step={100}
                        onValueChange={(values) => setCustomUserCount(values[0])}
                      />
                    </div>

                    <div className="bg-gray-50 p-4 rounded-md">
                      <h3 className="font-medium mb-2">Simulation Info</h3>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
  <span className="text-gray-500">Current Users:</span>
  <span data-testid="user-count" className="ml-2 font-medium">{userCount}</span>
</div>
<div>
  <span className="text-gray-500">Target Users:</span>
  <span className="ml-2 font-medium">{customUserCount}</span>
</div>
<div>
  <span className="text-gray-500">Change:</span>
  <span className={`ml-2 font-medium ${customUserCount > userCount ? 'text-red-500' : 'text-green-500'}`}>
    {customUserCount > userCount ? '+' : ''}{customUserCount - userCount}
  </span>
</div>

                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    data-testid="gradual-button"
                    onClick={simulateGradualIncrease}
                    className="w-full bg-black hover:bg-black/90 text-white"
                    disabled={isSimulating}
                  >
                    {isSimulating ? 'Simulating...' : 'Start Simulation'}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <div className="mt-6 p-4 bg-yellow-50 rounded-md">
        <h3 className="font-medium text-yellow-800 mb-2">Simulation Info</h3>
        <p className="text-sm text-yellow-700">
          This simulator helps demonstrate how the queue system handles different traffic patterns.
          In a real-world scenario, these spikes could represent deadline days for tax filings,
          limited-time form submissions, or payment gateway traffic during flash sales.
        </p>
      </div>
    </div>
  );
};

export default TrafficSimulator;
