import React from 'react';

const AboutUs = () => {
  return (
    <section className="py-5" style={{ backgroundColor: '#8B0000', color: '#fff' }} dir='rtl'>
      <div className="container">
        <div className="row align-items-center mb-5">
          <div className="col-12 col-lg-6 mb-4 mb-lg-0">
            <img
              src="https://via.placeholder.com/500"
              alt="About Us"
              className="img-fluid rounded"
              style={{ maxWidth: '100%' }}
            />
          </div>
          <div className="col-12 col-lg-6">
            <h2 className="display-4 mb-4 fw-bold">درباره ی ما</h2>
            <p className="lead mb-4">
              سلام خو شآمدید ما عالی هستیم خفن و پرطرفدار ماه عسل فدامون بشم خیلی خوب کردی اومدی به مغازه ی ما
            </p>
            <p>
              عشقی مشتی هستی بهترین چیزا رو دریاب لباس بخر حالشو ببر تیپ بزن ببین چه می کنیم با استایلت. یه تماس با ما داشته باشی حله همه چی اگه بلد نیستی بهت میگیم چطور زنگ بزنی ماشالا 
            </p>
            <button className="btn btn-outline-light mt-3 fw-bold">تماس با ما</button>
          </div>
        </div>

        {/* Services Section */}
        <div className="row text-center">
          <div className="col-12 col-md-4 mb-4 mb-md-0">
            <div className="p-4 bg-white text-dark rounded">
              <i className="bi bi-bag-fill display-4 mb-3"></i>
              <h3 className="h5">کیفیت بالای محصولات</h3>
              <p>محصولات رو با بهترین کیفیت از ما بخرید سه تا بخر یکی ببر تضمینی</p>
            </div>
          </div>
          <div className="col-12 col-md-4 mb-4 mb-md-0">
            <div className="p-4 bg-white text-dark rounded">
              <i className="bi bi-people-fill display-4 mb-3"></i>
              <h3 className="h5">لذت شیک پوشی</h3>
              <p> ما تضمین می کنیم که زندگی شما پس از ورود به سایت ما به دو قسمت نصف میشه
                بعد ما قبل ما
              </p>
            </div>
          </div>
          <div className="col-12 col-md-4">
            <div className="p-4 bg-white text-dark rounded">
              <i className="bi bi-lightbulb-fill display-4 mb-3"></i>
              <h3 className="h5">ارسال سریع</h3>
              <p>ما به محصولامون یاد میدیم چجوری دم در خونتون تلپورت کنن. 
                دکمه واریزو بزنی لباس دستته  </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;