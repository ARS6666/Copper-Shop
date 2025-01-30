import React, { useState, useEffect } from 'react';
import Loading from '../loading/loading';
import IMg from "../../assets/media/pfp.jpg";
import url from "../../config.json";

const ProfProp = (theme) => {
    const [IsLoading, setIsLoading] = useState(false);
    const [Prop, setProp] = useState([]);
    const token = localStorage.getItem('token');
    const [Id, setId] = useState("");
    const [Name, setName] = useState("");
    const [Phone, setPhone] = useState("");
    const [LastName, setLastName] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);

    const handleName = (event) => setName(event.target.value);
    const handlePhone = (event) => setPhone(event.target.value);
    const handleLastName = (event) => setLastName(event.target.value);

    const reset = () => {
        if (Prop) {
            setName(Prop.name);
            setPhone(Prop.phone);
            setLastName(Prop.family);
        }
    };

    const getHeaders = new Headers();
    getHeaders.append("accept", "application/json");
    getHeaders.append("X-CSRFToken", "CwzY3EwCSRt5G4VhDX5uOcuOLTEQPnkhmj7qi4re2aD8u2EHWiLHoWxQumMEoJWh");
    getHeaders.append("Authorization", `Bearer ${token}`);

    const getRequestOptions = {
        method: "GET",
        headers: getHeaders,
        redirect: "follow",
    };

    useEffect(() => {
        fetch(`${url.baseUrl}/auth/profile/1/`, getRequestOptions)
            .then((response) => response.json())
            .then((result) => { setProp(result); setIsLoading(false); })
            .catch((error) => console.error(error));
    }, []);

    useEffect(() => {
        if (Prop) {
            setName(Prop.name);
            setId(Prop.id);
            setPhone(Prop.phone);
            setLastName(Prop.family);
        }
    }, [Prop]);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleSubmit = () => {
        setIsLoading(true)
        const formData = new FormData();
        if (selectedFile && selectedFile.type.startsWith("image/")) {
            formData.append('image', selectedFile);
        }
        formData.append('name', Name);
        formData.append('family', LastName);
        formData.append('description', "");

        const myHeaders = new Headers();
        myHeaders.append("accept", "application/json");
        myHeaders.append("X-CSRFToken", "CwzY3EwCSRt5G4VhDX5uOcuOLTEQPnkhmj7qi4re2aD8u2EHWiLHoWxQumMEoJWh");
        myHeaders.append("Authorization", `Bearer ${token}`);

        const requestOptions = {
            method: "PUT",
            headers: myHeaders,
            body: formData,
            redirect: "follow"
        };

        fetch(`${url.baseUrl}/auth/profile/1/`, requestOptions)
            .then((response) => response.json())
            .then((result) => window.location.reload())
            .catch((error) => console.error(error));
    };

    return (
        <>
            <meta name="description" content="پروفایل کاربری - فروشگاه ظروف مسی" />
            <meta name="keywords" content="پروفایل, کاربری, فروشگاه, ظروف مسی" />
            {IsLoading ? <Loading /> : null}
            <div className="col-md-12 pt-2 pb-5 mt-3  fontr border border-theme border-2" dir="rtl" style={{ borderRadius: "10px" }}>
                <div className="col-md-12">
                    <header className="col-md-12 p-3 row m-0">
                        <div className="col-md-6 d-flex justify-content-start col-9">
                            <span className="h4 col-md-2 border-bottom border-theme border-3 border-dark p-2">پروفایل</span>
                        </div>
                        <div className="col-md-6 d-flex justify-content-end col-3">
                            <button className="btn btn-orange btn-sm" onClick={reset}>بازیابی</button>
                        </div>
                    </header>
                    <main className="col-md-12 row m-0 pt-3 d-flex justify-content-center">
                        <div className="col-md-12">
                            <span className={theme.theme.theme === "dark" ? "text-white" : "text-dark"}>نام:</span>
                            <div className="pt-2 col-md-12">
                                <input className="form-control form-control-lg border-theme " onChange={handleName} value={Name} required />
                            </div>
                            <div className="col-md-12 col-12 pt-3">
                                <span className={theme.theme.theme === "dark" ? "text-white pt-1" : "text-dark pt-1"}>نام خانوادگی:</span>
                                <div className="pt-2 col-md-12">
                                    <input className="form-control form-control-lg border-theme " onChange={handleLastName} value={LastName} required />
                                </div>
                            </div>
                        </div>
                        <div className="pt-3">
                            <span className={theme.theme.theme === "dark" ? "text-white pt-1" : "text-dark pt-1"}>عکس پروفایل:</span>
                        </div>
                        <div className="pt-2 col-md-12 col-12">
                            <input type="file" id="imageInput" accept="image/*" dir="rtl" className="form-control form-control-lg border-theme color-theme " onChange={handleFileChange} required />
                        </div>
                        <div className="col-md-12 col-12 d-flex justify-content-center pt-4">
                            <div className="col-md-10 col-10 pt-2">
                                <button className="col-md-12 col-12 btn btn-lg btn-outline-success  border-2" onClick={handleSubmit}>ثبت اطلاعات</button>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}

export default ProfProp;
