import "../../assets/css/products/offprdct.css";
import React, { useRef, useEffect, useState } from 'react';
import Slider from 'react-slick';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../assets/css/products/productPage.css";
import url from "../../config.json";

const ProductCarousel = ({ theme }) => {
  const sliderRef = useRef(null);
  const [products, setProducts] = useState([]);
  const [OffDis, setOffDis] = useState(false);
  const [slidesToShow, setSlidesToShow] = useState(4);

  useEffect(() => {
    const myHeaders = new Headers();
    myHeaders.append("accept", "application/json");
    myHeaders.append("X-CSRFToken", "TvTvUiu7cUpi5lZNbZ9NjKJskwxoCrkncoMnmv6zsz4pQ5DJm4K5T6oENVxNEfaJ");

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    };

    fetch(`${url.baseUrl}/api/products/top-discounts/`, requestOptions)
      .then((response) => response.json())
      .then((result) => setProducts(result))
      .catch((error) => console.error(error));

    if (products.length === 5) {
      setOffDis(true);
    }
  }, [products.length]);

  const handleResize = () => {
    if (window.innerWidth < 1024) {
      setSlidesToShow(1);
    } else {
      setSlidesToShow(5);
    }
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const addCommas = (number) => {
    if (number !== undefined) {
      const persianDigits = '۰۱۲۳۴۵۶۷۸۹';
      let [integer] = number.toString().split('.');
      integer = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      integer = integer.replace(/\d/g, (digit) => persianDigits[digit]);
      return integer;
    }
    return null;
  };

  const convertToPersian = (number) => {
    if (number !== undefined) {
      const persianDigits = '۰۱۲۳۴۵۶۷۸۹';
      return number.toString().replace(/\d/g, (digit) => persianDigits[digit]);
    }
    return null;
  };

  return (
    <>
      <meta name="description" content="فروشگاه ظروف مسی - لیست محصولات تخفیف دار" />
      <meta name="keywords" content="ظروف مسی, خرید آنلاین, فروشگاه, محصولات" />
      {!OffDis && (
        <div className="col-md-12 col-12 d-flex justify-content-center">
          <div className="col-md-11 col-12">
            <div className="col-md-12 col-12 p-3 justify-content-center">
              <div className="d-flex justify-content-end col-md-12 col-12 border-bottom border-2 border-theme">
                <h2 className={theme.theme === "dark" ? "fontr h3 align-self-center text-white" : "fontr h3 align-self-center text-dark"}>تخفیف ها</h2>
              </div>
            </div>
            <div className="carousel-container position-relative m-0" style={{ overflowX: 'hidden' }}>
              <Slider ref={sliderRef} {...settings}>
                {products.map((c) => (
                  <article key={c.id} className={`col-1 col-md-3 productt-card Anim m-0 p-1 ${c.count === 0 ? 'out-of-stock' : ''}`}>
                    <div className="row m-0">
                      {c.discount !== 0 && c.count !== 0 ? <div className="discountDisplay fontr">%{convertToPersian(c.discount)}</div> : null}
                      <div className="d-flex justify-content-center">
                        <img src={c.pic} className="Image col-12 align-self-center col-md-12 rounded-4" alt={c.name} style={{ width: "auto" }} />
                      </div>
                      <div className="d-flex justify-content-center pt-3">
                        <h3 className="fontr text-center product-name">{convertToPersian(c.name)}</h3>
                      </div>
                      <div className="d-flex justify-content-center">
                        <p className="fontr pt-1 product-name">{addCommas(c.price)} تومان</p>
                      </div>
                    </div>
                    <a href={`pi?id=${c.id}#${c.name}`} className="hrefb align-self-center" aria-label={`View ${c.name}`}>
                      <div className="hoverr-details col-12">
                        <div className="d-flex justify-content-center" style={{ paddingTop: "40%" }}>
                          <button className="btn btn-orange border-0 fontr" aria-label="View Product"><span className="fontr">مشاهده محصول</span></button>
                        </div>
                      </div>
                    </a>
                  </article>
                ))}
              </Slider>
              <button
                className="btn btn-transparent position-absolute fontr"
                style={{ left: 0, top: '50%', transform: 'translateY(-50%)', height: "100%", fontSize: "2rem" }}
                onClick={() => sliderRef.current.slickPrev()}
                aria-label="Next">
                {"<"}
              </button>
              <button
                className="btn btn-transparent position-absolute fontr"
                style={{ right: 0, top: '50%', transform: 'translateY(-50%)', height: "100%", fontSize: "2rem" }}
                onClick={() => sliderRef.current.slickNext()}
                aria-label="Previous">
                {">"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductCarousel;
