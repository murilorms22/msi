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
    <section id="escolas" className="border-t border-slate-200/80 bg-slate-50/60 py-16 sm:py-20 lg:py-28">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-600">
            PARA INSTITUIÇÕES DE ENSINO
          </span>
          <h2 className="mt-3 text-2xl font-bold text-navy-950 min-[400px]:text-3xl sm:text-4xl">
            Estrutura de TI e Suprimentos que sua Escola precisa
          </h2>
          <p className="mt-4 text-base text-slate-600 sm:text-lg">
            Cuidamos da tecnologia para que a equipe pedagógica foque no ensino. Atendimento rápido e fornecimento contínuo.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SCHOOL_CARDS.map((card) => {
            const Icon = card.icon
            return (
              <div
                key={card.title}
                className="flex flex-col rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-500/40 hover:shadow-lg"
              >
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand-50 text-brand-600 shadow-2xs">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 text-lg font-semibold text-navy-950">{card.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{card.description}</p>
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
            className="btn-primary inline-flex px-7 py-4 text-base"
          >
            <WhatsAppIcon className="h-5 w-5 shrink-0" />
            Solicitar proposta / visita técnica para minha escola
          </a>
        </div>
      </div>
    </section>
  )
}
