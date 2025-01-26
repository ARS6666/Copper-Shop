import React, { useEffect } from 'react';
import img404 from "../assets/media/404.png"
import "../assets/css/href.css"

const NotFoundPage = () => {
    useEffect(() => {
        document.title = "صفحه مورد نظر یافت نشد";
    }, []);

    return (<>
        <div class="col-md-12 col-12 fontr pb-5 pt-5">
            <div class=" d-flex justify-content-center">
                <img src={img404} class="col-md-12 col-12 w-25" />
            </div>
            <div class=" d-flex justify-content-center">
                <h1 class="et text-dark">404</h1>
            </div>
            <div class=" d-flex justify-content-center">
                <p class="fontr">صفحه مورد نظر یافت نشد</p>
            </div>
            <div class=" d-flex justify-content-center">
                <button class="btn btn-orange">
                    <a href="/" class="hrefw" >برگشت به صفحه اصلی</a>
                </button>
            </div>
        </div>
    </>
    );
};
export default NotFoundPage;