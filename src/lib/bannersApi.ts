export interface BannerItem {
  id: string
  seconds: number
  url: string
}

/** Especificações das imagens (usadas no carrossel e exibidas no painel /admin). */
export const BANNER_SPEC = {
  ratioLabel: '3:1',
  width: 1800,
  height: 600,
  minWidth: 1500,
  minHeight: 500,
  maxFileMB: 3,
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
  form.append('file', file, 'banner.jpg')
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
 * Prepara a imagem para o carrossel: recorta ao centro na proporção 3:1 e
 * redimensiona para 1800×600, exportando em JPEG otimizado.
 */
export async function prepareBannerImage(file: File): Promise<{ blob: Blob; wasCropped: boolean; srcW: number; srcH: number }> {
  const bitmap = await createImageBitmap(file)
  const { width: srcW, height: srcH } = bitmap
  const target = BANNER_SPEC.width / BANNER_SPEC.height
  const ratio = srcW / srcH
  const wasCropped = Math.abs(ratio - target) / target > 0.02

  let sw = srcW
  let sh = srcH
  if (ratio > target) sw = Math.round(srcH * target)
  else if (ratio < target) sh = Math.round(srcW / target)
  const sx = Math.round((srcW - sw) / 2)
  const sy = Math.round((srcH - sh) / 2)

  const canvas = document.createElement('canvas')
  canvas.width = BANNER_SPEC.width
  canvas.height = BANNER_SPEC.height
  const ctx = canvas.getContext('2d')!
  ctx.imageSmoothingQuality = 'high'
  ctx.drawImage(bitmap, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height)
  bitmap.close()

  const blob = await new Promise<Blob>((resolve, reject) =>
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error('Falha ao processar a imagem.'))), 'image/jpeg', 0.85),
  )
  return { blob, wasCropped, srcW, srcH }
}
