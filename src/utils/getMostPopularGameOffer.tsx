import "server-only";

const getMostPopularGameOffer = async (e : string) => {
    
    const responseGame = await fetch(`https://www.cheapshark.com/api/1.0/games?title=~${e}`, {
        cache: "default"
    });

    if(!responseGame.ok) {
        throw new Error("Failed to fetch data");
    }

    const data = await responseGame.json();
    const selectedGame = data.slice(0, 1);
    const selectedGameID = selectedGame[0].gameID;

    const responseOffers = await fetch(`https://www.cheapshark.com/api/1.0/games?id=${selectedGameID}`, {
        cache: 'no-store'
    });

    if(!responseOffers.ok) {
        throw new Error("Failed to fetch data");
    }

    const offersData = await responseOffers.json();

    return offersData;
};

export {getMostPopularGameOffer};