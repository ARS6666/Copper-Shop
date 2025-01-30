import React, { useState } from 'react';

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        // Add form submission logic here
    };

    return (
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
                            value={formData.name}
                            onChange={handleChange}
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
                            value={formData.email}
                            onChange={handleChange}
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
                            value={formData.message}
                            onChange={handleChange}
                            required
                            style={{ maxHeight: "250px", borderRadius: "0.75rem" }}
                        ></textarea>
                    </div>
                    <div className='col-md-3'></div>
                </div>

                <div className='col-md-12 row m-0 pt-3'>
                    <div className='col-md-3'></div>
                    <div className="col-md-6">
                        <button className='col-md-12 col-12 btn-orange btn' style={{ borderRadius: "0.75rem" }}><span style={{ fontSize: "1.2rem", wordSpacing: "0.1rem" }}>ارسال</span></button>
                    </div>
                    <div className='col-md-3'></div>
                </div>
            </div>
        </div >
    );
};

export default ContactUs;
