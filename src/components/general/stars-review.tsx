import React from "react";

const StarsReview = ({ rating }: { rating: number }) => {

    const maxRating = 5;
    const givenRating: any[] = [];

    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = maxRating - fullStars - (hasHalfStar ? 1 : 0);

    // Estrellas completas
    for (let i = 0; i < fullStars; i++) {
        givenRating.push(<i key={`full-${i}`} className="bi bi-star-fill"></i>);
    }

    // Estrella media (si corresponde)
    if (hasHalfStar) {
        givenRating.push(<i key="half" className="bi bi-star-half"></i>);
    }

    // Estrellas vacías
    for (let i = 0; i < emptyStars; i++) {
        givenRating.push(<i key={`empty-${i}`} className="bi bi-star"></i>);
    }

    return <>{givenRating}</>
};

export default StarsReview;