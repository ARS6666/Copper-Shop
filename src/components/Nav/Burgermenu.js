import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../assets/css/nav/burger.css';

const BurgerMenu = (theme) => {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState('');

    const toggleMenu = () => {
        setIsOpen(!isOpen);
        document.body.style.overflow = isOpen ? 'auto' : 'hidden';
    };

    return (
        <div dir="rtl" className="fontr bg-orange">
            <div className={`overlayy ${isOpen ? 'show' : ''}`}></div>
            <button className="btn btn-transparent" onClick={toggleMenu} aria-label="Toggle Menu">
                <i className="text-white fa-solid fa-bars" style={{ fontSize: "1.4rem" }}></i>
            </button>
            <div className={theme.theme.theme === "dark" ? `menu ${isOpen ? 'open' : ''}` : `text-dark menu ${isOpen ? 'open' : ''}`} style={{ backgroundColor: theme.theme.theme === "dark" ? "#121212" : "white" }}>
                <div className="col-12 d-flex justify-content-start">
                    <button className="btn btn-transparent" onClick={toggleMenu} aria-label="Close Menu">
                        <i className={theme.theme.theme === "dark" ? "text-white fa-solid fa-xmark" : "text-dark fa-solid fa-xmark"} style={{ fontSize: "1.1rem" }}></i>
                    </button>
                </div>
                <ul>
                    <li className="col-12 d-flex justify-content-start">
                        <Link className={theme.theme.theme === "dark" ? "hrefw" : "hrefb"} to="/">
                            <span className="col-3 h5 ah">خانه</span>
                        </Link>
                    </li>
                    <li className="col-12 d-flex justify-content-start">
                        <Link className={theme.theme.theme === "dark" ? "hrefw" : "hrefb"} to="/products">
                            <span className="col-3 h5 ah">محصولات</span>
                        </Link>
                    </li>
                    <li className="col-12 d-flex justify-content-start">
                        <Link className={theme.theme.theme === "dark" ? "hrefw" : "hrefb"} to="/about">
                            <span className="col-3 h5 ah">درباره ما</span>
                        </Link>
                    </li>
                    <li className="col-12 row m-0">
                        <div className="col-9 align-self-center">
                            <input
                                className="form-control fontr col-12"
                                placeholder="جست وجو ..."
                                onChange={(e) => setSearch(e.target.value)}
                                style={{ backgroundColor: "#D9D9D9" }}
                                aria-label="Search"
                            />
                        </div>
                        <div className="col-1 align-self-center">
                            <Link to={`/products?search=${search}`} className={theme.theme.theme === "dark" ? "hrefw" : "hrefb"}>
                                <button
                                    className={theme.theme.theme === "dark" ? "rounded-circle btn bg-transparent align-self-center col-6 text-white" : "rounded-circle btn bg-transparent align-self-center col-6"}
                                    aria-label="Search Button"
                                    style={{ backgroundColor: "#E8E7E7" }}
                                >
                                    <i className="fa-solid fa-magnifying-glass" style={{ fontSize: "1.1rem" }}></i>
                                </button>
                            </Link>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default BurgerMenu;
