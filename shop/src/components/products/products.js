import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../../assets/css/products/products.css";
import "../../assets/css/remove.css"
import Filter from "./Filter";
function Products() {

  const [detail, setDetail] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [category, setCategory] = useState('');
  const location = useLocation();


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
      myHeaders.append("X-CSRFToken", "AmrdKuP98ULWK4LXWttdeKR7sbq8MXasc254HGREEMpPhMwsthsWoHV4KfdW6NHl");

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
      };

      try {
        const response = await fetch("http://127.0.0.1:8000/api/v1/products/", requestOptions);
        const result = await response.json();
        setDetail(result);
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

  const displayedProducts = Object.values(groupedProducts).flatMap(products =>
    products
  );


  return (
    <>
      <div class="d-flex justify-content-center col-md-12">
        <span class="h1 fontr border-bottom border-4 border-danger p-3">
          محصولات
        </span>
      </div>
      <div class="col-md-12 row  d-flex justify-content-center pt-5 " dir="ltr">
        <div class="col-md-9 col-12 row d-flex justify-content-center fontr">
          {displayedProducts.map((c) => (
            <div class=" col-md-3 col-4 col-sm-4 m-3 product-card">
              <div class="row">
                <div class="d-flex justify-content-center ">
                  <img
                    src={c.pic}
                    class="Img col-md-11"
                  />
                </div>
                <div class="d-flex justify-content-center pt-3">
                  <span class="h5 fontr ">{c.name}</span>
                </div>
                <div class="d-flex justify-content-center ">
                  <span class=" fontr pt-1 " dir="rtl">
                    {c.price} هزار تومن
                  </span>
                </div>
              </div>
              <div className="hover-details col-md-12 ">
                <div
                  class="d-flex justify-content-center bp"
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
            <a class="hrefw col-md-6 col-6" href="/products"><button class="btn btn-lg btn-dark col-md-12 col-12">مشاهده همه</button></a>
          </div>
        </div>
        <div class="col-md-3 col-9 ">
          <Filter onFilterChange={handleFilterChange} />
        </div>
      </div>
    </>
  );
}

export default Products;
