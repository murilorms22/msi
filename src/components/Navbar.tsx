import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { COMPANY, NAV_LINKS, WHATSAPP_LINKS } from '../data/content'
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
          ? 'border-b border-navy-900/5 bg-white/85 shadow-sm shadow-navy-900/5 backdrop-blur-xl'
          : 'bg-transparent'
      }`}
    >
      <nav className="container-page flex h-18 items-center justify-between" aria-label="Navegação principal">
        {/* Logo */}
        <a href="#inicio" id="nav-logo" className="group flex items-center gap-3" onClick={() => setOpen(false)}>
          <span className="relative grid h-11 w-11 place-items-center rounded-xl bg-navy-900 shadow-lg shadow-navy-900/20 transition-transform duration-300 group-hover:scale-105">
            <span className="font-display text-sm font-bold tracking-wider text-gradient">MSI</span>
            <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-brand-500 ring-2 ring-white" />
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-display text-xl font-bold tracking-tight text-navy-900">
              MSI<span className="text-brand-500">.</span>
            </span>
            <span className="mt-1 text-[11px] font-medium uppercase tracking-[0.14em] text-slate-500">
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
                className="relative rounded-lg px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:text-navy-900 after:absolute after:inset-x-4 after:bottom-1 after:h-0.5 after:origin-left after:scale-x-0 after:rounded-full after:bg-brand-500 after:transition-transform after:duration-300 hover:after:scale-x-100"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
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
            className="grid h-11 w-11 place-items-center rounded-xl text-navy-900 transition-colors hover:bg-navy-900/5 lg:hidden"
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
        <div className="min-h-0">
          <ul className="container-page flex flex-col gap-1 pb-6 pt-2">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  id={`mobile-link-${link.href.slice(1)}`}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-4 py-3 text-base font-medium text-navy-900 transition-colors hover:bg-brand-500/10 hover:text-brand-600"
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
