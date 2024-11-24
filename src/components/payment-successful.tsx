import React from "react";
import Link from "next/link";
import { CheckCircle, ArrowRight, Download, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export interface OrderDetails {
  planName: string;
  amount: number;
  orderId: string;
}

interface PaymentSuccessfulComponentProps {
  orderDetails: OrderDetails;
}

export function PaymentSuccessfulComponent({ orderDetails }: PaymentSuccessfulComponentProps) {
  const { planName, amount, orderId } = orderDetails;

  const handleDownloadReceipt = () => {
    // Implement receipt download logic
    console.log("Downloading receipt...");
  };

  const handleContactSupport = () => {
    // Implement contact support logic
    console.log("Contacting support...");
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <style jsx global>{`
        :root {
          --primary: 267 84% 40%;
          --primary-foreground: 0 0% 100%;
        }
      `}</style>
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-16 w-16 text-stone-900 dark:text-stone-50" />
          </div>
          <CardTitle className="text-3xl font-bold text-stone-900 dark:text-stone-50">Payment Successful!</CardTitle>
          <CardDescription className="text-xl">
            Thank you for your purchase. Your order has been processed successfully.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-stone-100 p-4 rounded-lg dark:bg-stone-800">
            <h3 className="font-semibold mb-2">Order Summary</h3>
            <p>Plan: {planName}</p>
            <p>Amount: R{amount.toFixed(2)}</p>
            <p>Order ID: #{orderId}</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Next Steps</h3>
            <ul className="list-disc list-inside space-y-2">
              <li>Check your email for a detailed receipt</li>
              <li>Set up your account and preferences</li>
              <li>Explore our getting started guide</li>
              <li>Contact support if you need any assistance</li>
            </ul>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button className="w-full bg-stone-900 text-stone-50 hover:bg-stone-900/90 dark:bg-stone-50 dark:text-stone-900 dark:hover:bg-stone-50/90">
            <Link href="/" className="flex items-center justify-center w-full">
              Go to Dashboard <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          {/* <div className="flex space-x-4 w-full">
            <Button variant="outline" className="flex-1" onClick={handleDownloadReceipt}>
              <Download className="mr-2 h-4 w-4" /> Download Receipt
            </Button>
            <Button variant="outline" className="flex-1" onClick={handleContactSupport}>
              <Mail className="mr-2 h-4 w-4" /> Contact Support
            </Button>
          </div> */}
        </CardFooter>
      </Card>
    </div>
  );
}