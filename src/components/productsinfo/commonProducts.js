import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../../assets/css/hide.css";
import "../../assets/css/productsinfo/commonprod.css";
import url from "../../config.json";

const CommonProducts = ({ theme }) => {
  const [products, setProducts] = useState([]);
  const [categoryId, setCategoryId] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const location = useLocation();
  const [id, setId] = useState('');

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const paramId = searchParams.get('id');
    if (paramId) {
      setId(paramId);
    }
  }, [location.search]);

  useEffect(() => {
    const myHeaders = new Headers();
    myHeaders.append("accept", "application/json");
    myHeaders.append("X-CSRFToken", "nPEsr7w2mqQzktFwLpHw3rEY1K5G87LRWPjqk1jHSyBr4MRblo9J4rnbKFzGaq5s");

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    };
    if (id) {
      fetch(`${url.baseUrl}/api/products/` + id, requestOptions)
        .then((response) => response.json())
        .then((result) => setCategoryId(result.category_id))
        .catch((error) => console.error(error));
    }
  }, [id]);

  useEffect(() => {
    const myHeaders = new Headers();
    myHeaders.append("accept", "application/json");
    myHeaders.append("X-CSRFToken", "nPEsr7w2mqQzktFwLpHw3rEY1K5G87LRWPjqk1jHSyBr4MRblo9J4rnbKFzGaq5s");

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    };
    if (categoryId) {
      fetch(`${url.baseUrl}/api/products/?category=` + categoryId, requestOptions)
        .then((response) => response.json())
        .then((result) => setProducts(result))
        .catch((error) => console.error(error));
    }
  }, [categoryId]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      Math.min(prevIndex + 1, products.length - 1)
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

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

  const [slideWidth, setSlideWidth] = useState(25);

  const handleResize = () => {
    if (window.innerWidth < 1024) {
      setSlideWidth(100);
    } else {
      setSlideWidth(25);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  console.log(theme.theme)
  return (
    <div className="slider-container fontr container pt-3 pb-3 p-5">
      <div className="border-bottom border-2 border-theme col-md-12 col-12 row m-0">
        <div className="d-flex justify-content-end col-md-12 col-12">
          <span className="fontr h3 align-self-center">محصولات مشابه</span>
        </div>
      </div>
      <div className="slider-container position-relative m-0" style={{ overflowX: 'hidden' }}>
        <div className="product-sl">
          <div className="col-md-12 row m-0" dir="rtl">
            <div className="slider" style={{ transform: `translateX(${currentIndex * 95}%)` }}>
              {products?.map((product) => (
                <div key={product.id} className="p-3 col-md-3 position-relative" style={{ minWidth: `${slideWidth}%` }}>
                  <div className={product.count === 0 ? 'out-of-stock col-md-12' : 'product-carde'}>
                    <div className="row m-0 d-flex justify-content-end">
                      {product.discount !== 0 && (
                        <div className="discountDisplay">
                          <span>%{convertToPersian(product.discount)}</span>
                        </div>
                      )}
                      <div className="d-flex justify-content-center">
                        <img
                          src={product.pic}
                          className="Img col-md-11 p-2 rounded-4"
                          alt={product.name}
                        />
                      </div>
                      <div className="d-flex justify-content-center pt-2">
                        <span className="h5 fontr text-center product-name">{convertToPersian(product.name)}</span>
                      </div>
                      <div className="d-flex justify-content-center">
                        <span className="h5 fontr pt-1 product-name" dir="rtl">
                          {addCommas(product.price)} هزار تومن
                        </span>
                      </div>
                    </div>
                    <a className="hrefb align-self-center" href={`pi?id=${product.id}`} aria-label={`View ${product.name}`}>
                      <div className="hover-detailse col-md-12">
                        <div className="d-flex justify-content-center" style={{ paddingTop: "45%" }}>
                          <button className="btn btn-orange fontr" aria-label="View Product">
                            مشاهده محصول
                          </button>
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button
            className="btn btn-transparent position-absolute fontr"
            style={{ left: 0, top: '50%', transform: 'translateY(-50%)', height: "100%", fontSize: "2rem" }}
            onClick={nextSlide}
            aria-label="Previous">
            {"<"}
          </button>
          <button
            className="btn btn-transparent position-absolute fontr"
            style={{ right: 0, top: '50%', transform: 'translateY(-50%)', height: "100%", fontSize: "2rem" }}
            onClick={prevSlide}
            aria-label="Next">
            {">"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommonProducts;
