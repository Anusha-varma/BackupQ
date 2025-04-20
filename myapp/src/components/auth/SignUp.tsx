import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from '../../components/ui/card';
import { useToast } from '../../components/ui/use-toast';
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signUp } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast({
        title: 'Passwords do not match',
        description: 'Please ensure your passwords match',
        variant: 'destructive',
        className: 'bg-white text-red-600 border border-red-200 shadow-md',
      });
      return;
    }

    setIsLoading(true);

    try {
      const { error, data } = await signUp(email, password);

      if (error) {
        toast({
          title: 'Sign up failed',
          description: error.message,
          variant: 'destructive',
          className: 'bg-white text-red-600 border border-red-200 shadow-md',
        });
      } else {
        toast({
          title: 'Sign up successful',
          description: data?.user?.email
            ? 'Check your email to confirm your account'
            : 'Your account has been created',
          className: 'bg-white text-slate-900 border border-slate-200 shadow-md',
        });
        navigate('/');
      }
    } catch {
      toast({
        title: 'Sign up failed',
        description: 'An unexpected error occurred',
        variant: 'destructive',
        className: 'bg-white text-red-600 border border-red-200 shadow-md',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative px-4">
      <Card className="wrapper w-full max-w-md rounded-2xl p-10 text-white border border-white/20 bg-black shadow-[0_8px_32px_rgba(0,0,0,0.37)] hover:shadow-[0_12px_48px_rgba(0,0,0,0.5)] transition-all">
        <CardHeader>
          <CardTitle className="text-[2.2rem] mb-6 text-white tracking-wide text-center">
            Create Account
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignUp} className="flex flex-col space-y-6">
            <div className="flex flex-col space-y-2">
              <label htmlFor="email" className="text-white text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-white/20 backdrop-blur-md border-b-2 border-white/50 text-white placeholder-white/30 px-4 py-2 shadow-lg focus:outline-none focus:ring-2 focus:ring-white/50"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label htmlFor="password" className="text-white text-sm font-medium">
                Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-white/20 backdrop-blur-md border-b-2 border-white/50 text-white placeholder-white/30 px-4 py-2 shadow-lg focus:outline-none focus:ring-2 focus:ring-white/50"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label htmlFor="confirmPassword" className="text-white text-sm font-medium">
                Confirm Password
              </label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="bg-white/20 backdrop-blur-md border-b-2 border-white/50 text-white placeholder-white/30 px-4 py-2 shadow-lg focus:outline-none focus:ring-2 focus:ring-white/50"
              />
            </div>
            <Button
              type="submit"
              className="bg-[#271930] hover:bg-white/20 hover:text-black border-2 border-transparent hover:border-white text-white font-semibold rounded-full py-3 px-6 mt-4 transition-all"
              disabled={isLoading}
            >
              {isLoading ? 'Creating account...' : 'Sign Up'}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="justify-center">
          <p className="text-sm text-white mt-6">
            Already have an account?{' '}
            <Link to="/signin" className="text-[#dbefff] hover:underline">
              Sign in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignUp;
