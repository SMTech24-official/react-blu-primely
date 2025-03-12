/* eslint-disable @typescript-eslint/no-explicit-any */
type BracketProps = {
    teams: number;
    currentRound: number;
    AllMatches: any
}

const checkPowerOfTwo = (teams: number) => {
    if (teams > 0 && (teams & (teams - 1)) === 0) {
        return true
    }
    else return false
}



const rounds = (teams: number, currentRound: number): number[] => {
    const matchesPerRound: number[] = [];
    const initialMatch: number[] = [];
    let totalTeams = teams;
    let round = 0;
    while (totalTeams > 1) {
        const matches = totalTeams / 2;
        initialMatch.push(matches);
        totalTeams /= 2;  // Reduce the number of teams for the next round
        round++;  // Increment the round number
    }

    if ((currentRound <= round)) {
        while (teams > initialMatch[currentRound - 1]) {
            const matches = teams / 2;
            matchesPerRound.push(matches);
            teams /= 2;  // Reduce the number of teams for the next round
        }
        return matchesPerRound;
    }
    return [];

};



const Bracket = ({ teams, currentRound, AllMatches }: BracketProps) => {
    console.log(AllMatches);
    const validate = checkPowerOfTwo(teams)
    if (AllMatches.length > 0) {
        if (validate) {
            const matches = rounds(teams, currentRound)
            console.log(matches);
            if (AllMatches.length > 0 && matches.length > 0) {
                return (
                    <div>
                        <p>Teams : {teams}</p>
                        <p>Number of Rounds {matches.length}</p>
                        <div className="flex items-start justify-between">
                            {
                                Array.from({ length: matches.length }).map((_, index) => (
                                    <div key={index} className="mt-10 border p-2">
                                        <p className="text-primary_highlighted border p-2 rounded-lg bg-white">Match {index + 1}</p>
                                        <div className="">
                                            {
                                                AllMatches.filter((m: any) => m.round === (index + 1)).map((data: any, idx: number) => (
                                                    <div key={idx}>
                                                        <div className="border my-4">
                                                            {
                                                                data.participants.map((player: any) => <p className="border p-2">{player.name}</p>)
                                                            }
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </div>
                                ))
                            }
                            <div>
                                Winner
                            </div>
                        </div>
                    </div>
                );
            }
            else return <p>Data Is Mismatched</p>
        }
        else {
            return (
                <div>
                    <p className="text-red-400">Teams Must be Even and Power Of Two like 2, 4, 8, 16, 32,.... </p>
                </div>
            );
        }
    }
    else return <p>No Match Data Found</p>

};

export default Bracket;

// {
//     Array.from({ length: matches[index] }).map((_, index) => (
//         <div key={index} className="text-primary_highlighted flex flex-col border items-center justify-center p-1 rounded-lg m-1">
//             <p>{index + 1}</p> vs <p>{index + 1}</p>
//         </div>
//     ))

// }