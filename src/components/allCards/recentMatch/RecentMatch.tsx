interface Match {
  title: string;
  prize: string;
  date: string;
  entryFee: number;
  teamSize: number;
  regions: string;
  skillLevel: string;
  registrationStatus: string;
  game: string;
}

const RecentMatch: React.FC<Match> = ({
  title,
  prize,
  date,
  entryFee,
  teamSize,
  regions,
  skillLevel,
  game,
}) => {
  return (
    <div className="bg-fourthColor  rounded-lg p-5 w-full max-w-sm shadow-lg">
      <div className=" space-y-3">
        <div className="text-center flex items-center  justify-center">
          <p className="logo text-2xl  px-3 py-4  uppercase w-fit leading-4">
            {game}
          </p>
        </div>

        <p className=" font-bold text-lg mt-1">{title}</p>
        <p className=" text-sm">{new Date(date).toDateString()}</p>
        <div className="mt-2 flex items-center justify-between gap-2">
          <p>Skill Level </p>
          <p className="p-1 border border-secondary_highlighted text-secondary_highlighted w-fit text-xs  mt-2">
            {skillLevel}
          </p>
        </div>
        <div className="mt-2 flex items-center justify-between gap-2">
          <p>Prize </p>
          <p className="">{prize}</p>
        </div>
        <div className="mt-2 flex items-center justify-between gap-2">
          <p>Entry Fee </p>
          <p className="">{entryFee}</p>
        </div>
        <div className="mt-2 flex items-center justify-between gap-2">
          <p>Team Size </p>
          <p className="">
            {teamSize} vs {teamSize}
          </p>
        </div>
        <div className="mt-2 flex items-center justify-between gap-2">
          <p>Regions </p>
          <p className="capitalize">{regions}</p>
        </div>
      </div>
    </div>
  );
};

export default RecentMatch;
