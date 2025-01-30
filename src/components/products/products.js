import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Loading from "../loading/loading";
import "../../assets/css/products/productPage.css";
import Filter from "./Filter";
import url from "../../config.json";

function Products() {
  const [IsLoading, setIsLoading] = useState(true);
  const [detail, setDetail] = useState([]);
  const [NoResult, setNoResult] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [category, setCategory] = useState('');
  const [visibleProducts, setVisibleProducts] = useState(9);
  const [ButtContent, setButtContent] = useState("مشاهده بیشتر ...");
  const [ButtDisable, setButtDisable] = useState(false);
  const location = useLocation();

  useEffect(() => {
    document.title = "محصولات";
  }, []);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const paramId = searchParams.get('category');
    if (paramId) {
      setCategory(paramId);
    }
  }, [location.search]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const paramId = searchParams.get('search');
    if (paramId) {
      setSearchTerm(paramId);
    }
  }, [location.search]);

  useEffect(() => {
    const fetchProducts = async () => {
      const myHeaders = new Headers();
      myHeaders.append("accept", "application/json");
      myHeaders.append("X-CSRFToken", "ILg6BalvqqJgB7hTVi0Pws5c4Nalxq1GnucwFC7yoZa5gHDVxXVcvPsZKmqIH0yb");

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
      };

      try {
        const response = await fetch(`${url.baseUrl}/api/products/`, requestOptions);

        if (!response.ok) {
          console.error('Error fetching data:', response.status, response.statusText);
          return;
        }

        const result = await response.json();
        setDetail(result);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleFilterChange = (filters) => {
    setSearchTerm(filters.searchTerm);
    setMinPrice(filters.minPrice);
    setMaxPrice(filters.maxPrice);
    setCategory(filters.category);
  };

  const filteredProducts = detail.filter((product) => {
    const matchesSearchTerm = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMinPrice = minPrice === '' || product.price >= parseFloat(minPrice);
    const matchesMaxPrice = maxPrice === '' || product.price <= parseFloat(maxPrice);
    const matchesCategory = category === '' || product.category.includes(category);

    return matchesSearchTerm && matchesMinPrice && matchesMaxPrice && matchesCategory;
  });

  const groupedProducts = filteredProducts.reduce((acc, product) => {
    const cat = product.category[0];
    if (!acc[cat]) {
      acc[cat] = [];
    }
    acc[cat].push(product);
    return acc;
  }, {});

  const displayedProducts = Object.values(groupedProducts).flatMap(products => products);

  const [content, setContent] = useState(
    <div className="col-md-12 pb-3 add">
      <button
        className="btn btn-orange col-md-12 col-12  d-flex justify-content-center"
        onClick={() => {
          handleClick(); changeContent(
            <div className="col-md-12 col-12">
              <Filter onFilterChange={handleFilterChange} />
            </div>
          )
        }}
        aria-label="Apply Filters"
      ><span className="h5 fontr align-self-center">اعمال فیلتر</span>
      </button>
    </div>);

  const changeContent = (newContent) => {
    setContent(newContent);
  };

  const [isChecked, setIsChecked] = useState(true);
  const handleClick = () => {
    setIsChecked(prevChecked => !prevChecked);
  };

  useEffect(() => {
    if (displayedProducts.length === 0) {
      setNoResult(true);
    } else {
      setNoResult(false);
    }
  }, [displayedProducts]);

  const showMoreProducts = () => {
    setVisibleProducts((prevVisibleProducts) => prevVisibleProducts + 9);
    if (displayedProducts.length - visibleProducts > 0) {
      setButtContent("مشاهده بیشتر ...");
    } else {
      setButtContent("محصولات به پایان رسیدند ...");
    }
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

  return (
    <>
      <meta name="description" content="فروشگاه ظروف مسی - لیست محصولات" />
      <meta name="keywords" content="ظروف مسی, خرید آنلاین, فروشگاه, محصولات" />
      {IsLoading ? <Loading /> : null}
      <div className="container-fluid p-3">
        <div className="row m-0 d-flex justify-content-center">
          <div className="col-12 col-md-10 mb-3">
            {content}
          </div>
          <div className="col-12 text-center">
            <span className="display-5 fontr border-bottom border-4 border-theme py-3">
              محصولات
            </span>
          </div>
          <div className="row m-0 d-flex justify-content-center pt-5" dir="ltr">
            <div className="col-12 col-md-9 row m-0 d-flex justify-content-center fontr">
              {NoResult ? (
                <div className="col-12 text-center">
                  <span className="display-5">!محصولی یافت نشد</span>
                </div>
              ) : (
                displayedProducts.slice(0, visibleProducts).map((c) => (
                  <div key={c.id} className={`col-sm-8 col-10 col-md-3 m-3 productt-card Anim ${c.count === 0 ? 'out-of-stock' : ''}`}>
                    <div className="row m-0">
                      {c.discount !== 0 && c.count !== 0 && (
                        <div className="discountDisplay">
                          <span>%{convertToPersian(c.discount)}</span>
                        </div>
                      )}
                      <div className="d-flex justify-content-center">
                        <img src={c.pic} className="Img col-12" alt={c.name} />
                      </div>
                      <div className="d-flex justify-content-center pt-3">
                        <span className="h5 fontr text-center" style={{ wordSpacing: "0.3rem", lineHeight: "2rem" }}>{convertToPersian(c.name)}</span>
                      </div>
                      <div className="d-flex justify-content-center">
                        <span className="fontr pt-1">{addCommas(c.price)} تومان</span>
                      </div>
                    </div>
                    <Link to={`pi?id=${c.id}#${c.name}`} className="hrefb align-self-center" aria-label={`View ${c.name}`}>
                      <div className="hoverr-details col-12">
                        <div className="d-flex justify-content-center bp">
                          <button className="btn btn-orange border-0 fontr" aria-label="View Product">مشاهده محصول</button>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))
              )}
              {!NoResult && (
                <div className="col-12 text-center py-5">
                  <button className="btn btn-orange hover col-md-9 col-12" dir="rtl" onClick={showMoreProducts} disabled={ButtDisable} aria-label="Show More Products">
                    <span className="h5">{ButtContent}</span>
                  </button>
                </div>
              )}
            </div>
            <div className="col-12 col-md-3 remove pb-3 justify-content-center">
              <Filter onFilterChange={handleFilterChange} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Products