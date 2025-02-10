import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import { Home } from './Home.jsx';
import { Events } from './Events.jsx';
import { Budget } from './Budget.jsx';
import { Reimbursements } from './Reimbursements.jsx';
import { AdminDashboard } from './AdminDashboard.jsx';
import { Login } from './Login.jsx';
import { NotFound } from './NotFound.jsx';

function App() {
  return (
    <Router>
      <div className="app-container">
        <header>
          <nav>
            <Link to="/">Home</Link> | 
            <Link to="/events">Events</Link> | 
            <Link to="/budget">Budget</Link> | 
            <Link to="/reimbursements">Reimbursements</Link> | 
            <Link to="/admin">Admin</Link> | 
            <Link to="/login">Login</Link>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/events" element={<Events />} />
            <Route path="/budget" element={<Budget />} />
            <Route path="/reimbursements" element={<Reimbursements />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <footer>
          {/* Footer content */}
        </footer>
      </div>
    </Router>
  );
}

export default App;
