import React, { useState, useEffect } from 'react';
import '../../../assets/css/account/RPP.css';
import Img from "../../../assets/media/logo.png";
import url from "../../../config.json";
import "../../../assets/css/account/order.css"


const RecentOrders = (theme) => {
  var jalaali = require('jalaali-js')
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const token = localStorage.getItem('token');
  const [Orderhistory, setOrderhistory] = useState([{ items: [] }])
  const [OrderItems, setOrderItems] = useState([])
  const [ISOrderhistory, setISOrderhistory] = useState(true)
  const [show, setShow] = useState(false);


  useEffect(() => {
    const myHeaders = new Headers();
    myHeaders.append("accept", "application/json");
    myHeaders.append("X-CSRFToken", "xOcmZfETILyxOSu0qlmZYHvVxBbbTwcadRPbabQcxi3gDybQ2yvYwF4upXDXTUlA");
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    };
    fetch(`${url.baseUrl}/order/order-history`, requestOptions)
      .then((response) => response.json())
      .then((result) => setOrderhistory(result))
      .catch((error) => console.error(error));
    if (Orderhistory.length > 0) {
      setISOrderhistory(true)
    }
  }, []);

  function fetchOrderItems(orderId) {
    const order = Orderhistory.find(order => order.id === orderId);
    if (order) {
      setOrderItems(order.items);
    }
  };

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
    fetchOrderItems(order);
  };

  const handleBackClick = () => {
    setSelectedOrder(null);
  };


  function convertToIranianDate(isoDate) {
    if (!isoDate) {
      return 'Invalid date';
    }
    const date = new Date(isoDate);
    if (isNaN(date.getTime())) {
      return 'Invalid date';
    }

    const gregorianYear = date.getUTCFullYear();
    const gregorianMonth = date.getUTCMonth() + 1;
    const gregorianDay = date.getUTCDate();

    const jalaliDate = jalaali.toJalaali(gregorianYear, gregorianMonth, gregorianDay);

    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');

    return `${jalaliDate.jy}-${String(jalaliDate.jm).padStart(2, '0')}-${String(jalaliDate.jd).padStart(2, '0')} ${hours}:${minutes}:${seconds}`;
  }
  const addCommas = (number) => {
    if (number !== undefined) {
      let [integer] = number.toString().split('.');
      integer = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      return integer;
    }
    return null;
  };
  function truncateString(str) {
    const words = str.split(' ');
    if (words.length <= 6) {
      return str;
    }
    const truncated = words.slice(0, 6).join(' ');
    return `${truncated}...`;
  }

  return (
    <div className={ISOrderhistory ? "p-3 shadow-0 fontr" : " p-3 shadow-0 fontr border"} dir="rtl" style={{ backgroundColor: theme.theme === "dark" ? "#121212" : "white", borderRadius: "10px" }}>
      {ISOrderhistory ?
        <>{selectedOrder ? (
          <div className="recent-order-details">
            <div className="col-md-12 col-12 d-flex justify-content-end">
              <button className="btn btn-outline-primary" onClick={handleBackClick}>برگشت</button>
            </div>
            <ul className="recent-product-list col-12">
              {OrderItems.map((c) => (
                <a className="hrefb" href={`pi?id=${c.product.id}#${c.product.name}`} key={c.product.id}>
                  <li className="product-item">
                    <img src={`${c.product.pic}`} alt={c.product.name} className="product-image" />
                    <div className="product-details">
                      <div className="text-container" onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
                        <h4 className={theme.theme === "dark" ? "text-light" : "text-dark"}>{truncateString(c.product.name)}</h4>
                        {show && <span className={theme.theme === "dark" ? "text-light float-text text-center" : "text-dark float-text text-center"}>{c.product.name}</span>}
                      </div>
                      <p>{c.product.category}</p>
                      <p>قیمت: {addCommas(c.product.price)} تومان</p>
                      <p>تعداد: {c.quantity}</p>
                    </div>
                  </li>
                </a>
              ))}
            </ul>
          </div>
        ) : (
          <div className="recent-orders-list col-12">
            <h2 style={{marginBottom: "20px"}} className='border-bottom border-4 border-danger col-md-3 col-12 pb-2'>سفارشات گذشته</h2>
            <ul className="recent-order-summary-list col-12">
              {Orderhistory?.map((order) => (
                <li key={order.id} className="recent-order-summary col-12" onClick={() => handleOrderClick(order.id)}>
                  <div className="col pt-1"><p>آیدی سفارش: <span className="order-id">{order.id}</span></p></div>
                  <div className="col pt-1"><p>قیمت کل: <span className="order-amount">{addCommas(order.total)} تومان</span></p></div>
                  <div className="col pt-1"><p>تاریخ سفارش: <span className="order-date ">{convertToIranianDate(order.created_at)}</span></p></div>
                  <div className="col pt-1 d-flex justify-content-end">
                    <button className="btn btn-outline-primary">مشاهده جزییات</button>
                  </div>
                </li>))}
            </ul>

          </div>
        )}
        </> : <div className='col-md-12 col-12 d-flex justify-content-center'><h3 className='text-dark'>تاریخچه ای وجود ندارد!</h3></div>
      }
    </div>
  );
};

export default RecentOrders;
