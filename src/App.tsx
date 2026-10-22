import { About } from './components/About'
import { Achievements } from './components/Achievements'
import { Approach } from './components/Approach'
import { Atmosphere } from './components/Atmosphere'
import { Contact } from './components/Contact'
import { Education } from './components/Education'
import { Experience } from './components/Experience'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { RiftEntity } from './components/RiftEntity'
import { Skills } from './components/Skills'

function App() {
  return (
    <div className="relative isolate min-h-screen overflow-x-clip bg-[#090707] font-['Avenir_Next',Avenir,'Segoe_UI',Helvetica,Arial,sans-serif] text-[#f2e8e3] selection:bg-[#a73b2b] selection:text-white">
      <Atmosphere />
      <Header />
      <main className="relative z-[1]">
        <Hero />
        <About />
        <Approach />
        <Experience />
        <Skills />
        <Education />
        <Achievements />
        <RiftEntity />
        <Contact />
      </main>
      <div className="relative z-[1]">
        <Footer />
      </div>
    </div>
  )
}

export default App
