import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './pages/components/Navbar';
import Footer from './pages/components/Footer';
import Csgpt from './pages/components/csgpt-components/Csgpt';
import About from './pages/About';
import Pricing from './pages/Pricing';
import Hero from './pages/Hero';
import SignUp from './pages/SignUp';
import Subjects from './pages/Subjects';

function Layout() {
  const location = useLocation();

  return (
    <>
      {location.pathname !== '/csgpt' && <Navbar />}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/csgpt" element={<Csgpt />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/about" element={<About />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/subjects" element={<Subjects />} />
        </Routes>
      </main>
      {location.pathname !== '/csgpt' && location.pathname !== '/signup' && <Footer />}
    </>
  );
}

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Router>
        <Layout />
      </Router>
    </div>
  );
}

export default App;
