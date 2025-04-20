
export interface PaymentDetails {
    cardNumber: string;
    expiryDate: string;
    cvv: string;
    amount: string;
    name: string;
    email: string;
    reference?: string;
  }
  
  export interface PaymentResponse {
    success: boolean;
    transactionId?: string;
    message: string;
    timestamp: string;
  }
  
  // Simulates payment processing with artificial delays and basic validation
  export const processPayment = (details: PaymentDetails): Promise<PaymentResponse> => {
    return new Promise((resolve, reject) => {
      // Basic validation
      if (!details.cardNumber || !details.expiryDate || !details.cvv) {
        reject({
          success: false,
          message: 'Missing payment details',
          timestamp: new Date().toISOString()
        });
        return;
      }
  
      // Simulated processing with a delay (1-3 seconds)
      const processingTime = 1000 + Math.random() * 2000;
      
      setTimeout(() => {
        // Success rate: 90% for valid-looking cards
        const isSuccessful = Math.random() < 0.9 && 
          details.cardNumber.replace(/\s/g, '').length === 16 &&
          details.cvv.length >= 3;
        
        if (isSuccessful) {
          resolve({
            success: true,
            transactionId: `TXN${Date.now()}`,
            message: 'Payment processed successfully',
            timestamp: new Date().toISOString()
          });
        } else {
          reject({
            success: false,
            message: 'Payment failed. Please try again or contact your bank.',
            timestamp: new Date().toISOString()
          });
        }
      }, processingTime);
    });
  };
  
  // Simulates storing offline payment intents
  export const storeOfflinePayment = (details: Omit<PaymentDetails, 'cardNumber' | 'expiryDate' | 'cvv'>): {
    success: boolean;
    intentId: string;
  } => {
    const intentId = `INTENT-${Date.now()}`;
    const paymentIntent = {
      ...details,
      intentId,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    
    // Store in localStorage (in a real app, this would go to a database)
    const existingIntents = JSON.parse(localStorage.getItem('offlinePaymentIntents') || '[]');
    existingIntents.push(paymentIntent);
    localStorage.setItem('offlinePaymentIntents', JSON.stringify(existingIntents));
    
    return {
      success: true,
      intentId
    };
  };
  