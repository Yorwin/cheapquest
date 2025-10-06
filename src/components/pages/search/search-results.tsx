"use client";

import { useSearchGameInfo } from "@/functions/hooks/useSearchParams";
import FranchiseCard from "../../general/franchise-games-card/franchise-card";
import GameCardSkeleton from "@/components/general/franchise-games-card/gamecard-skeleton-loader";
import ErrorMessage from "./search-error-message";
import styles from "@/styles/layout/search/search-results.module.scss";

export default function SearchResults() {
    const { data, loading, error } = useSearchGameInfo();

    return (
        <section className="container-fluid">
            <h4 className={styles["results-title"]}>Resultados de búsqueda</h4>
            <div className="row d-flex justify-content-center">
                {error ? (
                    <div className="col-12">
                        <ErrorMessage error={error} />
                    </div>
                ) : loading ? (
                    Array.from({ length: 6 }).map((_, index) => (
                        <div className="col-xl-4 col-md-6 col-sm-12" key={index}>
                            <GameCardSkeleton />
                        </div>
                    ))
                ) : (
                    data?.results?.map((game: any) => (
                        <div className="col-xl-4 col-md-6 col-sm-12" key={game.id}>
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
                    ))
                )}
            </div>
        </section>
    );
}

