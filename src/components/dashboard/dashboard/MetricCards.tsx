import { DollarSign, Swords, Users } from "lucide-react"

export default function MetricCards() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
            <div className="bg-card_bg text-white rounded-lg">
                <div className="p-4">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2 ">
                            <Swords size={30} />
                            <div className="text-4xl font-bold mb-2">10</div>
                        </div>
                        <span className="text-primary_highlighted">Tournaments</span>
                    </div>
                    <div className="font-semibold text-lg mt-4 ">Total Active Tournaments</div>
                </div>
            </div>
            <div className="bg-card_bg text-white rounded-lg">
                <div className="p-4">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2 ">
                            <Users size={30} />
                            <div className="text-4xl font-bold mb-2">5,400</div>
                        </div>
                        <span className="text-primary_highlighted">Players</span>
                    </div>
                    <div className="font-semibold text-lg mt-4 ">Total Players Registered</div>
                </div>
            </div>
            <div className="bg-card_bg text-white rounded-lg">
                <div className="p-4">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2 ">
                            <DollarSign size={30} />
                            <div className="text-4xl font-bold mb-2">$12,500</div>
                        </div>
                        <span className="text-primary_highlighted">Total</span>
                    </div>
                    <div className="font-semibold text-lg mt-4 ">Revenue Generated</div>
                </div>
            </div>
        </div>
    )
}
