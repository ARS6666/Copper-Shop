import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../loading/loading";
import url from "../../config.json";

function SignIn() {
    const [IsLoading, setIsLoading] = useState(false);
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [password1, setPassword1] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        setIsLoading(true);
        event.preventDefault();
        setError(null);
        setLoading(true);
        if (password !== password1) {
            setError("رمزهای عبور مطابقت ندارند.");
            setIsLoading(false);
        }

        const myHeaders = new Headers();
        myHeaders.append("accept", "application/json");
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("X-CSRFToken", "xaq7upJZfan36kIjSP8xwhH878FOroVe6a55njwELi8VQDUYsOAKxhqlQ39OtHfP");

        const raw = JSON.stringify({
            "phone": phone,
            "password": password,
            "password1": password1
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        try {
            const response = await fetch(`${url.baseUrl}/auth/register/`, requestOptions);
            const result = await response.json();

            if (response.ok) {
                navigate('/login');
                setPhone("");
                setPassword("");
                setPassword1("");
                setIsLoading(false);
            } else {
                setError(result.message || "ثبت نام ناموفق بود.");
                setIsLoading(false);
            }
        } catch (error) {
            setError(error.toString());
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {IsLoading ? <Loading /> : null}
            <div className="col-md-12 fontr vh-100" dir="rtl" style={{ backgroundColor: "#D9D9D9" }}>
                <form onSubmit={handleSubmit} className="col-md-12 d-flex justify-content-center pt-5">
                    <div className="col-md-4">
                        <div className="col-md-12 p-5 shadow bg-light" style={{ borderRadius: "20px" }}>
                            <div className="d-flex justify-content-center">
                                <span className="h2 col-md-12 border-bottom border-dark text-center p-1">ثبت نام</span>
                            </div>
                            <div className="pt-3">
                                <label className="h5">تلفن همراه:</label>
                            </div>
                            <div className="pt-1">
                                <input className="form-control form-control-lg" onChange={e => setPhone(e.target.value)} dir="ltr" aria-label="Phone Number" />
                            </div>
                            <div className="pt-3">
                                <label className="h5">رمز عبور:</label>
                            </div>
                            <div className="pt-1">
                                <input className="form-control form-control-lg" onChange={e => setPassword(e.target.value)} dir="ltr" aria-label="Password" />
                            </div>
                            <small id="emailHelp" className="form-text text-muted">رمز عبور شما باید دارای 8 کرکتر باشد.</small>
                            <div className="pt-3">
                                <label className="h5">تکرار رمز عبور:</label>
                            </div>
                            <div className="pt-1">
                                <input className="form-control form-control-lg" onChange={e => setPassword1(e.target.value)} dir="ltr" aria-label="Confirm Password" />
                            </div>
                            {error && <div className="alert alert-danger" role="alert">{error}</div>}
                            <div className="col-md-12 d-flex justify-content-center pt-4">
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
