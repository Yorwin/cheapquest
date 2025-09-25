import "server-only";

const searchForStore = async () => {
    const search = await fetch("https://www.cheapshark.com/api/1.0/stores", {
        next: {
            revalidate: 1209600,
            tags: ["stores-list"]
        }
    })

    if (!search.ok) {
        throw new Error("Error when trying to fetch stores");
    }

    const searchResult = await search.json();

    return searchResult;
};

export default searchForStore;