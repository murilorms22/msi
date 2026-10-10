import { Camera, Check, Cpu, ExternalLink, Laptop, Monitor, Network, Printer, Shield, UserRound, type LucideIcon } from 'lucide-react'
import {
  ABOUT,
  ANYDESK_URL,
  COMPANY,
  IMAGES,
  REMOTE_SUPPORT_STEPS,
  SALES,
  SECURITY_FEATURES,
  SERVICES,
  WHATSAPP_LINKS,
  type ServiceIcon,
} from '../data/content'
import { ImageSlot } from './ImageSlot'
import { WhatsAppIcon } from './icons/WhatsAppIcon'

const ICONS: Record<ServiceIcon, LucideIcon> = {
  laptop: Laptop,
  cpu: Cpu,
  monitor: Monitor,
  camera: Camera,
  network: Network,
  shield: Shield,
}

function SectionHeading({ eyebrow, title, subtitle, onBlue = false }: {
  eyebrow: string
  title: string
  subtitle?: string
  onBlue?: boolean
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <span className={`text-sm font-semibold uppercase tracking-[0.18em] ${onBlue ? 'text-white' : 'text-brand-400'}`}>
        {eyebrow}
      </span>
      <h2 className="mt-3 text-2xl font-bold text-white min-[400px]:text-3xl sm:text-4xl">{title}</h2>
      {subtitle && <p className="mt-4 text-base text-white sm:text-lg">{subtitle}</p>}
    </div>
  )
}

