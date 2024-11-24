import { useState } from "react"
import { Check, HelpCircle, AlertCircle, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { usePayFastIntegration } from "@/hooks/usePayFastIntegration"
import { useSession } from "next-auth/react"

interface Plan {
  name: string;
  price: {
    monthly: number;
    annual: number;
  };
  features: string[];
  popular: boolean;
}

interface Testimonial {
  name: string;
  text: string;
  business: string;
}

const plans: Plan[] = [
  {
    name: "Basic",
    price: { monthly: 299, annual: 2999 },
    features: [
      "Basic market insights",
      "Access to general resources",
      "Email support",
      "1 user"
    ],
    popular: false,
  },
  {
    name: "Pro",
    price: { monthly: 599, annual: 6109 },
    features: [
      "In-depth market analysis",
      "Competitor insights",
      "Basic integrations",
      "Priority email support",
      "Up to 5 users"
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    price: { monthly: 1199, annual: 12229 },
    features: [
      "Comprehensive analytics",
      "Personalized consulting",
      "Advanced integrations",
      "Dedicated account manager",
      "24/7 support",
      "Custom user limits"
    ],
    popular: false,
  },
];

const testimonials: Testimonial[] = [
  {
    name: "Sarah K.",
    text: "Thanks to Business Intelligence, I launched my café with confidence!",
    business: "Café Owner"
  },
  {
    name: "John D.",
    text: "The insights provided helped us double our revenue in just 6 months.",
    business: "E-commerce Entrepreneur"
  },
  {
    name: "Lisa M.",
    text: "The competitor analysis feature is a game-changer for our marketing strategy.",
    business: "Marketing Director"
  }
];

export function PricingComponentComponent() {
  const [isAnnual, setIsAnnual] = useState<boolean>(false);
  const { initiatePayment, isProcessing, error } = usePayFastIntegration();
  const { data: session, status } = useSession();

  const handleStartTrial = (plan: Plan) => {
    if (session?.user) {
      initiatePayment({
        planName: plan.name,
        price: isAnnual ? plan.price.annual : plan.price.monthly,
        user: session.user
      });
    } else {
      console.error("User is not logged in");
      // Handle the case where the user is not logged in
    }
  };
 
  return (
    <div className="container mx-auto px-4 py-8">
      <style jsx global>{`
        :root {
          --primary: 267 84% 40%;
          --primary-foreground: 0 0% 100%;
        }
      `}</style>
      <h1 className="text-3xl font-bold text-center mb-8 text-primary-900 dark:text-primary-50">Choose Your Business Intelligence Plan</h1>
      
      <div className="flex justify-center items-center mb-8">
        <Label htmlFor="billing-toggle" className="mr-2">Monthly</Label>
        <Switch
          id="billing-toggle"
          checked={isAnnual}
          onCheckedChange={setIsAnnual}
        />
        <Label htmlFor="billing-toggle" className="ml-2">Annual (Save 15%)</Label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        {plans.map((plan) => (
          <Card key={plan.name} className={`relative overflow-hidden transition-all duration-300 ${plan.popular ? "border-primary shadow-lg scale-105" : ""}`}>
            {plan.popular && (
              <Badge className="absolute top-4 right-4" variant="secondary">
                Most Popular
              </Badge>
            )}
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              <CardDescription>
                <span className="text-3xl font-bold">
                  R{isAnnual ? plan.price.annual : plan.price.monthly}
                </span>
                {isAnnual ? "/year" : "/month"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-primary-900 dark:text-primary-50" />
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button onClick={() => handleStartTrial(plan)} className="w-full bg-primary-900 text-primary-50 hover:bg-primary-900/90 dark:bg-stone-50 dark:text-primary-900 dark:hover:bg-stone-50/90">{isProcessing ? "Processing..." : "Start Plan"}</Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full">Learn More</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{plan.name} Plan Details</DialogTitle>
                    <DialogDescription>
                      Discover how our {plan.name} plan can boost your business.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="mt-4">
                    <h4 className="font-semibold mb-2">Key Features:</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      {plan.features.map((feature) => (
                        <li key={feature}>{feature}</li>
                      ))}
                    </ul>
                    <p className="mt-4">
                      Perfect for {plan.name === "Basic" ? "small businesses and startups" : 
                                    plan.name === "Pro" ? "growing companies and established brands" : 
                                    "large enterprises and industry leaders"}.
                    </p>
                  </div>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-center text-primary-900 dark:text-primary-50">Why Choose Business Intelligence?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{testimonial.name}</CardTitle>
                <CardDescription>{testimonial.business}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>&ldquo;{testimonial.text}&rdquo;</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-center text-primary-900 dark:text-primary-50">Plan Comparison</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Feature</TableHead>
              <TableHead>Basic</TableHead>
              <TableHead>Pro</TableHead>
              <TableHead>Enterprise</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Market Insights</TableCell>
              <TableCell>Basic</TableCell>
              <TableCell>In-depth</TableCell>
              <TableCell>Comprehensive</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>User Limit</TableCell>
              <TableCell>1</TableCell>
              <TableCell>Up to 5</TableCell>
              <TableCell>Custom</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Support</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Priority Email</TableCell>
              <TableCell>24/7 Dedicated</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Integrations</TableCell>
              <TableCell><X className="text-red-500" /></TableCell>
              <TableCell>Basic</TableCell>
              <TableCell>Advanced</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Consulting</TableCell>
              <TableCell><X className="text-red-500" /></TableCell>
              <TableCell><X className="text-red-500" /></TableCell>
              <TableCell>Personalized</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-4 text-primary-900 dark:text-primary-50">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline">
                  How does the free trial work? <HelpCircle className="ml-2 h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>You can try any plan free for 14 days. No credit card required.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      <div className="text-center mb-8">
        <h3 className="text-xl font-semibold mb-2 text-primary-900 dark:text-primary-50">Estimate Your ROI</h3>
        <p>Our insights typically result in a 20-30% increase in revenue for our clients.</p>
        <Button className="mt-4 bg-primary-900 text-primary-50 hover:bg-primary-900/90 dark:bg-stone-50 dark:text-primary-900 dark:hover:bg-stone-50/90">Contact Us for a Personalized ROI Analysis</Button>
      </div>

      <div className="flex justify-center items-center space-x-4 mb-8">
        <Badge variant="outline">30-Day Money Back Guarantee</Badge>
        <Badge variant="outline">GDPR Compliant</Badge>
        <Badge variant="outline">256-bit SSL Encryption</Badge>
      </div>

      <div className="text-center text-sm text-primary-500 dark:text-primary-400">
        <p>Prices are in ZAR. VAT may apply. By subscribing you agree to our Terms of Service and Privacy Policy.</p>
      </div>
    </div>
  )
}