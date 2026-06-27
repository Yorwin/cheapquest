import { ErrorInfo } from "next/error";
import "server-only";

const searchForStore = async () => {
    let search;
    try {
        search = await fetch("https://www.cheapshark.com/api/1.0/stores", {
            next: {
                revalidate: 1209600,
                tags: ["stores-list"]
            }
        });
    } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        // Esto captura errores de red: timeout, DNS, TLS, etc.
        console.error("Network error fetching stores:", err);
        throw new Error(`Network error: ${message}`);
    }

    console.log("Status:", search.status);
    console.log("Status text:", search.statusText);

    if (!search.ok) {
        const body = await search.text(); // lee el body del error
        console.error("Non-OK response:", search.status, body);
        throw new Error(`Error ${search.status}: ${body}`);
    }

    const searchResult = await search.json();
    return searchResult;
};

export default searchForStore;