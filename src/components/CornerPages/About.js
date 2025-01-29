import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Img from '../../assets/media/aboutus.png';
import Faq from './faq';
import ContactUs from './contactUs';

const AboutUs = () => {
  const location = useLocation();
  const faqRef = useRef(null);

  useEffect(() => {
    document.title = "خدمات مشتریان";
    if (location.hash === '#faq' && faqRef.current) {
      faqRef.current.scrollIntoView({ behavior: 'smooth' });
    };
    if (location.hash === '#contactus' && faqRef.current) {
      faqRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [location]);

  return (
    <>
      <section className="fontr" style={{ backgroundColor: '#0000', color: '#fff' }} dir='rtl'>
        <div className="container">
          <div className="row m-0 align-items-center mb-2">
            <div className="col-12 col-lg-6 mb-1 mb-lg-0">
              <img
                src={Img}
                alt="About Our Copperware Store"
                className="img-fluid rounded"
                style={{ maxWidth: '100%' }}
              />
            </div>
            <div className="col-12 col-lg-6 p-4">
              <h2 className="display-4 mb-4 fw-bold" style={{ color: '#DB5C28' }}>درباره ی ما</h2>
              <p className="lead mb-4 fw-bold" style={{ color: '#DB5C28', fontSize: "1.2rem", wordSpacing: "0.1rem" }}>
                به فروشگاه ما خوش آمدید! ما تخصصی در زمینه فروش ظروف مسی با کیفیت بالا داریم. محصولات ما با دقت ساخته شده و با طراحی‌های متنوع عرضه می‌شوند.
              </p>
              <p style={{ color: '#DB5C28', fontSize: "1.2rem", wordSpacing: "0.1rem" }}>
                ما مفتخریم که بهترین ظروف مسی را به شما ارائه دهیم که نه تنها زیبا بلکه کارآمد و با دوام هستند. شما می‌توانید با خرید از فروشگاه ما زیبایی و اصالت را به آشپزخانه‌ی خود بیاورید.
              </p>
              <a className='hrefw' href="tel:+989128414413">
                <div className="col-md-12 d-flex justify-content-end">
                  <button className="btn btn-orange mt-3 fw-bold">تماس با ما</button>
                </div>
              </a>
            </div>
          </div>

          <div className="row m-0 text-center mb-3">
            <div className="col-12 col-md-4 pt-2">
              <div className="p-4 text-white rounded" style={{ backgroundColor: "#DB5C28" }}>
                <i className="bi bi-bag-fill display-4"></i>
                <h3 className="h5">کیفیت بالای محصولات</h3>
                <p style={{ fontSize: "1.2rem", wordSpacing: "0.1rem" }}>محصولات ما با بالاترین کیفیت ساخته می‌شوند و تضمین کیفیت دارند.</p>
              </div>
            </div>
            <div className="col-12 col-md-4 pt-2">
              <div className="p-4 text-white rounded" style={{ backgroundColor: "#DB5C28" }}>
                <i className="bi bi-people-fill display-4"></i>
                <h3 className="h5">رضایت مشتریان</h3>
                <p style={{ fontSize: "1.2rem", wordSpacing: "0.1rem" }}>رضایت مشتریان هدف اصلی ماست و ما با ارائه بهترین خدمات در این زمینه تلاش می‌کنیم.</p>
              </div>
            </div>
            <div className="col-12 col-md-4 pt-2 pb-2">
              <div className="p-4 text-white rounded" style={{ backgroundColor: "#DB5C28" }}>
                <i className="bi bi-lightbulb-fill display-4"></i>
                <h3 className="h5" >ارسال سریع</h3>
                <p style={{ fontSize: "1.2rem", wordSpacing: "0.1rem" }}>محصولات شما را با سریع‌ترین و امن‌ترین روش‌ها به دستتان می‌رسانیم.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className='col-md-12 col-12 d-flex justify-content-center pb-3' id='faq' ref={faqRef}>
        <Faq />
      </div>
      <div className='col-md-12 col-12 d-flex justify-content-center pb-4' id='contactus' ref={faqRef}>
        <ContactUs />
      </div>
    </>
  );
};

export default AboutUs;
