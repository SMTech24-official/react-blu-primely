/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from "@hookform/resolvers/zod"
import { Eye, EyeOff } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import * as z from "zod"
import { useMounted } from "../../../hooks/useMounted"
import Logo from "../../shared/logo/Logo"
import { Input } from "../../ui/input"
import { Link } from "react-router-dom"
import { Button } from "../../ui/button"
import { useLoginMutation } from "../../../redux/apis/auth/authApi"
import Cookies from "js-cookie"
import { jwtDecode } from "jwt-decode";
import { useAppDispatch } from "../../../redux/hooks"
import { setUser } from "../../../redux/slice/auth/authSlice"
import { toast } from "sonner"
// Form validation schema
const formSchema = z.object({
    email: z.string().email("Invalid email address").min(1, "Email is required"),
    password: z
        .string()
        .min(6, "Password must be at least 6 characters")
})

type FormData = z.infer<typeof formSchema>

export default function SignInForm() {
    const [isLoading, setIsLoading] = useState(false)

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(formSchema),
    })

    const [showPassword, setShowPassword] = useState(false)

    const navigate = useNavigate()

    const [login] = useLoginMutation()  // Use login mutation hook
    const dispatch = useAppDispatch()

    const onSubmit = async (data: FormData) => {
        setIsLoading(true)
        try {
            // Call the login mutation
            const response = await login(data).unwrap()

            // Handle successful login (store token, redirect, etc.)

            if (response?.data.accessToken) {
                Cookies.set('token', response?.data.accessToken)
                const decodedUser = jwtDecode(response.data.accessToken as string) as { userName: string };
                dispatch(setUser({ decodedUser, token: response.data.accessToken })); // Store user in Redux
                toast.success(`Welcome ${decodedUser.userName}`);
                navigate("/") // Redirect to home or dashboard after login
            }

            // toast.success("User Logged In Succes")

        } catch (error: any) {
            toast.error(error.data.message)
            // Handle errors (e.g., display an error message)
        } finally {
            setIsLoading(false)
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
                            Welcome back to Blu Primal Tournaments
                        </h1>
                        <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm text-white/70">Enter your email</label>
                                <Input
                                    {...register("email")}
                                    className="bg-transparent border border-white/10 text-white placeholder:text-white/50"
                                    placeholder="Email"
                                />
                                {errors.email && (
                                    <p className="text-red-500 text-sm">{errors.email.message}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm text-white/70">Password</label>
                                <div className="relative">
                                    <Input
                                        {...register("password")}
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

                            <div className="text-right w-full">
                                <Link to="/forget-password" className="text-blue-400 hover:text-blue-300 ">
                                    Forget Password?
                                </Link>
                            </div>

                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="w-full h-10 bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white"
                            >
                                {isLoading ? "Logging in..." : "Log In"}
                            </Button>

                            <p className="text-center text-white/50 text-sm">
                                Don&apos;t have an account?{" "}
                                <Link to="/signUp" className="text-blue-400 hover:text-blue-300">
                                    Sign up
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
