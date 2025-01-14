import React from "react";
import logo from "../assets/media/logo.jpg";
import eight from "../assets/media/85.png";
import eighto from "../assets/media/86.PNG";
import "../assets/css/href.css";
import "../assets/css/footer.css";
import '@fortawesome/fontawesome-free/css/all.min.css';
import '@fortawesome/fontawesome-free/js/all.js';


function Footer(theme) {
  return (
    <div className="container-fluid border-top border-dark pt-3" style={{ backgroundColor: theme.theme === "dark" ? "#121212" : "white" }} dir="rtl" >
      <div className="row m-0">
        <div className="col-lg-8 col-md-9 col-12 row m-0">
          <div className="col-lg-3 col-md-6 col-12 mb-3">
            <div className="pt-4 row m-0">
              <img src={logo} alt="Company Logo" style={{ height: "45px", width: "auto" }} className="col-12 mb-3" />
              <div>
                <i className="fa fa-telegram h4 p-1" aria-hidden="true"></i>
                <i className="fa-brands fa-facebook-f h4 p-1"></i>
                <i className="fa fa-whatsapp h4 p-1" aria-hidden="true"></i>
                <i className="fa fa-instagram h4 p-1" aria-hidden="true"></i>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-12 mb-3 fontr">
            <div className="pt-4">
              <h5 className={theme.theme === "dark" ? "mb-4 text-white brand-name" : "mb-4 text-dark brand-name"}>🛒 مس هنر</h5>
              <p className="mb-3">
                <a className={theme.theme === "dark" ? "hrefw" : "hrefb"} href="https://balad.ir/p/%D8%AA%D9%88%D9%84%DB%8C%D8%AF%DB%8C-%D8%B5%D9%86%D8%A7%DB%8C%D8%B9-%D9%85%D8%B3-%D9%87%D9%86%D8%B1-%D8%B2%D9%86%D8%AC%D8%A7%D9%86_shopping-mall-1Ig31uJf1AYih8#15/36.70521/48.4318"><i className="bi bi-geo-alt-fill"></i> استان زنجان، زنجان، بلوار پرفسور ثبوتی</a>
              </p>
              <p className="mb-3">
                <i className="bi bi-telephone-fill"></i> 09128414413
              </p>
              <p className="mb-3">
                <i className="bi bi-envelope-at-fill"></i> ساخته شده توسط تیم LARS
              </p>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-12 mb-3 fontr">
            <div className="pt-4">
              <h5 className={theme.theme === "dark" ? "mb-4 text-white brand-name" : "mb-4 text-dark brand-name"}>خدمات مشتریان</h5>
              <p className="mb-3">
                <a className={theme.theme === "dark" ? "hrefw" : "hrefb"} href="/about">درباره ی ما</a>
              </p>
              <p className="mb-3">
                <a className={theme.theme === "dark" ? "hrefw" : "hrefb"} href="#faq">پرسش های متداول</a>
              </p>
              <p className="mb-3">
                <a className={theme.theme === "dark" ? "hrefw" : "hrefb"} href="#privacy">حریم خصوصی</a>
              </p>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-12 mb-3 fontr">
          </div>
        </div>
        <div className="col-lg-4 col-md-3 col-12 pt-5 d-flex justify-content-end">
          <img className="m-3 border rounded p-2" src={eight} alt="Certification" style={{ height: "100px", width: "auto" }} />
          <img className="m-3 border rounded p-2" src={eighto} alt="Certification" style={{ height: "100px", width: "auto" }} />
        </div>
      </div>
    </div>
  );
}

export default Footer;
