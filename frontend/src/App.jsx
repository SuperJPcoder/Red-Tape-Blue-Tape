import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import './App.css'
import { Events } from './Events'
import { Budget } from './Budget'
import { Reimbursements } from './Reimbursements'
import { AdminDashboard } from './AdminDashboard'
import Login from './Login'
import { Permissions } from './Permissions'
import { NotFound } from './NotFound'

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-tape"></Link>
      </div>
      <div className="navbar-right">
        <Link to="/events" className="navbar-link">Events</Link>
        <Link to="/budget" className="navbar-link">Budget</Link>
        <Link to="/reimbursements" className="navbar-link">Reimbursements</Link>
        <Link to="/admin" className="navbar-link">Admin</Link>
        <Link to="/login" className="navbar-link">Login</Link>
        <Link to="/permissions" className="navbar-link">Permissions</Link>
      </div>
    </nav>
  )
}

function FixedHeader() {
  return (
    <div className="fixed-header">
      <h1 className="site-title">Red-Tape-Blue-Tape</h1>
      <p className="site-tagline">Streamlining Student Club Management at VJTI</p>
    </div>
  )
}

function ImageGrid() {
  const [scrolled, setScrolled] = React.useState(false)
  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 150 && !scrolled) {
        setScrolled(true)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [scrolled])
  const imagesData = React.useMemo(() => {
    let arr = Array.from({ length: 10 }, (_, i) => ({
      id: i,
      delay: Math.random() * 2.5
    }))
    return arr.sort(() => Math.random() - 0.5)
  }, [])
  return (
    <div className="image-grid">
      {imagesData.map(img => (
        <motion.div key={img.id} className="grid-item"
          initial={{ scale: 0, opacity: 0 }}
          animate={scrolled ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
          transition={{ delay: img.delay, type: "spring", stiffness: 100 }}
        >
          <img src={`https://picsum.photos/seed/${img.id}/100`} alt={`Logo ${img.id + 1}`} />
        </motion.div>
      ))}
    </div>
  )
}

function WhatWeDo() {
  const handleMouseMove = (e) => {
    const { left, top } = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - left
    const y = e.clientY - top
    e.currentTarget.style.setProperty('--x', `${x}px`)
    e.currentTarget.style.setProperty('--y', `${y}px`)
  }
  return (
    <div className="what-we-do" onMouseMove={handleMouseMove}>
      <motion.h2 initial={{ opacity: 0, scale: 0 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} viewport={{ once: true }}>
        What We Do
      </motion.h2>
      <div className="what-we-do-boxes">
        <div className="what-box hover-overlay">
          <h3>Event Management</h3>
          <p>Digitally streamline scheduling and approvals for campus events, ensuring seamless coordination.</p>
        </div>
        <div className="what-box hover-overlay">
          <h3>Budget Tracking</h3>
          <p>Real-time insights into budgeting, expenditures, and planning, giving you full control.</p>
        </div>
        <div className="what-box hover-overlay">
          <h3>Reimbursements</h3>
          <p>Quick and transparent reimbursement processing to keep your finances in check.</p>
        </div>
      </div>
    </div>
  )
}

function GetStarted() {
  return (
    <div className="get-started">
      <motion.button 
        className="hover-overlay"
        whileHover={{ scale: 1.1, backgroundColor: "#4d79ff", color: "#fff" }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        Get Started
      </motion.button>
    </div>
  )
}

function Home() {
  return (
    <div>
      <FixedHeader />
      <div className="content">
        <ImageGrid />
        <WhatWeDo />
        <GetStarted />
      </div>
    </div>
  )
}

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/budget" element={<Budget />} />
          <Route path="/reimbursements" element={<Reimbursements />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/permissions" element={<Permissions />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
