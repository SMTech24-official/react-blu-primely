import { Clan } from '../../../types/types';
import { AwardTable } from './Table';

const clans: Clan[] = [
    {
        name: "Shadow Warriors",
        id: "SW123",
        totalMembers: 25,
        tournamentsPlayed: 18,
        trophies: [
            { type: "Bronze", count: 5 },
            { type: "Silver", count: 3 },
            { type: "Gold", count: 2 },
            { type: "Elite", count: 1 }
        ],
        lostWin: { lost: 5, win: 13 },
        awards: ["mvp", "strategy"],
    },
    {
        name: "Night Stalkers",
        id: "NS456",
        totalMembers: 30,
        tournamentsPlayed: 22,
        trophies: [
            { type: "Bronze", count: 6 },
            { type: "Silver", count: 5 },
            { type: "Gold", count: 3 },
            { type: "Elite", count: 2 }
        ],
        lostWin: { lost: 7, win: 15 },
        awards: ["comeback", "teamwork"],
    },
    {
        name: "Fire Drakes",
        id: "FD789",
        totalMembers: 28,
        tournamentsPlayed: 20,
        trophies: [
            { type: "Bronze", count: 4 },
            { type: "Silver", count: 6 },
            { type: "Gold", count: 2 },
            { type: "Elite", count: 1 }
        ],
        lostWin: { lost: 6, win: 14 },
        awards: ["mvp", "teamwork"],
    },
    {
        name: "Storm Bringers",
        id: "SB101",
        totalMembers: 32,
        tournamentsPlayed: 25,
        trophies: [
            { type: "Bronze", count: 7 },
            { type: "Silver", count: 4 },
            { type: "Gold", count: 5 },
            { type: "Elite", count: 3 }
        ],
        lostWin: { lost: 8, win: 17 },
        awards: ["strategy", "comeback"],
    },
    {
        name: "Iron Titans",
        id: "IT202",
        totalMembers: 29,
        tournamentsPlayed: 19,
        trophies: [
            { type: "Bronze", count: 3 },
            { type: "Silver", count: 5 },
            { type: "Gold", count: 2 },
            { type: "Elite", count: 0 }
        ],
        lostWin: { lost: 9, win: 10 },
        awards: ["mvp", "strategy", "comeback"],
    }
];

const MainAward = () => {
    return (
        <div>
            <AwardTable clans={clans} />
        </div>
    );
};

export default MainAward;