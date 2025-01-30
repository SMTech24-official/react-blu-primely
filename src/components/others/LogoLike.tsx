const LogoLike = ({ game, gameId }: { game: string, gameId: string }) => {
    return (
        <div className="flex items-center gap-1">
            <p className="logo text-xs px-1 py-[2px] border uppercase">{game}</p>
            <p className="text-primary_highlighted">{gameId}</p>
        </div>
    );
};

export default LogoLike;