// import loading from "@/assets/animation/Animation - 1735970906489.json";
import loading from "../../assets/animation/Animation - 1735970906489.json";

import Lottie from "lottie-react";
import { Home } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { Button } from "../ui/button";
import { Link } from "react-router-dom";




const UnderConstructionTwo = () => {
    const location = useLocation(); // Get the current location
    const path = location.pathname; // Extract the pathname
    return (
        <div className="min-h-screen bg-[#0F0817] flex flex-col items-center justify-center p-4">
            <div className="max-w-lg w-full text-center space-y-5">
                {/* Loading Animation */}
                {/* <iframe src="https://lottie.host/embed/0a63c8d9-bd7c-42d3-8434-990459da3ed7/qQmpxffOOE.lottie"></iframe> */}
                <Lottie className="" animationData={loading} loop={true} />
                {/* Title */}
                <div className="space-y-2">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 text-transparent bg-clip-text capitalize">
                        {path.split("/")[1]} page is <br /> Under Construction
                    </h1>
                    <p className="text-gray-400 text-lg">
                        We are developing this page
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                        asChild
                        className="bg-purple-600 hover:bg-purple-700 text-white"
                    >
                        <Link to="/">
                            <Home className="mr-2 h-4 w-4" />
                            Return to Homepage
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default UnderConstructionTwo;