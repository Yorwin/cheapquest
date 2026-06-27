import fallbackStores from "@/lib/data/stores.json";

const searchForStore = async () => {
    try {
        const search = await fetch("https://www.cheapshark.com/api/1.0/stores", {
            next: { revalidate: 1209600, tags: ["stores-list"] },
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
            }
        });

        if (!search.ok) throw new Error(`Status ${search.status}`);
        return await search.json();

    } catch (err) {
        console.warn("CheapShark API unavailable, using fallback:", err instanceof Error ? err.message : err);
        return fallbackStores;
    }
};

export default searchForStore;