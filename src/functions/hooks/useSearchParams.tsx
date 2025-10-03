"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export function useSearchGameInfo() {
    const searchParams = useSearchParams();

    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);

                // Construir query string desde los searchParams actuales
                const params = new URLSearchParams(searchParams.toString());
                const res = await fetch(`/api/searchpage-game-info?${params.toString()}`);

                if (!res.ok) throw new Error("Error fetching search results");

                const json = await res.json();
                setData(json);
            } catch (err) {
                setError(err instanceof Error ? err.message : "Unknown error");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [searchParams]);

    return { data, loading, error };
}
