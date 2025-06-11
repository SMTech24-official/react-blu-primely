/* eslint-disable @typescript-eslint/no-explicit-any */
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Input } from "../../ui/input";

const CheckoutForm = ({
  clientSecret,
  user,
}: {
  clientSecret: string;
  user: any;
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [stripeError, setStripeError] = useState<string | null>(null);
  const router = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: user?.fullName || user?.userName || "",
      address: "",
      additional: "",
      region: "",
      zipCode: "",
    },
  });

  const onSubmit = async (data: any) => {
    if (!stripe || !elements) {
      return;
    }

    setStripeError(null);

    try {
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement)!,
            billing_details: {
              name: user?.fullName || user?.userName,
              address: {
                line1: data.address,
                city: data.region,
                postal_code: data.zipCode,
                country: "US",
              },
              email: user?.email,
            },
          },
        }
      );
      console.log(paymentIntent);
      if (error) {
        setStripeError(error.message || "Payment failed");
      } else if (paymentIntent?.status === "succeeded") {
        toast.success("Payment Successful");
        router("/confirmation");
      }
    } catch (err) {
      setStripeError("An unexpected error occurred");
      console.error(err);
    }
  };

  const cardElementOptions = {
    style: {
      base: {
        fontSize: "16px",
        color: "#ffffff",
        backgroundColor: "transparent",
        fontFamily: "ui-sans-serif, system-ui, sans-serif",
        "::placeholder": {
          color: "#9ca3af",
        },
      },
      invalid: {
        color: "#ef4444",
      },
      complete: {
        color: "#10b981",
      },
    },
    hidePostalCode: true,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
            Complete Your Purchase
          </h1>
          <p className="text-gray-400 text-lg">
            Secure checkout powered by Stripe
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid lg:grid-cols-2 gap-8"
        >
          {/* Left column - Billing Info */}
          <div className="space-y-6">
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 sm:p-8 shadow-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-semibold text-white">
                  Billing Information
                </h2>
              </div>

              <div className="space-y-6">
                <div className="space-y-3">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-300"
                  >
                    Full Name <span className="text-red-400">*</span>
                  </label>
                  <Controller
                    name="name"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Input
                        id="name"
                        {...field}
                        type="text"
                        value={user?.fullName || user?.userName || ""}
                        className="w-full p-4 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                        placeholder="Enter your full name"
                      />
                    )}
                  />
                  {errors.name && (
                    <p className="text-red-400 text-sm flex items-center gap-1">
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Name is required
                    </p>
                  )}
                </div>

                <div className="space-y-3">
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium text-gray-300"
                  >
                    Street Address <span className="text-red-400">*</span>
                  </label>
                  <Controller
                    name="address"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Input
                        id="address"
                        {...field}
                        type="text"
                        className="w-full p-4 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                        placeholder="Enter your street address"
                      />
                    )}
                  />
                  {errors.address && (
                    <p className="text-red-400 text-sm flex items-center gap-1">
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Address is required
                    </p>
                  )}
                </div>

                <div className="space-y-3">
                  <label
                    htmlFor="additional"
                    className="block text-sm font-medium text-gray-300"
                  >
                    Additional Information
                  </label>
                  <Controller
                    name="additional"
                    control={control}
                    render={({ field }) => (
                      <textarea
                        id="additional"
                        {...field}
                        className="w-full p-4 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 min-h-[120px] resize-none"
                        placeholder="Any special instructions or notes..."
                      />
                    )}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right column - Payment */}
          <div className="space-y-6">
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 sm:p-8 shadow-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-semibold text-white">
                  Payment Method
                </h2>
              </div>

              <div className="space-y-6">
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-gray-300">
                    Card Information <span className="text-red-400">*</span>
                  </label>
                  <div className="p-4 bg-gray-700/50 border border-gray-600 rounded-xl focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all duration-200">
                    <CardElement options={cardElementOptions} />
                  </div>
                </div>

                {stripeError && (
                  <div className="p-4 bg-red-900/20 border border-red-500/30 rounded-xl">
                    <div className="flex items-center gap-2 text-red-400">
                      <svg
                        className="w-5 h-5 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="font-medium">{stripeError}</span>
                    </div>
                  </div>
                )}

                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-gray-300">
                    Billing Address <span className="text-red-400">*</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <label
                        htmlFor="region"
                        className="block text-sm font-medium text-gray-400"
                      >
                        City/Region
                      </label>
                      <Controller
                        name="region"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                          <Input
                            id="region"
                            {...field}
                            type="text"
                            className="w-full p-4 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                            placeholder="City or region"
                          />
                        )}
                      />
                      {errors.region && (
                        <p className="text-red-400 text-sm flex items-center gap-1">
                          <svg
                            className="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Required
                        </p>
                      )}
                    </div>

                    <div className="space-y-3">
                      <label
                        htmlFor="zipCode"
                        className="block text-sm font-medium text-gray-400"
                      >
                        ZIP Code
                      </label>
                      <Controller
                        name="zipCode"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                          <Input
                            id="zipCode"
                            {...field}
                            type="text"
                            className="w-full p-4 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                            placeholder="ZIP code"
                          />
                        )}
                      />
                      {errors.zipCode && (
                        <p className="text-red-400 text-sm flex items-center gap-1">
                          <svg
                            className="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Required
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={!stripe}
                  className="w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-600 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-[1.02] hover:shadow-xl disabled:hover:scale-100 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {!stripe ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Loading...
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                      </svg>
                      Complete Secure Payment
                    </>
                  )}
                </button>

                <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                  Secured by 256-bit SSL encryption
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutForm;
