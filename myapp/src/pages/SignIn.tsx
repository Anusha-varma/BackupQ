import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import SignInComponent from "../components/auth/SignIn";

const SignIn = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center py-12 px-4">
        <SignInComponent />
      </main>
      
      <Footer />
    </div>
  );
};

export default SignIn;