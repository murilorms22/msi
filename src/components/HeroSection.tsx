import { ArrowRight, CheckCircle2, Cpu, GraduationCap, Headphones, Headset, MonitorSmartphone, ShieldCheck, Wrench } from 'lucide-react'
import heroImage from '../assets/hero-workbench.jpg'
import { COMPANY, HERO, IMAGES, WHATSAPP_LINKS, type TrustItemIcon } from '../data/content'
import { ImageSlot } from './ImageSlot'
import { WhatsAppIcon } from './icons/WhatsAppIcon'

const TRUST_ICONS: Record<TrustItemIcon, typeof Wrench> = {
  wrench: Wrench,
  headphones: Headphones,
  shield: ShieldCheck,
  school: GraduationCap,
}

const TRUST_ITEM_MOBILE_ORDER: Record<TrustItemIcon, string> = {
  wrench: 'order-1 sm:order-none',
  shield: 'order-2 sm:order-none',
  headphones: 'order-3 sm:order-none',
  school: 'order-4 sm:order-none',
}

export function HeroSection() {
  const [before, after] = HERO.title.split(HERO.highlight)

  return (
    <section id="inicio" className="relative pb-14 pt-28 sm:pt-36 lg:pb-20 lg:pt-38">
      {/* Fundo decorativo sutil com grid em azul claro */}
      <div className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black_40%,transparent_80%)]" />
      <div className="pointer-events-none absolute -top-40 right-0 h-[24rem] w-[24rem] rounded-full bg-brand-500/15 blur-3xl sm:h-[32rem] sm:w-[32rem]" />
      <div className="pointer-events-none absolute -left-32 top-1/3 h-[24rem] w-[24rem] rounded-full bg-brand-400/10 blur-3xl" />

      {/* Grid Principal do Hero: texto com mais espaço à esquerda e bancada mais compacta à direita */}
      <div className="container-page relative grid items-center gap-10 lg:grid-cols-[1.25fr_0.85fr] lg:gap-12">
        {/* Coluna de Texto e Ações */}
        <div className="animate-fade-up min-w-0">
          <span
            id="hero-badge"
            className="inline-flex items-center border-l-2 border-brand-500 pl-3 text-xs font-semibold tracking-wide text-brand-600 sm:text-sm"
          >
            {HERO.badge}
          </span>

          <h1 className="mt-5 text-[1.95rem] font-medium leading-[1.14] text-navy-950 min-[400px]:text-4xl sm:text-5xl lg:text-[3.25rem] lg:leading-[1.1]">
            {before}
            <span className="text-gradient font-bold">{HERO.highlight}</span>
            {after}
          </h1>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
            {HERO.subtitle}
          </p>

          {/* Botões lado a lado sem quebra de texto */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <a
              href={WHATSAPP_LINKS.default}
              target="_blank"
              rel="noopener noreferrer"
              id="hero-cta-whatsapp"
              className="btn-primary group whitespace-nowrap px-6 py-3.5 text-base sm:py-4"
            >
              <WhatsAppIcon className="h-5 w-5 shrink-0" />
              <span>{HERO.primaryCta}</span>
              <ArrowRight className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a
              href="#suporte-remoto"
              id="hero-cta-remote"
              className="btn-outline whitespace-nowrap px-6 py-3.5 text-base sm:py-4"
            >
              <Headset className="h-5 w-5 shrink-0 text-brand-600" />
              <span>{HERO.secondaryCta}</span>
            </a>
          </div>
        </div>

        {/* Coluna Visual - Card msi://bancada-tecnica na medida certa, sem espremer o texto */}
        <div className="animate-fade-up relative mx-auto w-full max-w-md lg:max-w-[420px] lg:ml-auto [animation-delay:150ms]">
          <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-brand-500/20 via-transparent to-brand-400/20 blur-2xl" />

          <div className="relative overflow-hidden rounded-[1.5rem] border border-navy-800 bg-navy-900 p-2 shadow-2xl shadow-brand-500/20">
            {/* Barra estilo janela */}
            <div className="flex items-center justify-between px-3 py-2.5 sm:px-4">
              <div className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-rose-400/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
              </div>
              <span className="font-mono text-[11px] text-slate-300">msi://bancada-tecnica</span>
              <span className="w-8" />
            </div>

            <div className="relative overflow-hidden rounded-xl">
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
              <div className="absolute inset-x-3 bottom-3 rounded-xl border border-white/15 bg-navy-950/80 p-3 text-white backdrop-blur-md">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-semibold uppercase tracking-wider text-brand-400">Diagnóstico em andamento</span>
                  <span className="font-mono text-white">87%</span>
                </div>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/15">
                  <div className="h-full w-[87%] rounded-full bg-gradient-to-r from-brand-500 to-brand-400" />
                </div>
                <div className="mt-2.5 grid grid-cols-3 gap-1.5 text-[10px] text-white">
                  <span className="flex items-center gap-1"><CheckCircle2 className="h-3 w-3 text-brand-400" /> SSD</span>
                  <span className="flex items-center gap-1"><CheckCircle2 className="h-3 w-3 text-brand-400" /> RAM</span>
                  <span className="flex items-center gap-1"><Cpu className="h-3 w-3 text-brand-400" /> Térmica</span>
                </div>
              </div>
            </div>
          </div>

          {/* Cards flutuantes com linguagem acessível */}
          <div className="absolute -left-4 top-12 hidden animate-float items-center gap-2.5 rounded-xl border border-navy-700 bg-navy-900/95 p-2.5 pr-4 shadow-xl shadow-black/25 backdrop-blur sm:flex lg:-left-8">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand-500/25 text-brand-400">
              <MonitorSmartphone className="h-4.5 w-4.5" />
            </span>
            <span className="leading-tight">
              <span className="block text-xs font-semibold text-white">Suporte Remoto</span>
              <span className="text-[11px] text-brand-400">via {COMPANY.remoteTool}</span>
            </span>
          </div>

          <div className="absolute -right-2 top-28 hidden animate-float items-center gap-2.5 rounded-xl border border-navy-700 bg-navy-900/95 p-2.5 pr-4 shadow-xl shadow-black/25 backdrop-blur [animation-delay:1.5s] sm:flex lg:-right-4">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-emerald-500/20 text-emerald-400">
              <ShieldCheck className="h-4.5 w-4.5" />
            </span>
            <span className="leading-tight">
              <span className="block text-xs font-semibold text-white">Câmeras & Redes</span>
              <span className="text-[11px] text-slate-300">{COMPANY.region}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Faixa Centralizada de Diferenciais: lado a lado, ícones maiores, sem emojis, separados por pipe */}
      <div className="container-page mt-12 sm:mt-16 pt-8">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 md:gap-10 text-center">
          {HERO.trustItems.map((item, idx) => {
            const Icon = TRUST_ICONS[item.icon]
            return (
              <div
                key={item.label}
                className={`flex items-center gap-4 sm:gap-6 md:gap-10 ${TRUST_ITEM_MOBILE_ORDER[item.icon]}`}
              >
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-50 text-brand-600 shadow-2xs">
                    <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                  </span>
                  <span className="text-sm font-semibold text-navy-950 sm:text-base">
                    {item.label}
                  </span>
                </div>
                {idx < HERO.trustItems.length - 1 && (
                  <span
                    className="hidden sm:inline text-slate-300 font-light text-xl select-none"
                    aria-hidden="true"
                  >
                    |
                  </span>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
