/**
 * Utilitários de autenticação do painel /admin (executam apenas no servidor Cloudflare).
 *
 * Usuário e senha NUNCA ficam no código: são lidos de variáveis secretas
 * (env.ADMIN_USER e env.ADMIN_PASS) configuradas no painel do Cloudflare.
 * A sessão é um cookie HttpOnly assinado com HMAC-SHA256.
 */

const enc = new TextEncoder()
export const COOKIE_NAME = 'msi_admin'
export const SESSION_SECONDS = 60 * 60 * 8 // 8 horas

const toHex = (buf) =>
  [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('')

async function sha256(text) {
  return new Uint8Array(await crypto.subtle.digest('SHA-256', enc.encode(text)))
}

/** Comparação em tempo constante (compara hashes de tamanho fixo). */
export async function safeEqual(a, b) {
  const [ha, hb] = await Promise.all([sha256(String(a)), sha256(String(b))])
  let diff = 0
  for (let i = 0; i < ha.length; i++) diff |= ha[i] ^ hb[i]
  return diff === 0
}

async function sign(env, payload) {
  const key = await crypto.subtle.importKey(
    'raw',
    enc.encode(`${env.ADMIN_USER}\u0000${env.ADMIN_PASS}`),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  )
  return toHex(await crypto.subtle.sign('HMAC', key, enc.encode(payload)))
}

export const isConfigured = (env) => Boolean(env.ADMIN_USER && env.ADMIN_PASS && env.BANNERS)

export async function createSessionCookie(env) {
  const exp = Math.floor(Date.now() / 1000) + SESSION_SECONDS
  const token = `${exp}.${await sign(env, String(exp))}`
  return `${COOKIE_NAME}=${token}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${SESSION_SECONDS}`
}

export const clearSessionCookie = () =>
  `${COOKIE_NAME}=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0`

function readCookie(request, name) {
  const header = request.headers.get('Cookie') || ''
  for (const part of header.split(';')) {
    const [k, ...v] = part.trim().split('=')
    if (k === name) return v.join('=')
  }
  return ''
}

export async function isAuthenticated(request, env) {
  if (!isConfigured(env)) return false
  const token = readCookie(request, COOKIE_NAME)
  const [exp, signature] = token.split('.')
  if (!exp || !signature || Number(exp) < Math.floor(Date.now() / 1000)) return false
  return safeEqual(signature, await sign(env, exp))
}

/** Bloqueia requisições de outras origens (proteção extra contra CSRF). */
export function sameOrigin(request) {
  const origin = request.headers.get('Origin')
  return !origin || origin === new URL(request.url).origin
}

export const json = (data, status = 200, headers = {}) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store', ...headers },
  })

/** Guarda reutilizável para rotas administrativas. Retorna Response de erro ou null. */
export async function requireAdmin(request, env) {
  if (!sameOrigin(request)) return json({ error: 'Origem inválida.' }, 403)
  if (!(await isAuthenticated(request, env))) return json({ error: 'Não autorizado.' }, 401)
  return null
}
