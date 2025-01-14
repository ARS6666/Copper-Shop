import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import url from "../../config.json";

function RefreshToken() {
  const token = localStorage.getItem('token');
  const refresh = localStorage.getItem('refresh');
  const navigate = useNavigate();

  useEffect(() => {
    const verifyToken = async () => {
      if (window.location.href.includes('account' || 'cart') && !token || !refresh) {
        navigate('/login');
        return;
      }

      const myHeaders = new Headers();
      myHeaders.append("Accept", "application/json");
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({ "token": token });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
      };

      try {
        const response = await fetch(`${url.baseUrl}/auth/jwt/verify/`, requestOptions);

        if (!response.ok) {
          const result = await response.json();
          if (result.code === "token_not_valid") {
            const myHeadersRefresh = new Headers();
            myHeadersRefresh.append("Accept", "application/json");
            myHeadersRefresh.append("Content-Type", "application/json");

            const rawRefresh = JSON.stringify({ "refresh": refresh });

            const requestOptionsRefresh = {
              method: "POST",
              headers: myHeadersRefresh,
              body: rawRefresh,
              redirect: "follow"
            };

            const refreshResponse = await fetch(`${url.baseUrl}/auth/jwt/refresh/`, requestOptionsRefresh);
            const refreshResult = await refreshResponse.json();

            if (refreshResponse.ok) {
              localStorage.setItem('token', refreshResult.access);
            } else {
              localStorage.removeItem('token');
            }
          }
        }
      } catch (error) {
        localStorage.removeItem('token')
      }
    };

    verifyToken();
  }, [token, refresh, navigate]);

  return null;
}

export default RefreshToken;
