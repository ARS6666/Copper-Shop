import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import '../../assets/css/blog/blog.css';
import parser from "html-react-parser";
import Loading from '../../components/loading/loading';
import url from "../../config.json";

const Blog = () => {
    const [blog, setBlog] = useState({});
    const [contents, setContents] = useState("");
    const location = useLocation();
    const [id, setId] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const paramId = searchParams.get('id');
        if (paramId) {
            setId(paramId);
        }
    }, [location.search]);

    useEffect(() => {
        if (!id) return;

        const myHeaders = new Headers();
        myHeaders.append("accept", "application/json");
        myHeaders.append("X-CSRFToken", "hQTHkTO5NZIDX77ClrT7oZExRZdlvZDEr4NKN3J0DOMURfxUBBEDqhXzRDxbysLk");

        const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow"
        };

        fetch(`${url.baseUrl}/blog/` + id, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                setBlog(result);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setIsLoading(false);
            });
    }, [id]);

    useEffect(() => {
        if (blog && blog.content) {
            setContents(blog);
            document.title = blog.title ? `${blog.title} - وبلاگ` : "وبلاگ";
        }
    }, [blog]);

    return (
        <>
            <meta name="description" content={blog.title ? `${blog.title} - فروشگاه ظروف مسی` : "وبلاگ فروشگاه ظروف مسی"} />
            <meta name="keywords" content={`وبلاگ, مقالات, ظروف مسی, ${blog.title || ''}`} />
            {isLoading ? <Loading /> : null}
            <div className='col-md-12 fontr' dir="rtl">
                <div className='col-md-12 pt-3'>
                    <header className='col-md-12 text-white d-flex justify-content-center align-items-center' style={{ height: "80px", backgroundColor: "#C24C20" }}>
                        <h1 className='align-self-center'>{contents.title || "منتظر باشید ..."}</h1>
                    </header>
                    <div className='container pt-3'>
                        <article className='h5' style={{ lineHeight: "2rem", wordSpacing: "0.4rem", fontSize: "1.4rem" }}>
                            {contents.content ? parser(contents.content) : "منتظر باشید ..."}
                        </article>
                    </div>
                    <footer className='col-md-12 pb-3'>
                        <div className='col-md-12 d-flex justify-content-center align-content-center' style={{ backgroundColor: "#C24C20" }}>
                            <h5 className='p-3 text-white' style={{ fontWeight: "bold" }}>نویسنده: ARS</h5>
                        </div>
                    </footer>
                </div>
            </div>
        </>
    );
};

export default Blog;
