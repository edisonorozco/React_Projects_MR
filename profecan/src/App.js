import React from 'react'
import Navbar from './components/navbar/Navbar';
import './App.css'
import Home from './components/pages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import About from './components/pages/about/About';
import Adoptions from './components/pages/adoptions/Adoptions';
import Contact from './components/pages/contact/Contact';

const App = () => {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/adoptions' element={<Adoptions />} />
          <Route path='/contact' element={<Contact />} />
        </Routes>
      </Router>
    </>
  )
}

export default App;