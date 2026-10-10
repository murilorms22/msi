import { useId } from 'react'

interface SwooshProps {
  className?: string
}

/**
 * Faixa de luz ondulada (inspirada na imagem de referência): fita ciano com brilho
 * sobre azul. Desenhada em SVG para ficar nítida em qualquer tela.
 */
export function Swoosh({ className = '' }: SwooshProps) {
  const uid = useId().replace(/:/g, '')
  const grad = `swoosh-grad-${uid}`
  const blurSoft = `swoosh-blur-soft-${uid}`
  const blurTight = `swoosh-blur-tight-${uid}`

  // Curva em "S": desce pela esquerda, curva forte no centro-direita e sobe no fim.
  const main = 'M70 0 C190 8 262 90 268 190 C274 268 322 300 363 232'
  const alt1 = 'M96 0 C206 14 276 92 282 188 C288 262 326 290 363 246'
  const alt2 = 'M44 4 C176 4 250 96 254 192 C258 276 306 312 363 220'

  return (
    <svg
      viewBox="0 0 363 345"
      fill="none"
      aria-hidden="true"
      className={`pointer-events-none select-none [mask-image:linear-gradient(to_bottom,transparent_0%,black_28%)] ${className}`}
    >
      <defs>
        <linearGradient id={grad} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#0081fe" />
          <stop offset="0.45" stopColor="#00fbfe" />
          <stop offset="0.7" stopColor="#ffffff" />
          <stop offset="1" stopColor="#00fbfe" />
        </linearGradient>
        <filter id={blurSoft} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="14" />
        </filter>
        <filter id={blurTight} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="2.5" />
        </filter>
      </defs>

      {/* Halo difuso */}
      <path d={main} stroke="#0081fe" strokeWidth="46" strokeLinecap="round" opacity="0.55" filter={`url(#${blurSoft})`} />
      <path d={alt2} stroke="#00fbfe" strokeWidth="18" strokeLinecap="round" opacity="0.35" filter={`url(#${blurSoft})`} />

      {/* Fitas secundárias */}
      <path d={alt1} stroke={`url(#${grad})`} strokeWidth="5" strokeLinecap="round" opacity="0.55" filter={`url(#${blurTight})`} />
      <path d={alt2} stroke="#00fbfe" strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />

      {/* Fita principal */}
      <path d={main} stroke={`url(#${grad})`} strokeWidth="9" strokeLinecap="round" opacity="0.9" filter={`url(#${blurTight})`} />
      <path d={main} stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" opacity="0.95" />
    </svg>
  )
}
