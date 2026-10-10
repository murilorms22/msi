import { Swoosh } from './Swoosh'

/**
 * Camada decorativa que cobre a página inteira (atrás do conteúdo) com fitas de luz
 * posicionadas nas laterais, alternando lados ao longo da rolagem.
 */
export function BackgroundDecor() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-0 overflow-hidden">
      {/* Brilhos de fundo */}
      <div className="absolute -left-40 top-[30%] h-[28rem] w-[28rem] rounded-full bg-brand-500/15 blur-3xl" />
      <div className="absolute -right-40 top-[62%] h-[30rem] w-[30rem] rounded-full bg-brand-400/10 blur-3xl" />

      <Swoosh className="absolute -right-24 top-[2%] w-[22rem] opacity-60 sm:-right-16 sm:w-[30rem] lg:-right-10 lg:w-[44rem] lg:opacity-80" />
      <Swoosh className="absolute -left-28 top-[24%] w-[20rem] -scale-x-100 opacity-35 sm:w-[28rem] lg:-left-16 lg:w-[40rem] lg:opacity-60" />
      <Swoosh className="absolute -right-28 top-[47%] w-[20rem] rotate-12 opacity-35 sm:w-[28rem] lg:w-[40rem] lg:opacity-55" />
      <Swoosh className="absolute -left-32 top-[70%] w-[20rem] -scale-x-100 -rotate-6 opacity-35 sm:w-[28rem] lg:w-[38rem] lg:opacity-55" />
      <Swoosh className="absolute -right-24 bottom-[2%] w-[18rem] -scale-y-100 opacity-30 sm:w-[26rem] lg:w-[36rem] lg:opacity-50" />
    </div>
  )
}
