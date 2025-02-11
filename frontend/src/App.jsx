import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import './App.css'
import { Events } from './Events'
import { Budget } from './Budget'
import { Reimbursements } from './Reimbursements'
import { AdminDashboard } from './AdminDashboard'
import { Login } from './Login'
import { Permissions } from './Permissions'
import { NotFound } from './NotFound'

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-logo">Red-Tape-Blue-Tape</Link>
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
  const [repel, setRepel] = React.useState(false)
  const imagesData = React.useMemo(() => Array.from({ length: 10 }, (_, i) => ({
    id: i,
    delay: Math.random() * 1.5,
    repulsion: { x: (Math.random() - 0.5) * 1500, y: (Math.random() - 0.5) * 1500 }
  })), [])
  React.useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 300 && !repel) {
        setRepel(true)
      }
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [repel])
  return (
    <div className="image-grid">
      {imagesData.map(img => (
        <motion.div key={img.id} className="grid-item"
          initial={{ scale: 0, opacity: 0 }}
          animate={repel ? { x: img.repulsion.x, y: img.repulsion.y, scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
          transition={repel ? { duration: 0.3 } : { delay: img.delay, duration: 0.5 }}
        >
          <img src={`https://picsum.photos/seed/${img.id}/100`} alt={`Random ${img.id + 1}`} />
        </motion.div>
      ))}
    </div>
  )
}

function WhatWeDo() {
  return (
    <div className="what-we-do">
      <motion.h2 initial={{ opacity: 0, scale: 0 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} viewport={{ once: true }}>
        What We Do
      </motion.h2>
      <div className="what-we-do-boxes">
        <div className="what-box">
          <h3>Event Management</h3>
          <p>Digitally streamline scheduling and approvals for campus events, ensuring seamless coordination.</p>
        </div>
        <div className="what-box">
          <h3>Budget Tracking</h3>
          <p>Real-time insights into budgeting, expenditures, and planning, giving you full control.</p>
        </div>
        <div className="what-box">
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
        whileHover={{ scale: 1.1, backgroundColor: "#ff4d4d", color: "#fff" }}
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
