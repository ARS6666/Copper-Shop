import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Carousel, Modal } from "react-bootstrap";
import "../../assets/css/productsinfo/PI.css";
import "../../assets/css/hide.css";
import Loading from "../loading/loading";
import url from "../../config.json";
import logo from "../../assets/media/logo11.png";

function ProductInfo(theme) {
  const navigate = useNavigate();
  const [IsLoading, setIsLoading] = useState(true);
  const token = localStorage.getItem('token');
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [IMG, setIMG] = useState([]);
  const [added, setAdded] = useState(false);
  const [product, setProduct] = useState({});
  const location = useLocation();
  const [id, setId] = useState('');
  const myHeaders = new Headers();
  myHeaders.append("accept", "application/json");
  myHeaders.append("X-CSRFToken", "KyZ2IoH4Fwq3gYd5NsZ7481BNovNb1aJDsL38cuGmcoFPcgf8j3PKYRTvrRx5HWU");
  const requestOptions = { method: "GET", headers: myHeaders, redirect: "follow" };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const paramId = searchParams.get('id');
    if (paramId) {
      setId(paramId);
    }
  }, [location.search]);

  useEffect(() => {
    if (id) {
      fetch(`${url.baseUrl}/api/products/` + id, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          setProduct(result);
          setIMG(result.images);
          setIsLoading(false);
        })
        .catch((error) => console.error(error));
    }
  }, [id]);

  function AddItem(productId, event) {
    if (token) {
      setAdded(true);
      const dot = document.createElement('div');
      dot.className = 'dot';
      document.body.appendChild(dot);
      const x = event.clientX;
      const y = event.clientY;
      dot.style.left = `${x}px`;
      dot.style.top = `${y}px`;
      setTimeout(() => {
        dot.style.transform = 'translate(-50vh , -100vh)';
      }, 10);
      setTimeout(() => {
        document.body.removeChild(dot);
        setAdded(false);
      }, 1900);
      setButtonDisabled(true);
      const myHeaders = new Headers();
      myHeaders.append("accept", "application/json");
      myHeaders.append("X-CSRFToken", "5teHG5lzFJM4CD8QwLdXzrrvjxmRqWl91abWUh2YcbHKJ1NVq5s3g9B3KrcKmR8L");
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${token}`);
      const raw = JSON.stringify({ "product_id": productId });
      const requestOptions = { method: "POST", headers: myHeaders, body: raw, redirect: "follow" };
      fetch(`${url.baseUrl}/cart/cart/add_item/`, requestOptions)
        .then((response) => response.text())
        .catch((error) => console.error(error));
    } else {
      navigate('/login');
    }
  }

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedIndexB, setSelectedIndexB] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const handleSelect = (selectedIndex) => {
    setSelectedIndex(selectedIndex);
  };

  const handleImageClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
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

  const [transformOrigin, setTransformOrigin] = useState('center center');
  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setTransformOrigin(`${x}% ${y}%`);
  };

  useEffect(() => {
    document.title = product.name;
  }, [product.name]);

  function renderDescription(description) {
    if (!description) {
      return null;
    }

    return description.split('.').map((sentence, index) => (
      <React.Fragment key={index}>
        {sentence.trim()}
        {index < description.split('.').length - 1 && <br />}
      </React.Fragment>
    ));
  }


  return (
    <>
      <meta name="description" content={`مشخصات ${product.name} - فروشگاه ظروف مسی`} />
      <meta name="keywords" content={`ظروف مسی, ${product.name}, خرید آنلاین`} />
      {IsLoading ? <Loading /> : null}
      <div className="p-4 container-xxl pt-2" dir="rtl">
        <div className="row m-0 col-md-12">
          <div className="col-md-6 d-flex flex-column">
            <div className="row m-0">
              <div className="col-md-2 d-flex flex-column align-items-end remove">
                {IMG?.slice(0, 4).map((c, index) => (
                  <img key={c.image} className="img-fluid m-1 remove" src={c.image} alt={`${product.name} Thumbnail`} onClick={() => handleSelect(index)} />
                ))}
              </div>
              <div className="magnify-container col-md-10 col-12 d-flex justify-content-center">
                <div className="justify-content-start">{product.discount !== 0 && product.count !== 0 ? <div className="discountDisplay fontr">%{convertToPersian(product.discount)}</div> : null}</div>
                <div className="col-md-12 col-12">
                  <Carousel activeIndex={selectedIndex} onSelect={handleSelect} interval={3000} >
                    {IMG.map((Pic, index) => (
                      <Carousel.Item key={index}>
                        <div className="image-container">
                          <img className="d-block ImageProd magnify-image" src={Pic.image} alt={`${product.name} Image ${index + 1}`} onMouseMove={handleMouseMove} onClick={handleImageClick} style={{ transformOrigin }} />
                          <img className="logo-overlay" src={logo} alt="Logo" />
                        </div>
                      </Carousel.Item>
                    ))}
                  </Carousel>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-sm-12 col-12 fontr pt-4 d-flex proddescription">
            <div className="col-md-10 col-sm-11 col-11">
              <div><h2 className={theme.theme.theme === "dark" ? "text-white" : "text-dark"}>{convertToPersian(product.name)}</h2></div>
              <div className="col-md-12 col-12 col-sm row m-0">
                <div className="pt-1"><span className={product.discount === 0 ? theme.theme.theme === "dark" ? "text-white h3" : "text-dark h3" : "redFont col-md-2"}>{addCommas(product.price)} تومان</span></div>
                <div>{product.discount !== 0 ? <span className={theme.theme.theme === "dark" ? "text-white h3" : "text-dark h3"}>{addCommas(product.price - (product.price * (product.discount / 100)))} تومان</span> : null}</div>
              </div>
              <div className="pt-4">
                <span className="h4">توضیحات:</span>
                <p className="h5" style={{ lineHeight: "1.9rem" }}>
                  {renderDescription(product.description)}
                </p>
              </div>
              <div className="pt-4">
                <span className="h4">دسته بندی:</span>
                <div className="d-flex justify-content-end">
                  <span className="h5">{product.category}</span>
                </div>
              </div>
              <div className="pt-4">
                <span className="h4">برند:</span>
                <div className="d-flex justify-content-end">
                  <span className="h5">مس هنر</span>
                </div>
              </div>
              <div className="pt-4">
                <button className="btn rounded-0 btn-lg btn-orange w-100 add-to-cart" onClick={(event) => AddItem(product.id, event)}
                  disabled={buttonDisabled}>
                  {buttonDisabled ? <span className="text-white">به سبد خرید اضافه شد!</span> : <span>افزودن به سبد خرید</span>}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Body className="p-0">
          <Carousel interval={3000}>
            {IMG.map((Pic, index) => (
              <Carousel.Item key={index}>
                <div className="image-container">
                  <img className="d-block ImageProdB magnify-image" src={Pic.image} alt={`${product.name} Image ${index + 1}`} onMouseMove={handleMouseMove} style={{ transformOrigin }} />
                  <img className="logo-overlay" src={logo} alt="Logo" />
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ProductInfo;
