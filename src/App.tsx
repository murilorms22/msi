import { AdminPage } from './components/AdminPage'
import { AnchorSections } from './components/AnchorSections'
import { BackgroundDecor } from './components/BackgroundDecor'
import { BannerCarousel } from './components/BannerCarousel'
import { FloatingWhatsApp } from './components/FloatingWhatsApp'
import { HeroSection } from './components/HeroSection'
import { Navbar } from './components/Navbar'

export default function App() {
  if (window.location.pathname.replace(/\/+$/, '') === '/admin') return <AdminPage />

  return (
    <div className="relative isolate overflow-x-clip bg-white text-navy-950">
      <BackgroundDecor />
      <Navbar />
      <main className="relative z-10">
        <BannerCarousel />
        <HeroSection />
        <AnchorSections />
      </main>
      <FloatingWhatsApp />
    </div>
  )
}
