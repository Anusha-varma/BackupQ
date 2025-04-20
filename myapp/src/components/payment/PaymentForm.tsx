import { useState } from 'react';
import { useQueue } from '../../context/QueueContext';
import { useToast } from '../../hooks/use-toast';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../../components/ui/card';
import {
  AlertCircle,
  CheckCircle,
  Clock,
  Info,
  CreditCard,
} from 'lucide-react';
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '../../components/ui/alert';
import { Switch } from '../../components/ui/switch';

const PaymentForm = () => {
  const { queueStatus, isInQueue } = useQueue();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    amount: '',
    reference: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOfflineMode, setIsOfflineMode] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'offline'>('card');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.amount) {
      toast({
        title: 'Missing Fields',
        description: 'Please fill all required fields.',
        variant: 'destructive',
      });
      return;
    }

    if (paymentMethod === 'card' && !isOfflineMode) {
      if (!formData.cardNumber || !formData.expiryDate || !formData.cvv) {
        toast({
          title: 'Incomplete Payment Info',
          description: 'Please provide all card details.',
          variant: 'destructive',
        });
        return;
      }

      if (formData.cardNumber.replace(/\s/g, '').length !== 16) {
        toast({
          title: 'Invalid Card Number',
          description: 'Card number must be 16 digits.',
          variant: 'destructive',
        });
        return;
      }

      if (formData.cvv.length < 3 || formData.cvv.length > 4) {
        toast({
          title: 'Invalid CVV',
          description: 'CVV must be 3 or 4 digits.',
          variant: 'destructive',
        });
        return;
      }
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const paymentIntent = {
        ...formData,
        timestamp: new Date().toISOString(),
        status: isOfflineMode ? 'pending' : 'completed',
        id: Date.now().toString(),
        method: paymentMethod,
      };

      const existingIntents = JSON.parse(localStorage.getItem('paymentIntents') || '[]');
      existingIntents.push(paymentIntent);
      localStorage.setItem('paymentIntents', JSON.stringify(existingIntents));

      setIsSubmitting(false);
      setShowSuccess(true);

      toast({
        title: isOfflineMode ? 'Payment Intent Saved' : 'Payment Successful',
        description: isOfflineMode
          ? 'Your payment intent has been saved and will be processed when online.'
          : 'Your payment has been processed successfully.',
      });

      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          amount: '',
          reference: '',
          cardNumber: '',
          expiryDate: '',
          cvv: '',
        });
        setShowSuccess(false);
      }, 3000);
    }, 2000);
  };

  const showQueueWarning = queueStatus === 'high' || queueStatus === 'critical';

  return (
    <div
      className={`max-w-md mx-auto p-4 rounded transition-colors duration-500 ${
        isOfflineMode ? 'bg-[#f8fafc]' : 'bg-white'
      }`}
    >
      <div className="flex justify-end mb-4 items-center gap-2">
        <span className="text-sm font-medium text-gray-600">Offline Mode</span>
        <Switch
          checked={isOfflineMode}
          onCheckedChange={val => {
            setIsOfflineMode(val);
            setPaymentMethod(val ? 'offline' : 'card');
          }}
        />
      </div>

      {isInQueue ? (
        <Alert className="mb-6">
          <Clock className="h-4 w-4" />
          <AlertTitle>You're in the queue</AlertTitle>
          <AlertDescription>
            Please wait for your turn to access the payment form.
          </AlertDescription>
        </Alert>
      ) : (
        <>
          {showQueueWarning && !isOfflineMode && (
            <Alert variant="destructive" className="mb-6 bg-red-200">
              <AlertCircle className="  h-4 w-4" />
              <AlertTitle>High Traffic Alert</AlertTitle>
              <AlertDescription className="space-y-2">
                <p>
                  The system is experiencing high traffic which might affect
                  payment processing.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsOfflineMode(true)}
                  className='w-full bg-[#951515] hover:bg-[#c85858] text-white'
                >
                  Switch to Offline Mode
                </Button>
              </AlertDescription>
            </Alert>
          )}

          {isOfflineMode && (
            <Alert className="mb-6 bg-blue-50 border-blue-200">
              <Info className="h-4 w-4 text-blue-500" />
              <AlertTitle className="text-blue-700">
                Offline Mode Enabled
              </AlertTitle>
              <AlertDescription className="text-blue-600">
                Your payment intent will be saved locally and processed when the
                system load decreases. No penalties will be applied for deadline
                submissions.
              </AlertDescription>
            </Alert>
          )}

          {showSuccess && (
            <Alert className="mb-6 bg-green-50 border-green-200">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <AlertTitle className="text-green-700">
                {isOfflineMode ? 'Payment Intent Saved' : 'Payment Successful'}
              </AlertTitle>
              <AlertDescription className="text-green-600">
                {isOfflineMode
                  ? 'Your payment intent has been recorded. You’ll receive a confirmation once processed.'
                  : 'Your payment has been processed successfully. A receipt will be sent to your email.'}
              </AlertDescription>
            </Alert>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Payment Form</CardTitle>
              <CardDescription>
                {isOfflineMode
                  ? 'Submit your payment intent to be processed later'
                  : 'Make a secure payment for your service'}
              </CardDescription>
            </CardHeader>

            <form onSubmit={handleSubmit}>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="amount">Payment Amount</Label>
                    <Input
                      id="amount"
                      name="amount"
                      type="number"
                      placeholder="1000"
                      value={formData.amount}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="reference">
                      Reference Number (Optional)
                    </Label>
                    <Input
                      id="reference"
                      name="reference"
                      placeholder="e.g., Invoice #12345"
                      value={formData.reference}
                      onChange={handleInputChange}
                    />
                  </div>

                  {!isOfflineMode && (
                    <div className="mt-4 space-y-4">
                      <div className="bg-blue-50 p-4 rounded-md border border-blue-100">
                        <div className="flex items-center mb-3">
                          <CreditCard className="mr-2 h-5 w-5 text-blue-500" />
                          <h3 className="font-medium text-blue-700">
                            Payment Details
                          </h3>
                        </div>

                        <div className="space-y-3">
                          <div className="space-y-2">
                            <Label htmlFor="cardNumber">Card Number</Label>
                            <Input
                              id="cardNumber"
                              name="cardNumber"
                              placeholder="1234 5678 9012 3456"
                              value={formData.cardNumber}
                              onChange={handleInputChange}
                              maxLength={19}
                              className="font-mono"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-2">
                              <Label htmlFor="expiryDate">Expiry Date</Label>
                              <Input
                                id="expiryDate"
                                name="expiryDate"
                                placeholder="MM/YY"
                                value={formData.expiryDate}
                                onChange={handleInputChange}
                                maxLength={5}
                              />
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="cvv">CVV</Label>
                              <Input
                                id="cvv"
                                name="cvv"
                                type="password"
                                placeholder="123"
                                value={formData.cvv}
                                onChange={handleInputChange}
                                maxLength={4}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>

              <CardFooter>
                <Button
                  type="submit"
                  className="w-full bg-[#596235] text-white"
                  disabled={isSubmitting}
                >
                  {isSubmitting
                    ? 'Processing...'
                    : isOfflineMode
                    ? 'Save Payment Intent'
                    : 'Submit Payment'}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </>
      )}
    </div>
  );
};

export default PaymentForm;
