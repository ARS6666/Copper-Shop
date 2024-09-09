import { useState, React } from "react";
import "../../assets/css/home/products.css";
import img from "../../assets/media/123.png";

function HProducts() {
  const [Product, setPRoduct] = useState([]);
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

  fetch("http://127.0.0.1:8000/api/v1/products/", requestOptions)
    .then((response) => response.json())
    .then((result) => setPRoduct(result))
    .catch((error) => console.error(error));

  return (
    <>
      <div class="d-flex justify-content-center">
        <span class="h1 fontr border-bottom border-4 border-danger p-3">
          محصولات
        </span>
      </div>
      <div class="col-md-12 row d-flex justify-content-center fontr">
        {Product.map((c) => (
          <div class="bg-light shadow  col-md-3 m-3 product-card">
            <div class="row">
              <div class="d-flex justify-content-center ">
                <img
                  src={c.pic}
                  class="Img col-md-11 p-2 "
                  style={{ borderRadius: "20px" }}
                />
              </div>
              <div class="d-flex justify-content-center pt-2">
                <span class="h3 fontr ">{c.name}</span>
              </div>
              <div class="d-flex justify-content-center ">
                <span class="h5 fontr pt-1 " dir="rtl">
                  {c.price} هزار تومن
                </span>
              </div>
            </div>
            <div className="hover-details col-md-12 ">
              <div
                class="d-flex justify-content-center "
                style={{ height: "400px" }}
              >
                <a class="hrefb align-self-center" href={"pi?id=" + c.id}>
                  <button className="btn btn-light hover  fontr ">
                    مشاهده محصول
                  </button>
                </a>
              </div>
            </div>
          </div>
        ))}
        <div class="d-flex justify-content-center pt-2 mb-4">
          <a class="hrefw col-md-6" href="/products"><button class="btn btn-lg btn-dark col-md-12">مشاهده همه</button></a>
        </div>
      </div>
    </>
  );
}

export default HProducts;