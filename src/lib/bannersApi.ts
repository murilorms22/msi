export interface BannerItem {
  id: string
  seconds: number
  url: string
}

/** Especificações das imagens (usadas no carrossel e exibidas no painel /admin). */
export const BANNER_SPEC = {
  ratioLabel: '3:1',
  width: 2400,
  height: 800,
  minWidth: 1800,
  minHeight: 600,
  maxFileMB: 5,
  minSeconds: 2,
  maxSeconds: 60,
} as const

async function parse<T>(res: Response): Promise<T> {
  const data = await res.json().catch(() => null)
  if (!res.ok) throw new Error((data as { error?: string } | null)?.error ?? 'Erro na requisição.')
  return data as T
}

/** Lista pública. Retorna [] se a API não existir (ex.: dev local sem Functions). */
export async function fetchBanners(): Promise<BannerItem[]> {
  try {
    const res = await fetch('/api/banners', { headers: { Accept: 'application/json' } })
    if (!res.ok) return []
    const data = (await res.json()) as { items?: BannerItem[] }
    return Array.isArray(data.items) ? data.items : []
  } catch {
    return []
  }
}

export async function checkSession(): Promise<boolean> {
  try {
    const res = await fetch('/api/session')
    const data = (await res.json()) as { authenticated?: boolean }
    return Boolean(data.authenticated)
  } catch {
    return false
  }
}

export async function login(user: string, pass: string): Promise<void> {
  await parse(
    await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user, pass }),
    }),
  )
}

export async function logout(): Promise<void> {
  await fetch('/api/logout', { method: 'POST' }).catch(() => undefined)
}

export async function uploadBanner(file: Blob): Promise<BannerItem[]> {
  const form = new FormData()
  const ext = file.type === 'image/webp' ? 'banner.webp' : 'banner.jpg'
  form.append('file', file, ext)
  const data = await parse<{ items: BannerItem[] }>(
    await fetch('/api/banners', { method: 'POST', body: form }),
  )
  return data.items
}

export async function saveBanners(items: Pick<BannerItem, 'id' | 'seconds'>[]): Promise<BannerItem[]> {
  const data = await parse<{ items: BannerItem[] }>(
    await fetch('/api/banners', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: items.map(({ id, seconds }) => ({ id, seconds })) }),
    }),
  )
  return data.items
}

/**
 * Prepara a imagem para o carrossel: recorta ao centro na proporção 3:1
 * mantendo alta resolução (até 2880×960) e qualidade visual máxima (0.92).
 */
export async function prepareBannerImage(file: File): Promise<{ blob: Blob; wasCropped: boolean; srcW: number; srcH: number }> {
  const bitmap = await createImageBitmap(file)
  const { width: srcW, height: srcH } = bitmap
  const targetRatio = 3
  const ratio = srcW / srcH
  const wasCropped = Math.abs(ratio - targetRatio) / targetRatio > 0.02

  let sw = srcW
  let sh = srcH
  if (ratio > targetRatio) sw = Math.round(srcH * targetRatio)
  else if (ratio < targetRatio) sh = Math.round(srcW / targetRatio)
  const sx = Math.round((srcW - sw) / 2)
  const sy = Math.round((srcH - sh) / 2)

  // Preserva resolução nativa alta se a imagem original tiver boa qualidade (até 2880px)
  const outW = Math.min(Math.max(sw, BANNER_SPEC.width), 2880)
  const outH = Math.round(outW / targetRatio)

  const canvas = document.createElement('canvas')
  canvas.width = outW
  canvas.height = outH
  const ctx = canvas.getContext('2d')!
  ctx.imageSmoothingEnabled = true
  ctx.imageSmoothingQuality = 'high'
  ctx.drawImage(bitmap, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height)
  bitmap.close()

  // Exporta em alta qualidade (0.92) evitando artefatos de compressão
  const format = file.type === 'image/png' || file.type === 'image/webp' ? 'image/webp' : 'image/jpeg'
  const blob = await new Promise<Blob>((resolve, reject) =>
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error('Falha ao processar a imagem.'))), format, 0.92),
  )
  return { blob, wasCropped, srcW, srcH }
}
