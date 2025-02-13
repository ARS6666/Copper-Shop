import React, { useState } from 'react';
import url from "../../config.json"
import Loading from '../loading/loading';

const ContactUs = () => {
    const [IsLoading, setIsLoading] = useState(false);
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [message, setMessage] = useState("")

    const handleSubmit = (e) => {
        setIsLoading(true)
        const myHeaders = new Headers();
        myHeaders.append("accept", "application/json");
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("X-CSRFToken", "vxy3ldShrBoCRbEVcap11b69oYD1zTjpnkAhzctUGsqdSrJrEB3TrJOu847ps8dt");

        const raw = JSON.stringify({
            "name": name,
            "email": email,
            "text": message
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch(`${url.baseUrl}/contact-us/`, requestOptions)
            .then((response) => response.text())
            .then((result) => { setName(""); setEmail(""); setMessage(""); setIsLoading(false) })
            .catch((error) => console.error(error));
    };

    return (<>
        {IsLoading ? <Loading/> : null}
            <div className="col-md-12 col-12 fontr" dir="rtl">
                <h1 className='col-md-12 col-12 p-4 pb-0 text-center fw-bold'>ارتباط با ما</h1>
                <div className='col-md-12 d-flex justify-content-center row m-0'>
                    <div className='col-md-12 row m-0'>
                        <div className='col-md-3'></div>
                        <div className="col-md-6">
                            <label style={{ fontSize: "1.2rem", wordSpacing: "0.1rem" }}>نام :</label>
                            <input
                                className='form-control form-control-lg border-theme border-3'
                                type="text"
                                id="name"
                                name="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                style={{ borderRadius: "0.75rem" }}
                            />
                        </div>
                        <div className='col-md-3'></div>
                    </div>
                    <div className='col-md-12 row m-0'>
                        <div className='col-md-3'></div>
                        <div className="col-md-6">
                            <label className='pt-3' style={{ fontSize: "1.2rem", wordSpacing: "0.1rem" }}>آدرس ایمیل :</label>
                            <input
                                className='form-control form-control-lg border-theme border-3'
                                type="email"
                                id="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                style={{ borderRadius: "0.75rem" }}
                            />
                        </div>
                        <div className='col-md-3'></div>
                    </div>
                    <div className='col-md-12 row m-0'>
                        <div className='col-md-3'></div>
                        <div className="col-md-6">
                            <label className='pt-3' style={{ fontSize: "1.2rem", wordSpacing: "0.1rem" }}>پیام :</label>
                            <textarea
                                className='form-control form-control-lg border-theme border-3'
                                id="message"
                                name="message"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                required
                                style={{ maxHeight: "250px", borderRadius: "0.75rem" }}
                            ></textarea>
                        </div>
                        <div className='col-md-3'></div>
                    </div>

                    <div className='col-md-12 row m-0 pt-3'>
                        <div className='col-md-3'></div>
                        <div className="col-md-6">
                            <button className='col-md-12 col-12 btn-orange btn' onClick={handleSubmit} style={{ borderRadius: "0.75rem" }}><span style={{ fontSize: "1.2rem", wordSpacing: "0.1rem" }}>ارسال</span></button>
                        </div>
                        <div className='col-md-3'></div>
                    </div>
                </div>
            </div >
    </>);
};

export default ContactUs;
