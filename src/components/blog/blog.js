import React, { useState, useEffect } from 'react';
import "../../assets/css/blog/blog.css";
import url from "../../config.json";
import Loading from '../../components/loading/loading';

const BlogList = (theme) => {
    const [blogs, setBlogs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const myHeaders = new Headers();
        myHeaders.append("accept", "application/json");
        myHeaders.append("X-CSRFToken", "hQTHkTO5NZIDX77ClrT7oZExRZdlvZDEr4NKN3J0DOMURfxUBBEDqhXzRDxbysLk");

        const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow"
        };

        fetch(`${url.baseUrl}/blog/`, requestOptions)
            .then((response) => response.json())
            .then((result) => { 
                setBlogs(result); 
                setIsLoading(false);
                document.title = "وبلاگ ها و مقالات";
            })
            .catch((error) => {
                console.error(error);
                setIsLoading(false);
            });
    }, []);

    return (
        <>
            {isLoading ? <Loading /> : null}
            <div className='col-md-12 fontr vh-100' dir="rtl">
                <div className='col-md-12 pt-3'>
                    <div className='col-md-12 text-white d-flex justify-content-center align-items-center' style={{ height: "80px", backgroundColor: "#DB5C28" }}>
                        <h1 className='align-self-center'>وبلاگ ها و مقالات</h1>
                    </div>
                </div>
                <div className='container-xl pt-1'>
                    {blogs.map((blog) => (
                        <div key={blog.id} className='col-md-12 pt-2'>
                            <a className={theme.theme === 'light' ? "hrefb" : "hrefw"} href={`/blogpage?id=${blog.id}`}>
                                <div className="blog border border-2 border-theme cat-hover row m-0">
                                    <div className='col-md-1 col'>
                                        <img src={blog.pic} alt={blog.title} style={{ maxHeight: "100%", maxWidth: "100%" }} className='rounded shadow' />
                                    </div>
                                    <div className='col-md-10 col-10'>
                                        <h3 className='text-dark fw-bold'>{blog.title}</h3>
                                        <p><strong>نویسنده : </strong>ادمین</p>
                                    </div>
                                </div>
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default BlogList;
