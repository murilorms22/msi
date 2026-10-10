import { useState, type ReactNode } from 'react'
import { ImageIcon } from 'lucide-react'

interface ImageSlotProps {
  /** Caminho em public/ (ex.: /images/vitor/bancada-pc.jpg). */
  src: string
  alt: string
  className?: string
  /** Imagem alternativa usada enquanto o arquivo real não existir. */
  fallbackSrc?: string
  /** Texto do placeholder (nome do arquivo esperado). */
  label?: string
  icon?: ReactNode
  width?: number
  height?: number
  priority?: boolean
}

/**
 * Exibe a imagem real de public/images/vitor/ e, se o arquivo ainda não existir,
 * mostra um placeholder limpo indicando qual arquivo deve ser adicionado.
 */
export function ImageSlot({
  src,
  alt,
  className = '',
  fallbackSrc,
  label,
  icon,
  width,
  height,
  priority = false,
}: ImageSlotProps) {
  const [current, setCurrent] = useState(src)
  const [failed, setFailed] = useState(false)

  const handleError = () => {
    if (fallbackSrc && current !== fallbackSrc) setCurrent(fallbackSrc)
    else setFailed(true)
  }

  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`relative grid place-items-center overflow-hidden bg-gradient-to-br from-navy-800 via-navy-900 to-navy-950 ${className}`}
      >
        <div className="bg-grid absolute inset-0 opacity-30" />
        <div className="relative flex flex-col items-center gap-3 px-6 text-center text-white">
          <span className="grid h-14 w-14 place-items-center rounded-2xl border border-brand-500/30 bg-brand-500/10 text-brand-400">
            {icon ?? <ImageIcon className="h-7 w-7" />}
          </span>
          <span className="font-mono text-xs text-white">{label ?? src.split('/').pop()}</span>
        </div>
      </div>
    )
  }

  return (
    <img
      src={current}
      alt={alt}
      className={className}
      width={width}
      height={height}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      fetchPriority={priority ? 'high' : 'auto'}
      onError={handleError}
    />
  )
}
