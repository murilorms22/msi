import { useCallback, useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { fetchBanners, type BannerItem } from '../lib/bannersApi'

/** Carrossel de banners 3:1 em largura total. Não renderiza nada se não houver imagens. */
export function BannerCarousel() {
  const [items, setItems] = useState<BannerItem[]>([])
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const touchX = useRef<number | null>(null)

  useEffect(() => {
    let alive = true
    fetchBanners().then((list) => alive && setItems(list))
    return () => {
      alive = false
    }
  }, [])

  const count = items.length
  const go = useCallback((n: number) => setIndex(count ? (n + count) % count : 0), [count])

  // Avança sozinho respeitando os segundos configurados para cada banner
  useEffect(() => {
    if (count < 2 || paused) return
    const seconds = items[index]?.seconds ?? 5
    const t = window.setTimeout(() => go(index + 1), seconds * 1000)
    return () => window.clearTimeout(t)
  }, [count, paused, index, items, go])

  if (!count) return null

  return (
    <section
      id="banners"
      aria-roledescription="carrossel"
      aria-label="Destaques"
      className="relative w-full bg-navy-950"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return
        const dx = e.changedTouches[0].clientX - touchX.current
        if (Math.abs(dx) > 40) go(index + (dx < 0 ? 1 : -1))
        touchX.current = null
      }}
    >
      <div className="relative aspect-[3/1] w-full overflow-hidden">
        {items.map((b, i) => (
          <img
            key={b.id}
            src={b.url}
            alt={`Banner ${i + 1} de ${count}`}
            width={1800}
            height={600}
            loading={i === 0 ? 'eager' : 'lazy'}
            decoding="async"
            aria-hidden={i !== index}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
              i === index ? 'opacity-100' : 'pointer-events-none opacity-0'
            }`}
          />
        ))}

        {count > 1 && (
          <>
            <button
              type="button"
              id="banner-prev"
              aria-label="Banner anterior"
              onClick={() => go(index - 1)}
              className="absolute left-2 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-navy-950/60 text-white backdrop-blur transition hover:bg-navy-950/85 sm:left-4 sm:h-11 sm:w-11"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              id="banner-next"
              aria-label="Próximo banner"
              onClick={() => go(index + 1)}
              className="absolute right-2 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-navy-950/60 text-white backdrop-blur transition hover:bg-navy-950/85 sm:right-4 sm:h-11 sm:w-11"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
            <div className="absolute inset-x-0 bottom-2 flex justify-center gap-1.5 sm:bottom-3">
              {items.map((b, i) => (
                <button
                  key={b.id}
                  type="button"
                  aria-label={`Ir para o banner ${i + 1}`}
                  aria-current={i === index}
                  onClick={() => go(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === index ? 'w-6 bg-brand-400' : 'w-1.5 bg-white/60 hover:bg-white'
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  )
}
