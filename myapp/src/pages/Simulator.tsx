import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import TrafficSimulator from "../components/simulator/TrafficSimulator";
import { useQueue } from "../context/QueueContext";
import { Card, CardContent } from "../components/ui/card";

const Simulator = () => {
  const { userCount, queueStatus } = useQueue();

  const getStatusColor = () => {
    switch (queueStatus) {
      case "low":
        return "bg-green-500";
      case "medium":  
        return "bg-yellow-500";
      case "high":
        return "bg-orange-500";
      default:
        return "bg-red-500";
    }
  };

  const getSystemResponse = () => {
    switch (queueStatus) {
      case "low":
        return "Normal operation";
      case "medium":
        return "Queue system activating";
      case "high":
        return "Queue system active";
      default:
        return "Queue system prioritizing critical requests";
    }
  };

  const getDescription = () => {
    switch (queueStatus) {
      case "low":
        return "All requests are being processed immediately.";
      case "medium":
        return "Some requests may be queued briefly.";
      case "high":
        return "Most requests are being queued with moderate wait times.";
      default:
        return "Long wait times expected. Offline mode recommended for non-critical tasks.";
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow pt-8 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-gray-900">BackupQ</h1>
            <p className="mt-2 text-gray-600 text-base max-w-2xl mx-auto">
              Monitor how systems behave under varying traffic loads and learn about smart queueing solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <Card className="shadow-md bg-white">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Active Users</p>
                    <p className="text-3xl font-semibold text-gray-900">{userCount}</p>
                  </div>
                  <div className="flex items-center">
                    <span className={`h-3 w-3 rounded-full ${getStatusColor()} mr-2`}></span>
                    <span className="capitalize font-medium text-gray-700">{queueStatus} load</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-md bg-white">
              <CardContent className="pt-6">
                <p className="text-sm text-gray-500 mb-1">System Response</p>
                <p className="text-lg font-semibold text-gray-900 mb-2">{getSystemResponse()}</p>
                <p className="text-sm text-gray-600">{getDescription()}</p>
              </CardContent>
            </Card>
          </div>

          <div className="mb-12">
            <TrafficSimulator />
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">About the Simulator</h2>
            <p className="text-gray-600 mb-4">
              This simulator showcases how government portals and payment systems can stay reliable during high-traffic
              situations using intelligent queueing and offline-first strategies. These techniques provide a better user
              experience even under infrastructure constraints.
            </p>

            <h3 className="font-semibold text-gray-800 mb-2">Real-world applications:</h3>
            <ul className="list-disc pl-5 text-gray-600 space-y-1">
              <li>Tax filing portals (Income Tax, GST)</li>
              <li>University applications and fee payments</li>
              <li>Government benefit enrollments</li>
              <li>Exam registration and result systems</li>
              <li>Large-scale sales or booking portals</li>
              <li>Visa/passport scheduling systems</li>
            </ul>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Simulator;
