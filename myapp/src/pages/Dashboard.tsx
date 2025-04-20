import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import TrafficStatus from "../components/dashboard/TrafficStatus";
import TrafficChart from "../components/dashboard/TrafficChart";
import SystemStats from "../components/dashboard/SystemStats";

const Dashboard = () => {
  return (
    <div className="min-h-screen flex flex-col dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <Navbar />

      <main className="flex-grow py-10 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-10 tracking-tight">
            System Dashboard
          </h1>

          <div className="grid grid-cols-3 lg:grid-cols-3 gap-6 mb-10">
            <TrafficStatus />
            <TrafficChart />
          </div>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
              System Metrics
            </h2>
            <SystemStats />
          </section>

          <section className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 transition hover:shadow-xl">
            <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-400 mb-4">
              Dashboard Overview
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              This dashboard provides real-time visibility into the system's performance and traffic levels. 
              During high-traffic periods like tax filing deadlines or payment due dates, you can monitor 
              the system load and join the queue when necessary to ensure fair access for all users.
            </p>

            <div className="mt-6">
              <h3 className="font-semibold text-gray-800 dark:text-white mb-3">
                Key Metrics Explained:
              </h3>
              <ul className="list-disc pl-5 space-y-3 text-gray-700 dark:text-gray-300">
                <li>
                  <span className="font-semibold text-gray-900 dark:text-white">Active Users:</span> 
                  &nbsp;The number of users currently using the system.
                </li>
                <li>
                  <span className="font-semibold text-gray-900 dark:text-white">System Load:</span> 
                  &nbsp;How heavily the servers are being utilized.
                </li>
                <li>
                  <span className="font-semibold text-gray-900 dark:text-white">Response Time:</span> 
                  &nbsp;How quickly the system is responding to requests.
                </li>
                <li>
                  <span className="font-semibold text-gray-900 dark:text-white">Error Rate:</span> 
                  &nbsp;Percentage of failed requests or transactions.
                </li>
              </ul>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
