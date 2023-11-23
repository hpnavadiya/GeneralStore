import React from 'react';
import styles from "./Loader.module.scss";
import loaderImg from "../../assets/loader.gif";
import PortalReactDOM from 'react-dom';


const Loader = () => {
    return PortalReactDOM.createPortal(
        <div className={styles.wrapper}>
            <div className={styles.loader}>
                <img src={loaderImg} alt="Loading..." />
            </div>
        </div>,
        document.getElementById("loader")
    );
};

export const Spinner = () => {
    return (
        <div className="--center-all">
            <img src={loaderImg} alt="Loading..." />
        </div>
    )
}

export default Loader
