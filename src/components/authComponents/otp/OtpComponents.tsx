"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Suspense, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import * as z from "zod";
import { useMounted } from "../../../hooks/useMounted";
import Logo from "../../shared/logo/Logo";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { useVerifyOtpMutation } from "../../../redux/apis/auth/authApi";
import Cookies from "js-cookie";

// OTP validation schema
const otpSchema = z.object({
    otp: z.string().length(4, "OTP must be 4 digits").regex(/^\d+$/, "OTP must contain only numbers"),
});

type FormData = z.infer<typeof otpSchema>;

function OtpVerificationComponent() {
    const [isLoading, setIsLoading] = useState(false);
    const query = useSearchParams();
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(otpSchema),
    });

    const [verifyOtp] = useVerifyOtpMutation(); // API hook for verifyOtp

    const onSubmit = async (data: FormData) => {
        console.log(data);
        setIsLoading(true);
        const email = Cookies.get("email")
        try {
            const response = await verifyOtp({ email: email!, otp: data.otp }).unwrap(); // replace with dynamic email value if needed

            if (response.success) {
                // Save the accessToken if needed (e.g., in context or localStorage)
                // Navigate based on query parameter
                if (query.toString() === "t=forget-password") {
                    navigate(`/change-password`);
                } else {
                    navigate(`/signIn`);
                }
            } else {
                // Handle failed OTP verification (e.g., show error message)
                console.error("OTP verification failed", response);
            }
        } catch (error) {
            console.error("Error verifying OTP", error);
        } finally {
            setIsLoading(false);
        }
    };

    const mounted = useMounted();
    if (!mounted) return null;

    return (
        <div className="flex items-center justify-center">
            <div className="w-[300px] sm:w-[400px] p-6 rounded-md bg-gray-500 bg-opacity-15 backdrop-blur-xl backdrop-filter">
                <div className="pt-6">
                    <div className="flex flex-col items-center space-y-6">
                        <Logo />
                        <h1 className="text-white/90 text-center text-lg">Enter OTP</h1>
                        <p className="text-white/70 text-center text-sm">
                            We&apos;ve sent a 4-digit code to your email. Please enter it below to verify your account.
                        </p>
                        <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm text-white/70">Enter 4-digit OTP</label>
                                <Input
                                    {...register("otp")}
                                    className="bg-transparent border border-white/10 text-white placeholder:text-white/50 text-center text-2xl tracking-widest"
                                    placeholder="0000"
                                    maxLength={4}
                                />
                                {errors.otp && (
                                    <p className="text-red-500 text-sm">{errors.otp.message}</p>
                                )}
                            </div>
                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="w-full h-10 bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white"
                            >
                                {isLoading ? "Verifying..." : "Verify OTP"}
                            </Button>
                            <div className="text-center space-y-2">
                                <p className="text-white/50 text-sm">
                                    Didn&apos;t receive the code?{" "}
                                    <Button variant="link" className="text-blue-400 hover:text-blue-300 p-0">
                                        Resend OTP
                                    </Button>
                                </p>
                                <p className="text-white/50 text-sm">
                                    <Link to="/signUp" className="text-blue-400 hover:text-blue-300">
                                        Go back to Sign up
                                    </Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function OtpVerification() {
    return (
        <Suspense fallback={<div className="text-white text-center">Loading...</div>}>
            <OtpVerificationComponent />
        </Suspense>
    );
}
