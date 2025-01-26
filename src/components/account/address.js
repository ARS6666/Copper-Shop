import React, { useEffect } from 'react';
import Form from "./address/addressForm";
import Display from "./address/addressdisplay";

function Address({ theme }) {
    useEffect(() => {
        document.title = "حساب کاربری";
    }, []);

    return (
        <>
            <Form theme={theme} />
            <div className="pt-2 row m-0">
                <Display theme={theme} />
            </div>
        </>
    );
}

export default Address;
