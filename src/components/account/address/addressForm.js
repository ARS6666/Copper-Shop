import React, { useState, useEffect } from 'react';
import "https://kit.fontawesome.com/6c2a0de8a3.js";
import "../../../assets/css/account/address.css";
import Loading from "../../loading/loading";
import url from "../../../config.json"


function Address(theme) {
    const token = localStorage.getItem('token');
    const [IsLoading, setisLoading] = useState(false)
    const [Error, setError] = useState("")

    const [Profile_id, setProfile_id] = useState("")
    useEffect(() => {
        const myHeaders = new Headers();
        myHeaders.append("accept", "application/json");
        myHeaders.append("X-CSRFToken", "1catw3IpqjPm82a19BnpB3h97CUiCReGSPOsSvJ7NqGtvayHgOKf63rpDKWSqQui");
        myHeaders.append("Authorization", `Bearer ${token}`);

        const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow"
        };

        fetch(`${url.baseUrl}/auth/profile/1/`, requestOptions)
            .then((response) => response.json())
            .then((result) => setProfile_id(result.id))
            .catch((error) => console.error(error));
    }, []);
    const [Name, setName] = useState("")
    const handleName = (event) => {
        setName(event.target.value);
    };
    const [Address, setAddress] = useState("")
    const handleAddress = (event) => {
        setAddress(event.target.value);
    };

    const [PostCode, setPostCode] = useState("")
    const HandlePostCode = (event) => {
        setPostCode(event.target.value);
    };

    function STS() {
        if (!Profile_id || !Name || !Address || !PostCode) {
            setError("اطلاعات خواسته شده را تکمیل کنید!");
            return;
        }
        const myHeaders = new Headers();
        myHeaders.append("accept", "application/json");
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("X-CSRFToken", "K3pUKlDKLUZFsL3nSzrm8K6VQ5uoTWNXA6mlMlJcCjJUTl7n1qpLebKqIMXdQnUg");
        myHeaders.append("Authorization", `Bearer ${token}`);


        const raw = JSON.stringify({
            "profile": Profile_id,
            "name": Name,
            "address": Address,
            "ostan": "Ostan",
            "shahr": "Shahr",
            "postcode": PostCode,
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        setisLoading(true)
        fetch(`${url.baseUrl}/auth/address/`, requestOptions)
            .then((response) => response.text())
            .then((result) => {
                setIsOverlayOpen(false);
                window.location.reload();
                setisLoading(false)

            })
            .catch((error) => console.error(error));
    }

    const [isOverlayOpen, setIsOverlayOpen] = useState(false);

    const handleOverlay = () => {
        setIsOverlayOpen(!isOverlayOpen);
    };



    return (<>
        {IsLoading ? <Loading /> : null}
        <div class="col-md-12 pt-2 fontr" >
            <div class="col-md-12" style={{ borderStyle: "dashed" }}>
                <buttton class="col-md-12 btn btn-lg col-12 border-0" onClick={handleOverlay}><h4 className={theme.theme.theme === "dark" ? "text-light" : "text-dark"}>افزودن آدرس</h4></buttton>
            </div>
        </div>
        {isOverlayOpen ? <>
            <div class="overlay row m-0 fontr" dir="rtl">
                <div class="col-md-12 d-flex justify-content-center">
                    <div class=" col-md-8 p-3" style={{ backgroundColor: "#ffffff" }}>
                        <div class="col-md-12  text-center p-1 h4 row m-0">
                            <div class="justify-content-end col-12 col-md-12 d-flex" style={{ height: "25px" }}>
                                <button class="btn btn-lg border-0" onClick={handleOverlay}><i class="fa fa-times" aria-hidden="true"></i></button>
                            </div>
                            <span class="text-dark pb-3 d-flex justify-content-center "><div className=' pb-2 border-bottom border-danger border-3'>افزودن آدرس جدید</div></span>
                        </div>
                        <div class="col-md-12 text-end">
                            <span class="text-dark h5 p-4">نام آدرس مورد نظر:*</span>
                            <div class="pt-2 col-md-12 p-4">
                                <input class="form-control form-control-lg border-dark rounded-0" placeholder='مثال : خانه , محل کار , ...' onChange={handleName}></input>
                            </div>
                        </div>
                        <div class="co-md-12 row m-0">
                            <div class="col-md-6 text-end p-4 pt-2 pb-0">
                                <span class="text-dark h5 p-3">کد پستی*</span>
                                <div class="pt-2 col-md-12 p-1">
                                    <input class="form-control form-control-lg border-dark rounded-0" onChange={HandlePostCode} dir="ltr"></input>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-12 p-4 text-end">
                            <span class="text-dark h5 p-2">آدرس پستی*</span>
                            <textarea
                                rows="4"
                                class="form-control border-dark rounded-0 textarea pt-3 "
                                placeholder="آدرس به این صورت است : استان ، شهرستان ، خیابان ، کوچه ، پلاک ، واحد,..."
                                onChange={handleAddress}
                            />
                        </div>
                        {Error ? <div class="col-md-12 d-flex justify-content-center" style={{ paddingRight: "10px" }} dir=" rtl"><h4 class="text-light bg-danger">{Error}</h4></div> : <></>}
                        <div class="col-md-12 col-12 row m-1">
                            <div class="col-md-10 col-8"></div>
                            <div class="col-md-1 col-2 "><button className="btn btn-danger text-light" onClick={handleOverlay}>انصراف</button></div>
                            <div class="col-md-1 col-2 "><button className="btn btn-primary text-light" onClick={STS}>ثبت</button></div>

                        </div>
                    </div>

                </div>
            </div>
        </> : <></>}
    </>);
}


export default Address;