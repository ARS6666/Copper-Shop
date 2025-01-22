import React, { useState, useEffect } from "react";
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.css';
import "../../assets/css/home/slider.css"
import url from "../../config.json"
import logo from "../../assets/media/logo.jpg"

function ImageSlider() {
  const [SliderPic, setSliderPic] = useState([])

  const myHeaders = new Headers();
  myHeaders.append("accept", "application/json");
  myHeaders.append("X-CSRFToken", "j5ZawuIYv02cEII2cAOXj5FJlg9fLusxsbIGi8EEyVrDMtygZ4f2tXNFg79O3y1F");

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow"
  };

  useEffect(() => {
    fetch(`${url.baseUrl}/slider/slider/`, requestOptions)
      .then((response) => response.json())
      .then((result) => setSliderPic(result))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="col-md-12 m-0">
      <Carousel interval={5000}>
        {SliderPic.map(Pic =>
          <Carousel.Item key={Pic.id}>
            <div className="carousel-inner">
              <img src={Pic.image} style={{ height: "500px", width: "100%", objectFit: "cover" }} />
              <div className="carousel-title" dir="rtl">
                <h1 className="fontr fw-bold">فروشگاه مس هنر زنجان</h1>
              </div>
              <img className="carousel-logo" src={logo}/>
            </div>
          </Carousel.Item>
        )}
      </Carousel>
    </div>
  );
};

export default ImageSlider;
