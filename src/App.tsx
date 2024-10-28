import React from 'react';
// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import Navbar from './displayComponents/navBar';
import HomePage from './functionalComponents/homepage';
import Chatbot from './functionalComponents/chatbot';
import ScamChecker from './functionalComponents/scamChecker';

function App() {
  return (
    <div className="App">
       <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/scam-checker" element={<ScamChecker />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
