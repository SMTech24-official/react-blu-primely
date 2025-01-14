
import { zodResolver } from "@hookform/resolvers/zod"
import { Eye, EyeOff } from 'lucide-react'
import { useState } from "react"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import * as z from "zod"
import { useMounted } from "../../../hooks/useMounted"
import Logo from "../../shared/logo/Logo"
import { Button } from "../../ui/button"
import { Input } from "../../ui/input"

// Password validation schema
const passwordSchema = z.object({
    password: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/[0-9]/, "Password must contain at least one number")
        .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
})

type FormData = z.infer<typeof passwordSchema>

export default function NewPasswordForm() {
    const [isLoading, setIsLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(passwordSchema),
    })

    const onSubmit = async (data: FormData) => {
        setIsLoading(true)
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))
        console.log(data)
        setIsLoading(false)
        navigate("/signIn")
    }

    const mounted = useMounted()
    if (!mounted) return null

    return (
        <div className=" flex items-center justify-center">
            <div className="w-[300px] sm:w-[400px]  p-6 rounded-md bg-gray-500 bg-opacity-15 backdrop-blur-xl backdrop-filter">
                <div className="pt-6">
                    <div className="flex flex-col items-center space-y-6">
                        <Logo />
                        <h1 className="text-white/90 text-center text-lg">
                            Create New Password
                        </h1>
                        <p className="text-white/70 text-center text-sm">
                            Please enter your new password below.
                        </p>
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="w-full space-y-4"
                        >
                            <div className="space-y-2">
                                <label className="text-sm text-white/70">
                                    New Password
                                </label>
                                <div className="relative">
                                    <Input
                                        {...register("password")}
                                        type={showPassword ? "text" : "password"}
                                        className="bg-transparent border border-white/10 text-white placeholder:text-white/50 pr-10"
                                        placeholder="Enter new password"
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

                            <div className="space-y-2">
                                <label className="text-sm text-white/70">
                                    Confirm New Password
                                </label>
                                <div className="relative">
                                    <Input
                                        {...register("confirmPassword")}
                                        type={showConfirmPassword ? "text" : "password"}
                                        className="bg-transparent border border-white/10 text-white placeholder:text-white/50 pr-10"
                                        placeholder="Confirm new password"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white/70"
                                    >
                                        {showConfirmPassword ? (
                                            <EyeOff className="h-4 w-4" />
                                        ) : (
                                            <Eye className="h-4 w-4" />
                                        )}
                                    </button>
                                </div>
                                {errors.confirmPassword && (
                                    <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
                                )}
                            </div>

                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="w-full h-10 bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white"
                            >
                                {isLoading ? "Updating..." : "Update Password"}
                            </Button>

                            <p className="text-center text-white/50 text-sm">
                                <Link to="/signIn" className="text-blue-400 hover:text-blue-300">
                                    Back to Login
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

