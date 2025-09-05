import React from "react";
import styles from "@/styles/layout/gamepage/official-store-list.module.scss"
import StoreCard from "@/components/general/store-card/store-card";

const OfficialStoreList = () => {
    return (
        <div className={styles["official-stores-container"]}>
            <h2>COMPARA PRECIOS EN TIENDAS OFICIALES</h2>
            <div className={styles["offers-container"]}>
               <StoreCard />
            </div>
        </div>
    )
};

export default OfficialStoreList;