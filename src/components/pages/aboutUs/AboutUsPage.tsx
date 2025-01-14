
import pubg from "@/assets/banner/pubg-battlegrounds-9i69f.jpg";
import match from "@/assets/others/playedMatch.png";
import user from "@/assets/others/totalUser.png";
import CountUp from 'react-countup';




export default function AboutPage() {

    return (
        <div className="min-h-screen bg-[#1A1A1A] text-white ">
            {/* Hero Section */}
            <div className="relative h-[250px] sm:h-[300px] md:h-[400px] w-full">
                <div >
                    <img
                        src={pubg}
                        alt="Tactical gaming background"
                        className="object-cover brightness-75 h-[250px] sm:h-[300px] md:h-[400px] w-full"
                    />
                </div>
                <div className="absolute inset-0 bg-black/40">
                    <div className="container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
                        <h1 className="text-4xl font-bold mb-8">ABOUT US</h1>
                        <div className="flex flex-col md:flex-row gap-8 text-center">
                            <div>
                                <div className='flex items-center gap-2 '>
                                    <img src={match} alt='Icon of Match' width={25} height={25} className='max-w-10 max-h-10' />
                                    <p className="text-white text-lg">Matches Played</p>

                                </div>
                                <CountUp
                                    enableScrollSpy={true}
                                    duration={20}
                                    end={10000} className="text-white text-2xl font-semibold" />
                            </div>
                            <div>
                                <div className='flex items-center gap-2 '>
                                    <img src={user} alt='Icon of Earnings' width={25} height={25} className='max-w-10 max-h-10' />
                                    <p className="text-white text-lg">Winnings Paid</p>
                                </div>
                                <p className="text-2xl font-bold mt-1" >    $                            <CountUp
                                    enableScrollSpy={true}
                                    duration={20}
                                    end={12000} className="text-white text-2xl font-semibold" /></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Sections */}
            <div className="container section-gap  space-y-8">
                {/* About Section */}
                <section>
                    <h2 className="sm:text-lg md:text-xl  font-bold mb-4">ABOUT</h2>
                    <p className="text-gray-300 leading-relaxed">
                        Welcome to Bu Primary Tournaments: the ultimate destination for competitive gaming and esports enthusiasm!
                    </p>
                    <p className="text-gray-300 leading-relaxed mt-4">
                        We&apos;re passionate about making gaming together in complete comfort and celebrating the spirit of esports. Whether you&apos;re a
                        solo player looking to prove your skills or a team striving for glory, our platform provides the tools and opportunities to take
                        your gaming experience to the next level.
                    </p>
                </section>

                {/* Our Mission Section */}
                <section>
                    <h2 className="sm:text-lg md:text-xl  font-bold mb-4">OUR MISSION</h2>
                    <p className="text-gray-300 leading-relaxed">
                        Our mission is to create a thriving ecosystem for gamers, where every match counts and every victory is celebrated. We aim
                        to empower players and teams by offering an engaging and fair environment to compete, interact, and connect with like-
                        minded individuals.
                    </p>
                </section>

                {/* What We Offer Section */}
                <section>
                    <h2 className="sm:text-lg md:text-xl  font-bold mb-4">WHAT WE OFFER</h2>
                    <div className="space-y-4">
                        <div>
                            <h3 className="text-blue-400 mb-1">Exciting Tournaments</h3>
                            <p className="text-gray-300">Compete in top-tier tournaments for popular games like Call of Duty, Apex Legends, and more</p>
                        </div>
                        <div>
                            <h3 className="text-blue-400 mb-1">Team and Team Support</h3>
                            <p className="text-gray-300">Build and manage your own team or team, find teammates, and grow together</p>
                        </div>
                        <div>
                            <h3 className="text-blue-400 mb-1">Player Profiles</h3>
                            <p className="text-gray-300">Showcase your gaming achievements and connect with other players</p>
                        </div>
                        <div>
                            <h3 className="text-blue-400 mb-1">Live Statistics and Analysis</h3>
                            <p className="text-gray-300">Stay informed with live match stats, leaderboards, and game insights</p>
                        </div>
                    </div>
                </section>

                {/* Why Choose Us Section */}
                <section>
                    <h2 className="sm:text-lg md:text-xl  font-bold mb-4">WHY CHOOSE US</h2>
                    <div className="space-y-4">
                        <div>
                            <h3 className="text-blue-400 mb-1">Inclusive Community</h3>
                            <p className="text-gray-300">Whether you&apos;re a beginner or a pro, we welcome players of all skill levels</p>
                        </div>
                        <div>
                            <h3 className="text-blue-400 mb-1">Advanced Features</h3>
                            <p className="text-gray-300">Enjoy cutting-edge tools for tracking stats, team coordination, and tournament organization</p>
                        </div>
                        <div>
                            <h3 className="text-blue-400 mb-1">Committed to Fair Play</h3>
                            <p className="text-gray-300">We uphold the highest standards of fairness and integrity in every match</p>
                        </div>
                    </div>
                </section>

                {/* Join Us Section */}
                <section>
                    <h2 className="sm:text-lg md:text-xl  font-bold mb-4">JOIN US</h2>
                    <p className="text-gray-300 leading-relaxed">
                        Become part of a growing community that&apos;s redefining the future of esports. Together, let&apos;s make
                        every game memorable and every victory path possible.
                    </p>
                </section>
            </div>
        </div>
    )
}

