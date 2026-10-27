import {
  Camera,
  Check,
  Cpu,
  ExternalLink,
  House,
  Laptop,
  Monitor,
  Network,
  Printer,
  Shield,
  Smartphone,
  UserRound,
  Wrench,
  type LucideIcon,
} from 'lucide-react'
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
  type SecurityFeatureIcon,
  type ServiceIcon,
} from '../data/content'
import { ImageSlot } from './ImageSlot'
import { SchoolSection } from './SchoolSection'
import { WhatsAppIcon } from './icons/WhatsAppIcon'

const ICONS: Record<ServiceIcon, LucideIcon> = {
  laptop: Laptop,
  cpu: Cpu,
  monitor: Monitor,
  camera: Camera,
  network: Network,
  shield: Shield,
}

const SECURITY_ICONS: Record<SecurityFeatureIcon, LucideIcon> = {
  smartphone: Smartphone,
  camera: Camera,
  house: House,
  wrench: Wrench,
}

function SectionHeading({ eyebrow, title, subtitle, onBlue = false }: {
  eyebrow: string
  title: string
  subtitle?: string
  onBlue?: boolean
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <span className={`text-sm font-semibold uppercase tracking-[0.18em] ${onBlue ? 'text-brand-400' : 'text-brand-600'}`}>
        {eyebrow}
      </span>
      <h2 className={`mt-3 text-2xl font-bold min-[400px]:text-3xl sm:text-4xl ${onBlue ? 'text-white' : 'text-navy-950'}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-4 text-base sm:text-lg ${onBlue ? 'text-blue-100' : 'text-slate-600'}`}>
          {subtitle}
        </p>
      )}
    </div>
  )
}

