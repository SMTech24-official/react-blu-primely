import { MessageCircle } from 'lucide-react'
import Logo from "../logo/Logo"

import stripe from "@/assets/payment/LOGO-850-stripe-removebg-preview.png"



import facebook from "@/assets/social/facebook_5968764.png"
import google from "@/assets/social/google_13170545.png"
import tiktok from "@/assets/social/tiktok.png"
import { Link } from 'react-router-dom'
import { AnimatedTooltip } from '../../ui/animated-tooltip'
import { Button } from '../../ui/button'

export default function Footer() {

    const payment = [
        {
            id: 1,
            tooltip: "Stripe",
            image: stripe,
        },
        // {
        //     id: 2,
        //     tooltip: "Apple Pay",
        //     image: applePay,
        // },
        // {
        //     id: 3,
        //     tooltip: "Mastercard",
        //     image: masterPay,
        // },
    ]

    const social = [
        {
            id: 1,
            tooltip: "Google",
            image: google,
        },
        {
            id: 2,
            tooltip: "Facebook",
            image: facebook,
        },
        {
            id: 3,
            tooltip: "TikTOk",
            image: tiktok,
        },
    ]

    return (
        <footer className="bg-black text-white w-full py-8">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 xl:grid-cols-6 sm:grid-cols-3 md:grid-cols-5 gap-8">
                    {/* Logo and Copyright Notice */}
                    <div className="space-y-4">
                        <Logo />
                        <p className="text-sm text-gray-400">
                            All content, games titles, trade names and/or trade dress, trademarks, artwork and associated imagery are trademarks and/or copyright material of their respective owners
                        </p>
                    </div>

                    {/* Competitions */}
                    <div>
                        <h3 className="font-bold mb-4 uppercase">Competitions</h3>
                        <ul className="space-y-2">
                            <li><Link to="#" className="text-gray-400 hover:text-white">Tournaments</Link></li>
                            <li><Link to="#" className="text-gray-400 hover:text-white">Space Battle Royale</Link></li>
                            <li><Link to="#" className="text-gray-400 hover:text-white">Free Fire</Link></li>
                            <li><Link to="#" className="text-gray-400 hover:text-white">Fortnite</Link></li>
                            <li><Link to="#" className="text-gray-400 hover:text-white">Galactic Battle</Link></li>
                            <li><Link to="#" className="text-gray-400 hover:text-white">Zelda</Link></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="font-bold mb-4 uppercase">Support</h3>
                        <ul className="space-y-2">
                            <li><Link to="#" className="text-gray-400 hover:text-white">Ticket Center</Link></li>
                            <li><Link to="#" className="text-gray-400 hover:text-white">FAQ</Link></li>
                            <li><Link to="#" className="text-gray-400 hover:text-white">About us</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="font-bold mb-4 uppercase">Contact</h3>
                        <ul className="space-y-2">
                            <li><Link to="#" className="text-gray-400 hover:text-white">Press Inquiries</Link></li>
                            <li><Link to="#" className="text-gray-400 hover:text-white">Advertisements</Link></li>
                            <li><Link to="#" className="text-gray-400 hover:text-white">Work with us</Link></li>
                            <li><Link to="#" className="text-gray-400 hover:text-white">Media</Link></li>
                        </ul>
                    </div>

                    {/* Payment System & Social */}
                    <div>
                        <h3 className="font-bold mb-4 uppercase text-nowrap">Payment System</h3>
                        <div className="flex gap-2">
                            {
                                payment.map((data, idx) => <AnimatedTooltip key={idx} classProps="w-16 h-9 object-contain" id={data.id} image={data.image} tooltip={data.tooltip} />)
                            }
                        </div>
                        <Button
                            className="bg-primary_highlighted hover:bg-blue-600 text-white flex items-center gap-2 mt-5"
                        >
                            Need Help <MessageCircle size={16} />
                        </Button>
                    </div>

                    <div>
                        <h3 className="font-bold mb-4 uppercase text-nowrap">Follow Us</h3>
                        <div className="flex gap-2">
                            {
                                social.map((data, idx) => <Link key={idx} to="#" className="text-gray-400 hover:text-white">
                                    <AnimatedTooltip key={idx} classProps="rounded-full aspect-square h-8 w-8" id={data.id} image={data.image} tooltip={data.tooltip} />
                                </Link>)
                            }
                        </div>
                    </div>

                </div>

                {/* Copyright */}
                <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-400">
                    ©2025 Gaming LLC. All Rights Reserved
                </div>
            </div>
        </footer>
    )
}

