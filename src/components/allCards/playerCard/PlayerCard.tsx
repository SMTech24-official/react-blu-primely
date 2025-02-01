import { Link } from "react-router-dom";
import PrimaryButton from "../../shared/primaryButton";


const PlayerCard = ({ name, tournaments, type, feePaid }: { name: string; tournaments: string; type: string; feePaid: number }) => {
    return (
        <div className="bg-card_bg p-4 rounded-lg shadow-md space-y-2">
            <p className="text-lg font-bold">{name}</p>
            <p className="text-gray-500">Tournaments: {tournaments}</p>
            <p className="text-gray-500">Type: {type}</p>
            <p className="text-gray-500">Fee Paid: ${feePaid}</p>
            <PrimaryButton parent="w-full">
                <Link to={`/tournaments-details/freefire`}>
                    View Profile
                </Link>
            </PrimaryButton>
        </div>
    );
};

export default PlayerCard;



