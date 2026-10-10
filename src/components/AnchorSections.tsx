import { Camera, Check, Cpu, Laptop, Monitor, Network, Shield, type LucideIcon } from 'lucide-react'
import {
  ABOUT,
  COMPANY,
  REMOTE_SUPPORT_STEPS,
  SECURITY_FEATURES,
  SERVICES,
  WHATSAPP_LINKS,
  type ServiceIcon,
} from '../data/content'
import { WhatsAppIcon } from './icons/WhatsAppIcon'

const ICONS: Record<ServiceIcon, LucideIcon> = {
  laptop: Laptop,
  cpu: Cpu,
  monitor: Monitor,
  camera: Camera,
  network: Network,
  shield: Shield,
}

function SectionHeading({ eyebrow, title, subtitle, dark = false }: {
  eyebrow: string
  title: string
  subtitle?: string
  dark?: boolean
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <span className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-500">{eyebrow}</span>
      <h2 className={`mt-3 text-3xl font-bold sm:text-4xl ${dark ? 'text-white' : 'text-navy-900'}`}>{title}</h2>
      {subtitle && <p className={`mt-4 text-lg ${dark ? 'text-slate-300' : 'text-slate-600'}`}>{subtitle}</p>}
    </div>
  )
}

/** Seções-âncora iniciais (#servicos, #suporte-remoto, #seguranca, #sobre). */
export function AnchorSections() {
  return (
    <>
      <section id="servicos" className="py-20 lg:py-28">
        <div className="container-page">
          <SectionHeading
            eyebrow="Serviços"
            title="Tudo o que seus equipamentos precisam"
            subtitle="Do conserto do notebook à segurança do seu prédio — um único técnico de confiança."
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s) => {
              const Icon = ICONS[s.icon]
              return (
                <article
                  key={s.id}
                  id={`service-${s.id}`}
                  className="group rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-500/40 hover:shadow-xl hover:shadow-brand-500/10"
                >
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-navy-900 text-brand-400 transition-colors duration-300 group-hover:bg-gradient-to-br group-hover:from-brand-500 group-hover:to-brand-600 group-hover:text-white">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 text-xl font-semibold text-navy-900">{s.title}</h3>
                  <p className="mt-2 text-slate-600">{s.description}</p>
                  <ul className="mt-4 space-y-2">
                    {s.bullets.map((b) => (
                      <li key={b} className="flex items-center gap-2 text-sm text-slate-700">
                        <Check className="h-4 w-4 text-brand-500" /> {b}
                      </li>
                    ))}
                  </ul>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section id="suporte-remoto" className="relative overflow-hidden bg-navy-900 py-20 lg:py-28">
        <div className="pointer-events-none absolute -right-32 top-0 h-96 w-96 rounded-full bg-brand-500/20 blur-3xl" />
        <div className="container-page relative">
          <SectionHeading
            dark
            eyebrow="Suporte Remoto"
            title={`Resolvido à distância via ${COMPANY.remoteTool}`}
            subtitle="Sem deslocamento e sem espera: atendimento seguro direto na sua tela."
          />
          <ol className="mt-14 grid gap-6 md:grid-cols-3">
            {REMOTE_SUPPORT_STEPS.map((step, i) => (
              <li key={step.title} className="rounded-2xl border border-white/10 bg-white/5 p-7 backdrop-blur">
                <span className="font-display text-4xl font-bold text-gradient">0{i + 1}</span>
                <h3 className="mt-3 text-lg font-semibold text-white">{step.title}</h3>
                <p className="mt-2 text-slate-300">{step.description}</p>
              </li>
            ))}
          </ol>
          <div className="mt-12 text-center">
            <a href={WHATSAPP_LINKS.remoteSupport} target="_blank" rel="noopener noreferrer" id="remote-cta-whatsapp" className="btn-primary px-7 py-4">
              <WhatsAppIcon className="h-5 w-5" /> Iniciar Suporte Remoto
            </a>
          </div>
        </div>
      </section>

      <section id="seguranca" className="py-20 lg:py-28">
        <div className="container-page grid items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-500">Segurança</span>
            <h2 className="mt-3 text-3xl font-bold text-navy-900 sm:text-4xl">Câmeras, CFTV e redes para proteger o que importa</h2>
            <p className="mt-4 text-lg text-slate-600">Projetos sob medida para residências, comércios e condomínios em {COMPANY.region}.</p>
            <a href={WHATSAPP_LINKS.security} target="_blank" rel="noopener noreferrer" id="security-cta-whatsapp" className="btn-primary mt-8 px-7 py-4">
              <WhatsAppIcon className="h-5 w-5" /> Orçar Sistema de Câmeras
            </a>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2">
            {SECURITY_FEATURES.map((f) => (
              <li key={f} className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-brand-500/10 text-brand-600">
                  <Shield className="h-5 w-5" />
                </span>
                <span className="font-medium text-navy-900">{f}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="sobre" className="border-t border-slate-200 bg-white py-20 lg:py-28">
        <div className="container-page">
          <SectionHeading eyebrow="Sobre" title={ABOUT.title} />
          <div className="mx-auto mt-6 max-w-2xl space-y-4 text-center text-lg text-slate-600">
            {ABOUT.paragraphs.map((p) => <p key={p}>{p}</p>)}
          </div>
          <dl className="mx-auto mt-12 grid max-w-3xl grid-cols-3 gap-4">
            {ABOUT.stats.map((s) => (
              <div key={s.label} className="rounded-2xl bg-slate-50 p-5 text-center">
                <dt className="sr-only">{s.label}</dt>
                <dd className="font-display text-2xl font-bold text-gradient sm:text-3xl">{s.value}</dd>
                <dd className="mt-1 text-xs text-slate-500 sm:text-sm">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <footer className="bg-navy-950 py-10 text-center text-sm text-slate-400">
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
