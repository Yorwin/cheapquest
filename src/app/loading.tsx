import React from "react";

const Loading = () => {
    return (
        <div id="option-branded" className="loading-option loading-branded">
            <div className="brand-logo">L</div>
            <div className="brand-bars">
                <div className="brand-bar"></div>
                <div className="brand-bar"></div>
                <div className="brand-bar"></div>
                <div className="brand-bar"></div>
            </div>
            <p className="text-muted">Inicializando aplicación...</p>
        </div>
    )
};

export default Loading;