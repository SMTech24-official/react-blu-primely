// import NotFoundAnimation from "@/assets/animation/Animation - 1735992759257.json"
import NotFoundAnimation from "../../assets/animation/Animation - 1735992759257.json"

import Lottie from "lottie-react"
import { Home } from 'lucide-react'
import { Button } from "../ui/button"
import { Link } from "react-router-dom"

export default function NotFound() {





    return (
        <div className="min-h-screen bg-[#0F0817] flex flex-col items-center justify-center p-4">
            <div className="max-w-md w-full text-center space-y-8">
                {/* Game Over Text */}
                <Lottie className=" h-[400px]" animationData={NotFoundAnimation} loop={true} />

                {/* Error Message */}
                <div className="space-y-4">
                    <p className="text-gray-500">
                        The page you&apos;re looking for has respawned in another castle
                    </p>
                </div>

                {/* Game Stats Box */}
                <div className="bg-[#1a1024] p-6 rounded-lg border border-purple-900">
                    <div className="space-y-2 text-left">
                        <p className="text-gray-400">
                            <span className="text-purple-400">Score:</span> 404 points
                        </p>
                        <p className="text-gray-400">
                            <span className="text-purple-400">Level:</span> Page Not Found
                        </p>
                        <p className="text-gray-400">
                            <span className="text-purple-400">Status:</span> Lost in cyberspace
                        </p>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                        asChild
                        className="bg-purple-600 hover:bg-purple-700 text-white"
                    >
                        <Link to="/">
                            <Home className="mr-2 h-4 w-4" />
                            Return to Base
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}

