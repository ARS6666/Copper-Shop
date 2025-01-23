import React, { useState, useEffect } from 'react';
import Loading from "../../loading/loading";
import url from "../../../config.json";

function AddressDisplay(theme) {
    const [IsLoading, setIsLoading] = useState(true);
    const [Prop, setProp] = useState([]);
    const token = localStorage.getItem('token');

    const fetchAddresses = () => {
        const myHeaders = new Headers();
        myHeaders.append("accept", "application/json");
        myHeaders.append("X-CSRFToken", "K3pUKlDKLUZFsL3nSzrm8K6VQ5uoTWNXA6mlMlJcCjJUTl7n1qpLebKqIMXdQnUg");
        myHeaders.append("Authorization", `Bearer ${token}`);

        const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow"
        };

        fetch(`${url.baseUrl}/auth/address/`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                setProp(result);
                setIsLoading(false);
            })
            .catch((error) => console.error(error));
    }

    useEffect(() => {
        fetchAddresses();
    }, []);

    const removeAddress = (id) => {
        const myHeaders = new Headers();
        myHeaders.append("accept", "application/json");
        myHeaders.append("X-CSRFToken", "K3pUKlDKLUZFsL3nSzrm8K6VQ5uoTWNXA6mlMlJcCjJUTl7n1qpLebKqIMXdQnUg");
        myHeaders.append("Authorization", `Bearer ${token}`);

        const requestOptions = {
            method: "DELETE",
            headers: myHeaders,
            redirect: "follow"
        };

        fetch(`${url.baseUrl}/auth/address/${id}/`, requestOptions)
            .then((response) => response.text())
            .then(() => fetchAddresses())
            .catch((error) => console.error(error));
    }

    const convertToPersian = (number) => {
        const persianDigits = '۰۱۲۳۴۵۶۷۸۹';
        return number.toString().replace(/\d/g, (digit) => persianDigits[digit]);
    };



    return (
        <>
            {IsLoading ? <Loading /> : null}
            {Prop.map((c) => (
                <div className="col-md-6 p-1 fontr text-end" dir="rtl" style={{ color: theme.theme === "dark" ? "#000000" : "gray" }} key={c.id}>
                    <div className="border border-3 border-dark text-end" style={{ borderStyle: "double" }}>
                        <div className="col-md-12 p-3">
                            <span className="h3">{convertToPersian(c.name)}</span>
                        </div>
                        <div className="col-md-11 col-12 pt-2 text-end">
                            <span className="h5 p-2">کد پستی: {convertToPersian(c.postcode)}</span>
                        </div>
                        <div className="col-md-11 col-12 pt-2 text-end">
                            <span className="h5 p-2" style={{ lineHeight: "1.9rem" }}>آدرس: {convertToPersian(c.address)}</span>
                        </div>
                        <div className="col-md-12 row m-0 fontr pt-2 p-2">
                            <div className="col-md-12 text-start h5">
                                <button className="btn rounded-0 text-light" style={{ backgroundColor: "#000000" }} onClick={() => removeAddress(c.id)}>حذف</button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
}

export default AddressDisplay;
