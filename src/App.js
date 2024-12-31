import './App.css';
import Nav from '../src/components/Nav/Nav';
import NotFoundPage from './components/NotFoundPage';
import Home from './components/Home';
import PI from './components/ProductPage';
import Products from './components/ProductList';
import Cart from './components/account/Cart/cart';
import Signin from './components/authentication/signin';
import Login from './components/authentication/login';
import Panel from './components/account/account';
import PrivateRoute from "./components/authentication/PrivateRoute";
import RefreshToken from "./components/authentication/RefreshToken";
import Footer from './components/footer';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import About from './components/CornerPages/About';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';

const AppContent = () => {

  const location = useLocation();
  const hideFooterPaths = ['/login', '/signin', '/test', '/account ', '/cart'];
  const showFooter = !hideFooterPaths.includes(location.pathname);
  const [theme, setTheme] = useState(localStorage.getItem('theme'));

  useEffect(() => {
    const userPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const userPrefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;

    if (!theme) {
      if (userPrefersDark) {
        setTheme('dark');
      } else if (userPrefersLight) {
        setTheme('light');
      } else {
        setTheme('light');
      }
    }
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <>
      <div className={theme === "dark" ? "main-content scrollable dark" : "main-content scrollable"} style={{ position: "relative" }}>
        <div className='button-container'>
          <button className="btn btn-lg btn-transparent border-0" onClick={toggleTheme} style={{ left: "20px", top: "0", position: "absolute" }}>
            {theme === 'dark' ? "☀️" : "🌕"}
          </button>
          <div className="description fontr" dir="rtl">بعد از هر تغییر تم ریلود کنید.</div>
        </div>
        <Nav theme={theme} />
        <Routes>
          <Route path='' element={<Home theme={theme} />} />
          <Route path='*' element={<NotFoundPage />} />
          <Route path='/pi' element={<PI theme={theme} />} />
          <Route path='/products' element={<Products />} />
          <Route path='/account' element={
            <PrivateRoute>
              <Panel theme={theme} />
            </PrivateRoute>} />
          <Route path='/signin' element={
            <Signin theme={theme} />
          } />
          <Route path='/login' element={
            <Login theme={theme} />
          } />
          <Route path='/cart' element={
            <PrivateRoute>
              <div class="col-md-12 col-12 justify-content-center d-flex">
                <div class="col-md-8 col-11" style={{ backgroundColor: theme === "dark" ? "#121212" : "#f8f9fa" }}>
                  <Cart theme={theme} />
                </div>
              </div>
            </PrivateRoute>} />
          <Route path='/about' element={<About />} />
        </Routes >
        {showFooter ? <Footer theme={theme} /> : null
        }
      </div >
    </>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
      <RefreshToken />
    </Router>
  );
}

export default App;
