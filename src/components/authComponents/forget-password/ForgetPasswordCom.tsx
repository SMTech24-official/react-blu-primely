import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { handleAsyncWithToast } from "../../../helper/handleAsyncWithToast";
import { useMounted } from "../../../hooks/useMounted";
import { useForgotPasswordMutation } from "../../../redux/apis/auth/authApi";
import Logo from "../../shared/logo/Logo";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";


// Form validation schema
const formSchema = z.object({
    email: z.string().min(1, "Email is required").email("Invalid email address"),
});

type FormData = z.infer<typeof formSchema>;

export default function ForgetPasswordPage() {
    const [isLoading, setIsLoading] = useState(false);
    // const navigate = useNavigate();
    const [forgotPassword] = useForgotPasswordMutation(); // Mutation hook

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(formSchema),
    });

    const onSubmit = async (data: FormData) => {
        setIsLoading(true);
        try {
            await handleAsyncWithToast(
                () => forgotPassword(data).unwrap(),
                "Sending reset link...",
                "Password reset link sent successfully!",
                "Failed to send reset link. Please try again."
            );
            // navigate("/otp?t=forget-password");
        } finally {
            setIsLoading(false);
        }
    };

    const mounted = useMounted();
    if (!mounted) return null;

    return (
        <div className="flex items-center justify-center">
            <div className="w-[300px] sm:w-[400px] bg-transparent border-0 p-6 bg-gray-600 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-40 border-gray-100">
                <div className="pt-6">
                    <div className="flex flex-col items-center space-y-6">
                        <Logo />
                        <h1 className="text-white/90 text-center text-lg">
                            Recover Your Account!
                        </h1>
                        <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm text-white/70">
                                    Please Enter your Email
                                </label>
                                <Input
                                    {...register("email")}
                                    className="bg-transparent border border-white/10 text-white placeholder:text-white/50"
                                    placeholder="Email"
                                />
                                {errors.email && (
                                    <p className="text-red-500 text-sm">{errors.email.message}</p>
                                )}
                            </div>

                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="w-full h-10 bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white"
                            >
                                {isLoading ? "Verifying..." : "Verify"}
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
