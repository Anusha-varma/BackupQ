
import { Github, Mail, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-300 border-t border-gray-500 py-8">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">BackupQ</h2>
            <p className="text-gray-600 max-w-md">
              A smart queue management system to handle high traffic on government and payment portals during peak times.
            </p>
          </div>
          
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h2>
            <ul className="space-y-2">
              <li><a href="/" className="text-blue-500 hover:text-blue-700">Home</a></li>
              <li><a href="/dashboard" className="text-blue-500 hover:text-blue-700">Dashboard</a></li>
              <li><a href="/queue" className="text-blue-500 hover:text-blue-700">Queue</a></li>
              <li><a href="/simulator" className="text-blue-500 hover:text-blue-700">Traffic Simulator</a></li>
              <li><a href="/about" className="text-blue-500 hover:text-blue-700">About</a></li>
            </ul>
          </div>
          
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Connect</h2>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-blue-500">
                <Github className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-500">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-500">
                <Mail className="h-6 w-6" />
              </a>
            </div>
            <p className="mt-4 text-gray-600">
              © {new Date().getFullYear()} BackupQ
              <br />
              All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
