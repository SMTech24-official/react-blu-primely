
const Roaster = ({ players }: {
    players: {
        name: string;
        discordId: string;
        avatar: string;
    }[]
}) => {
    return (
        <div className="flex flex-col gap-4 ">
            {
                players?.map((data, idx) => <div key={idx} className="flex bg-[#1D1D1D] items-center justify-between p-4 md:p-8 rounded-lg">
                    <div className="flex items-center gap-3">
                        <img
                            src={data.avatar}
                            alt={`${data.name} logo`}
                            width={40}
                            height={40}
                            className="rounded-full"
                        />
                        <h3 className="text-lg font-semibold">{data.name}</h3>
                    </div>
                    <p>{data.discordId}</p>
                </div>)
            }

        </div>
    );
};

export default Roaster;