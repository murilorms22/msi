import { ArrowRight, CheckCircle2, Cpu, Headset, MonitorSmartphone, ShieldCheck } from 'lucide-react'
import heroImage from '../assets/hero-workbench.jpg'
import { COMPANY, HERO, IMAGES, WHATSAPP_LINKS } from '../data/content'
import { ImageSlot } from './ImageSlot'
import { WhatsAppIcon } from './icons/WhatsAppIcon'

export function HeroSection() {
  const [before, after] = HERO.title.split(HERO.highlight)

  return (
    <section id="inicio" className="relative overflow-hidden pb-20 pt-32 sm:pt-36 lg:pb-28 lg:pt-40">
      {/* Fundo decorativo */}
      <div className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_75%)]" />
      <div className="pointer-events-none absolute -right-40 -top-40 h-[32rem] w-[32rem] rounded-full bg-brand-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -left-40 top-1/2 h-[26rem] w-[26rem] rounded-full bg-brand-600/10 blur-3xl" />

      <div className="container-page relative grid items-center gap-14 lg:grid-cols-[1.1fr_1fr] lg:gap-12">
        {/* Texto */}
        <div className="animate-fade-up">
          <span
            id="hero-badge"
            className="inline-flex max-w-full items-center gap-2 rounded-full border border-brand-500/25 bg-white/80 px-4 py-2 text-xs font-semibold text-brand-600 shadow-sm backdrop-blur sm:text-sm"
          >
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-500 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-500" />
            </span>
            <span className="truncate sm:whitespace-normal">{HERO.badge}</span>
          </span>

          <h1 className="mt-6 text-4xl font-bold leading-[1.08] text-navy-900 sm:text-5xl lg:text-[3.4rem]">
            {before}
            <span className="text-gradient">{HERO.highlight}</span>
            {after}
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600">{HERO.subtitle}</p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href={WHATSAPP_LINKS.default}
              target="_blank"
              rel="noopener noreferrer"
              id="hero-cta-whatsapp"
              className="btn-primary group px-7 py-4 text-base"
            >
              <WhatsAppIcon className="h-5 w-5" />
              {HERO.primaryCta}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a href="#suporte-remoto" id="hero-cta-remote" className="btn-outline px-7 py-4 text-base">
              <Headset className="h-5 w-5" />
              {HERO.secondaryCta}
            </a>
          </div>

          <ul className="mt-10 flex flex-wrap gap-3" aria-label="Diferenciais">
            {HERO.trustPills.map((pill) => (
              <li
                key={pill.label}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-navy-800 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-500/40 hover:shadow-md"
              >
                <span aria-hidden="true">{pill.emoji}</span>
                {pill.label}
              </li>
            ))}
          </ul>
        </div>

        {/* Visual */}
        <div className="relative mx-auto w-full max-w-xl animate-fade-up [animation-delay:150ms] lg:max-w-none">
          <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-brand-500/30 via-transparent to-brand-600/30 blur-2xl" />

          <div className="relative overflow-hidden rounded-[1.75rem] border border-white/60 bg-navy-900 p-2 shadow-2xl shadow-navy-900/30">
            {/* Barra estilo janela */}
            <div className="flex items-center justify-between px-4 py-3">
              <div className="flex gap-1.5">
                <span className="h-3 w-3 rounded-full bg-rose-400/80" />
                <span className="h-3 w-3 rounded-full bg-amber-400/80" />
                <span className="h-3 w-3 rounded-full bg-emerald-400/80" />
              </div>
              <span className="font-mono text-xs text-slate-400">msi://bancada-tecnica</span>
              <span className="w-12" />
            </div>

            <div className="relative overflow-hidden rounded-2xl">
              <ImageSlot
                src={IMAGES.workbench}
                fallbackSrc={heroImage}
                alt="Bancada técnica da MSI com notebook aberto, memórias RAM e SSD durante manutenção"
                className="aspect-[4/3] w-full object-cover"
                width={1200}
                height={900}
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-navy-950/10 to-transparent" />

              {/* Status de diagnóstico */}
              <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-white/10 bg-navy-950/60 p-4 text-white backdrop-blur-md">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold uppercase tracking-wider text-brand-400">Diagnóstico em andamento</span>
                  <span className="font-mono text-slate-300">87%</span>
                </div>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
                  <div className="h-full w-[87%] rounded-full bg-gradient-to-r from-brand-500 to-brand-400" />
                </div>
                <div className="mt-3 grid grid-cols-3 gap-2 text-[11px] text-slate-300">
                  <span className="flex items-center gap-1"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> SSD</span>
                  <span className="flex items-center gap-1"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> RAM</span>
                  <span className="flex items-center gap-1"><Cpu className="h-3.5 w-3.5 text-brand-400" /> Térmica</span>
                </div>
              </div>
            </div>
          </div>

          {/* Cards flutuantes */}
          <div className="absolute -left-4 top-16 hidden animate-float items-center gap-3 rounded-2xl border border-slate-200 bg-white/95 p-3 pr-5 shadow-xl backdrop-blur sm:flex lg:-left-10">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-500/10 text-brand-600">
              <MonitorSmartphone className="h-5 w-5" />
            </span>
            <span className="leading-tight">
              <span className="block text-sm font-semibold text-navy-900">Suporte Remoto</span>
              <span className="text-xs text-slate-500">via {COMPANY.remoteTool}</span>
            </span>
          </div>

          <div className="absolute -right-4 -top-5 hidden animate-float items-center gap-3 rounded-2xl border border-slate-200 bg-white/95 p-3 pr-5 shadow-xl backdrop-blur [animation-delay:1.5s] sm:flex lg:-right-6">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-500/10 text-emerald-600">
              <ShieldCheck className="h-5 w-5" />
            </span>
            <span className="leading-tight">
              <span className="block text-sm font-semibold text-navy-900">CFTV & Redes</span>
              <span className="text-xs text-slate-500">{COMPANY.region}</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
