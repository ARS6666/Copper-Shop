import React, { useState, useRef } from 'react';
import Loading from '../loading/loading';
import { useNavigate } from "react-router-dom";

const CodeInput = (theme) => {
    const [IsLoading, setisLoading] = useState(false);
    const phoneNumber = localStorage.getItem('phoneNumber');
    const [code, setCode] = useState(Array(6).fill(''));
    const inputRefs = useRef([]);
    const navigate = useNavigate();

    const handleInputChange = (e, index) => {
        const value = e.target.value;
        if (/^\d?$/.test(value)) {
            const newCode = [...code];
            newCode[index] = value;
            setCode(newCode);

            if (value !== '' && index < 5) {
                inputRefs.current[index + 1].focus();
            }
        }
    };

    const checkComplete = () => {
        if (code.every(digit => digit !== '')) {
            alert('Hello!');
            localStorage.removeItem('phoneNumber');
            navigate('/login');
        }
    };

    return (<>
        {IsLoading ? <Loading /> : null}
        <div className="col-md-12 fontr vh-100 pt-5 " dir="rtl" style={{ backgroundColor: theme.theme === "dark" ? "#121212" : "3D9D9D9" , alignItems:'center' }}>
            <div className="col-md-12 d-flex justify-content-center pt-5">
                <div className="col-md-4 pt-5">
                    <div className="col-md-12 p-5 shadow bg-light" style={{ borderRadius: "20px" }}>
                        <div className="d-flex justify-content-center">
                            <span className="h2 col-md-12 border-bottom border-dark text-center p-1 text-dark pb-3">  تایید تلفن همراه </span>
                        </div>
                        <div className="d-flex justify-content-center p-4" dir="ltr">
                            {code.map((digit, index) => (
                                <input
                                    key={index}
                                    type="text"
                                    className="form-control mx-1"
                                    style={{ width: '50px', height: '50px', fontSize: '25px', textAlign: 'center' }}
                                    maxLength="1"
                                    value={digit}
                                    onChange={(e) => handleInputChange(e, index)}
                                    onKeyUp={checkComplete}
                                    ref={(el) => (inputRefs.current[index] = el)}
                                />
                            ))}
                        </div>
                        <div className='col-md-12 col-12 text-center'>
                            <small id="verificationHelp" className="form-text text-muted">
                                کد شش رقمی ارسالی به شماره تلفن همراه {phoneNumber} ارسال شد.<br />
                                کد را از چپ به راست وارد کنید.
                            </small>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </>

    );
};

export default CodeInput;