/** Seções-âncora (#servicos, #suporte-remoto, #seguranca, #sobre). */
export function AnchorSections() {
  return (
    <>
      <section id="servicos" className="py-16 sm:py-20 lg:py-28">
        <div className="container-page">
          <SectionHeading
            eyebrow="Serviços"
            title="Tudo o que seus equipamentos precisam"
            subtitle="Do conserto do notebook à segurança do seu prédio — um único técnico de confiança."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 sm:gap-6 lg:mt-14 lg:grid-cols-3">
            {SERVICES.map((s) => {
              const Icon = ICONS[s.icon]
              return (
                <article
                  key={s.id}
                  id={`service-${s.id}`}
                  className="glass group flex flex-col rounded-2xl p-6 shadow-lg shadow-black/20 transition-all duration-300 hover:-translate-y-1 hover:border-brand-400/50 hover:shadow-xl hover:shadow-brand-500/20 sm:p-7"
                >
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand-500/20 text-brand-400 transition-colors duration-300 group-hover:bg-gradient-to-br group-hover:from-brand-500 group-hover:to-brand-400 group-hover:text-navy-950">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 text-xl font-semibold text-white">{s.title}</h3>
                  <p className="mt-2 text-white">{s.description}</p>
                  <ul className="mt-4 space-y-2">
                    {s.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2 text-sm text-white">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" /> {b}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={WHATSAPP_LINKS[s.topic]}
                    target="_blank"
                    rel="noopener noreferrer"
                    id={`service-cta-${s.id}`}
                    className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold text-brand-400 transition-colors hover:text-white"
                  >
                    <WhatsAppIcon className="h-4 w-4" />
                    {s.cta}
                  </a>
                </article>
              )
            })}
          </div>

          {/* Destaque de vendas */}
          <div
            id="vendas"
            className="relative mt-8 overflow-hidden rounded-3xl border border-brand-500/40 bg-gradient-to-br from-navy-800 to-navy-900 p-6 shadow-2xl shadow-brand-500/10 sm:mt-10 sm:p-10 lg:p-12"
          >
            <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brand-500/30 blur-3xl" />
            <div className="relative grid items-center gap-8 lg:grid-cols-[1.4fr_1fr]">
              <div>
                <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-brand-400">
                  <Printer className="h-4 w-4" /> {SALES.eyebrow}
                </span>
                <h3 className="mt-3 text-2xl font-bold text-white sm:text-3xl">{SALES.title}</h3>
                <p className="mt-3 max-w-xl text-white">{SALES.description}</p>
                <a
                  href={WHATSAPP_LINKS.sales}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="sales-cta-whatsapp"
                  className="btn-primary mt-7 w-full px-7 py-4 sm:w-auto"
                >
                  <WhatsAppIcon className="h-5 w-5 shrink-0" /> {SALES.cta}
                </a>
              </div>
              <ul className="flex flex-wrap gap-2.5 lg:justify-end">
                {SALES.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-brand-400/40 bg-white/5 px-4 py-2 text-sm font-medium text-white backdrop-blur"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="suporte-remoto" className="relative overflow-hidden bg-gradient-to-br from-brand-600 via-brand-500 to-[#0a63e6] py-16 sm:py-20 lg:py-28">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-60" />
        <div className="pointer-events-none absolute -right-32 top-0 h-96 w-96 rounded-full bg-brand-400/30 blur-3xl" />
        <div className="container-page relative">
          <SectionHeading
            onBlue
            eyebrow="Suporte Remoto"
            title={`Resolvido à distância via ${COMPANY.remoteTool}`}
            subtitle="Sem deslocamento e sem espera: atendimento seguro direto na sua tela."
          />
          <div className="mt-12 grid items-center gap-8 lg:mt-14 lg:grid-cols-2 lg:gap-10">
            <ImageSlot
              src={IMAGES.remoteSupport}
              alt="Atendimento de suporte remoto via AnyDesk"
              label="suporte-anydesk.jpg"
              icon={<Monitor className="h-7 w-7" />}
              className="aspect-[4/3] w-full rounded-3xl border border-white/20 object-cover shadow-2xl shadow-navy-950/40"
            />
            <ol className="grid gap-4">
              {REMOTE_SUPPORT_STEPS.map((step, i) => (
                <li key={step.title} className="flex gap-4 rounded-2xl border border-white/15 bg-navy-950/55 p-5 backdrop-blur sm:gap-5 sm:p-6">
                  <span className="font-display text-3xl font-bold text-gradient">0{i + 1}</span>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{step.title}</h3>
                    <p className="mt-1 text-white">{step.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div className="mt-10 text-center sm:mt-12">
            <a href={WHATSAPP_LINKS.remoteSupport} target="_blank" rel="noopener noreferrer" id="remote-cta-whatsapp" className="btn-dark w-full px-7 py-4 sm:w-auto">
              <WhatsAppIcon className="h-5 w-5 shrink-0" /> Iniciar Suporte Remoto
            </a>
            <p className="mt-5 text-sm text-white">
              Ainda não tem o AnyDesk?{' '}
              <a
                href={ANYDESK_URL}
                target="_blank"
                rel="noopener noreferrer"
                id="anydesk-download-link"
                className="inline-flex items-center gap-1 font-semibold underline underline-offset-4 transition-colors hover:text-navy-950"
              >
                Baixe o instalador oficial aqui <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </p>
          </div>
        </div>
      </section>

      <section id="seguranca" className="py-16 sm:py-20 lg:py-28">
        <div className="container-page grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
          <div>
            <span className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-400">Segurança</span>
            <h2 className="mt-3 text-2xl font-bold text-white min-[400px]:text-3xl sm:text-4xl">Câmeras, CFTV e redes para proteger o que importa</h2>
            <p className="mt-4 text-base text-white sm:text-lg">Projetos sob medida para escolas, condomínios e comércios em {COMPANY.region}.</p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {SECURITY_FEATURES.map((f) => (
                <li key={f} className="glass flex items-start gap-3 rounded-2xl p-4">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-brand-500/20 text-brand-400">
                    <Shield className="h-5 w-5" />
                  </span>
                  <span className="text-sm font-medium text-white">{f}</span>
                </li>
              ))}
            </ul>
            <a href={WHATSAPP_LINKS.security} target="_blank" rel="noopener noreferrer" id="security-cta-whatsapp" className="btn-primary mt-8 w-full px-7 py-4 sm:w-auto">
              <WhatsAppIcon className="h-5 w-5 shrink-0" /> Orçar Câmeras e Redes
            </a>
          </div>
          <ImageSlot
            src={IMAGES.cctv}
            alt="Instalação de câmeras de segurança CFTV"
            label="instalacao-cftv.jpg"
            icon={<Camera className="h-7 w-7" />}
            className="aspect-[4/3] w-full rounded-3xl border border-white/15 object-cover shadow-xl shadow-brand-500/20"
          />
        </div>
      </section>

      <section id="sobre" className="border-t border-white/10 bg-navy-900/50 py-16 backdrop-blur-sm sm:py-20 lg:py-28">
        <div className="container-page grid items-center gap-10 lg:grid-cols-[auto_1fr] lg:gap-12">
          <ImageSlot
            src={IMAGES.profile}
            alt={`${COMPANY.technician}, técnico responsável da MSI`}
            label="vitor-perfil.jpg"
            icon={<UserRound className="h-7 w-7" />}
            className="mx-auto aspect-square w-56 rounded-3xl border border-white/15 object-cover shadow-xl shadow-brand-500/20 sm:w-72"
          />
          <div>
            <span className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-400">Sobre</span>
            <h2 className="mt-3 text-2xl font-bold text-white min-[400px]:text-3xl sm:text-4xl">{ABOUT.title}</h2>
            <div className="mt-5 max-w-2xl space-y-4 text-base text-white sm:text-lg">
              {ABOUT.paragraphs.map((p) => <p key={p}>{p}</p>)}
            </div>
            <dl className="mt-8 grid max-w-xl grid-cols-3 gap-2 sm:gap-3">
              {ABOUT.stats.map((s) => (
                <div key={s.label} className="glass rounded-2xl p-3 text-center sm:p-4">
                  <dt className="sr-only">{s.label}</dt>
                  <dd className="font-display text-lg font-bold text-gradient sm:text-2xl">{s.value}</dd>
                  <dd className="mt-1 text-[11px] leading-tight text-white sm:text-xs">{s.label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-navy-950/80 py-10 text-center text-sm text-white">
        <div className="container-page">
          <p className="font-display text-base font-semibold text-white">{COMPANY.fullName}</p>
          <p className="mt-1">
            Técnico responsável: {COMPANY.technician} ·{' '}
            <a href={COMPANY.phoneHref} className="text-brand-400 hover:underline">{COMPANY.phoneDisplay}</a>
          </p>
          <p className="mt-4 text-xs">© {new Date().getFullYear()} MSI. Todos os direitos reservados.</p>
        </div>
      </footer>
    </>
  )
}
