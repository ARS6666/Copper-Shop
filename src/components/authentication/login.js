import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Loading from "../loading/loading";
import SignIn from "./signin";
import url from "../../config.json"

function Login(theme) {
    const [Phone, setPhone] = useState("");
    const [Password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [IsLoading, setisLoading] = useState(false)
    const [successMessage, setSuccessMessage] = useState("");
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };



    const myHeaders = new Headers();
    myHeaders.append("accept", "application/json");
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("X-CSRFToken", "K3pUKlDKLUZFsL3nSzrm8K6VQ5uoTWNXA6mlMlJcCjJUTl7n1qpLebKqIMXdQnUg");

    const handleLogin = async () => {
        setisLoading(true)
        const raw = JSON.stringify({
            "phone": Phone,
            "password": Password
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        try {
            const response = await fetch(`${url.baseUrl}/auth/jwt/create/`, requestOptions);

            if (!response.ok) {
                const errorResponse = await response.json();
                setErrorMessage("Login failed: " + (errorResponse.detail || response.statusText));
                setSuccessMessage("");
                setisLoading(false)
                return;
            }

            const result = await response.json();
            setisLoading(false)
            localStorage.setItem('token', result.access);
            localStorage.setItem('refresh', result.refresh);

            setSuccessMessage("ورود موفقیت‌آمیز بود!");
            setErrorMessage("");
            setPhone("");
            setPassword("");
            navigate('/account');
        } catch (error) {
            console.error(error);
            setErrorMessage("در هنگام ورود مشکلی پیش آمد.");
            setSuccessMessage("");
            setisLoading(false)
        }
    };

    return (
        <>
            {IsLoading ? <Loading /> : null}
            <div className="col-md-12 fontr vh-100" dir="rtl" style={{backgroundColor : theme.theme === "dark" ? "#121212" : "3D9D9D9"}}>
                <div className="col-md-12 d-flex justify-content-center pt-5">
                    <div className="col-md-4 pt-5">
                        <div className="col-md-12 p-5 shadow bg-light" style={{ borderRadius: "20px" }}>
                            <div className="d-flex justify-content-center">
                                <span className="h2 col-md-12 border-bottom border-dark text-center p-1 text-dark pb-3"> ورود </span>
                            </div>
                            <div className="pt-3">
                                <label className="h5 text-dark">شماره تلفن همراه:</label>
                            </div>
                            <div className="pt-1" dir="ltr">
                                <input
                                    type="Phone"
                                    className="form-control form-control-lg"
                                    value={Phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    id="phone"
                                    aria-label="Phone Number"
                                />
                            </div>
                            <div className="pt-3">
                                <label className="h5 text-dark">رمز عبور:</label>
                            </div>
                            <div className="pt-1" style={{position:"relative"}}>
                                <button className="btn btn-outline-transparent eye" onClick={toggleShowPassword} type="button">
                                    {showPassword ? <i class="fa-solid fa-eye-slash"></i> : <i class="fa-solid fa-eye"></i>}
                                </button>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    dir="ltr"
                                    className="form-control form-control-lg"
                                    value={Password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter")
                                            handleLogin();
                                    }}
                                    id="password"
                                    aria-label="Password"
                                />
                            </div>
                            <div className="col-md-12 d-flex justify-content-center pt-4">
                                <button className="col-md-6 col-6 btn btn-outline-success" onClick={handleLogin}>ورود</button>
                            </div>
                            {errorMessage && <div className="text-danger pt-3" dir="ltr">{errorMessage}</div>}
                            {successMessage && <div className="text-success pt-3" dir="ltr">{successMessage}</div>}

                            <div className="col-md-12 d-flex justify-content-end pt-2 text-dark">
                                <span>اکانت ندارید؟</span>
                                <a href="/signin">ثبت نام کنید</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;
