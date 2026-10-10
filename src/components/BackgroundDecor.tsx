import { Swoosh } from './Swoosh'

/**
 * Camada decorativa que cobre a página inteira com fitas de luz nas laterais,
 * alternando lados ao longo da rolagem, em harmonia com o fundo clean.
 */
export function BackgroundDecor() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-0 overflow-hidden">
      {/* Brilhos suaves azuis */}
      <div className="absolute -left-40 top-[28%] h-[30rem] w-[30rem] rounded-full bg-brand-500/10 blur-3xl" />
      <div className="absolute -right-40 top-[58%] h-[32rem] w-[32rem] rounded-full bg-brand-400/10 blur-3xl" />

      {/* Fitas de luz inspiradas na arte técnica anexada */}
      <Swoosh className="absolute -right-24 top-[2%] w-[22rem] opacity-50 sm:-right-16 sm:w-[30rem] lg:-right-8 lg:w-[44rem] lg:opacity-75" />
      <Swoosh className="absolute -left-28 top-[24%] w-[20rem] -scale-x-100 opacity-30 sm:w-[28rem] lg:-left-16 lg:w-[40rem] lg:opacity-50" />
      <Swoosh className="absolute -right-28 top-[48%] w-[20rem] rotate-12 opacity-30 sm:w-[28rem] lg:w-[40rem] lg:opacity-45" />
      <Swoosh className="absolute -left-32 top-[70%] w-[20rem] -scale-x-100 -rotate-6 opacity-30 sm:w-[28rem] lg:w-[38rem] lg:opacity-50" />
      <Swoosh className="absolute -right-24 bottom-[2%] w-[18rem] -scale-y-100 opacity-25 sm:w-[26rem] lg:w-[36rem] lg:opacity-45" />
    </div>
  )
}
