import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import LegalMindAI from './pages/home';
import LoginPage from './pages/login';
import CaseAnalysisPage from './pages/Results';
import Footer from './components/Footer';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/home" element={<LegalMindAI/>} />
        <Route path="/results" element={<CaseAnalysisPage/>} />
        <Route path="/login" element={<LoginPage/>} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;