/** Seções-âncora (#servicos, #suporte-remoto, #seguranca, #sobre). */
export function AnchorSections() {
  return (
    <>
      {/* 1. SEÇÃO DE SERVIÇOS - Fundo limpo predominante */}
      <section id="servicos" className="border-t border-slate-100 bg-slate-50/50 py-16 sm:py-20 lg:py-28">
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
                  className="group flex flex-col rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-500/40 hover:shadow-xl hover:shadow-brand-500/10 sm:p-7"
                >
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-navy-900 text-brand-400 transition-colors duration-300 group-hover:bg-gradient-to-br group-hover:from-brand-600 group-hover:to-brand-400 group-hover:text-white">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 text-xl font-semibold text-navy-950">{s.title}</h3>
                  <p className="mt-2 text-slate-600">{s.description}</p>
                  <ul className="mt-4 space-y-2">
                    {s.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2 text-sm text-slate-700">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" /> {b}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={WHATSAPP_LINKS[s.topic]}
                    target="_blank"
                    rel="noopener noreferrer"
                    id={`service-cta-${s.id}`}
                    className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold text-brand-600 transition-colors hover:text-brand-500"
                  >
                    <WhatsAppIcon className="h-4 w-4" />
                    {s.cta}
                  </a>
                </article>
              )
            })}
          </div>

          {/* Destaque de Vendas - Card estilo azul de destaque */}
          <div
            id="vendas"
            className="relative mt-8 overflow-hidden rounded-3xl border border-brand-500/30 bg-gradient-to-br from-navy-950 via-navy-900 to-brand-600 p-6 shadow-2xl shadow-brand-500/15 sm:mt-10 sm:p-10 lg:p-12"
          >
            <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brand-400/25 blur-3xl" />
            <div className="relative grid items-center gap-8 lg:grid-cols-[1.4fr_1fr]">
              <div>
                <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-brand-400">
                  <Printer className="h-4 w-4" /> {SALES.eyebrow}
                </span>
                <h3 className="mt-3 text-2xl font-bold text-white sm:text-3xl">{SALES.title}</h3>
                <p className="mt-3 max-w-xl text-slate-200">{SALES.description}</p>
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
              <ul className="flex flex-wrap justify-center sm:justify-start lg:justify-end gap-2.5">
                {SALES.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-center text-sm font-medium text-white backdrop-blur"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SEÇÃO DE SUPORTE REMOTO - Seção com DESTAQUE AZUL vibrante */}
      <section id="suporte-remoto" className="relative overflow-hidden bg-gradient-to-br from-brand-600 via-brand-500 to-navy-950 py-16 text-white sm:py-20 lg:py-28">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_90%)]" />
        <div className="pointer-events-none absolute -right-32 top-0 h-96 w-96 rounded-full bg-brand-400/30 blur-3xl" />
        <div className="container-page relative">
          <SectionHeading
            onBlue
            eyebrow="Suporte Remoto"
            title={`Resolvido à distância via ${COMPANY.remoteTool}`}
            subtitle="Sem deslocamento e sem espera: atendimento seguro direto na sua tela."
          />
          <div className="mt-12 grid items-center gap-8 lg:mt-14 lg:grid-cols-2 lg:gap-10">
            <div className="flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-3xl border border-white/20 bg-white shadow-2xl shadow-navy-950/40">
              <ImageSlot
                src={IMAGES.remoteSupport}
                alt="Conexão de suporte remoto via AnyDesk"
                label="suporte-anydesk.jpg"
                icon={<Monitor className="h-7 w-7 text-navy-900" />}
                className="h-full w-full object-contain"
              />
            </div>
            <ol className="grid gap-4">
              {REMOTE_SUPPORT_STEPS.map((step, i) => (
                <li key={step.title} className="flex gap-4 rounded-2xl border border-white/15 bg-navy-950/60 p-5 backdrop-blur sm:gap-5 sm:p-6">
                  <span className="font-display text-3xl font-bold text-gradient">0{i + 1}</span>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{step.title}</h3>
                    <p className="mt-1 text-slate-200">{step.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div className="mt-10 text-center sm:mt-12">
            <a href={WHATSAPP_LINKS.remoteSupport} target="_blank" rel="noopener noreferrer" id="remote-cta-whatsapp" className="btn-primary border border-white w-full px-10 py-4 sm:w-auto">
              <WhatsAppIcon className="h-5 w-5 shrink-0" /> Iniciar Suporte Remoto
            </a>
            <p className="mt-5 text-sm text-blue-100">
              Ainda não tem o AnyDesk?{' '}
              <a
                href={ANYDESK_URL}
                target="_blank"
                rel="noopener noreferrer"
                id="anydesk-download-link"
                className="inline-flex items-center gap-1 font-semibold text-brand-400 underline underline-offset-4 transition-colors hover:text-white"
              >
                Baixe o instalador oficial aqui <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* 3. SEÇÃO DE CÂMERAS E MONITORAMENTO - Fundo branco limpo */}
      <section id="seguranca" className="bg-white py-16 sm:py-20 lg:py-28">
        <div className="container-page grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
          <div>
            <span className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-600">Segurança & Monitoramento</span>
            <h2 className="mt-3 text-2xl font-bold text-navy-950 min-[400px]:text-3xl sm:text-4xl">Câmeras, monitoramento e redes para proteger o que importa</h2>
            <p className="mt-4 text-base text-slate-600 sm:text-lg">Projetos sob medida para residências, condomínios e comércios em {COMPANY.region}.</p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {SECURITY_FEATURES.map((feature) => {
                const Icon = SECURITY_ICONS[feature.icon]
                return (
                  <li
                    key={feature.text}
                    className="flex items-center sm:items-start gap-3 rounded-2xl border border-slate-200/90 bg-slate-50/70 p-4 shadow-sm transition-colors hover:border-brand-500/30"
                  >
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-brand-500/10 text-brand-600">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="text-sm font-medium text-navy-950">{feature.text}</span>
                  </li>
                )
              })}
            </ul>
            <a href={WHATSAPP_LINKS.security} target="_blank" rel="noopener noreferrer" id="security-cta-whatsapp" className="btn-primary mt-8 w-full px-7 py-4 sm:w-auto">
              <WhatsAppIcon className="h-5 w-5 shrink-0" /> Orçar Câmeras e Monitoramento
            </a>
          </div>
          <ImageSlot
            src={IMAGES.cctv}
            alt="Instalação de câmeras de segurança e monitoramento"
            label="instalacao--cftv.jpg"
            icon={<Camera className="h-7 w-7" />}
            className="aspect-[4/3] w-full rounded-3xl border border-slate-200 object-cover shadow-xl shadow-brand-500/10"
          />
        </div>
      </section>

      {/* 4. SEÇÃO DE ESCOLAS & INSTITUIÇÕES DE ENSINO */}
      <SchoolSection />

      {/* 5. SEÇÃO SOBRE - Fundo suave / clean */}
      <section id="sobre" className="border-t border-slate-200/80 bg-slate-50/70 py-16 sm:py-20 lg:py-28">
        <div className="container-page grid items-center gap-10 lg:grid-cols-[auto_1fr] lg:gap-12">
          <div className="flex flex-col items-center">
            <span className="mb-4 text-center text-sm font-semibold uppercase tracking-[0.18em] text-brand-600 lg:hidden">
              Sobre
            </span>
            <ImageSlot
              src={IMAGES.profile}
              alt={`${COMPANY.technician}, técnico responsável da MSI`}
              label="vitor-perfil.jpeg"
              icon={<UserRound className="h-7 w-7" />}
              className="mx-auto aspect-square w-56 rounded-3xl border border-slate-200/90 object-cover shadow-xl shadow-brand-500/10 sm:w-72"
            />
          </div>
          <div>
            <span className="hidden text-sm font-semibold uppercase tracking-[0.18em] text-brand-600 lg:inline-block">
              Sobre
            </span>
            <h2 className="mt-0 text-2xl font-bold text-navy-950 min-[400px]:text-3xl sm:text-4xl lg:mt-3">
              {ABOUT.title}
            </h2>
            <div className="mt-5 max-w-2xl space-y-4 text-base text-slate-600 sm:text-lg">
              {ABOUT.paragraphs.map((p) => <p key={p}>{p}</p>)}
            </div>
            <dl className="mt-8 grid max-w-xl grid-cols-3 gap-2 sm:gap-3">
              {ABOUT.stats.map((s) => (
                <div key={s.label} className="rounded-2xl border border-slate-200/90 bg-white p-3 text-center shadow-sm sm:p-4">
                  <dt className="sr-only">{s.label}</dt>
                  <dd className="font-display text-lg font-bold text-gradient sm:text-2xl">{s.value}</dd>
                  <dd className="mt-1 text-[11px] leading-tight text-slate-500 sm:text-xs">{s.label}</dd>
                </div>
              ))}
            </dl>
            <a
              href={WHATSAPP_LINKS.default}
              target="_blank"
              rel="noopener noreferrer"
              id="about-cta-whatsapp"
              className="btn-primary mt-8 w-full px-7 py-4 sm:w-auto"
            >
              <WhatsAppIcon className="h-5 w-5 shrink-0" /> Falar com o Técnico no WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-navy-900 bg-navy-950 py-10 text-center text-sm text-slate-400">
        <div className="container-page flex flex-col items-center">
          <div className="mb-4 flex items-center justify-center gap-2.5">
            <img
              src={IMAGES.logo}
              alt="MSI"
              className="h-9 w-auto object-contain drop-shadow-[0_0_12px_rgba(56,189,248,0.35)]"
            />
            <span className="font-display text-lg font-bold tracking-tight text-white">
              MSI<span className="text-brand-400">.</span>
            </span>
          </div>
          <p className="font-display text-base font-semibold text-white">{COMPANY.fullName}</p>
          <p className="mt-1">
            Técnico responsável: <span className="text-white">{COMPANY.technician}</span>
          </p>
          <p className="mt-1">
            <a href={COMPANY.phoneHref} className="text-brand-400 hover:underline">{COMPANY.phoneDisplay}</a>
          </p>
          <p className="mt-4 text-xs text-slate-500">© {new Date().getFullYear()} MSI. Todos os direitos reservados.</p>
        </div>
      </footer>
    </>
  )
}
