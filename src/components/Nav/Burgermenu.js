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

    const closeMenu = () => {
        setIsOpen(false);
        document.body.style.overflow = 'auto';
    };

    return (
        <div dir="rtl" className="fontr bg-orange">
            <div className={`overlayy ${isOpen ? 'show' : ''}`}></div>
            <button className="btn btn-transparent" onClick={toggleMenu} aria-label="Toggle Menu">
                <i className="text-white fa-solid fa-bars" style={{ fontSize: "1.4rem" }}></i>
            </button>
            <div className={`bg-orange text-white menu ${isOpen ? 'open' : ''}`}>
                <div className="col-12 d-flex justify-content-start">
                    <button className="btn btn-transparent" onClick={closeMenu} aria-label="Close Menu">
                        <i className="text-white fa-solid fa-xmark" style={{ fontSize: "1.1rem" }}></i>
                    </button>
                </div>
                <ul>
                    <li className="col-12 d-flex justify-content-start">
                        <Link className="hrefw" to="/" onClick={closeMenu}>
                            <span className="col-3 h5 ah">خانه</span>
                        </Link>
                    </li>
                    <li className="col-12 d-flex justify-content-start">
                        <Link className="hrefw" to="/products" onClick={closeMenu}>
                            <span className="col-3 h5 ah">محصولات</span>
                        </Link>
                    </li>
                    <li className="col-12 d-flex justify-content-start">
                        <Link className="hrefw" to="/blogs" onClick={closeMenu}>
                            <span className="col-3 h5 ah">وبلاگ</span>
                        </Link>
                    </li>
                    <li className="col-12 d-flex justify-content-start">
                        <Link className="hrefw" to="/about" onClick={closeMenu}>
                            <span className="col-3 h5 ah">خدمات مشتریان</span>
                        </Link>
                    </li>
                    <li className="col-12 row m-0">
                        <div className="col-9 align-self-center">
                            <input
                                className="form-control fontr col-12"
                                placeholder="جست وجو ..."
                                onChange={(e) => setSearch(e.target.value)}
                                style={{ backgroundColor: "white" }}
                                aria-label="Search"
                            />
                        </div>
                        <div className="col-1 align-self-center">
                            <Link to={`/products?search=${search}`} className="hrefw" onClick={closeMenu}>
                                <button
                                    className="rounded-circle btn bg-transparent align-self-center col-6 text-white"
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
