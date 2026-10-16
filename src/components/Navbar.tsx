import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { COMPANY, IMAGES, NAV_LINKS, WHATSAPP_LINKS } from '../data/content'
import { WhatsAppIcon } from './icons/WhatsAppIcon'

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Fecha o menu mobile ao redimensionar para desktop ou pressionar Esc
  useEffect(() => {
    const onResize = () => window.innerWidth >= 1024 && setOpen(false)
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('resize', onResize)
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('resize', onResize)
      window.removeEventListener('keydown', onKey)
    }
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? 'border-b border-slate-200/80 bg-white/90 shadow-sm backdrop-blur-xl'
          : 'bg-transparent'
      }`}
    >
      <nav className="container-page flex h-18 items-center justify-between gap-3" aria-label="Navegação principal">
        {/* Logo */}
        <a href="#inicio" id="nav-logo" className="group flex min-w-0 items-center gap-3" onClick={() => setOpen(false)}>
          <img
            src={IMAGES.logo}
            alt="Logo MSI Soluções em Informática"
            className="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105 sm:h-11 drop-shadow-md"
          />
          <span className="flex min-w-0 flex-col leading-none">
            <span className="font-display text-xl font-bold tracking-tight text-navy-950">
              MSI<span className="text-brand-500">.</span>
            </span>
            <span className="mt-1 truncate text-[10px] font-medium uppercase tracking-[0.12em] text-slate-500 sm:text-[11px] sm:tracking-[0.14em]">
              {COMPANY.tagline}
            </span>
          </span>
        </a>

        {/* Links desktop */}
        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                id={`nav-link-${link.href.slice(1)}`}
                className="relative rounded-lg px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:text-brand-600 after:absolute after:inset-x-4 after:bottom-1 after:h-0.5 after:origin-left after:scale-x-0 after:rounded-full after:bg-brand-500 after:transition-transform after:duration-300 hover:after:scale-x-100"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex shrink-0 items-center gap-2">
          <a
            href={WHATSAPP_LINKS.default}
            target="_blank"
            rel="noopener noreferrer"
            id="nav-cta-whatsapp"
            className="btn-primary hidden px-5 py-2.5 text-sm sm:inline-flex"
          >
            <WhatsAppIcon className="h-4 w-4" />
            Fale Conosco
          </a>

          <button
            type="button"
            id="nav-menu-toggle"
            className="grid h-11 w-11 place-items-center rounded-xl text-navy-950 transition-colors hover:bg-slate-100 lg:hidden"
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Menu mobile */}
      <div
        id="mobile-menu"
        className={`grid overflow-hidden transition-[grid-template-rows] duration-300 ease-out lg:hidden ${
          open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="min-h-0 border-t border-slate-100 bg-white/98">
          <ul className="container-page flex flex-col gap-1 pb-6 pt-3">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  id={`mobile-link-${link.href.slice(1)}`}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-4 py-3 text-base font-medium text-navy-900 transition-colors hover:bg-brand-50 hover:text-brand-600"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="mt-2">
              <a
                href={WHATSAPP_LINKS.default}
                target="_blank"
                rel="noopener noreferrer"
                id="mobile-cta-whatsapp"
                className="btn-primary w-full px-5 py-3.5"
              >
                <WhatsAppIcon className="h-5 w-5" />
                Fale Conosco
              </a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  )
}
