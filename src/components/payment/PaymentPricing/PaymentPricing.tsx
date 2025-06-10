import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAuthUser from "../../../hooks/useGetMe";
import CheckoutForm from "./CheckoutFrom";

// Stripe Elements wrapper
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export default function PaymentPricing() {
  const router = useNavigate();
  const location = useLocation();
  const path = location.pathname;

  // const { width, height } = useWindowSize();
  const clientSecret = path?.split("/")[2];

  const user = useAuthUser();

  useEffect(() => {
    if (!clientSecret) {
      router("/pricing");
    }
  }, [clientSecret, router]);

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <h1 className="text-3xl font-bold mb-6">Plan</h1>

      <Elements stripe={stripePromise} options={{ clientSecret }}>
        <CheckoutForm clientSecret={clientSecret} plan={{}} user={user} />
      </Elements>
    </div>
  );
}
