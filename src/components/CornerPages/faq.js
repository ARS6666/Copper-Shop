import React, { useState } from 'react';
import "../../assets/css/href.css"
const Faq = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleOpen = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const faqData = [
        {
            question: 'چگونه می‌توانم سفارش خود را ثبت کنم؟',
            answer: 'برای ثبت سفارش، محصولات مورد نظر را به سبد خرید اضافه کرده و فرآیند پرداخت را تکمیل کنید. پس از تکمیل سفارش، شما یک ایمیل تأیید دریافت خواهید کرد.'
        },
        {
            question: 'چگونه می‌توانم وضعیت سفارش خود را ردیابی کنم؟',
            answer: 'شما می‌توانید با ورود به حساب کاربری خود و مشاهده بخش سفارشات، وضعیت سفارش خود را پیگیری کنید. همچنین، یک ایمیل پیگیری پس از ارسال سفارش دریافت خواهید کرد.'
        },
        {
            question: 'زمان تحویل محصولات چقدر است؟',
            answer: 'زمان ارسال محصولات بسته به مکان شما متفاوت است، اما معمولاً بین 3 تا 7 روز کاری طول می‌کشد.'
        },
        {
            question: 'آیا ظروف مسی بهداشتی و ایمن برای پخت و پز هستند؟',
            answer: 'بله، ظروف مسی اگر به درستی استفاده شوند، بهداشتی هستند. اما باید توجه داشت که نباید غذاهای اسیدی را برای مدت طولانی در ظروف مسی نگه داشت.'
        },
        {
            question: 'بهترین روش برای نگهداری و شستشوی ظروف مسی چیست؟',
            answer: 'برای نگهداری صحیح از ظروف مسی، بهتر است آنها را با دست بشویید و از قرار دادن آنها در ماشین ظرفشویی خودداری کنید. همچنین، برای حفظ درخشندگی، می‌توانید از جلا دهنده‌های مخصوص مس استفاده کنید.'
        },
        {
            question: 'ظروف مسی چه مزایایی برای پخت و پز دارند؟',
            answer: 'ظروف مسی به دلیل خواص ضد باکتری و هدایت حرارتی بالا، برای پخت و پز عالی هستند. همچنین، این ظروف می‌توانند طول عمر بیشتری داشته باشند و به زیبایی و جلوه خاصی به آشپزخانه شما ببخشند.'
        },
        {
            question: 'آیا ظروف مسی برای همه نوع پخت و پز مناسب هستند؟',
            answer: 'بله، ظروف مسی به دلیل هدایت حرارتی بالا و توزیع یکنواخت گرما، برای پخت و پز بسیار مناسب هستند. اما باید از روکش داخلی مناسبی مانند قلع یا استیل استفاده شود تا با غذاهای اسیدی واکنش ندهند.'
        }
    ];


    return (<>
        <div className='col-md-12 col-12 fontr d-flex justify-content-center row m-0 pt-3 pb-3'>
            <h1 className='col-md-12 col-12 p-4 text-center color-theme'>سوالات متداول</h1>
            <div className='container d-flex justify-content-center row m-0'>
                {faqData.map((item, index) => (
                    <div className='col-md-12 col-12 row m-0'>
                        <div className='col-md-3 col-3'></div>
                        <div key={index} className='col-md-6 col-6 pt-4'>
                            <button onClick={() => toggleOpen(index)} className={`btn btn-lg col-md-12 col-12  text-end row m-0 p-4 bg-orange ${openIndex === index ? 'rounded-bottom-0' : ''}`} style={{ borderRadius: "0.75rem", alignItems: "center" }}>
                                <div className='col-md-12 col-12 row m-0'>
                                    <div className='col-md-1 col-1 d-flex justify-centent-start'>
                                        <span style={{ fontSize: "25px" }}>{openIndex === index ? <i className="fa-solid fa-angle-up"></i> : <i className="fa-solid fa-angle-down"></i>}</span>
                                    </div>
                                    <div className='col-md-11 col-11 d-flex justify-content-end'>
                                        <span style={{ fontSize: "1.2rem", wordSpacing: "0.2rem" }}>{item.question}</span>
                                    </div>
                                </div>
                            </button>
                            {openIndex === index && (
                                <div className={`col-md-12 d-flex justify-content-center bg-orange  ${openIndex === index ? 'rounded-top-0' : ''}`} style={{ borderRadius: "0.75rem" }}>
                                    <span className='text-end container p-3 pt-0 col-md-11 col-11' style={{ fontSize: "1.2rem", wordSpacing: "0.1rem" }}><p className={` ${openIndex === index ? 'an' : ''}`} dir="rtl">{item.answer}</p>
                                    </span>
                                </div>
                            )}
                        </div>
                        <div className='col-md-3 col-3'></div>
                    </div>
                ))}
            </div>
        </div>
    </>);
};

export default Faq;
