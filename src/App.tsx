import { useEffect } from 'react'
import { Nav, ScrollProgress } from './components/Chrome'
import { Hero } from './components/Hero'
import { About } from './components/About'
import { Projects } from './components/Projects'
import { Certifications, Contact, Experience, Footer, Skills } from './components/Sections'
import { startSmoothScroll } from './lib/scroll'

export default function App() {
  useEffect(() => startSmoothScroll(), [])

  return (
    <>
      <ScrollProgress />
      <Nav />
      <main>
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Skills />
        <Certifications />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
