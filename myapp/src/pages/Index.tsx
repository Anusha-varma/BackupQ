import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { Button } from "../components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
const Index = () => {

  return (
    <div className="min-h-screen flex flex-col text-[#2F3020]">
      <Navbar />
      <main className="flex-grow">
       
        {/* Hero Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6 md:px-10">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-6 text-[#2F3020]">
                  Never Miss a Deadline Due to System Overload Again
                </h1>
                <p className="text-lg mb-8 text-[#2F3020]">
                  BackupQ manages traffic on critical portals, ensuring access even during peak hours.
                </p>
                <div className="flex justify-evenly">
                  <Button
                    size="lg"
                    className="border-[#596235] text-white bg-[#596235] hover:border-[#596235] hover:text-[#596235] hover:bg-white"
                    asChild
                  >
                    <Link to="/dashboard" className="flex items-center gap-2">
                      View Traffic Status <ArrowRight className="h-5 w-5" />
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-[#596235] text-[#596235] hover:bg-[#596235] hover:text-white"
                    asChild
                  >
                    <Link to="/queue">Join Queue System</Link>
                  </Button>
                </div>
              </div>
              <motion.img
  src="/img/webimg.JPG"
  alt="Shaking Image"
  width={400}
  height={450}
  animate={{
    x: [0, -4, 4, -4, 4, 0],
  }}
  transition={{
    repeat: 6,
    duration: 0.5,
    ease: "easeInOut",
  }}
/>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-[#2F3020] text-[#CDCBD6]">
          <div className="max-w-7xl mx-auto px-6 md:px-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4">See It In Action</h2>
                <p className="text-lg mb-6">
                  Use our simulator to test the system under traffic spikes.
                </p>
                <Button
                  size="lg"
                  className="bg-[#596235] text-white hover:bg-[#4D572E]"
                  asChild
                >
                  <Link to="/simulator" className="flex items-center gap-2">
                    Try the Simulator <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>
              </div>

              <div className="bg-[#CDCBD6] rounded-xl p-8 border border-[#596235] text-[#2F3020]">
                <h3 className="text-xl font-bold mb-6">What You'll See</h3>
                <ul className="space-y-4">
                  {[
                    "Live queue tracking",
                    "Simulated load effects",
                    "Offline support during peaks",
                    "Live metrics and visualizations",
                  ].map((point, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-[#596235] font-bold mr-2">✔</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
