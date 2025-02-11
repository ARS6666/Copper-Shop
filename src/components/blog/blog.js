import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "../../assets/css/blog/blog.css";
import url from "../../config.json";
import Loading from '../../components/loading/loading';

const BlogList = (theme) => {
    const [blogs, setBlogs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const blogsPerPage = 4;

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

    const indexOfLastBlog = currentPage * blogsPerPage;
    const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
    const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(blogs.length / blogsPerPage); i++) {
        pageNumbers.push(i);
    }

    const handleClick = (event) => {
        setCurrentPage(Number(event.target.id));
    };

    const convertToPersian = (number) => {
        if (number !== undefined) {
          const persianDigits = '۰۱۲۳۴۵۶۷۸۹';
          return number.toString().replace(/\d/g, (digit) => persianDigits[digit]);
        }
        return null;
      };
    

    return (
        <>
            <meta name="description" content="وبلاگ ها و مقالات فروشگاه ظروف مسی" />
            <meta name="keywords" content="وبلاگ, مقالات, ظروف مسی, فروشگاه" />
            {isLoading ? <Loading /> : null}
            <div className='col-md-12 fontr pb-4' dir="rtl">
                <div className='col-md-12 pt-3'>
                    <header className='col-md-12 text-white d-flex justify-content-center align-items-center' style={{ height: "80px", backgroundColor: "#C24C20" }}>
                        <h1 className='align-self-center'>وبلاگ ها و مقالات</h1>
                    </header>
                </div>
                <main className='col-md-12 pt-1 row m-0'>
                    {currentBlogs.map((blog) => (
                        <article key={blog.id} className='col-md-3 col-12 pt-4'>
                            <div className="blog border border-2 border-theme cat-hover row m-0">
                                <div className='col-md-12 col-12 col d-flex justify-content-center'>
                                    <img src={blog.pic} alt={blog.title} style={{ maxHeight: "100%", maxWidth: "100%" }} className='rounded shadow' />
                                </div>
                                <div className='col-md-12 col-12 d-flex justify-content-center row m-0 pt-3'>
                                    <h4 className='col-md-12 text-center' style={{ lineHeight: "3rem" }}>{blog.title}</h4>
                                </div>
                                <Link className={theme.theme === 'light' ? "hrefb" : "hrefw"} to={`/blogpage?id=${blog.id}`} aria-label={`View blog ${blog.title}`}>
                                    <div className='col-md-12 col-12 d-flex justify-content-center'>
                                        <button className='btn btn-orange'>مشاهده وبلاگ</button>
                                    </div>
                                </Link>
                            </div>
                        </article>
                    ))}
                </main>
                <footer className="col-md-12 d-flex justify-content-center pt-4">
                    <ul className="pagination">
                        <li className='page-item'>
                            <button
                                onClick={() => setCurrentPage(currentPage - 1)}
                                className=' btn btn-orange rounded-0'
                                disabled={currentPage === 1}
                            >
                                صفحه قبل
                            </button>
                        </li>
                        {pageNumbers.map(number => (
                            <li key={number} className={`page-item ${number === currentPage ? 'activate' : ''}`}>
                                <button
                                    id={number}
                                    onClick={handleClick}
                                    className='page-link btn rounded-0 bg-orange'
                                >
                                    {convertToPersian(number)}
                                </button>
                            </li>
                        ))}
                        <li className='page-item'>
                            <button
                                onClick={() => setCurrentPage(currentPage + 1)}
                                className=' btn btn-orange rounded-0'
                                disabled={currentPage === pageNumbers.length}
                            >
                                صفحه بعد
                            </button>
                        </li>
                    </ul>
                </footer>
            </div>
        </>
    );
};

export default BlogList;
