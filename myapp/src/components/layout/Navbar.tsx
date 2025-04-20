import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useQueue } from "../../context/QueueContext";
const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const location = useLocation();

  const handleSignOut = async () => {
    await signOut();
  };
const { queueStatus, userCount } = useQueue();

const getStatusIndicator = () => {
  switch (queueStatus) {
    case "low":
      return {
        color: "bg-[#596235]",
        text: "Low Traffic",
        description: "System running smoothly.",
      };
    case "medium":
      return {
        color: "bg-[#D96846]",
        text: "Moderate Traffic",
        description: "Some delays possible.",
      };
    case "high":
      return {
        color: "bg-[#2F3020]",
        text: "Heavy Traffic",
        description: "Delays expected.",
      };
    case "critical":
      return {
        color: "bg-red-700",
        text: "Critical Traffic",
        description: "Severe delays ongoing.",
      };
    default:
      return {
        color: "bg-gray-400",
        text: "Unknown Status",
        description: "Status unavailable.",
      };
  }
};

const status = getStatusIndicator();
  const getActiveClass = (path: string): string =>
    location.pathname === path ? "bg-[#F3D0C4] font-bold" : "";

  const baseLinkClasses =
    "px-2 py-5 text-sm font-medium text-gray-700 hover:text-white hover:bg-[#F3D0C4]";
  return (<div>
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center pt-2">
            <img src="/img/logo.JPG" alt="" width={120} height={60}/>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden sm:flex items-center space-x-4">
            <Link to="/" className={`${baseLinkClasses} ${getActiveClass("/")}`}>Home</Link>
            <Link to="/dashboard" className={`${baseLinkClasses} ${getActiveClass("/dashboard")}`}>Dashboard</Link>
            <Link to="/queue" className={`${baseLinkClasses} ${getActiveClass("/queue")}`}>Queue</Link>
            <Link to="/simulator" className={`${baseLinkClasses} ${getActiveClass("/simulator")}`}>Simulator</Link>
            <Link to="/about" className={`${baseLinkClasses} ${getActiveClass("/about")}`}>About</Link>

            {user ? (
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleSignOut}
                  className="hover:text-red-500"
                >
                  Sign Out
                </Button>
                <Avatar className="rounded-full ring-2 ring-blue-800">
                  <AvatarFallback>
                    {user.email?.substring(0, 2).toUpperCase() || "UN"}
                  </AvatarFallback>
                </Avatar>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/signin" className="hover:text-blue-500">Sign In</Link>
                </Button>
                <Button size="sm" asChild>
                  <Link to="/signup" className="hover:text-green-500">Sign Up</Link>
                </Button>
              </div>
            )}
          </div>

          {/* Mobile menu toggle */}
          <div className="sm:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className={`block px-3 py-2 text-base font-medium text-gray-700 hover:text-white hover:bg-[#e89880] ${getActiveClass("/")}`}>
              Home
            </Link>
            <Link to="/dashboard" onClick={() => setIsMobileMenuOpen(false)} className={`block px-3 py-2 text-base font-medium text-gray-700 hover:text-white hover:bg-[#e89880] ${getActiveClass("/dashboard")}`}>
              Dashboard
            </Link>
            <Link to="/queue" onClick={() => setIsMobileMenuOpen(false)} className={`block px-3 py-2 text-base font-medium text-gray-700 hover:text-white hover:bg-[#e89880] ${getActiveClass("/queue")}`}>
              Queue
            </Link>
            <Link to="/simulator" onClick={() => setIsMobileMenuOpen(false)} className={`block px-3 py-2 text-base font-medium text-gray-700 hover:text-white hover:bg-[#e89880] ${getActiveClass("/simulator")}`}>
              Simulator
            </Link>
            <Link to="/about" onClick={() => setIsMobileMenuOpen(false)} className={`block px-3 py-2 text-base font-medium text-gray-700 hover:text-white hover:bg-[#e89880] ${getActiveClass("/about")}`}>
              About
            </Link>

            {user ? (
              <button
                onClick={() => {
                  handleSignOut();
                  setIsMobileMenuOpen(false);
                }}
                className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-red-500 hover:bg-[#F3D0C4]"
              >
                Sign Out
              </button>
            ) : (
              <>
                <Link to="/signin" onClick={() => setIsMobileMenuOpen(false)} className={`block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-500 hover:bg-[#e89880] ${getActiveClass("/signin")}`}>
                  Sign In
                </Link>
                <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)} className={`block px-3 py-2 text-base font-medium text-gray-700 hover:text-green-500 hover:bg-[#e89880] ${getActiveClass("/signup")}`}>
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
      
    </nav>
    {/* Status Bar */}
    <div className={`text-center py-2 text-sm text-white ${status.color}`}>
          <p>
            <strong>{status.text}</strong> — {status.description} ({userCount} users currently)
          </p>
        </div></div>
  );
};

export default Navbar;
