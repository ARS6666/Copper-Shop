import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import '../../assets/css/blog/blog.css';
import s1 from '../../assets/media/sl1.png'
import s2 from '../../assets/media/sl2.png'
import s3 from '../../assets/media/sl3.png'

const Blog = ({ blogId }) => {
    const [blog, setBlog] = useState({
        title: 'زیبایی جاودانه مس: راهنمای ظروف و تجهیزات آشپزخانه مسی',
        author: 'ARS',
        content: `دلیلی وجود دارد که مس در آشپزخانه‌های سراسر جهان برای قرن‌ها استفاده شده است. با ظاهر خیره‌کننده و هدایت حرارتی عالی، مس به هر آشپزخانه‌ای زیبایی و کارایی می‌بخشد. در این پست وبلاگ، به فواید ظروف و تجهیزات آشپزخانه مسی، نگهداری از آن‌ها و اینکه چرا سرمایه‌گذاری در مس می‌تواند تجربه پخت و پز شما را ارتقا دهد، خواهیم پرداخت.

        فواید ظروف آشپزی مسی
        هدایت حرارتی برتر: مس به خاطر هدایت حرارتی عالی خود شناخته شده است. این به این معنی است که قابلمه‌ها و تابه‌های مسی سریع گرم می‌شوند و حرارت را به طور یکنواخت توزیع می‌کنند، که خطر نقاط داغ را کاهش می‌دهد و باعث می‌شود که غذای شما به طور یکنواخت پخته شود.
        
        جاذبه ظاهری: ظروف آشپزی مسی بی‌تردید زیبا هستند. رنگ طلایی- قرمز گرم آن‌ها به هر آشپزخانه‌ای لمسی از ظرافت و شکوه می‌بخشد. با گذشت زمان، مس به طور طبیعی پتینه‌ای ایجاد می‌کند که به آن ظاهر عتیقه‌ای منحصربه‌فرد می‌دهد.
        
        چندکاره بودن: تجهیزات آشپزخانه مسی بسیار چندکاره هستند. از تابه‌ها و قابلمه‌ها گرفته تا ظروف پخت و سینی‌های سرو، مس را می‌توان برای مجموعه‌ای از وظایف آشپزی استفاده کرد.
        
        فواید سلامتی: مس یک ماده ضد میکروبی طبیعی است، به این معنی که می‌تواند رشد باکتری‌ها را کاهش دهد. این ویژگی آن را به یک انتخاب بهداشتی برای تجهیزات آشپزخانه تبدیل می‌کند.
        
        نگهداری از ظروف و تجهیزات مسی
        برای حفظ زیبایی و کارایی تجهیزات آشپزخانه مسی خود، پیروی از دستورالعمل‌های نگهداری مناسب بسیار مهم است:
        
        تمیز کردن منظم: پس از هر استفاده، ظروف مسی خود را با مایع ظرفشویی ملایم و اسفنج نرم تمیز کنید. از استفاده از تمیزکننده‌های خشن یا پدهای ساینده خودداری کنید، زیرا می‌توانند سطح مس را خراش دهند.`,
    });

    const SliderPic = [{ image: s1 }, { image: s2 }, { image: s3 }];
    const [error, setError] = useState(null);
    const location = useLocation();
    const [id, setId] = useState('');

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const paramId = searchParams.get('id');
        if (paramId) {
            setId(paramId);
        }
    }, [location.search]);

    return (
        <div className='col-md-12 col-12 fontr' dir="rtl">
            <div className='col-md-12 col-12 pt-3'>
                <div className='col-md-12 col-12 text-white d-flex justify-content-center align-items-center text-center' style={{ height: "80px", backgroundColor: "#DB5C28" }}>
                    <h2 className='align-self-center'>{blog.title}</h2>
                </div>
                <div className='container pt-3 d-flex justify-content-center pb-4' style={{ width: "100%" }}>
                    <img src={SliderPic[0].image} className='blogImg' alt="First Slide" style={{ width: "100%", height: "auto" }} />
                </div>
                <div className='container pt-3'>
                    <p className='h5' style={{ lineHeight: "2rem", wordSpacing: "0.4rem", fontSize: "1.4rem" }}>
                        {blog.content.split('\n').map((paragraph, index) => (
                            <React.Fragment key={index}>
                                {paragraph}
                                {index === Math.floor(blog.content.split('\n').length / 2) && (
                                    <div className='container pt-3 d-flex justify-content-center pb-4' style={{ width: "100%" }}>
                                        <img src={SliderPic[1].image} className='blogImg' alt="Middle Slide" style={{ width: "100%", height: "auto" }} />
                                    </div>
                                )}
                            </React.Fragment>
                        ))}
                    </p>
                </div>
                <div className='container pt-3 d-flex justify-content-center pb-4' style={{ width: "100%" }}>
                    <img src={SliderPic[2].image} className='blogImg' alt="Last Slide" style={{ width: "100%", height: "auto" }} />
                </div>
            </div>
            <div className='col-md-12 col-12 pb-3'>
                <div className='col-md-12 col-12 d-flex justify-content-center align-items-center' style={{ backgroundColor: "#DB5C28" }}>
                    <h5 className='p-3 text-white'style={{fontWeight : "bold"}}>نویسنده : {blog.author}</h5>
                </div>
            </div>
        </div>
    );
};

export default Blog;
