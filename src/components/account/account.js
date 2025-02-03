import React, { useState, useEffect } from 'react';
import "../../assets/css/account/panel.css";
import pfp from "../../assets/media/pfp.jpg";
import Profile from "./profile";
import Address from './address';
import RPP from './orders/RPP';
import Order from './orders/order';
import "../../assets/css/href.css";
import "https://kit.fontawesome.com/6c2a0de8a3.js";


import url from "../../config.json";

const Panel = (theme) => {
    const [Prop, setProp] = useState([]);
    const token = localStorage.getItem('token');
    const [content, setContent] = useState(<Profile theme={theme} />);
    const [isChecked, setIsChecked] = useState(true);
    const [isChecked2, setIsChecked2] = useState(false);
    const [isChecked3, setIsChecked3] = useState(false);
    const [isChecked4, setIsChecked4] = useState(false);

    useEffect(() => {
        const myHeaders = new Headers();
        myHeaders.append("accept", "application/json");
        myHeaders.append("X-CSRFToken", "hokKVAaR2S1flum20JC9E6zabZsARewk31NGGIUOMRiNOlAWLEHjAjRwiGZlfPp8");
        myHeaders.append("Authorization", `Bearer ${token}`);

        const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow"
        };

        fetch(`${url.baseUrl}/auth/profile/1/`, requestOptions)
            .then((response) => response.json())
            .then((result) => setProp(result))
            .catch((error) => console.error(error));
    }, [token]);

    const changeContent = (newContent) => setContent(newContent);

    const handleClick = () => {
        setIsChecked(true);
        setIsChecked2(false);
        setIsChecked3(false);
        setIsChecked4(false);
    };

    const handleClick2 = () => {
        setIsChecked(false);
        setIsChecked2(true);
        setIsChecked3(false);
        setIsChecked4(false);
    };

    const handleClick3 = () => {
        setIsChecked(false);
        setIsChecked2(false);
        setIsChecked3(true);
        setIsChecked4(false);
    };

    const handleClick4 = () => {
        setIsChecked(false);
        setIsChecked2(false);
        setIsChecked3(false);
        setIsChecked4(true);
    };
    return (
        <div className="fontr col-md-12 row m-0 pb-2 pt-2" dir="rtl">
            <div className="col-md-3 border border-theme" style={{ borderRadius: "10px", height: "100%" }}>
                <div className="d-flex justify-content-center pt-4">
                    <img src={Prop.image || pfp} alt="Profile" className="pfp rounded-circle" />
                </div>
                <div className="d-flex justify-content-center pt-4">
                    <span className="h4">{Prop.name}</span>
                </div>
                <div className="pt-3">
                    <div className="col-md-12 border-top border-bottom border-theme part">
                        <button onClick={() => { handleClick(); changeContent(<Profile theme={theme.theme} />); }}
                            className="btn col-md-12 btn-lg hover d-flex justify-content-start border-0"
                            style={{ backgroundColor: isChecked ? '#C24C20' : '', width: "100%" }}>
                            <h5 className={isChecked ? "p-2 text-white" : "p-2 text-dark"}>
                                <i className="p-1 fa fa-user" aria-hidden="true" style={{marginLeft:"10px"}}></i>
                                تغییر جزییات حساب کاربری
                            </h5>
                        </button>
                    </div>
                    <div className="col-md-12 border-top border-bottom border-theme part">
                        <button onClick={() => { handleClick2(); changeContent(<Order theme={theme.theme} />); }}
                            className="btn col-md-12 btn-lg hover d-flex justify-content-start border-0"
                            style={{ backgroundColor: isChecked2 ? '#C24C20' : '', width: "100%" }}>
                            <h5 className={isChecked2 ? "p-2 text-white" : "p-2 text-dark"}>
                                <i className="fas fa-shopping-basket p-1" style={{marginLeft:"10px"}}></i>
                                سفارشات
                            </h5>
                        </button>
                    </div>
                    <div className="col-md-12 border-top border-bottom border-theme part">
                        <button onClick={() => { handleClick3(); changeContent(<Address theme={theme.theme} />); }}
                            className="btn col-md-12 btn-lg hover d-flex justify-content-start border-0"
                            style={{ backgroundColor: isChecked3 ? '#C24C20' : '', width: "100%" }}>
                            <h5 className={isChecked3 ? "p-2 text-white" : "p-2 text-dark"}>
                                <i className="fas fa-map p-1" style={{marginLeft:"10px"}}></i>
                                آدرس‌ها
                            </h5>
                        </button>
                    </div>
                    <div className="col-md-12 border-top border-bottom border-theme part">
                        <button onClick={() => { handleClick4(); changeContent(<RPP theme={theme.theme} />); }}
                            className="btn col-md-12 btn-lg hover d-flex justify-content-start border-0"
                            style={{ backgroundColor: isChecked4 ? '#C24C20' : '', width: "100%" }}>
                            <h5 className={isChecked4? "p-2 text-white" : "p-2 text-dark"}>
                                <i className="fas fa-folder-open p-1" style={{marginLeft:"10px"}}></i>
                                سفارشات گذشته
                            </h5>
                        </button>
                    </div>
                </div>
            </div>
            <div className="col-md-9">
                {content}
            </div>
        </div>
    );
}

export default Panel;
