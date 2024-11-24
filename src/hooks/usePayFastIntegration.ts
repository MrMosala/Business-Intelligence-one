import { useState } from 'react';

interface User {
  firstName: string;
  lastName: string;
  email: string;
}

interface PaymentData {
  planName: string;
  price: number;
  user: User;
}

export function usePayFastIntegration() {
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // PayFast Sandbox Merchant Details
  const MERCHANT_ID = process.env.NEXT_PUBLIC_PAYFAST_MERCHANT_ID;
  const MERCHANT_KEY = process.env.NEXT_PUBLIC_PAYFAST_MERCHANT_KEY;
  const SANDBOX_MODE = true;

  const initiatePayment = async ({ planName, price, user }: PaymentData): Promise<void> => {
    setIsProcessing(true);
    setError(null);

    try {
      // Generate a unique payment ID
      const paymentId = `INV-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

      // Prepare the payment data
      const data = {
        merchant_id: MERCHANT_ID,
        merchant_key: MERCHANT_KEY,
        return_url: `${window.location.origin}/payment-success?m_payment_id=${paymentId}&amount=${price.toFixed(2)}&plan_name=${planName}`,
        cancel_url: `${window.location.origin}/payment-cancelled`,
        notify_url: `${process.env.NEXT_PUBLIC_PAYFAST_NOTIFY_URL_BASE}/auth/payfast-notify`, // You need to implement this endpoint
        name_first: user.firstName,
        name_last: user.lastName,
        email_address: user.email,
        m_payment_id: paymentId,
        amount: price.toFixed(2),
        item_name: `${planName} Plan Subscription`,
        item_description: `Subscription to ${planName} Plan`,
        custom_str1: planName,
      };

      // Create a form and submit it
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = SANDBOX_MODE
        ? 'https://sandbox.payfast.co.za/eng/process'
        : 'https://www.payfast.co.za/eng/process';

      for (const key in data) {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = data[key as keyof typeof data] ?? ''; // Ensure the value is a string 
        form.appendChild(input);
      }

      document.body.appendChild(form);
      form.submit();
    } catch (err) {
      setError('An error occurred while processing your payment. Please try again.');
      console.error('PayFast integration error:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  return { initiatePayment, isProcessing, error };
}