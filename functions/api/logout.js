import { clearSessionCookie, json } from '../_lib/auth.js'

/** POST /api/logout — encerra a sessão do painel. */
export async function onRequestPost() {
  return json({ ok: true }, 200, { 'Set-Cookie': clearSessionCookie() })
}
