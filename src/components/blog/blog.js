import React from 'react';
import "../../assets/css/blog/blog.css"

const BlogList = (theme) => {
    const blogs = [
        { id: 1, title: 'React Basics', author: 'John Doe', content: 'Lorem ipsum dolor sit amet...' },
        { id: 2, title: 'Advanced React Patterns', author: 'Jane Smith', content: 'Consectetur adipiscing elit...' },
        { id: 3, title: 'State Management with Redux', author: 'Alice Johnson', content: 'Vestibulum ante ipsum primis...' },
    ];

    return (<>
    {/* ADD LOADING */}
        <div className='col-md-12 fontr' dir="rtl">
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
                            <p><strong>Author:</strong> {blog.author}</p>
                            <p>{blog.content}</p>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    </>
    );
};

export default BlogList;
