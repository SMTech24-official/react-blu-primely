import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAuthUser from "../../../hooks/useGetMe";
import CheckoutForm from "./CheckoutFrom";

// Stripe Elements wrapper
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY!);

export default function PaymentPricing() {
  const router = useNavigate();
  const location = useLocation();

  const clientSecret = useMemo(() => {
    const searchParams = new URLSearchParams(location.search);
    return searchParams.get("clientSecret");
  }, [location.search]);

  const { user } = useAuthUser();

  useEffect(() => {
    if (!clientSecret) {
      router("/pricing");
    }
  }, [clientSecret, router]);

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <h1 className="text-3xl font-bold mb-6">Plan</h1>

      <Elements
        stripe={stripePromise}
        options={{ clientSecret: clientSecret ? clientSecret : "" }}
      >
        {/* Pass the clientSecret to the CheckoutForm component */}
        {/* You can also pass the plan and user data if needed */}
        <CheckoutForm
          clientSecret={clientSecret ? clientSecret : ""}
          user={user}
        />
      </Elements>
    </div>
  );
}
