import { useState } from 'react';
import { CreditCard, DollarSign, CircleCheck } from 'lucide-react';
import {
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle
} from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import {
  Tabs, TabsContent, TabsList, TabsTrigger
} from '../../components/ui/tabs';
import { useToast } from '../../hooks/use-toast';

interface PaymentOption {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  amount: number; // Amount in paise (₹1 = 100 paise)
}

const PaymentOptions = () => {
  const { toast } = useToast();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const paymentOptions: PaymentOption[] = [
    {
      id: 'standard',
      name: 'Standard Processing',
      description: 'Regular transaction processing with normal queue priority',
      icon: <DollarSign className="h-8 w-8 text-blue-500" />,
      amount: 499
    },
    {
      id: 'premium',
      name: 'Premium Processing',
      description: 'Fast-track processing with priority queue access',
      icon: <CreditCard className="h-8 w-8 text-purple-500" />,
      amount: 999
    },
    {
      id: 'enterprise',
      name: 'Enterprise Access',
      description: 'Guaranteed access even during peak traffic periods',
      icon: <CircleCheck className="h-8 w-8 text-green-500" />,
      amount: 2499
    }
  ];

  const handleSelectOption = (id: string) => {
    setSelectedOption(id);
  };

  const handleProceed = () => {
    if (!selectedOption) {
      toast({
        title: "Selection Required",
        description: "Please select a payment plan to continue",
        variant: "destructive",
      });
      return;
    }

    const option = paymentOptions.find(opt => opt.id === selectedOption);

    if (!option) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
      return;
    }

    const formatted = new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(option.amount / 100);

    toast({
      title: "Plan Selected",
      description: `You've selected the ${option.name} plan for ${formatted}`,
    });

    setSelectedOption(null);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <Tabs defaultValue="options">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="options">Payment Options</TabsTrigger>
          <TabsTrigger value="info">Payment Info</TabsTrigger>
        </TabsList>

        <TabsContent value="options">
          <div className="grid md:grid-cols-3 gap-4 mt-4">
            {paymentOptions.map((option) => (
              <Card
                key={option.id}
                className={`cursor-pointer transition-all relative ${
                  selectedOption === option.id
                    ? 'border-blue-500 ring-2 ring-blue-200'
                    : 'hover:border-gray-300 hover:scale-105 hover:shadow-2xl'
                }`}
                onClick={() => handleSelectOption(option.id)}
              >
                <CardHeader className="pb-2">
                  <div className="flex justify-center mb-2">
                    {option.icon}
                  </div>
                  <CardTitle className="text-center text-lg">{option.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    {option.description}
                  </CardDescription>
                  <p className="text-center mt-4 text-2xl font-bold">
                    ₹{(option.amount / 100).toFixed(2)}
                  </p>
                </CardContent>
                <CardFooter className="flex justify-center pb-4">
                  {selectedOption === option.id && (
                    <div className="absolute top-2 right-2">
                      <CircleCheck className="h-5 w-5 text-blue-500" />
                    </div>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="mt-6 flex justify-center">
            <Button
              size="lg"
              onClick={handleProceed}
              disabled={!selectedOption}
              className='bg-[#272f05] text-white'
            >
              Proceed to Payment
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="info">
          <Card className="mt-4 bg-white">
            <CardHeader>
              <CardTitle>Payment Information</CardTitle>
              <CardDescription>
                Learn about our secure payment options and processing
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-lg font-medium">Secure Processing</h3>
                <p className="text-gray-600">
                  All payments are processed using industry-standard encryption and security protocols.
                  Your card information is never stored on our servers.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium">Offline Payment Mode</h3>
                <p className="text-gray-600">
                  During high traffic periods, you can submit payment intents that will be processed
                  once the system load decreases, ensuring you never miss a deadline.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium">Supported Payment Methods</h3>
                <ul className="list-disc list-inside text-gray-600">
                  <li>Credit/Debit Cards (Visa, Mastercard, RuPay)</li>
                  <li>UPI Payments</li>
                  <li>Net Banking</li>
                  <li>Wallets (PayTM, PhonePe, Amazon Pay)</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PaymentOptions;
