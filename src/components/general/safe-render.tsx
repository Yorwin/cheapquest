import React from "react";

interface SafeRenderProps {
    when: any; // dato o condición
    children: React.ReactNode;
}

const SafeRender = ({ when, children }: SafeRenderProps) => {
    if (!when) return null;
    return <>{children}</>;
};

export default SafeRender;