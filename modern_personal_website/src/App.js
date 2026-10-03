import React from 'react'
import { useTranslation } from 'react-i18next'
import Header from './components/header/Header'
import Hero from './components/hero/Hero'
import About from './components/about/About'
import Experience from './components/experience/Experience'
import Projects from './components/projects/Projects'
import Lab from './components/lab/Lab'
import Services from './components/services/Services'
import Contact from './components/contact/Contact'
import Footer from './components/footer/Footer'
import { useReveal } from './hooks/useReveal'

const App = () => {
  const { i18n } = useTranslation()
  useReveal(i18n.language)

  return (
    <>
      <Header />
      <main id="top">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Lab />
        <Services />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default App
