export default function SupportPage() {
    return (
        <div className="container section-gap">
            <div className=" space-y-8">
                {/* Support Information */}
                <section>
                    <h1 className=" sm:text-lg md:text-xl  font-semibold mb-4">SUPPORT INFORMATION</h1>
                    <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
                        We&apos;re here to assist you with any questions, concerns, or issues you may encounter while using our
                        platform. Our dedicated support team ensures that your experience is smooth. Please note that
                        we provide:
                    </p>
                </section>

                {/* How to Reach Us */}
                <section>
                    <h2 className="text-sm sm:text-lg md:text-xl font-semibold mb-4">HOW TO REACH US</h2>
                    <div className="space-y-4">
                        <div>
                            <p className="text-sm sm:text-base mb-1">1. Contact Us Directly</p>
                            <div className="text-sm sm:text-base text-gray-400">
                                <p>Email: <a href="mailto:support@project.com" className="text-blue-500">support@project.com</a></p>
                                <p>Phone: +1 (555) 123-4567</p>
                            </div>
                        </div>
                        <div>
                            <p className="text-sm sm:text-base mb-1">2. Live Chat</p>
                            <p className="text-sm sm:text-base text-gray-400">
                                Use our in-website live chat feature for real-time assistance from our support team.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Types of Support */}
                <section>
                    <h2 className="text-sm sm:text-lg md:text-xl font-semibold mb-4">TYPES OF SUPPORT WE PROVIDE</h2>
                    <div className="space-y-4">
                        {/* Technical Support */}
                        <div>
                            <h3 className="text-sm sm:text-base text-blue-500 mb-2">Technical Support</h3>
                            <ul className="text-sm sm:text-base text-gray-400 list-disc pl-5 space-y-1">
                                <li>Issues with user account, interface, or features</li>
                                <li>Troubleshooting connectivity or app performance problems</li>
                            </ul>
                        </div>

                        {/* Deployment Support */}
                        <div>
                            <h3 className="text-sm sm:text-base text-blue-500 mb-2">Deployment Support</h3>
                            <ul className="text-sm sm:text-base text-gray-400 list-disc pl-5 space-y-1">
                                <li>Assistance with deployment environment, schedules, and results</li>
                                <li>Resolving disputes or queries regarding deployment data</li>
                            </ul>
                        </div>

                        {/* Payment and Billing Support */}
                        <div>
                            <h3 className="text-sm sm:text-base text-blue-500 mb-2">Payment and Billing Support</h3>
                            <ul className="text-sm sm:text-base text-gray-400 list-disc pl-5 space-y-1">
                                <li>Help with transactions, refunds, or subscription management</li>
                            </ul>
                        </div>

                        {/* General Inquiries */}
                        <div>
                            <h3 className="text-sm sm:text-base text-blue-500 mb-2">General Inquiries</h3>
                            <ul className="text-sm sm:text-base text-gray-400 list-disc pl-5 space-y-1">
                                <li>Questions about features, options, or pricing</li>
                            </ul>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

