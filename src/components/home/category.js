import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../assets/css/home/category.css";
import url from "../../config.json";


const ProductSlider = (theme) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [Categories, setCategories] = useState([]);

  useEffect(() => {
    const myHeaders = new Headers();
    myHeaders.append("accept", "application/json");
    myHeaders.append("X-CSRFToken", "oWF4BYWZ2asUOabk8VBGC7SJcARquNg0HPyW3byriP71zUPgj0cYctxVFZRPwB6m");

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    };

    fetch(`${url.baseUrl}/api/products/category/`, requestOptions)
      .then((response) => response.json())
      .then((result) => setCategories(result))
      .catch((error) => console.error(error));
  }, []);


  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      Math.min(prevIndex + 1, Categories.length - 1)
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };
 console.log(theme.theme.theme)

  return (<>
    <div className="col-md-12 col-12 p-3 pb-3 m-0 ">
      <div className="fontr">
        <div className="col-md-12 row m-0 border-bottom border-2 border-theme">
          <div className="d-flex justify-content-start col-md-6 col-7">
            <div className="m-1 fontr">
              <button
                className="btn border-0"
                onClick={nextSlide}
                disabled={currentIndex === Categories.length - 1}
                aria-label="Next"
              >
                {`<`}
              </button>
            </div>
            <div className="m-1 fontr">
              <button
                className="btn border-0"
                onClick={prevSlide}
                disabled={currentIndex === 0}
                aria-label="Previous"
              >
                {`>`}
              </button>
            </div>
          </div>
          <div className={theme.theme.theme === "dark" ? "text-white align-self-center text-end h3 d-flex justify-content-end col-md-6 col-5" : "text-dark align-self-center text-end h3 d-flex justify-content-end col-md-6 col-5"}>دسته بندی ها</div>
        </div>

        <div className="slider-container col-md-12 row m-0 pt-2" dir="rtl">
          <div className="slider" style={{ transform: `translateX(${currentIndex * (100 / 2)}%)` }}>
            {Categories.map((categories, index) => (
              <div className="col-md-2 col-6 cat-hover" key={index} style={{ minWidth: `(-${(100 / 2)}%)` }}>
                <Link className={theme.theme.theme === "dark" ? "hrefw align-self-center" : "hrefb align-self-center"} to={`/products?category=${categories.name}`}>
                  <div className="row m-0">
                    <div className="d-flex justify-content-center ">
                      <img src={categories.image} title={categories.name} className="d-block col-md-11 p-2 cat-img" alt={categories.name} />
                    </div>
                    <div className="d-flex justify-content-center pt-2">
                      <h4 className="h4 fontr">{categories.name}</h4>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div >
  </>
  );
};

export default ProductSlider;
