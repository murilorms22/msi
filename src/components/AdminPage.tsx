import { useEffect, useRef, useState, type FormEvent } from 'react'
import {
  ArrowDown,
  ArrowUp,
  ImagePlus,
  Info,
  Loader2,
  Lock,
  LogOut,
  Minus,
  Plus,
  Save,
  Trash2,
} from 'lucide-react'
import {
  BANNER_SPEC,
  checkSession,
  fetchBanners,
  login,
  logout,
  prepareBannerImage,
  saveBanners,
  uploadBanner,
  type BannerItem,
} from '../lib/bannersApi'

const shell = 'min-h-screen bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800 px-4 py-10 text-white'
const card = 'rounded-2xl border border-white/15 bg-navy-950/60 p-5 shadow-2xl backdrop-blur sm:p-6'
const input =
  'w-full rounded-xl border border-white/15 bg-navy-900 px-4 py-3 text-white outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-400/30'

function LoginForm({ onDone }: { onDone: () => void }) {
  const [user, setUser] = useState('')
  const [pass, setPass] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    setBusy(true)
    setError('')
    try {
      await login(user, pass)
      setPass('')
      onDone()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Falha ao entrar.')
      setPass('')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className={`${shell} grid place-items-center`}>
      <form onSubmit={submit} className={`${card} w-full max-w-sm`} autoComplete="off">
        <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand-500/20 text-brand-400">
          <Lock className="h-6 w-6" />
        </span>
        <h1 className="mt-4 text-2xl font-bold">Acesso restrito</h1>
        <p className="mt-1 text-sm text-slate-300">Painel de banners da MSI</p>

        <label htmlFor="admin-user" className="mt-6 block text-sm font-medium text-slate-200">
          Usuário
        </label>
        <input
          id="admin-user"
          className={`${input} mt-1.5`}
          value={user}
          onChange={(e) => setUser(e.target.value)}
          autoComplete="off"
          autoCapitalize="none"
          spellCheck={false}
          required
        />
        <label htmlFor="admin-pass" className="mt-4 block text-sm font-medium text-slate-200">
          Senha
        </label>
        <input
          id="admin-pass"
          type="password"
          className={`${input} mt-1.5`}
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          autoComplete="off"
          required
        />

        {error && (
          <p role="alert" className="mt-4 rounded-lg bg-rose-500/15 px-3 py-2 text-sm text-rose-200">
            {error}
          </p>
        )}

        <button id="admin-login-submit" type="submit" disabled={busy} className="btn-primary mt-6 w-full px-6 py-3.5 disabled:opacity-60">
          {busy ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Entrar'}
        </button>
      </form>
    </div>
  )
}

function Panel({ onLogout }: { onLogout: () => void }) {
  const [items, setItems] = useState<BannerItem[]>([])
  const [loading, setLoading] = useState(true)
  const [dirty, setDirty] = useState(false)
  const [busy, setBusy] = useState(false)
  const [msg, setMsg] = useState<{ type: 'ok' | 'err' | 'info'; text: string } | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    fetchBanners().then((list) => {
      setItems(list)
      setLoading(false)
    })
  }, [])

  const update = (next: BannerItem[]) => {
    setItems(next)
    setDirty(true)
    setMsg(null)
  }

  const move = (i: number, dir: -1 | 1) => {
    const j = i + dir
    if (j < 0 || j >= items.length) return
    const next = [...items]
    ;[next[i], next[j]] = [next[j], next[i]]
    update(next)
  }

  const setSeconds = (i: number, value: number) => {
    const s = Math.min(BANNER_SPEC.maxSeconds, Math.max(BANNER_SPEC.minSeconds, Math.round(value) || BANNER_SPEC.minSeconds))
    update(items.map((b, k) => (k === i ? { ...b, seconds: s } : b)))
  }

  const remove = (i: number) => {
    if (window.confirm('Remover este banner? A remoção é definitiva após salvar.')) {
      update(items.filter((_, k) => k !== i))
    }
  }

  const onFile = async (file?: File) => {
    if (!file) return
    setMsg(null)
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      setMsg({ type: 'err', text: 'Formato inválido. Use JPG, PNG ou WebP.' })
      return
    }
    setBusy(true)
    try {
      if (dirty) await saveBanners(items) // mantém a ordem atual antes de adicionar
      const { blob, wasCropped, srcW, srcH } = await prepareBannerImage(file)
      if (blob.size > BANNER_SPEC.maxFileMB * 1024 * 1024) throw new Error(`Imagem acima de ${BANNER_SPEC.maxFileMB} MB.`)
      setItems(await uploadBanner(blob))
      setDirty(false)
      const small = srcW < BANNER_SPEC.minWidth || srcH < BANNER_SPEC.minHeight
      setMsg({
        type: small || wasCropped ? 'info' : 'ok',
        text: [
          'Banner adicionado.',
          wasCropped ? `A imagem (${srcW}×${srcH}) não era 3:1 e foi recortada ao centro.` : '',
          small ? `Resolução baixa (${srcW}×${srcH}): pode ficar embaçada. Prefira ${BANNER_SPEC.width}×${BANNER_SPEC.height}.` : '',
        ]
          .filter(Boolean)
          .join(' '),
      })
    } catch (err) {
      setMsg({ type: 'err', text: err instanceof Error ? err.message : 'Falha no upload.' })
    } finally {
      setBusy(false)
      if (fileRef.current) fileRef.current.value = ''
    }
  }

  const save = async () => {
    setBusy(true)
    try {
      setItems(await saveBanners(items))
      setDirty(false)
      setMsg({ type: 'ok', text: 'Alterações salvas! O site já exibe a nova configuração.' })
    } catch (err) {
      setMsg({ type: 'err', text: err instanceof Error ? err.message : 'Falha ao salvar.' })
    } finally {
      setBusy(false)
    }
  }

  const tone = { ok: 'bg-emerald-500/15 text-emerald-200', err: 'bg-rose-500/15 text-rose-200', info: 'bg-amber-500/15 text-amber-100' }

  return (
    <div className={shell}>
      <div className="mx-auto max-w-4xl">
        <header className="flex items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold sm:text-3xl">Banners do site</h1>
            <p className="mt-1 text-sm text-slate-300">Adicione, remova, reordene e defina o tempo de cada banner.</p>
          </div>
          <button id="admin-logout" onClick={onLogout} className="btn-dark px-4 py-2.5 text-sm">
            <LogOut className="h-4 w-4" /> Sair
          </button>
        </header>

        <aside className={`${card} mt-6 border-brand-400/40`}>
          <h2 className="flex items-center gap-2 text-lg font-semibold text-brand-400">
            <Info className="h-5 w-5" /> Especificações da imagem
          </h2>
          <ul className="mt-3 grid gap-2 text-sm text-slate-200 sm:grid-cols-2">
            <li>
              <strong className="text-white">Proporção:</strong> {BANNER_SPEC.ratioLabel} (largura = 3× a altura)
            </li>
            <li>
              <strong className="text-white">Resolução ideal:</strong> {BANNER_SPEC.width} × {BANNER_SPEC.height} px
            </li>
            <li>
              <strong className="text-white">Mínimo:</strong> {BANNER_SPEC.minWidth} × {BANNER_SPEC.minHeight} px
            </li>
            <li>
              <strong className="text-white">Formatos / peso:</strong> JPG, PNG ou WebP · até {BANNER_SPEC.maxFileMB} MB
            </li>
          </ul>
          <p className="mt-3 text-xs text-slate-300">
            Imagens fora de 3:1 são recortadas ao centro automaticamente e ajustadas para {BANNER_SPEC.width}×{BANNER_SPEC.height}.
            Mantenha textos e logos longe das bordas para não serem cortados em telas de celular.
          </p>
        </aside>

        <div className={`${card} mt-6`}>
          <input ref={fileRef} id="admin-file" type="file" accept="image/jpeg,image/png,image/webp" className="sr-only" onChange={(e) => onFile(e.target.files?.[0])} />
          <button id="admin-add" type="button" disabled={busy} onClick={() => fileRef.current?.click()} className="btn-primary w-full px-6 py-4 disabled:opacity-60 sm:w-auto">
            {busy ? <Loader2 className="h-5 w-5 animate-spin" /> : <ImagePlus className="h-5 w-5" />} Adicionar imagem
          </button>

          {msg && (
            <p role="status" className={`mt-4 rounded-lg px-3 py-2 text-sm ${tone[msg.type]}`}>
              {msg.text}
            </p>
          )}

          {loading ? (
            <p className="mt-6 text-slate-300">Carregando…</p>
          ) : items.length === 0 ? (
            <p className="mt-6 rounded-xl border border-dashed border-white/20 p-8 text-center text-slate-300">
              Nenhum banner ainda. O carrossel só aparece no site quando houver ao menos uma imagem.
            </p>
          ) : (
            <ol className="mt-6 grid gap-4">
              {items.map((b, i) => (
                <li key={b.id} className="grid gap-3 rounded-xl border border-white/10 bg-navy-900/70 p-3 sm:grid-cols-[220px_1fr] sm:p-4">
                  <img src={b.url} alt={`Banner ${i + 1}`} className="aspect-[3/1] w-full rounded-lg object-cover" />
                  <div className="flex flex-col justify-between gap-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-semibold">Banner {i + 1}</span>
                      <div className="flex gap-1.5">
                        <button aria-label="Subir" disabled={i === 0 || busy} onClick={() => move(i, -1)} className="btn-dark h-9 w-9 disabled:opacity-30">
                          <ArrowUp className="h-4 w-4" />
                        </button>
                        <button aria-label="Descer" disabled={i === items.length - 1 || busy} onClick={() => move(i, 1)} className="btn-dark h-9 w-9 disabled:opacity-30">
                          <ArrowDown className="h-4 w-4" />
                        </button>
                        <button aria-label="Remover" disabled={busy} onClick={() => remove(i)} className="h-9 w-9 btn border border-rose-400/40 bg-rose-500/15 text-rose-200 hover:bg-rose-500/30">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-slate-300">Tempo na tela:</span>
                      <button aria-label="Diminuir segundos" onClick={() => setSeconds(i, b.seconds - 1)} className="btn-dark h-9 w-9">
                        <Minus className="h-4 w-4" />
                      </button>
                      <input
                        aria-label="Segundos"
                        type="number"
                        min={BANNER_SPEC.minSeconds}
                        max={BANNER_SPEC.maxSeconds}
                        value={b.seconds}
                        onChange={(e) => setSeconds(i, Number(e.target.value))}
                        className="w-16 rounded-lg border border-white/15 bg-navy-950 px-2 py-2 text-center text-white outline-none focus:border-brand-400"
                      />
                      <button aria-label="Aumentar segundos" onClick={() => setSeconds(i, b.seconds + 1)} className="btn-dark h-9 w-9">
                        <Plus className="h-4 w-4" />
                      </button>
                      <span className="text-slate-300">s</span>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          )}

          <button id="admin-save" type="button" disabled={!dirty || busy} onClick={save} className="btn-primary mt-6 w-full px-6 py-3.5 disabled:opacity-40 sm:w-auto">
            <Save className="h-5 w-5" /> Salvar alterações
          </button>
        </div>
      </div>
    </div>
  )
}

/** Página /admin — única função: gerenciar o carrossel de banners. */
export function AdminPage() {
  const [state, setState] = useState<'loading' | 'out' | 'in'>('loading')

  useEffect(() => {
    document.title = 'Admin | MSI'
    const meta = document.createElement('meta')
    meta.name = 'robots'
    meta.content = 'noindex,nofollow'
    document.head.appendChild(meta)
    checkSession().then((ok) => setState(ok ? 'in' : 'out'))
    return () => {
      meta.remove()
    }
  }, [])

  if (state === 'loading') return <div className={shell} />
  if (state === 'out') return <LoginForm onDone={() => setState('in')} />
  return (
    <Panel
      onLogout={async () => {
        await logout()
        setState('out')
      }}
    />
  )
}
