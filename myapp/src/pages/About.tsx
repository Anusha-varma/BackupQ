import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { Card, CardContent } from "../components/ui/card";
import { Shield, Zap, Clock, ClipboardList, Globe } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <section className="mb-16">
            <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">About BackupQ</h1>
            
            <div className="max-w-3xl mx-auto">
              <p className="text-xl text-gray-700 mb-6">
                BackupQ is a solution designed to solve a common frustration faced by millions: 
                system crashes and timeouts during critical deadlines on government and payment portals.
              </p>
              
              <p className="text-xl text-gray-700 mb-6">
                Instead of the traditional approach where everyone competes for limited server resources 
                at the same time, our system implements intelligent traffic management to ensure a fair, 
                orderly, and reliable experience for all users.
              </p>
              
              <div className="bg-blue-50 p-6 rounded-lg my-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">The Problem We're Solving</h2>
                <p className="text-gray-700 mb-4">
                  At deadline time (like the final hours before tax payments are due), millions of users 
                  try to access and complete payments simultaneously. This results in:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>Servers becoming overloaded and unresponsive</li>
                  <li>Random timeouts and session failures</li>
                  <li>Frustrated users making multiple attempts, further worsening the problem</li>
                  <li>Many users missing deadlines and incurring penalties due to technical failures</li>
                  <li>Loss of trust in digital government services</li>
                </ul>
              </div>
            </div>
          </section>
          
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Core Features</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="rounded-full bg-purple-100 p-3 mr-4">
                      <Clock className="h-6 w-6 text-purple-700" />
                    </div>
                    <h3 className="text-xl font-bold">Smart Queue System</h3>
                  </div>
                  <p className="text-gray-600">
                    Users join a virtual queue during high traffic periods and are admitted in a fair, 
                    orderly manner with real-time position updates and wait time estimates.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="rounded-full bg-blue-100 p-3 mr-4">
                      <ClipboardList className="h-6 w-6 text-blue-700" />
                    </div>
                    <h3 className="text-xl font-bold">Offline Intent Recording</h3>
                  </div>
                  <p className="text-gray-600">
                    During extreme traffic, users can record their payment intent offline, 
                    which will be processed later without any deadline penalties.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="rounded-full bg-green-100 p-3 mr-4">
                      <Globe className="h-6 w-6 text-green-700" />
                    </div>
                    <h3 className="text-xl font-bold">Traffic Visualization</h3>
                  </div>
                  <p className="text-gray-600">
                    Real-time traffic monitoring dashboard shows current system load,
                    helping users make informed decisions about when to access the system.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>
          
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Technical Implementation</h2>
            
            <div className="max-w-3xl mx-auto">
              <div className="bg-gray-50 p-6 rounded-lg mb-8">
                <h3 className="text-xl font-bold mb-4">Frontend Technologies</h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>React for component-based UI development</li>
                  <li>Tailwind CSS for responsive and efficient styling</li>
                  <li>Recharts for data visualization</li>
                  <li>React Router for client-side routing</li>
                  <li>Context API for state management</li>
                </ul>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg mb-8">
                <h3 className="text-xl font-bold mb-4">Backend Concepts</h3>
                <p className="text-gray-700 mb-4">
                  While this demo uses client-side simulation for educational purposes, a real-world implementation would include:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>Distributed queue management system</li>
                  <li>Load balancing across multiple server regions</li>
                  <li>Redis for high-performance queue management</li>
                  <li>Database sharding for handling high transaction volumes</li>
                  <li>WebSockets for real-time queue position updates</li>
                </ul>
              </div>
            </div>
          </section>
          
          <section>
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Applications</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-lg border border-blue-100">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Government Services</h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>Income Tax filing portals</li>
                  <li>GST payment systems</li>
                  <li>Passport and visa application portals</li>
                  <li>Government exam registration systems</li>
                  <li>Subsidy and benefit enrollment portals</li>
                  <li>Digital government service platforms</li>
                </ul>
              </div>
              
              <div className="bg-gradient-to-br from-green-50 to-blue-50 p-6 rounded-lg border border-green-100">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Other Applications</h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>University application and fee payment systems</li>
                  <li>Event ticketing platforms during high-demand sales</li>
                  <li>Banking portals during IPO subscription periods</li>
                  <li>Online exam platforms handling concurrent test-takers</li>
                  <li>Insurance claim portals during natural disasters</li>
                  <li>E-commerce platforms during flash sales</li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;