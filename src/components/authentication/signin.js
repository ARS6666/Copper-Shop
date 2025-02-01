import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../loading/loading";
import url from "../../config.json";

function SignIn(theme) {
    const [IsLoading, setIsLoading] = useState(false);
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [password1, setPassword1] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const [showPassword1, setShowPassword1] = useState(false);
    const toggleShowPassword1 = () => {
        setShowPassword1(!showPassword1);
    };
    const handleSubmit = async (event) => {
        setIsLoading(true);
        event.preventDefault();
        setError(null);
        setLoading(true);

        if (password !== password1) {
            setError("رمزهای عبور مطابقت ندارند.");
            setIsLoading(false);
            return;
        }

        const myHeaders = new Headers();
        myHeaders.append("accept", "application/json");
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("X-CSRFToken", "VkjvJm3FQFtMrH8UGFwnVOSHru5JEOmyA3fVNOPIOeUB6huWikrKUbfu73l6OoT3");

        const raw = JSON.stringify({
            phone: phone,
            password: password,
            password1: password1
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        try {
            const response = await fetch(`${url.baseUrl}/auth/register/`, requestOptions);

            const contentType = response.headers.get("content-type");

            let result;
            if (contentType && contentType.indexOf("application/json") !== -1) {
                result = await response.json();
            } else {
                result = await response.text();
            }

            if (!response.ok) {
                console.error('Error response from server:', result);
                setError(result.non_field_errors || "phone number : " + result.phone);
                setIsLoading(false);
                return;
            }

            setIsLoading(false);
            localStorage.setItem('phoneNumber', phone);
            setPhone("");
            setPassword("");
            setPassword1("");
            navigate('/verify');
        } catch (error) {
            console.error('Error during registration:', error);
            setError("در هنگام ثبت‌نام مشکلی پیش آمد.");
            setIsLoading(false);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {IsLoading ? <Loading /> : null}
            <div className="col-md-12 fontr vh-100 pt-4" dir="rtl" style={{ backgroundColor: theme.theme === "dark" ? "#121212" : "3D9D9D9" , alignItems : "center"}}>
                <form onSubmit={handleSubmit} className="col-md-12 d-flex justify-content-center pt-5">
                    <div className="col-md-4">
                        <div className="col-md-12 p-5 shadow bg-light" style={{ borderRadius: "20px" }}>
                            <div className="d-flex justify-content-center">
                                <span className="h2 col-md-12 border-bottom border-dark text-center p-1 text-dark pb-3">ثبت نام</span>
                            </div>
                            <div className="pt-2 text-dark">
                                <label className="h5">شماره تلفن همراه:</label>
                            </div>
                            <div className="pt-1 text-dark">
                                <input className="form-control form-control-lg" onChange={e => setPhone(e.target.value)} dir="ltr" aria-label="Phone Number" />
                            </div>
                            <div className="pt-2 text-dark">
                                <label className="h5">رمز عبور:</label>
                            </div>
                            <div className="pt-1 text-dark" style={{ position: "relative" }}>
                                <button className="btn btn-outline-transparent eye" onClick={toggleShowPassword} type="button">
                                    {showPassword ? <i class="fa-solid fa-eye-slash"></i> : <i class="fa-solid fa-eye"></i>}
                                </button>
                                <input className="form-control form-control-lg" type={showPassword ? 'text' : 'password'} onChange={e => setPassword(e.target.value)} dir="ltr" aria-label="Password" />
                            </div>
                            <small id="emailHelp" className="form-text text-muted">رمز عبور شما باید دارای 8 کرکتر باشد.</small>
                            <div className="pt-2">
                                <label className="h5 text-dark">تکرار رمز عبور:</label>
                            </div>
                            <div className="pt-1" style={{ position: "relative" }}>
                                <button className="btn btn-outline-transparent eye" onClick={toggleShowPassword1} type="button">
                                    {showPassword1 ? <i class="fa-solid fa-eye-slash"></i> : <i class="fa-solid fa-eye"></i>}
                                </button>
                                <input className="form-control form-control-lg" type={showPassword1 ? 'text' : 'password'} onChange={e => setPassword1(e.target.value)} dir="ltr" aria-label="Confirm Password" />
                            </div>
                            <div class="col-md-12 col-12 pt-2">{error && <div className="alert alert-danger" dir="ltr" role="alert">{error}</div>}</div>
                            <div className="col-md-12 d-flex justify-content-center pt-1">
                                <button type="submit" className="col-md-6 col-6 btn btn-outline-success">ثبت نام</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}

export default SignIn;


