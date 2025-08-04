import React, {useContext, useEffect} from 'react'
import { Routes, Route, Navigate, useLocation} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';

import Home from './pages/Home'
import Result from './pages/Result'
import GenerationResult from './pages/GenerationResult'
import BuyCredit from './pages/BuyCredit'
import Gallery from './pages/Gallery'
import Dashboard from './pages/Dashboard'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Login from './components/Login'
import { AppContext } from './context/AppContext'
import Features from './pages/Features';
import Settings from './pages/Settings';

const App = () => {
  const {showLogin, isAuthenticated, theme} = useContext(AppContext);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    document.body.classList.remove('theme-light', 'theme-dark');
    document.body.classList.add(`theme-${theme}`);
  }, [theme]);

  return (
    <div className="h-screen w-full bg-white"> 
      {showLogin && <Login />}
      <div className='h-screen'>
        <ToastContainer position='bottom-right'/>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/dashboard' element={isAuthenticated ? <Dashboard /> : <Navigate to="/" replace />} />
          <Route path='/result' element={<Result />} />
          <Route path='/result/:id' element={isAuthenticated ? <GenerationResult /> : <Navigate to="/" replace />} />
          <Route path='/buy' element={<BuyCredit />} />
          <Route path='/gallery' element={isAuthenticated ? <Gallery /> : <Navigate to="/" replace />} />
          <Route path='/features' element={<Features />} />
          <Route path='/settings' element={<Settings />} />
        </Routes>
        <Footer />
      </div>
    </div>
  )
}

export default App
