import React from "react";
import Link from "next/link";
import { XCircle, ArrowRight, HelpCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function PaymentCancelledComponent(): JSX.Element {
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
            <XCircle className="h-16 w-16 text-red-500" />
          </div>
          <CardTitle className="text-3xl font-bold text-red-500">Payment Cancelled</CardTitle>
          <CardDescription className="text-xl">
            Your payment was not completed. Don&apos;t worry, you haven&apos;t been charged.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Alert>
            <AlertTitle>What happened?</AlertTitle>
            <AlertDescription>
              The payment process was cancelled before completion. This could be due to:
              <ul className="list-disc list-inside mt-2">
                <li>Closing the payment window</li>
                <li>Clicking the &ldquo;Cancel&rdquo; button during payment</li>
                <li>A timeout in the payment process</li>
                <li>Technical issues with the payment provider</li>
              </ul>
            </AlertDescription>
          </Alert>
          <div>
            <h3 className="font-semibold mb-2">What you can do now:</h3>
            <ul className="list-disc list-inside space-y-2">
              <li>Try the payment process again</li>
              <li>Check your internet connection</li>
              <li>Ensure your payment method is valid</li>
              <li>Contact our support team if you need assistance</li>
            </ul>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button className="w-full bg-stone-900 text-stone-50 hover:bg-stone-900/90 dark:bg-stone-50 dark:text-stone-900 dark:hover:bg-stone-50/90">
            <Link href="/upgrade" className="flex items-center justify-center w-full">
              Try Payment Again <RefreshCw className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <div className="flex space-x-4 w-full">
            <Button variant="outline" className="flex-1">
              <Link href="/" className="flex items-center justify-center w-full">
                <ArrowRight className="mr-2 h-4 w-4" /> Return to Home
              </Link>
            </Button>
            <Button variant="outline" className="flex-1">
            <Link href="/support" className="flex items-center justify-center w-full">
                <HelpCircle className="mr-2 h-4 w-4" /> Get Help
              </Link>
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}