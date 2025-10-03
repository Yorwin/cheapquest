"use client";

import { useSearchGameInfo } from "@/functions/hooks/useSearchParams";
import FranchiseCard from "./franchise-games-card/franchise-card";

export default function SearchResults() {
    const { data, loading, error } = useSearchGameInfo();

    if (loading) return <p>Cargando resultados...</p>;
    if (error) return <p>Error: {error}</p>;

    console.log(data);

    return (
        <section className="container-fluid">
            <h4>Resultados de búsqueda</h4>
            <div className="row d-flex justify-content-center">
                {data?.results?.map((game: any) => (
                    <div className="col-lg-4 col-md-6 col-sm-12" key={game.id}>
                        <FranchiseCard
                            gameTitle={game.title}
                            releaseDate={game.released_date}
                            currentPrice={game.bestOffer ? `${game.bestOffer.salePrice}€` : null}
                            discount={game.bestOffer ? `${Number(game.bestOffer.savings).toFixed(0)}%` : null}
                            link={game.link}
                            headerImage={game.header_image}
                            webOffer={game.bestOffer?.storeImage.image || null}
                            hasOffer={game.bestOffer !== null}
                        />
                    </div>
                ))}
            </div>
        </section>
    );
}
