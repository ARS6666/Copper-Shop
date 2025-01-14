import React from 'react';
import '../../assets/css/loading.css';
import Img from "../../assets/media/sini.png";

const Loading = () => {
        return (
                <div className="loader fontr rowm-0">
                        <img src={Img} alt="Loading" className="loader-image col-md-12" />
                        <span>... صبور باشید</span>
                </div>
        );
};

export default Loading;
