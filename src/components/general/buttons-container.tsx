import React from "react";

interface Button {
    children: React.ReactNode;
    event: () => void;
}

const Button = ({ children, event }: Button) => {
    console.log("El boton ha sido pusaldo");

    return (
        <button onClick={event}>
            {children}
        </button>
    )
};

export default Button;