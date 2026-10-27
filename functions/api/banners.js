import { json, requireAdmin } from '../_lib/auth.js'

const CONFIG_KEY = 'config'
const MAX_FILE_BYTES = 3 * 1024 * 1024 // 3 MB por imagem
const MIN_SECONDS = 2
const MAX_SECONDS = 60
const DEFAULT_SECONDS = 5
const MAX_BANNERS = 15

async function readConfig(env) {
  const raw = await env.BANNERS.get(CONFIG_KEY)
  try {
    const parsed = raw ? JSON.parse(raw) : null
    return Array.isArray(parsed?.items) ? parsed : { items: [] }
  } catch {
    return { items: [] }
  }
}

const writeConfig = (env, config) => env.BANNERS.put(CONFIG_KEY, JSON.stringify(config))

const withUrls = (config) => ({
  items: config.items.map((i) => ({
    id: i.id,
    seconds: i.seconds,
    url: `/api/banner-image/${i.id}`,
  })),
})

/** GET /api/banners — lista pública de banners (ordem e tempo). */
export async function onRequestGet({ env }) {
  if (!env.BANNERS) return json({ items: [] })
  return json(withUrls(await readConfig(env)), 200, { 'Cache-Control': 'public, max-age=30' })
}

/** POST /api/banners — upload de nova imagem (somente admin). */
export async function onRequestPost({ request, env }) {
  const denied = await requireAdmin(request, env)
  if (denied) return denied

  const config = await readConfig(env)
  if (config.items.length >= MAX_BANNERS) {
    return json({ error: `Limite de ${MAX_BANNERS} banners atingido.` }, 400)
  }

  const form = await request.formData()
  const file = form.get('file')
  if (!file || typeof file === 'string') return json({ error: 'Arquivo ausente.' }, 400)
  if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
    return json({ error: 'Formato inválido. Use JPG, PNG ou WebP.' }, 400)
  }
  if (file.size > MAX_FILE_BYTES) {
    return json({ error: 'Imagem acima de 3 MB.' }, 400)
  }

  const id = crypto.randomUUID()
  await env.BANNERS.put(`img:${id}`, await file.arrayBuffer(), { metadata: { type: file.type } })
  config.items.push({ id, seconds: DEFAULT_SECONDS })
  await writeConfig(env, config)
  return json(withUrls(config), 201)
}

/**
 * PUT /api/banners — salva ordem e tempo. Também remove imagens que saíram da lista.
 * Corpo: { items: [{ id, seconds }] } (somente admin).
 */
export async function onRequestPut({ request, env }) {
  const denied = await requireAdmin(request, env)
  if (denied) return denied

  let body
  try {
    body = await request.json()
  } catch {
    return json({ error: 'Requisição inválida.' }, 400)
  }

  const current = await readConfig(env)
  const known = new Map(current.items.map((i) => [i.id, i]))
  const incoming = Array.isArray(body?.items) ? body.items : []

  const next = []
  const seen = new Set()
  for (const item of incoming) {
    if (!known.has(item?.id) || seen.has(item.id)) continue
    seen.add(item.id)
    const seconds = Math.min(MAX_SECONDS, Math.max(MIN_SECONDS, Math.round(Number(item.seconds) || DEFAULT_SECONDS)))
    next.push({ id: item.id, seconds })
  }

  await writeConfig(env, { items: next })
  await Promise.all(
    current.items.filter((i) => !seen.has(i.id)).map((i) => env.BANNERS.delete(`img:${i.id}`)),
  )
  return json(withUrls({ items: next }))
}
