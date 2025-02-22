import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './Login.css'

function Login() {
  const [isLogin, setIsLogin] = useState(true)
  const formVariants = {
    hidden: { opacity: 0, x: 30, scale: 0.95 },
    visible: { opacity: 1, x: 0, scale: 1 },
    exit: { opacity: 0, x: -30, scale: 0.95 }
  }
  return (
    <div className="login-wrapper">
      <div className="login-info">
        <h1>Welcome</h1>
        <p>Your secure access begins here</p>
      </div>
      <div className="auth-container">
        <div className="auth-tabs">
          <div className={`auth-tab ${isLogin ? "active" : ""}`} onClick={() => setIsLogin(true)}>Login</div>
          <div className={`auth-tab ${!isLogin ? "active" : ""}`} onClick={() => setIsLogin(false)}>Sign Up</div>
        </div>
        <div className="auth-form-container">
          <AnimatePresence exitBeforeEnter>
            {isLogin ? (
              <motion.form key="login" className="auth-form" initial="hidden" animate="visible" exit="exit" variants={formVariants} transition={{ duration: 0.4, ease: "easeInOut" }}>
                <h2>Welcome Back</h2>
                <input type="email" placeholder="Email" className="auth-input" required />
                <input type="password" placeholder="Password" className="auth-input" required />
                <motion.button whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }} className="auth-button" type="submit">Login</motion.button>
              </motion.form>
            ) : (
              <motion.form key="signup" className="auth-form" initial="hidden" animate="visible" exit="exit" variants={formVariants} transition={{ duration: 0.4, ease: "easeInOut" }}>
                <h2>Create Account</h2>
                <input type="text" placeholder="Name" className="auth-input" required />
                <input type="email" placeholder="Email" className="auth-input" required />
                <input type="password" placeholder="Password" className="auth-input" required />
                <input type="password" placeholder="Confirm Password" className="auth-input" required />
                <motion.button whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }} className="auth-button" type="submit">Sign Up</motion.button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export default Login
