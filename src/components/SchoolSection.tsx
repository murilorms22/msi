import { Headphones, Laptop, Printer, Shield } from 'lucide-react'
import { WhatsAppIcon } from './icons/WhatsAppIcon'

const SCHOOL_WHATSAPP_LINK =
  'https://wa.me/5553999777050?text=Ol%C3%A1%2C%20Vitor!%20Gostaria%20de%20conversar%20sobre%20solu%C3%A7%C3%B5es%2Fsuprimentos%20para%20minha%20escola'

const SCHOOL_CARDS = [
  {
    icon: Laptop,
    title: 'Laboratórios de Informática',
    description:
      'Manutenção preventiva em lote, formatação e upgrades para as máquinas nunca travarem em aula.',
  },
  {
    icon: Printer,
    title: 'Fornecimento de Suprimentos',
    description:
      'Entrega recorrente de toners e cartuchos de alto rendimento para impressão sem interrupções de provas e documentos.',
  },
  {
    icon: Shield,
    title: 'CFTV & Segurança Escolar',
    description:
      'Câmeras estratégicas para monitorar portarias, pátios e corredores, com acesso fácil pelo celular da direção.',
  },
  {
    icon: Headphones,
    title: 'Suporte Prioritário',
    description:
      'Atendimento presencial e remoto ágil para a secretaria e coordenação.',
  },
]

export function SchoolSection() {
  return (
    <section
      id="escolas"
      className="relative overflow-hidden bg-gradient-to-br from-brand-600 via-brand-500 to-navy-950 py-16 text-white sm:py-20 lg:py-28"
    >
      {/* Elementos visuais de fundo idênticos à seção de Suporte Remoto */}
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_90%)]" />
      <div className="pointer-events-none absolute -right-32 top-0 h-96 w-96 rounded-full bg-brand-400/30 blur-3xl" />
      <div className="pointer-events-none absolute -left-32 bottom-0 h-96 w-96 rounded-full bg-brand-500/20 blur-3xl" />

      <div className="container-page relative">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-400">
            PARA INSTITUIÇÕES DE ENSINO
          </span>
          <h2 className="mt-3 text-2xl font-bold text-white min-[400px]:text-3xl sm:text-4xl">
            Estrutura de TI e Suprimentos que sua Escola precisa
          </h2>
          <p className="mt-4 text-base text-blue-100 sm:text-lg">
            Cuidamos da tecnologia para que a equipe pedagógica foque no ensino. Atendimento rápido e fornecimento contínuo.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SCHOOL_CARDS.map((card) => {
            const Icon = card.icon
            return (
              <div
                key={card.title}
                className="flex flex-col rounded-2xl border border-white/15 bg-navy-950/60 p-6 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-brand-400/50 hover:bg-navy-950/75"
              >
                <span className="grid h-12 w-12 place-items-center rounded-xl border border-white/10 bg-brand-500/20 text-brand-400 shadow-2xs">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 text-lg font-semibold text-white">{card.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-200">{card.description}</p>
              </div>
            )
          })}
        </div>

        <div className="mt-12 text-center">
          <a
            href={SCHOOL_WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            id="school-cta-whatsapp"
            className="btn-primary border border-white inline-flex w-full px-8 py-4 text-base sm:w-auto"
          >
            <WhatsAppIcon className="h-5 w-5 shrink-0" />
            Solicitar proposta / visita técnica para minha escola
          </a>
        </div>
      </div>
    </section>
  )
}
