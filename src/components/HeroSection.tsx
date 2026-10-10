import { ArrowRight, CheckCircle2, Cpu, Headset, MonitorSmartphone, ShieldCheck } from 'lucide-react'
import heroImage from '../assets/hero-workbench.jpg'
import { COMPANY, HERO, IMAGES, WHATSAPP_LINKS } from '../data/content'
import { ImageSlot } from './ImageSlot'
import { WhatsAppIcon } from './icons/WhatsAppIcon'

export function HeroSection() {
  const [before, after] = HERO.title.split(HERO.highlight)

  return (
    <section id="inicio" className="relative pb-16 pt-28 sm:pt-36 lg:pb-28 lg:pt-40">
      {/* Fundo decorativo */}
      <div className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_75%)]" />
      <div className="pointer-events-none absolute -top-40 right-0 h-[24rem] w-[24rem] rounded-full bg-brand-500/30 blur-3xl sm:h-[32rem] sm:w-[32rem]" />

      <div className="container-page relative grid items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-12">
        {/* Texto */}
        <div className="animate-fade-up min-w-0">
          <span
            id="hero-badge"
            className="inline-flex max-w-full items-start gap-2.5 rounded-2xl border border-brand-400/40 bg-white/5 px-4 py-2.5 text-left text-xs font-semibold leading-snug text-white shadow-sm backdrop-blur sm:items-center sm:rounded-full sm:text-sm"
          >
            <span className="relative mt-1 flex h-2 w-2 shrink-0 sm:mt-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-400" />
            </span>
            <span>{HERO.badge}</span>
          </span>

          <h1 className="mt-6 text-[1.9rem] font-bold leading-[1.12] text-white min-[400px]:text-4xl sm:text-5xl lg:text-[3.4rem] lg:leading-[1.08]">
            {before}
            <span className="text-gradient">{HERO.highlight}</span>
            {after}
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-white sm:text-lg">{HERO.subtitle}</p>

          <div className="mt-8 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:items-center">
            <a
              href={WHATSAPP_LINKS.default}
              target="_blank"
              rel="noopener noreferrer"
              id="hero-cta-whatsapp"
              className="btn-primary group px-6 py-4 text-base sm:px-7"
            >
              <WhatsAppIcon className="h-5 w-5 shrink-0" />
              {HERO.primaryCta}
              <ArrowRight className="hidden h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1 min-[400px]:block" />
            </a>
            <a href="#suporte-remoto" id="hero-cta-remote" className="btn-outline px-6 py-4 text-base sm:px-7">
              <Headset className="h-5 w-5 shrink-0" />
              {HERO.secondaryCta}
            </a>
          </div>

          <ul className="mt-9 flex flex-wrap gap-2.5 sm:mt-10 sm:gap-3" aria-label="Diferenciais">
            {HERO.trustPills.map((pill) => (
              <li
                key={pill.label}
                className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-400/60"
              >
                <span aria-hidden="true">{pill.emoji}</span>
                {pill.label}
              </li>
            ))}
          </ul>
        </div>

        {/* Visual */}
        <div className="animate-fade-up relative mx-auto w-full max-w-xl [animation-delay:150ms] lg:max-w-none">
          <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-brand-500/40 via-transparent to-brand-400/30 blur-2xl" />

          <div className="relative overflow-hidden rounded-[1.75rem] border border-white/15 bg-navy-900 p-2 shadow-2xl shadow-brand-500/20">
            {/* Barra estilo janela */}
            <div className="flex items-center justify-between px-3 py-3 sm:px-4">
              <div className="flex gap-1.5">
                <span className="h-3 w-3 rounded-full bg-rose-400/80" />
                <span className="h-3 w-3 rounded-full bg-amber-400/80" />
                <span className="h-3 w-3 rounded-full bg-emerald-400/80" />
              </div>
              <span className="font-mono text-[11px] text-white sm:text-xs">msi://bancada-tecnica</span>
              <span className="w-8 sm:w-12" />
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
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/85 via-navy-950/10 to-transparent" />

              {/* Status de diagnóstico */}
              <div className="absolute inset-x-3 bottom-3 rounded-2xl border border-white/15 bg-navy-950/65 p-3 text-white backdrop-blur-md sm:inset-x-4 sm:bottom-4 sm:p-4">
                <div className="flex items-center justify-between text-[11px] sm:text-xs">
                  <span className="font-semibold uppercase tracking-wider text-brand-400">Diagnóstico em andamento</span>
                  <span className="font-mono text-white">87%</span>
                </div>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/15">
                  <div className="h-full w-[87%] rounded-full bg-gradient-to-r from-brand-500 to-brand-400" />
                </div>
                <div className="mt-3 grid grid-cols-3 gap-2 text-[11px] text-white">
                  <span className="flex items-center gap-1"><CheckCircle2 className="h-3.5 w-3.5 text-brand-400" /> SSD</span>
                  <span className="flex items-center gap-1"><CheckCircle2 className="h-3.5 w-3.5 text-brand-400" /> RAM</span>
                  <span className="flex items-center gap-1"><Cpu className="h-3.5 w-3.5 text-brand-400" /> Térmica</span>
                </div>
              </div>
            </div>
          </div>

          {/* Cards flutuantes */}
          <div className="absolute -left-4 top-16 hidden animate-float items-center gap-3 rounded-2xl border border-white/15 bg-navy-900/90 p-3 pr-5 shadow-xl backdrop-blur sm:flex lg:-left-10">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-500/25 text-brand-400">
              <MonitorSmartphone className="h-5 w-5" />
            </span>
            <span className="leading-tight">
              <span className="block text-sm font-semibold text-white">Suporte Remoto</span>
              <span className="text-xs text-white">via {COMPANY.remoteTool}</span>
            </span>
          </div>

          <div className="absolute -right-2 -top-5 hidden animate-float items-center gap-3 rounded-2xl border border-white/15 bg-navy-900/90 p-3 pr-5 shadow-xl backdrop-blur [animation-delay:1.5s] sm:flex lg:-right-6">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-400/20 text-brand-400">
              <ShieldCheck className="h-5 w-5" />
            </span>
            <span className="leading-tight">
              <span className="block text-sm font-semibold text-white">CFTV & Redes</span>
              <span className="text-xs text-white">{COMPANY.region}</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
