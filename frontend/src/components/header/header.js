import React from 'react';
import styles from "./Header.module.scss";
import { Link, NavLink } from 'react-router-dom';
import {FaShoppingCart} from "react-icons/fa";
import {HiOutlineMenuAlt3} from "react-icons/hi";
import {FaTimes} from "react-icons/fa";
import { useState } from "react";

export const logo = (
    <div className={styles.logo}>
        <Link to="/">
            <h2>
                General<span>Store</span>
            </h2>
        </Link>
    </div>
);

const activeLink = ({isActive}) => (isActive ? `${styles.active}` : "");


const Header = () => {

    const [showMenu, setShowMenu] = useState(false)
    
    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    const hideMenu = () => {
        setShowMenu(false);
    };

    const cart = (
        <span className={styles.cart}>
            <Link to="/cart">
                Cart

                <FaShoppingCart size={20} />
                <p>0</p>
            </Link>
        </span>
    );

    return (
        <header>
            <div className={styles.header}>
                {logo}

                <nav className={showMenu ? `${styles["show-nav"]}` : `${styles["hide-nav"]}`}>
                    
                    <div className={showMenu ? `${styles["nav-wrapper"]} ${styles["show-nav-wrapper"]}` 
                    : `${styles["nav-wrapper"]}` } onClick={hideMenu}>

                    </div>
                    
                    <ul>
                        <li className={styles["logo-mobile"]}>
                            {logo}
                            <FaTimes size={22} color="#fff" onClick={hideMenu}/>
                        </li>
                        <li>
                            <NavLink to="/shop" className={activeLink}>
                                Shop 
                            </NavLink>
                        </li>
                    </ul>

                    <div className={styles["header-right"]}>
                        <span className={styles.links}>
                            <NavLink to={"login"} className={activeLink}>
                                Login
                            </NavLink>

                            <NavLink to={"register"} className={activeLink}>
                                Register
                            </NavLink>

                            <NavLink to={"Order-history"} className={activeLink}>
                                My Order
                            </NavLink>
                        </span>
                        {cart}
                    </div>
                </nav>

                <div className={styles["menu-icon"]}>
                    {cart}
                    <HiOutlineMenuAlt3 size={28} onClick={toggleMenu} />
                </div>
            </div>
        </header>
    )
}

export default Header
