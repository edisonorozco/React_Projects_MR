import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import './App.css'
import Header from './components/header/Header'
import Home from './components/home/Home'
import About from './components/about/About'
import Services from './components/services/Services'
import Process from './components/process/Process'
import Projects from './components/projects/Projects'
import Experience from './components/experience/Experience'
import Contact from './components/contact/Contact'
import Footer from './components/footer/Footer'

const App = () => {
  const { ready } = useTranslation();

  /* Translations load async, so re-apply a #section deep link once the content exists */
  useEffect(() => {
    const target = ready && window.location.hash && document.getElementById(window.location.hash.slice(1));
    if (target) target.scrollIntoView();
  }, [ready]);

  return (
    <>
      <Header />
      <main className='main'>
        <Home />
        <About />
        <Services />
        <Process />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default App
