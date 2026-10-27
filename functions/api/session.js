import { isAuthenticated, json } from '../_lib/auth.js'

/** GET /api/session — informa se há sessão de admin válida. */
export async function onRequestGet({ request, env }) {
  return json({ authenticated: await isAuthenticated(request, env) })
}
