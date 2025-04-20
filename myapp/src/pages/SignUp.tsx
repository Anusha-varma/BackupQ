import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import SignUpComponent from "../components/auth/SignUp";

const SignUp = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center py-12 px-4">
        <SignUpComponent />
      </main>
      
      <Footer />
    </div>
  );
};

export default SignUp;