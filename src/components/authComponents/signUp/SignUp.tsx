import { zodResolver } from "@hookform/resolvers/zod"
import { Eye, EyeOff } from 'lucide-react'
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import * as z from "zod"
import { useMounted } from "../../../hooks/useMounted"
import Logo from "../../shared/logo/Logo"
import { Input } from "../../ui/input"
import { Button } from "../../ui/button"
import { Link } from "react-router-dom"
import { useRegisterMutation } from "../../../redux/apis/auth/authApi"
import Cookies from "js-cookie"
import { handleAsyncWithToast } from "../../../helper/handleAsyncWithToast"

// Form validation schema
const formSchema = z.object({
    name: z
        .string()
        .min(2, "Name must be at least 2 characters")
        .max(50, "Name must be less than 50 characters")
        .regex(/^[a-zA-Z\s]*$/, "Name can only contain letters and spaces"),
    email: z
        .string()
        .min(1, "Email is required")
        .email("Invalid email address"),
    password: z
        .string()
        .min(6, "Password must be at least 6 characters")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/[0-9]/, "Password must contain at least one number")
        .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),

})
type FormData = z.infer<typeof formSchema>

export default function SignupForm() {
    const [isLoading, setIsLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate()

    // Use the RTK query mutation hook
    const [register, { isLoading: isRegistering, error }] = useRegisterMutation()

    const {
        register: formRegister,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(formSchema),
    })

    const onSubmit = async (data: FormData) => {
        setIsLoading(true)
        try {
            await handleAsyncWithToast(
                async () => register({
                    userName: data.name,
                    email: data.email,
                    password: data.password,
                }).unwrap(),
                "verifying...",
            );
            // Call the register API mutation
            setIsLoading(false)
            // Redirect after successful registration
            Cookies.set('email', data.email)
            navigate("/otp")
        } catch (err) {
            setIsLoading(false)
            console.error("Registration failed:", err)
        }
    }

    const mounted = useMounted()
    if (!mounted) return null

    return (
        <div className="flex items-center justify-center">
            <div className="w-[300px] sm:w-[400px] p-6 rounded-md bg-gray-500 bg-opacity-15 backdrop-blur-xl backdrop-filter">
                <div className="pt-6">
                    <div className="flex flex-col items-center space-y-6">
                        <Logo />
                        <h1 className="text-white/90 text-center text-lg">
                            Sign up to Blu Primary Tournaments
                        </h1>
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="w-full space-y-4"
                        >
                            <div className="space-y-2">
                                <label className="text-sm text-white/70">
                                    Enter your Username
                                </label>
                                <Input
                                    {...formRegister("name")}
                                    className="bg-transparent border border-white/10 text-white placeholder:text-white/50"
                                    placeholder="Full name"
                                />
                                {errors.name && (
                                    <p className="text-red-500 text-sm">{errors.name.message}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm text-white/70">Email</label>
                                <Input
                                    {...formRegister("email")}
                                    type="email"
                                    className="bg-transparent border border-white/10 text-white placeholder:text-white/50"
                                    placeholder="Email address"
                                />
                                {errors.email && (
                                    <p className="text-red-500 text-sm">{errors.email.message}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm text-white/70">Password</label>
                                <div className="relative">
                                    <Input
                                        {...formRegister("password")}
                                        type={showPassword ? "text" : "password"}
                                        className="bg-transparent border border-white/10 text-white placeholder:text-white/50 pr-10"
                                        placeholder="Create password"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white/70"
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-4 w-4" />
                                        ) : (
                                            <Eye className="h-4 w-4" />
                                        )}
                                    </button>
                                </div>
                                {errors.password && (
                                    <p className="text-red-500 text-sm">{errors.password.message}</p>
                                )}
                            </div>
                            <Button
                                type="submit"
                                disabled={isRegistering || isLoading}
                                className="w-full h-10 bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white"
                            >
                                {isRegistering || isLoading ? "Signing up..." : "Sign up"}
                            </Button>

                            <p className="text-center text-white/50 text-sm">
                                Already have an account?{" "}
                                <Link to="/signIn" className="text-blue-400 hover:text-blue-300">
                                    Sign in
                                </Link>
                            </p>
                        </form>
                        {error && (
                            <p className="text-red-500 text-sm text-center mt-2">
                                Registration failed. Please try again.
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
