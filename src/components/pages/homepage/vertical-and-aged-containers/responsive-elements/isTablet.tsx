import React, { useState, useRef } from "react";
import { verticalContainerProps } from "@/types/types";
import VerticalGameCardWrapper from "@/components/general/vertical-card/vertical-game-container-wrapper";
import styles from "./responsive-vertical-offers.module.scss"

const IsTablet = ({ offersData }: verticalContainerProps) => {

    const [currentIndex, setCurrentIndex] = useState(0);
    const carouselRef = useRef(null);

    const verticalCards = offersData.slice(0, 10).map((e, index) => {
        return (
            <VerticalGameCardWrapper
                key={index}
                gameImage={e.gameImage}
                oldPrice={e.oldPrice}
                platform={e.platform}
                discount={e.discount}
                title={e.title}
                currentPrice={e.currentPrice}
                webOffer={e.webOffer}
            />
        )
    });

    const nextSlide = () => {
        const newIndex = (currentIndex + 1) % Math.max(1, verticalCards.length - 2);
        setCurrentIndex(newIndex);
    };

    const prevSlide = () => {
        const newIndex = currentIndex === 0 ? Math.max(0, verticalCards.length - 3) : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const goToSlide = (index: number) => {
        setCurrentIndex(index);
    };

    return <>
        <section className={styles["offers-carousel-main-container"]}>

            {/* Botones de Navegación */}

            <button
                onClick={prevSlide}
                className={styles["button-go-back"]}>
                <i className="bi bi-chevron-left"></i>
            </button>

            <button
                onClick={nextSlide}
                className={styles["button-continue"]}>
                <i className="bi bi-chevron-right"></i>
            </button>

            {/* Contenedor de las ofertas */}

            <div className="cards-container">
                <div
                    ref={carouselRef}
                    className="cards-slider"
                    style={{
                        transform: `translateX(-${currentIndex * 33.333}%)`
                    }}
                >
                    {verticalCards}
                </div>

                {/* Dots Indicator */}
                <div className="dots-container">
                    {Array.from({ length: Math.max(1, verticalCards.length - 2) }).map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className="dot"
                            style={{
                                backgroundColor: index === currentIndex ? '#f97316' : '#d1d5db',
                                width: index === currentIndex ? '2rem' : '0.75rem'
                            }}
                        />
                    ))}
                </div>
            </div>

        </section>
    </>
};

export default IsTablet;