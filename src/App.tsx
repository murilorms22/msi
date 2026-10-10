import { AnchorSections } from './components/AnchorSections'
import { BackgroundDecor } from './components/BackgroundDecor'
import { FloatingWhatsApp } from './components/FloatingWhatsApp'
import { HeroSection } from './components/HeroSection'
import { Navbar } from './components/Navbar'

export default function App() {
  return (
    <div className="relative isolate overflow-x-clip bg-navy-950">
      <BackgroundDecor />
      <Navbar />
      <main className="relative z-10">
        <HeroSection />
        <AnchorSections />
      </main>
      <FloatingWhatsApp />
    </div>
  )
}
