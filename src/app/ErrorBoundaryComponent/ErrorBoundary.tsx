"use client"

import React, { ReactNode, ErrorInfo } from 'react';

interface ErrorBoundaryProps {
    children: ReactNode;
    fallback?: ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
}

export default class ErrorBoundary extends React.Component<
    ErrorBoundaryProps,
    ErrorBoundaryState
> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Error capturado:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return this.props.fallback || <h2>Algo salió mal 😅</h2>;
        }
        return this.props.children;
    }
}
