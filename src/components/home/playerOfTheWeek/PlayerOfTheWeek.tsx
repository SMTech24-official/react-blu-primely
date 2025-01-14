import avater from "@/assets/player/avater 1.jpg"
import avater2 from "@/assets/player/ava3.png"
import avater3 from "@/assets/player/images.png"
import PlayerOfTheWeekCard from "../../allCards/PlayerOfTheWeekCards/PlayerOfTheWeekCard"
interface Player {
    rank: number
    name: string
    xp: string
    credits: number
    avatar: string
    date: string
}

const players = [
    {
        rank: 1,
        name: "Jenny Wilson",
        xp: "2500 XP",
        credits: 30,
        avatar: avater,
        date: "2023-11-25T00:00:00Z"
    },
    {
        rank: 2,
        name: "Esther Howard",
        xp: "2000 XP",
        credits: 20,
        avatar: avater2,
        date: "2023-11-26T00:00:00Z"
    },
    {
        rank: 3,
        name: "Guy Hawkins",
        xp: "1925 XP",
        credits: 10,
        avatar: avater3,
        date: "2023-11-27T00:00:00Z"
    }
];


const PlayerOfTheWeek = () => {
    return (
        <div className='container section-gap'>
            <div className='space-y-5'>
                <h1 className='text-4xl md:text-5xl text-center font-bold text-white uppercase'>Players of the Week</h1>
                <h6 className='text-center capitalize'>Placements reset every Sunday at 12 AM EST</h6>
            </div>
            <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-10 lg:my-20 my-14'>
                {
                    players?.map((data: Player, idx: number) => <PlayerOfTheWeekCard key={idx} name={data.name} xp={data.xp} date={new Date(data.date).toDateString()} credits={data.credits} avater={data.avatar} rank={data.rank} />)
                }
            </div>
        </div>
    );
};

export default PlayerOfTheWeek;