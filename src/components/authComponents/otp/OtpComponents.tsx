/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { useVerifyOtpMutation, useSendOtpMutation } from "../../../redux/apis/auth/authApi";
import Cookies from "js-cookie";
import { toast } from "sonner";

// OTP validation schema
const otpSchema = z.object({
    otp: z.string().length(4, "OTP must be 4 digits").regex(/\d+$/, "OTP must contain only numbers"),
});

type FormData = z.infer<typeof otpSchema>;

function OtpVerificationComponent() {
    const [isLoading, setIsLoading] = useState(false);
    const [isResending, setIsResending] = useState(false);
    const [message, setMessage] = useState("");
    const query = useSearchParams();
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(otpSchema),
    });

    const [verifyOtp] = useVerifyOtpMutation(); // API hook for verifyOtp
    const [sendOtp] = useSendOtpMutation(); // API hook for resend OTP

    const onSubmit = async (data: FormData) => {
        setIsLoading(true);
        const email = Cookies.get("email");
        try {
            const response = await verifyOtp({ email: email!, otp: data.otp }).unwrap();
            if (response.success) {
                if (query.toString() === "t=forget-password") {
                    navigate(`/change-password`);
                } else {
                    navigate(`/signIn`);
                }
            }
        } catch (error: any) {
            toast.error(error?.data.message || "Error verifying OTP")
        } finally {
            setIsLoading(false);
        }
    };

    const handleResendOtp = async () => {
        setIsResending(true);
        setMessage("");
        const email = Cookies.get("email");
        try {
            const response = await sendOtp({ email: email! }).unwrap();
            if (response.success) {
                setMessage("OTP sent successfully!");
            }
        } catch (error) {
            setMessage("Failed to resend OTP. Please try again.");
            console.error("Error resending OTP", error);
        } finally {
            setIsResending(false);
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
                        {message && <p className="text-green-400 text-center text-sm">{message}</p>}
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
                                    <Button
                                        variant="link"
                                        className="text-blue-400 hover:text-blue-300 p-0"
                                        onClick={handleResendOtp}
                                        disabled={isResending}
                                    >
                                        {isResending ? "Resending..." : "Resend OTP"}
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
