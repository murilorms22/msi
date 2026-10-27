import { createSessionCookie, isConfigured, json, safeEqual, sameOrigin } from '../_lib/auth.js'

const MAX_ATTEMPTS = 5
const WINDOW_SECONDS = 15 * 60

/** POST /api/login — valida usuário/senha no servidor, com limite de tentativas por IP. */
export async function onRequestPost({ request, env }) {
  if (!sameOrigin(request)) return json({ error: 'Origem inválida.' }, 403)
  if (!isConfigured(env)) return json({ error: 'Serviço indisponível.' }, 503)

  const ip = request.headers.get('CF-Connecting-IP') || 'unknown'
  const rlKey = `rl:${ip}`
  const attempts = Number((await env.BANNERS.get(rlKey)) || 0)
  if (attempts >= MAX_ATTEMPTS) {
    return json({ error: 'Muitas tentativas. Aguarde alguns minutos.' }, 429)
  }

  let body = {}
  try {
    body = await request.json()
  } catch {
    /* corpo inválido tratado como credenciais vazias */
  }

  const userOk = await safeEqual(body.user ?? '', env.ADMIN_USER)
  const passOk = await safeEqual(body.pass ?? '', env.ADMIN_PASS)

  if (!(userOk && passOk)) {
    await env.BANNERS.put(rlKey, String(attempts + 1), { expirationTtl: WINDOW_SECONDS })
    await new Promise((r) => setTimeout(r, 700))
    return json({ error: 'Usuário ou senha inválidos.' }, 401)
  }

  await env.BANNERS.delete(rlKey)
  return json({ ok: true }, 200, { 'Set-Cookie': await createSessionCookie(env) })
}
