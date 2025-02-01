import { useState, React, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "../../assets/font/font.css";
import "../../assets/css/href.css";
import BurgerMenu from "./Burgermenu";
import logo from "../../assets/media/logo.png";
import "../../assets/css/nav/buttonn.css"
import url from "../../config.json"

const CustomNavbar = (theme) => {
  const [CartItems, setCartItem] = useState([]);
  const navigate = useNavigate();
  const [search, setSearch] = useState();
  const [Login, setlogin] = useState(true);
  const [isVisible, setIsVisible] = useState(true);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token && token.length !== 0) {
      setlogin(false);
    }
  }, [token]);

  const logout = () => {
    localStorage.removeItem('token');
    setlogin(true);
    navigate('/login');
  };

  const handleResize = () => {
    if (window.innerWidth < 1024) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (token) {
      const myHeaders = new Headers();
      myHeaders.append("accept", "application/json");
      myHeaders.append("X-CSRFToken", "5teHG5lzFJM4CD8QwLdXzrrvjxmRqWl91abWUh2YcbHKJ1NVq5s3g9B3KrcKmR8L");
      myHeaders.append("Authorization", `Bearer ${token}`);

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
      };
      fetch(`${url.baseUrl}/cart/cart/`, requestOptions)
        .then((response) => response.json())
        .then((result) => { setCartItem(result.items) })
        .catch((error) => console.error(error));
    }
  }, [token]);

  const convertToPersian = (number) => {
    if (number !== undefined) {
      const persianDigits = '۰۱۲۳۴۵۶۷۸۹';
      return number.toString().replace(/\d/g, (digit) => persianDigits[digit]);
    }
    return null;
  };

  return (
    <>
      {isVisible ? (
        <div className="col-12 fontr position row m-0" dir="rtl" style={{ backgroundColor: "#DB5C28", height: "60px" }} >
          <div className="col-7 row m-0">
            <div className="col-3 pt-1">
              <Link className="hrefb m-0 p-0" to="/">
                <img
                  style={{ height: "50px" }}
                  src={logo}
                  alt="Company Logo"
                  className="col"
                />
              </Link>
            </div>
            <div className="col-8 align-self-center d-flex justify-content-between" style={{ marginRight: "3rem" }}>
              <Link className="hrefw" to="/"><span className="col-3 h5 ah">خانه</span></Link>
              <Link className="hrefw" to="/products"><span className="col-3 h5 ah">محصولات</span></Link>
              <Link className="hrefw" to="/blogs"><span className="col-3 h5 ah">وبلاگ</span></Link>
              <Link className="hrefw" to="/about"><span className="col-3 h5 ah">خدمات مشتریان</span></Link>
            </div>
          </div>

          <div className="col-5 row m-0">
            <div className="col-5 align-self-center">
              <input
                className="form-control fontr"
                placeholder="جست وجو ..."
                onChange={(e) => setSearch(e.target.value)}
                style={{ backgroundColor: "#ffffff" }}
                aria-label="Search"
              />
            </div>
            <div className="col-1 align-self-center">
              <Link to={`/products?search=${search}`}>
                <button
                  className={theme.theme === "dark" ? "rounded-circle btn bg-transparent align-self-center text-white" : "rounded-circle btn bg-transparent align-self-center"}
                  aria-label="Search Button"
                  style={{ backgroundColor: "#E8E7E7" }}
                >
                  <i className="fa-solid fa-magnifying-glass text-white" style={{ fontSize: "1.1rem" }}></i>
                </button>
              </Link>
            </div>
            <div className="col-1"></div>
            <div className="col-5 align-self-center">
              <span>
                {Login ? (
                  <>
                    <Link to="/login" className="hrefw text-white h5 ah">ورود</Link>
                    <span style={{ color: "#ffffff" }}> | </span>
                  </>
                ) : null}
                <Link to="/account" className="hrefw text-white h5 ah">حساب کاربری</Link>
                {!Login && (
                  <>
                    <button className={theme.theme === "dark" ? "btn border-0 bg-transparent text-white" : "btn border-0 bg-transparent text-white"} onClick={logout} aria-label="Logout">
                      <i className="fas fa-sign-out-alt ah"></i>
                    </button>
                    <span> | </span>
                    <button className="btn border-0 bg-transparent cart-icon" aria-label="Cart">
                      <Link className={theme.theme === "dark" ? "hrefw" : "hrefb"} to="/cart">
                        <i className="fa-solid fa-cart-shopping ah text-white" style={{ fontSize: "1.1rem" }}></i>
                        <span className="cart-count text-white">{convertToPersian(CartItems?.length)}</span>
                      </Link>
                    </button>
                  </>
                )}
              </span>
            </div>
          </div>
        </div>
      ) : null}
      <div className="col-12 row m-0 add fontr bg-orange" dir="rtl">
        <div className="col-12 m-0 d-flex">
          <div className="col-5 d-flex justify-content-start">
            <BurgerMenu theme={theme} />
          </div>
          <div className="col-6 m-0 d-flex justify-content-end align-self-center">
            <span>
              {Login ? (
                <>
                  <Link to="/login" className="hrefw h5 ah">ورود</Link>
                  <span> | </span>
                </>
              ) : null}
              <Link to="/account" className="hrefw h5 ah">حساب کاربری</Link>
              {!Login && (
                <>
                  <button className="btn border-0 bg-transparent" onClick={logout} aria-label="Logout">
                    <i className="text-white fas fa-sign-out-alt ah"></i>
                  </button>
                  <span> | </span>
                  <button className="btn border-0 bg-transparent cart-icon" aria-label="Cart">
                    <Link className="hrefb" to="/cart">
                      <i className="text-white fa-solid fa-cart-shopping ah" style={{ fontSize: "1.1rem" }}></i>
                      <span className="cart-count text-white">{convertToPersian(CartItems?.length)}</span>
                    </Link>
                  </button>
                </>
              )}
            </span>
          </div>
          <div className="col-1"></div>
        </div>
      </div>
    </>
  );
};
export default CustomNavbar;