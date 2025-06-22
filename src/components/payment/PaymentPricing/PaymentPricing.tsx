import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import useAuthUser from "../../../hooks/useGetMe";
import CheckoutForm from "./CheckoutFrom";

// Stripe Elements wrapper
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY!);

export default function PaymentPricing() {
  const location = useLocation();

  const clientSecret = useMemo(() => {
    const searchParams = new URLSearchParams(location.search);
    return searchParams.get("clientSecret");
  }, [location.search]);

  // Fixed: was getting "clientSecret" instead of "tournamentsId"
  const tournamentsId = useMemo(() => {
    const searchParams = new URLSearchParams(location.search);
    return searchParams.get("tournamentsId") ?? ""; // Ensure it's always a string
  }, [location.search]);

  const clanId = useMemo(() => {
    const searchParams = new URLSearchParams(location.search);
    return searchParams.get("clanId");
  }, [location.search]);

  const userId = useMemo(() => {
    const searchParams = new URLSearchParams(location.search);
    return searchParams.get("userId");
  }, [location.search]);

  // Conditional logic: create joinData with only one ID
  const joinData:
    { tournamentId: string; userId?: string; clanId?: string }
    = useMemo(() => {
      if (userId) {
        return { tournamentId: tournamentsId, userId };
      } else if (clanId) {
        return { tournamentId: tournamentsId, clanId };
      }
      return { tournamentId: tournamentsId };
    }, [tournamentsId, userId, clanId]);

  const { user } = useAuthUser();

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <h1 className="text-3xl font-bold mb-6">Plan</h1>

      <Elements
        stripe={stripePromise}
        options={{ clientSecret: clientSecret ? clientSecret : "" }}
      >
        <CheckoutForm
          clientSecret={clientSecret ? clientSecret : ""}
          joinData={joinData}
          user={user}
        />
      </Elements>
    </div>
  );
}