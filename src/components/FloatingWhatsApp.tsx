import { WHATSAPP_LINKS } from '../data/content'
import { WhatsAppIcon } from './icons/WhatsAppIcon'

export function FloatingWhatsApp() {
  return (
    <a
      href={WHATSAPP_LINKS.default}
      target="_blank"
      rel="noopener noreferrer"
      id="floating-whatsapp"
      aria-label="Fale Conosco pelo WhatsApp"
      className="group fixed bottom-6 right-6 z-50 flex items-center"
    >
      {/* Tooltip */}
      <span
        role="tooltip"
        className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-lg bg-navy-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-lg transition-all duration-300 translate-x-2 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100"
      >
        Fale Conosco
        <span className="absolute -right-1 top-1/2 h-2 w-2 -translate-y-1/2 rotate-45 bg-navy-900" />
      </span>

      <span className="relative grid h-14 w-14 place-items-center sm:h-16 sm:w-16">
        <span className="absolute inset-0 animate-pulse-ring rounded-full bg-whatsapp" aria-hidden="true" />
        <span className="relative grid h-full w-full place-items-center rounded-full bg-whatsapp text-white shadow-xl shadow-whatsapp/40 transition-all duration-300 group-hover:scale-110 group-hover:bg-whatsapp-dark">
          <WhatsAppIcon className="h-7 w-7 sm:h-8 sm:w-8" />
        </span>
      </span>
    </a>
  )
}
