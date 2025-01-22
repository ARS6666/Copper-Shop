import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "../../assets/css/productsinfo/Comment.css";
import url from "../../config.json";

const Comments = (theme) => {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [name, setName] = useState("");
  const [productId, setProductId] = useState("");
  const location = useLocation();
  const [ShowCount, setShowCount] = useState(2);
  const [ButtContent, setButtContent] = useState("مشاهده بیشتر ...");
  const [ButtDisable, setButtDisable] = useState(false);
  const token = localStorage.getItem('token');
  const [Islogin, setIslogin] = useState()
  const [hasName, sethasName] = useState(false)

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const paramId = searchParams.get('id');
    if (paramId) {
      setProductId(paramId);
    }
  }, [location.search]);
  useEffect(() => {
    if (token) {
      const myHeaders = new Headers();
      myHeaders.append("accept", "application/json");
      myHeaders.append("X-CSRFToken", "1fTGS6TTndWCquhfeQ1p8MfIfRjf4VjUW4Bdbjea2NHSuYlKaiUJWwo0lknZ68nq");
      myHeaders.append("Authorization", `Bearer ${token}`);

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
      };

      fetch(`${url.baseUrl}/auth/profile/1/`, requestOptions)
        .then((response) => response.json())
        .then((result) => setName(result.name))
        .catch((error) => setName(null));
      setIslogin(true)
    } else {
      setIslogin(false)
    };
  }, []);
  useEffect(() => {
    if (name) {
      if (name.length > 0) {
        sethasName(true)
      }
    }
  }, [Islogin, name]);


  useEffect(() => {
    if (productId) {
      const myHeaders = new Headers();
      myHeaders.append("accept", "application/json");
      if (token) {
        myHeaders.append("Authorization", `Bearer ${token}`);
      }

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
      };
      fetch(`${url.baseUrl}/comments/comment/?product_id=` + productId, requestOptions)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((result) => {
          setComments(result);
        })
        .catch((error) => {
          console.log("Error fetching comments:", error);
        });
    }
  }, [productId, token]);

  const sendToServer = () => {
    const myHeaders = new Headers();
    myHeaders.append("accept", "application/json");
    myHeaders.append("Content-Type", "application/json");
    if (token) {
      myHeaders.append("Authorization", `Bearer ${token}`);
    }

    const raw = JSON.stringify({
      name: name,
      text: comment,
      product: productId
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    fetch(`${url.baseUrl}/comments/comment/`, requestOptions)
      .then((response) => {
        if (!response.ok) {
          return response.json().then((error) => {
            throw new Error(error.message);
          });
        }
        return response.json();
      })
      .then(() => {
        setComment("");
        fetch(`${url.baseUrl}/comments/comment/?product_id=` + productId)
          .then((response) => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then((result) => {
            setComments(result);
          })
          .catch((error) => {
            console.log("Error fetching comments:", error);
          });
      })
      .catch((error) => {
        console.log("Error posting comment:", error);
      });
  };




  const HandleShow = () => {
    if (ShowCount >= comments.length) {
      setButtContent("کامنت ها به پایان رسیدند ...");
    } else {
      setShowCount(ShowCount + 2);
      setButtContent("مشاهده بیشتر ...");
    }
  };



  return (
    <div className="container-xl col-12 d-flex justify-content-center pt-5 pb-5 " >
      <div className={
        Islogin ?
          (hasName ? "col-md-11 col-11 fontr shadow " : "col-md-11 col-11 fontr shadow noName")
          : "col-md-11 col-11 fontr shadow notlogin"
      } dir="rtl">
        <div className="col-md-12 row m-0 p-5">
          <div className="col-md-6 pt-2 col-12 p-0 m-0">
            {Array.isArray(comments) && comments.length > 0 &&
              comments.slice(Math.max(comments.length - ShowCount, 0), comments.length).map((c, index) => (
                <div key={index} className="mt-1 bg-light fontr p-3 border-bottom">
                  <div className="text-muted h5">{c.name}:</div>
                  <div className="h5 text-dark">{c.text}</div>
                </div>
              ))}
            <div className="col-md-12 pt-3 col-12">
              <button className="btn btn-orange rounded-0 col-md-12 col-12" onClick={HandleShow} disabled={ButtDisable} aria-label="Show More Comments">
                {ButtContent}
              </button>
            </div>
          </div>
          <div className="col-md-6 col-12">
            <div className="d-flex justify-content-center">
              <div className="col-md-12 col-12 d-flex align-items-center pt-3 row m-0">
                <span className="col-md-12 col-12 pb-1">نام :</span>
                <input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-control form-control-solid form-control-lg bg-light border-dark rounded-0 col-md-12 col-12"
                  aria-label="Name"
                />
              </div>
            </div>
            <div className="d-flex justify-content-center">
              <div className="col-md-12 col-12 rounded pt-1 d-flex align-items-center">
                <textarea
                  id="comment"
                  rows="3"
                  value={comment}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") sendToServer();
                  }}
                  onChange={(e) => setComment(e.target.value)}
                  className="form-control form-control-lg border-dark rounded-0 textarea"
                  placeholder="نظر شما:"
                  aria-label="Comment"
                  style={{ maxHeight: "250px" }}
                />
              </div>
            </div>
            <div className=" col-md-12 col-12 d-flex justify-content-end pt-1">
              <button
                onClick={sendToServer}
                className="col-md-3 col-11 btn btn-primary hover rounded-0"
                aria-label="Submit Comment"
              >
                ثبت
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comments;