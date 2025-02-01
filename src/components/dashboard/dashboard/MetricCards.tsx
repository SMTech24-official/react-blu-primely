import { DollarSign, Swords, Users } from "lucide-react"
import { report } from "../../../types/types"



export default function MetricCards({ tournments, players, revenue }: report) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ">
            <div className="bg-fourthColor text-white rounded-lg">
                <div className="p-4">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2 ">
                            <Swords size={30} />
                            <div className="text-4xl font-bold mb-2">{tournments}</div>
                        </div>
                        <span className="text-primary_highlighted">Tournaments</span>
                    </div>
                    <div className="font-semibold text-lg mt-4 ">Total Active Tournaments</div>
                </div>
            </div>
            <div className="bg-fourthColor text-white rounded-lg">
                <div className="p-4">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2 ">
                            <Users size={30} />
                            <div className="text-4xl font-bold mb-2">{players}</div>
                        </div>
                        <span className="text-primary_highlighted">Players</span>
                    </div>
                    <div className="font-semibold text-lg mt-4 ">Total Players Registered</div>
                </div>
            </div>
            <div className="bg-fourthColor text-white rounded-lg">
                <div className="p-4">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2 ">
                            <DollarSign size={30} />
                            <div className="text-4xl font-bold mb-2">${revenue}</div>
                        </div>
                        <span className="text-primary_highlighted">Total</span>
                    </div>
                    <div className="font-semibold text-lg mt-4 ">Revenue Generated</div>
                </div>
            </div>
        </div>
    )
}
