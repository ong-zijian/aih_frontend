import React, {useState} from 'react';
// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';


import Navbar from './displayComponents/navBar';
import LoginPage from './displayComponents/loginPage';

import HomePage from './functionalComponents/homepage';
import Chatbot from './functionalComponents/chatbot';
import ScamChecker from './functionalComponents/scamChecker';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Auth state

  return (
    <div className="App">
       <Router>
       <Navbar isAuthenticated={isAuthenticated} setAuth={setIsAuthenticated} />
        <Routes>
          <Route path="/homepage" element={<HomePage />} />
          <Route path="/" element={<LoginPage setAuth={setIsAuthenticated} />} />
          <Route path="/login" element={<LoginPage setAuth={setIsAuthenticated} />} />
          <Route path="/chatbot" element={isAuthenticated ? <Chatbot /> : <Navigate to="/homepage" />} />
          <Route path="/scam-checker" element={isAuthenticated ? <ScamChecker /> : <Navigate to="/homepage" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
