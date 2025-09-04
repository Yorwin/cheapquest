"use client"

import React, { useState } from "react";
import styles from "@/styles/components/about-the-game.module.scss"

const Parragraph = ({ children }: { children: string }) => {

    const [isExpanded, setIsExpanded] = useState(false);

    const text = `${children}`;
    const wordLimit = 30;

    const truncateText = (text: string, wordLimit: number) => {
        const words = text.split(' ');
        if (words.length <= wordLimit) return text;
        return words.slice(0, wordLimit).join(' ') + '...';
    }

    const displayText = isExpanded ? text : truncateText(text, wordLimit);
    const shouldShowButton = text.split(' ').length > 30;

    return (
        <div>

            {/* Text */}

            <p>{displayText}</p>

            {/* Read More Button */}

            {shouldShowButton && (
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className={styles["read-more-button"]}
                >
                    {isExpanded ? 'Leer menos' : 'Leer más'}
                </button>
            )}
        </div>
    )
};

export default Parragraph;