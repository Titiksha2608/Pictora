import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import { motion } from 'framer-motion'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [state, setState] = useState('Login')
  const { setShowLogin, backendUrl, setToken, setUser } = useContext(AppContext);
  const navigate = useNavigate();
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (state === 'Login') {
        const { data } = await axios.post(backendUrl + '/api/user/login', { email, password })
        if (data.success) {
          setToken(data.token)
          setUser(data.user)
          localStorage.setItem('token', data.token)
          window.scrollTo({ top: 0, behavior: 'smooth' });
          setShowLogin(false)
          navigate('/dashboard')
        } else {
          toast.error(data.message)
        }
      } else {
        const { data } = await axios.post(backendUrl + '/api/user/register', { name, email, password })
        if (data.success) {
          setToken(data.token)
          setUser(data.user)
          localStorage.setItem('token', data.token)
          setShowLogin(false)
          navigate('/dashboard')
        } else {
          toast.error(data.message)
        }
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const navbar = document.getElementById('nav-bar')
    if (navbar) navbar.style.opacity = 0.05
    return () => {
      document.body.style.overflow = 'unset';
      if (navbar) navbar.style.opacity = 1
    }
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 z-[9999] backdrop-blur-sm bg-black/30 flex justify-center items-center">
      <motion.form
        onSubmit={onSubmitHandler}
        initial={{ opacity: 0.2, y: 50 }}
        transition={{ duration: 0.3 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative bg-white p-0 rounded-2xl shadow-2xl w-[370px] max-w-[90vw] flex flex-col items-center"
      >
        {/* Close Button */}
        <button type="button" onClick={() => setShowLogin(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-xl focus:outline-none bg-gray-100 rounded-full p-1 transition-all shadow-sm">
          <img src={assets.cross_icon} alt="close" className="w-5 h-5" />
        </button>
        {/* Logo */}
        <div className="flex flex-col items-center mt-8 mb-2">
          {/* <img src={assets.logo_icon || assets.logo} alt="logo" className="w-12 h-12 mb-2" /> */}
          <h1 className="text-3xl font-bold text-neutral-800 mb-1">{state}</h1>
          <p className="text-sm text-gray-500 mb-2">Welcome back! Please sign in to continue</p>
        </div>
        <div className="w-full px-8 pb-8 flex flex-col gap-3">
          {state !== 'Login' && (
            <div className="border px-5 py-2 flex items-center gap-2 rounded-full bg-gray-50">
              <img src={assets.user_icon} alt="" className="w-4 h-4 opacity-70" />
              <input onChange={e => setName(e.target.value)} value={name} type="text" className="outline-none text-sm bg-transparent flex-1" placeholder="Full Name" required />
            </div>
          )}
          <div className="border px-5 py-2 flex items-center gap-2 rounded-full bg-gray-50">
            <img src={assets.email_icon} alt="" className="w-4 h-4 opacity-70" />
            <input onChange={e => setEmail(e.target.value)} value={email} type="email" className="outline-none text-sm bg-transparent flex-1" placeholder="Email id" required />
          </div>
          <div className="border px-5 py-2 flex items-center gap-2 rounded-full bg-gray-50">
            <img src={assets.lock_icon} alt="" className="w-4 h-4 opacity-70" />
            <input onChange={e => setPassword(e.target.value)} value={password} type="password" className="outline-none text-sm bg-transparent flex-1" placeholder="Password" required />
          </div>
          <div className="flex justify-end mt-1 mb-2">
            <span className="text-xs text-blue-600 hover:underline cursor-pointer">Forgot password?</span>
          </div>
          <button className="bg-gradient-to-r from-blue-600 to-blue-400 w-full text-white py-2 rounded-full font-semibold text-base shadow-md hover:from-blue-700 hover:to-blue-500 transition-all mt-1 mb-2">
            {state === 'Login' ? 'Login' : 'Create Account'}
          </button>
          <div className="flex items-center my-2">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="mx-2 text-xs text-gray-400">or</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>
          {state === 'Login' ? (
            <p className="text-center text-sm">Don't have an account? <span className="text-blue-600 font-medium cursor-pointer hover:underline" onClick={() => setState('Sign Up')}>Sign Up</span></p>
          ) : (
            <p className="text-center text-sm">Already have an account? <span className="text-blue-600 font-medium cursor-pointer hover:underline" onClick={() => setState('Login')}>Login</span></p>
          )}
        </div>
      </motion.form>
    </div>
  )
}

export default Login
