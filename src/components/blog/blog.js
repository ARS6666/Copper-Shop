import React, { useState, useEffect } from 'react';
import "../../assets/css/blog/blog.css"
import url from "../../config.json";
import Loading from '../../components/loading/loading';


const BlogList = (theme) => {
    const [blogs, setblogs] = useState([]);
    const [IsLoading, setIsLoading] = useState(true);

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
            .then((result) => { setblogs(result); setIsLoading(false)})
            .catch((error) => console.error(error));
    }, []);


    return (<>
        {IsLoading ? <Loading /> : null}
        <div className='col-md-12 fontr vh-100' dir="rtl">
            <div className='col-md-12 pt-3'>
                <div className='col-md-12 text-white d-flex justify-content-center align-items-center' style={{ height: "80px", backgroundColor: "#DB5C28" }}>
                    <h1 className='align-slef-center'>وبلاگ ها و مقالات</h1>
                </div>
            </div>
            <div className='container-xl'>
                {blogs.map((blog) => (
                    <a className={theme.theme == 'light' ? "hrefb" : "hrefw"} href={`/blogpage?id=${blog.id}`}>
                        <div key={blog.id} className="blog border border-2 border-theme cat-hover">
                            <h2>{blog.title}</h2>
                            <p><strong>Author:</strong>عرشیا</p>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    </>
    );
};

export default BlogList;
