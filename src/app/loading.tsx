import React from "react";
import Logo from "@/resources/logo/logo.png"
import Image from "next/image";

const Loading = () => {
    return (
        <div
            id="option-branded"
            className="loading-option loading-branded"
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh",
                textAlign: "center"
            }}
        >
            <Image
                src={Logo}
                alt="Plataforma de juego"
                sizes="60vw"
                style={{
                    width: "15%",
                    height: "auto",
                    objectFit: "contain"
                }}
            />

            <div className="brand-bars">
                <div className="brand-bar"></div>
                <div className="brand-bar"></div>
                <div className="brand-bar"></div>
                <div className="brand-bar"></div>
            </div>

            <p className="text-muted">Preparando tus ofertas...</p>
        </div>
    )
};

export default Loading;