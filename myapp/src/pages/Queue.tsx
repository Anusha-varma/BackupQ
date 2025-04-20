import {useEffect} from 'react';
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Progress } from "../components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { useQueue } from "../context/QueueContext";
import { AlertCircle, CheckCircle, Clock, Users } from "lucide-react";
import PaymentForm from "../components/payment/PaymentForm";
import OnlinePay from '../components/payment/OnlinePay';
import { useToast } from '../hooks/use-toast';
const Queue = () => {
  const { userCount, queueStatus, isInQueue, queuePosition, estimatedWaitTime, joinQueue, leaveQueue } = useQueue();
  const {toast}=useToast();
 
  // Calculate congestion level (0-100)
  const congestionLevel = Math.min(100, Math.floor((userCount / 2000) * 100));

  // Queue status color
  const getStatusColor = () => {
    switch (queueStatus) {
      case 'low': return 'bg-green-500';
      case 'medium': return 'bg-yellow-500';
      case 'high': return 'bg-orange-500';
      case 'critical': return 'bg-red-500';
      default: return 'bg-blue-500';
    }
  };

  // Wait time based on status
  const getWaitTimeMessage = () => {
    if (isInQueue && queuePosition) {
      return estimatedWaitTime;
    }
    
    switch (queueStatus) {
      case 'low': return 'No wait time expected';
      case 'medium': return 'Short wait times (2-5 min)';
      case 'high': return 'Moderate wait times (5-15 min)';
      case 'critical': return 'Long wait times (15+ min)';
      default: return 'Unknown wait time';
    }
  };

  // Should show queue warning
  const showQueueWarning = queueStatus === 'high' || queueStatus === 'critical';

  return (
    <div className="min-h-screen flex flex-col ">
      <Navbar />
      
      <main className="flex-grow py-8 px-4 pl-100 pr-100 animate-fade-in">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-2 text-center">Queue & Payment System</h1>
          
          <Tabs defaultValue="virtual-queue" className="mt-8 mb-5">
            <TabsList className="grid grid-cols-4">
              <TabsTrigger value="virtual-queue" className="text-sm sm:text-base font-bold hover:scale-105 hover:text-white">Virtual Queue</TabsTrigger>
              <TabsTrigger value="payment-form" className="text-sm sm:text-base font-bold hover:scale-105 hover:text-white">Online Payment</TabsTrigger>
         </TabsList>
            
            <TabsContent value="virtual-queue" className="mt-6">
              <Card className="border shadow-lg animate-float hover:shadow-xl transition-all bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-center text-2xl">Virtual Queue System</CardTitle>
                  <CardDescription className="text-center">
                    Join the queue to access the system during high traffic
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  {/* Current System Status */}
                  <div className="bg-gray-50 p-4 rounded-md border">
                    <h3 className="text-lg font-medium mb-2 flex items-center">
                      <span className={`inline-block w-3 h-3 rounded-full ${getStatusColor()} mr-2`}></span>
                      Current System Status: <span className="capitalize ml-2">{queueStatus}</span>
                    </h3>
                    
                    <div className="mb-3">
                      <div className="flex justify-between text-sm mb-1">
                        <span>System Load</span>
                        <span>{congestionLevel}%</span>
                      </div>
                      <Progress value={congestionLevel} className="h-2" />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div className="bg-white p-3 rounded border">
                        <div className="flex items-center mb-1">
                          <Users className="h-4 w-4 mr-1 text-blue-500" />
                          <span className="text-xs text-gray-500">Active Users</span>
                        </div>
                        <p className="font-medium">{userCount}</p>
                      </div>
                      
                      <div className="bg-white p-3 rounded border">
                        <div className="flex items-center mb-1">
                          <Clock className="h-4 w-4 mr-1 text-blue-500" />
                          <span className="text-xs text-gray-500">Wait Time</span>
                        </div>
                        <p className="font-medium">{getWaitTimeMessage()} sec</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* User Queue Status */}
                  {isInQueue ? (
                    <div className="bg-blue-50 p-4 rounded-md border border-blue-100 animate-pulse-glow">
                      <h3 className="text-lg font-medium text-blue-800 mb-2">You're in the Queue</h3>
                      
                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-blue-700">Position in Queue</span>
                          <span className="font-medium text-blue-900">{queuePosition}</span>
                        </div>
                        <Progress 
                          value={queuePosition ? Math.max(0, 100 - (queuePosition * 2)) : 0} 
                          className="h-2 bg-blue-200" 
                        />
                      </div>
                      
                      <div className="flex items-center mb-4">
                        <Clock className="h-5 w-5 mr-2 text-blue-600" />
                        <span className="text-blue-800">
                          Estimated time: <strong>{estimatedWaitTime} sec</strong>
                        </span>
                      </div>
                      
                      <p className="text-sm text-blue-700 mb-4">
                        Please wait until it's your turn. You'll be automatically redirected when ready.
                      </p>
                      
                      <Button
                        variant="outline"
                        className="w-full border-blue-300 hover:bg-blue-100 text-blue-700"
                        onClick={leaveQueue}
                      >
                        Leave Queue
                      </Button>
                      <PaymentForm/>

                    </div>
                  ) : (
                    <>
                      {showQueueWarning ? (
                        <div className="bg-amber-50 p-4 rounded-md border border-amber-200">
                          <div className="flex items-start">
                            <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5 mr-2" />
                            <div>
                              <h3 className="font-medium text-amber-800">High Traffic Alert</h3>
                              <p className="text-sm text-amber-700 mt-1">
                                The system is currently experiencing high traffic. Joining the queue will hold your place in line.
                              </p>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="bg-green-50 p-4 rounded-md border border-green-200">
                          <div className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-2" />
                            <div>
                              <h3 className="font-medium text-green-800">System Available</h3>
                              <p className="text-sm text-green-700 mt-1">
                                The system is currently under normal load. You can access it immediately.
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      <Button
                        className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium py-6 rounded-md shadow-md hover:shadow-lg transition-all"
                        onClick={joinQueue}
                      >
                        Join Queue
                      </Button>
                    </>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
        
            
            <TabsContent value="payment-form" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Make a Payment</CardTitle>
                  <CardDescription>Fill out the form to complete your payment</CardDescription>
                </CardHeader>
                <CardContent>
                  <OnlinePay/>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Queue;