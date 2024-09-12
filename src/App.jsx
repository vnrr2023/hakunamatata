// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import './App.css';

// import { Navbar, Hero, About, Translate, Services1, Model, Loaders, Gallery } from "./components/pages";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './pages/components/Navbar';
import Csgpt from './pages/Csgpt';
import About from './pages/About';
import Pricing from './pages/Pricing';
import Hero from './pages/Hero';

function App() {
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 3000);
  // }, []);

  return (
    <>
      {/* {loading && <Loaders />}

      {!loading && ( */}
        <Router>
          <Navbar />
          <div style={{ paddingTop: '64px' }}> 
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/csgpt" element={<Csgpt />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/about" element={<About />} />
          </Routes>
          </div>
        </Router>
      {/* )} */}
    </>
  );
}

export default App;
