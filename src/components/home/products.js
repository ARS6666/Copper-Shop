import React, { useState, useEffect } from "react";
import "../../assets/css/home/Homeproduct.css";
import Loading from "../loading/loading";
import url from "../../config.json";

function HProducts() {
  const [IsLoading, setIsLoading] = useState(true);
  const [Product, setProduct] = useState([]);
  const myHeaders = new Headers();
  myHeaders.append("accept", "application/json");
  myHeaders.append(
    "X-CSRFToken",
    "eEAIhybYoInBYX8ZQrRp3EaIxvQ9JkybnKje3c7ErDM26IYdDViudwiEsmQI1o7j"
  );

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  useEffect(() => {
    fetch(`${url.baseUrl}/api/products/`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setProduct(result);
        setIsLoading(false);
      })
      .catch((error) => console.error(error));
  }, []);

  const addCommas = (number) => {
    let [integer] = number.toString().split('.');

    integer = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    return integer;
  };

  return (
    <>
      {IsLoading ? <Loading /> : null}

      <div class="d-flex justify-content-center m-0">
        <h1 class="fontr border-bottom border-4 border-theme p-3">
          محصولات
        </h1>
      </div>
      <div class="col-md-12 row m-0 d-flex justify-content-center fontr">
        {Product?.slice(0, 9).map((c) => (
          <div key={c.id} class={`col-md-3 col-sm-8 col-10 m-3 product-cardee Anim pt-5 ${c.count === 0 ? 'out-of-stock' : ''}`}>
            <div class="row m-0">
              {c.discount !== 0 && c.count !== 0 ? <div class="discountDisplay">{c.discount}%</div> : null}
              <div class="d-flex justify-content-center">
                <img src={c.pic} class="Imgee col-12" alt={c.name} />
              </div>
              <div class="d-flex justify-content-center pt-3">
                <h4 class="fontr text-center col-md-8" style={{ wordSpacing: "0.2rem" }}>{c.name}</h4>
              </div>
              <div class="d-flex justify-content-center">
                <h5 class="fontr pt-1" dir="rtl">
                  {addCommas(c.price)} هزار تومان
                </h5>
              </div>
            </div>
            <div class="hover-detailsee col-12 ">
              <div class="d-flex justify-content-center bpee">
                <a class="hrefb align-self-center" href={`pi?id=${c.id}#${c.name}`}>
                  <button class="btn btn-orange fontr">
                    مشاهده محصول
                  </button>
                </a>
              </div>
            </div>
          </div>
        ))}
        <div class="d-flex justify-content-center pt-5 pb-3">
          <a class="hrefw col-md-6 col-12" href="/products"><button class="btn btn-lg btn-orange col-md-12 col-10">مشاهده همه</button></a>
        </div>
      </div>
    </>
  );
}

export default HProducts;
