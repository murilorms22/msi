/** GET /api/banner-image/:id — serve a imagem do banner armazenada no KV. */
export async function onRequestGet({ params, env }) {
  const id = String(params.id || '')
  if (!env.BANNERS || !/^[0-9a-f-]{36}$/i.test(id)) return new Response('Not found', { status: 404 })

  const { value, metadata } = await env.BANNERS.getWithMetadata(`img:${id}`, 'arrayBuffer')
  if (!value) return new Response('Not found', { status: 404 })

  return new Response(value, {
    headers: {
      'Content-Type': metadata?.type || 'image/jpeg',
      'Cache-Control': 'public, max-age=31536000, immutable',
      'X-Content-Type-Options': 'nosniff',
    },
  })
}
