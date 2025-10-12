import React, { useRef, useState } from "react";
import VerticalGameCardWrapper from "@/components/general/vertical-card/vertical-game-container-wrapper";
import { verticalContainerProps } from "@/types/types";
import styles from "@/styles/components/carousel-vertical-offers.module.scss";

const IsMobile = ({ offersData }: verticalContainerProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const carouselRef = useRef<HTMLDivElement | null>(null);

    // Mapeamos las tarjetas (ejemplo: máx 10)
    const verticalCards = offersData.slice(0, 8).map((item, index) => (
        <div key={index} className={styles["card-wrapper"]}>
            <VerticalGameCardWrapper
                gameImage={item.gameImage}
                oldPrice={item.oldPrice}
                platform={item.platform}
                discount={item.discount}
                title={item.title}
                currentPrice={item.currentPrice}
                webOffer={item.webOffer} />
        </div>
    ));

    // Avanzar
    const nextSlide = () => {
        const newIndex = (currentIndex + 1) % Math.max(1, verticalCards.length - 1);
        setCurrentIndex(newIndex);
    };

    // Retroceder
    const prevSlide = () => {
        const newIndex = currentIndex === 0 ? Math.max(0, verticalCards.length - 2) : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    // Ir a un slide en específico (dot)
    const goToSlide = (index: number) => {
        setCurrentIndex(index);
    };

    return (
        <div className={styles["offers-carousel-main-container"]}>
            {/* Botón Izquierdo */}
            <button
                onClick={prevSlide}
                className={`${styles["nav-button"]} ${styles["nav-button-left"]}`}
            >
                <i className="bi bi-chevron-left"></i>
            </button>

            {/* Botón Derecho */}
            <button
                onClick={nextSlide}
                className={`${styles["nav-button"]} ${styles["nav-button-right"]}`}
            >
                <i className="bi bi-chevron-right"></i>
            </button>

            {/* Contenedor de Cards */}
            <div className={styles["cards-container"]}>
                <div
                    ref={carouselRef}
                    className={styles["cards-slider"]}
                    style={{
                        transform: `translateX(-${currentIndex * 50}%)`, // 2 tarjetas visibles
                    }}
                >
                    {verticalCards}
                </div>
            </div>

            {/* Indicadores (dots) */}
            <div className={styles["dots-container"]}>
                {Array.from({ length: verticalCards.length - 1 }).map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={styles["dot"]}
                        style={{
                            backgroundColor: index === currentIndex ? "#B8F7FF" : "#d1d5db",
                            width: index === currentIndex ? "2rem" : "0.75rem",
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default IsMobile;