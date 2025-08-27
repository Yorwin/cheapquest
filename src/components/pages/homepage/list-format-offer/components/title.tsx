import React from "react";

interface titleProps {
    titleState: string;
}

const Title = ({ titleState }: titleProps) => {
    return <>
        {titleState === "best-offers" ? <h1>MEJORES OFERTAS POR %</h1> : <h1>BAJOS HISTORICOS</h1>}
    </>
};

export default Title;