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

export interface VerticalCardWrapperType {
    gameImage: StaticImageData,
    title: string,
    platform: StaticImageData | string,
    discount: string,
    oldPrice: string,
    currentPrice: string,
    webOffer: StaticImageData | string,
}

export interface VerticalCardContainerType {
    title: string,
    platform: string,
    discount: string,
    oldPrice: string,
    currentPrice: string,
    webOffer: StaticImageData,
    children: React.ReactNode,
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
    gameImage: StaticImageData,
    title: string,
    platform: StaticImageData | string,
    discount: string,
    oldPrice: string,
    currentPrice: string,
    webOffer: StaticImageData | string,
    classes?: Classes,
}

export interface GameStandardWrapperType {
    gameImage: StaticImageData,
    title: string,
    platform: StaticImageData,
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
    platform: StaticImageData,
    discount: string,
    oldPrice: string,
    currentPrice: string,
    webOffer: StaticImageData | string,
    classes?: Classes,
    children?: React.ReactNode;
}

export interface listFormatOfferProps {
    index: number,
    offerImage: StaticImageData,
    gameTitle: string,
    link: string,
    oldPrice: string,
    currentPrice: string,
    discountPercentage: string,
    children?: React.ReactNode,
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
    offersData: GameStandardContainerType[];
}



