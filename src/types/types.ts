import { StaticImageData } from "next/image";

export enum Currency {
    Dollars = "USD",
    Euros = "EUR",
}

export interface RawgGame {
    id: number;
    slug: string;
    name: string;
    released: string;
    tba: boolean;
    background_image: StaticImageData;
    rating: number;
    rating_top: number;
    ratings: Rating[];
    ratings_count: number;
    reviews_text_count: number;
    added: number;
    added_by_status: AddedByStatus;
    metacritic: number;
    playtime: number;
    suggestions_count: number;
    updated: string;
    user_game: null;
    reviews_count: number;
    saturated_color: string;
    dominant_color: string;
    platforms: PlatformWrapper[];
    parent_platforms: PlatformWrapper[];
    genres: Genre[];
    tags: Tag[];
    esrb_rating: ESRBRating | null;
    short_screenshots: Screenshot[];
    stores: StoreEntry[];
    clip: null;
    score: null;
}

export interface Rating {
    id: number;
    title: string;
    count: number;
    percent: number;
}

export interface AddedByStatus {
    yet?: number;
    owned?: number;
    beaten?: number;
    toplay?: number;
    dropped?: number;
    playing?: number;
}

export interface PlatformWrapper {
    platform: {
        id: number;
        name: string;
        slug: string;
    };
}

export interface Genre {
    id: number;
    name: string;
    slug: string;
}

export interface Tag {
    id: number;
    name: string;
    slug: string;
    language: string;
    games_count: number;
    image_background: string;
}

export interface ESRBRating {
    id: number;
    name: string;
    slug: string;
    name_en: string;
    name_ru: string;
}

export interface Screenshot {
    id: number;
    image: string;
}

export interface StoreEntry {
    id: number;
    store: {
        id: number;
        name: string;
        slug: string;
    };
}

export interface GameDeal {
    dealID: string;
    dealRating: string;
    finalScore: number;
    gameID: string;
    internalName: string;
    isOnSale: string;
    lastChange: number;
    metacriticLink: string;
    metacriticScore: string;
    normalPrice: string;
    releaseDate: number;
    salePrice: string;
    savings: string;
    steamAppID: string;
    steamRatingCount: string;
    steamRatingPercent: string;
    steamRatingText: string;
    storeID: string;
    thumb: string;
    title: string;
    url?: string;
}

export type Top11Deals = (gameDeal: GameDealWithoutScore[]) => GameDeal[];

export interface GameDealWithoutScore {
    dealID: string;
    dealRating: string;
    gameID: string;
    internalName: string;
    isOnSale: string;
    lastChange: number;
    metacriticLink: string;
    metacriticScore: string;
    normalPrice: string;
    releaseDate: number;
    salePrice: string;
    savings: string;
    steamAppID: string;
    steamRatingCount: string;
    steamRatingPercent: string;
    steamRatingText: string;
    storeID: string;
    thumb: string;
    title: string;
}

export interface StoreLogo {
    name: string;
    image: StaticImageData | null;
}

export interface dealStoreData {
    images: {
        banner: string,
        logo: string,
        icon: string,
    }
    isActive: number,
    storeID: string,
    storeName: string,
}

export interface VerticalCardWrapperType {
    gameImage: StaticImageData | string,
    title: string,
    platform: StaticImageData | string,
    discount: string,
    oldPrice: string,
    currentPrice: string,
    webOffer: StaticImageData,
}

export interface VerticalCardContainerType {
    title: string,
    platform: string,
    discount: string,
    oldPrice: string,
    currentPrice: string,
    webOffer: StaticImageData,
    children?: React.ReactNode,
}

export interface bestOfferType {
    backgroundImage: string,
    deal: GameDeal,
    game: string,
    id: number,
    name: string;
    score: number;
}

export type bestOfferCalculator = (max: bestOfferType, min: bestOfferType) => bestOfferType;

export interface cheapestPriceInfoOffer {
    price: string,
    date: number,
}

export interface dealsInfoOffer {
    dealID: string,
    price: string,
    retailPrice: string,
    savings: string,
    storeID: string,
}

export interface infoInfoOffer {
    steamAppID: string,
    thumb: string,
    title: string,
}

export interface gameOfferInfo {
    cheapestPriceEver: cheapestPriceInfoOffer,
    deals: dealsInfoOffer[],
    info: infoInfoOffer
}

export interface GameStandardContainerType {
    gameImage: StaticImageData | string,
    title: string,
    discount: string,
    oldPrice: string,
    currentPrice: string,
    webOffer: StaticImageData | string,
    classes?: Classes,
}

export interface GameStandardWrapperType {
    gameImage: StaticImageData,
    title: string,
    discount: string,
    oldPrice: string,
    currentPrice: string,
    webOffer: StaticImageData | string,
    classes?: Classes,
}

export interface Classes {
    [name: string]: string,
}

export interface GameStandardControllerType {
    gameImage: StaticImageData,
    title: string,
    discount: string,
    oldPrice: string,
    currentPrice: string,
    webOffer: StaticImageData | string,
    classes?: Classes,
    children?: React.ReactNode;
}

export interface listOffersWrapperProps {
    index: number,
    offerImage: StaticImageData,
    gameTitle: string,
    link: string,
    oldPrice: string,
    currentPrice: string,
    discountPercentage: string,
    children?: React.ReactNode,
}


export interface listFormatOfferProps {
    offerImage: StaticImageData,
    gameTitle: string,
    oldPrice: string,
    currentPrice: string,
    discountPercentage: string,
}

export interface responsiveDesktopDesignProps {
    gameInfo: GameStandardContainerType[],
    mainClasses: Classes,
    secondaryClasses: Classes,
    width: number,
}

export interface responsiveTabletDesignProps {
    gameInfo: GameStandardContainerType[],
    mainClasses: Classes,
    width: number,
}

export interface responsiveMobileDesignProps {
    gameInfo: GameStandardContainerType[],
    mainClasses: Classes,
    width: number
}

export interface verticalContainerProps {
    offersData: VerticalCardWrapperType[];
}

export interface bestOffer {
    currentPrice: string,
    discount: string,
    normalPrice: string,
    offerImage: string,
    store: StoreLogo | undefined,
    url?: string,
}

export interface comparisonOfferType {
    gameTitle: string
    currentPrice: string,
    discount: string,
    normalPrice: string,
    store: StoreLogo | undefined,
    url?: string,
}

export interface translationType {
    gameId: string,
    description?: string,
    genres?: string[],
    tags?: string[],
}

export interface publishersAndDevelopersType {
    id: number,
    name: string,
    slug: string,
    games_count: number,
    image_background: string,
}

export interface tag {
    games_count: number,
    id: number,
    image_background: string,
    language: string,
    name: string,
    slug: string,
}

export interface developerAndPublisherType {
    developers?: string[],
    publishers?: string[]
}

interface originalLangLanguages {
    name: string,
    id: number,
}

interface aboutTheGame {
    developers: string[],
    esrb: string,
    genres?: string[],
    original_lang_genres: originalLangLanguages[],
    publishers: string[],
    released_data: string,
    tags: string[]
}

export interface gameData {
    title: string,
    meta_critic: number,
    description: string,
    about_the_game: aboutTheGame;
};

export type getGameDataProps = (gameId: string) => Promise<gameData>;

export interface Franchise {
    gameTitle: string,
    releaseDate: string,
    currentPrice: string | null,
    discount: string | null,
    link: string,
    headerImage: string,
    webOffer: StaticImageData,
}


