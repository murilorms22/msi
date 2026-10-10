import { AnchorSections } from './components/AnchorSections'
import { FloatingWhatsApp } from './components/FloatingWhatsApp'
import { HeroSection } from './components/HeroSection'
import { Navbar } from './components/Navbar'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <AnchorSections />
      </main>
      <FloatingWhatsApp />
    </>
  )
}
