/**
 * Fonte única de verdade para os dados da MSI Soluções em Informática.
 * Altere textos, contatos e serviços aqui — os componentes apenas consomem.
 */

export const WHATSAPP_NUMBER = '5553999777050'
export const WHATSAPP_DEFAULT_MESSAGE =
  'Olá, Vitor! Vim pelo site da MSI e gostaria de um orçamento'

/** Gera um link wa.me com mensagem pré-definida (codificada com segurança). */
export const buildWhatsAppLink = (message: string = WHATSAPP_DEFAULT_MESSAGE): string =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`

export const WHATSAPP_LINKS = {
  default: buildWhatsAppLink(),
  remoteSupport: buildWhatsAppLink(
    'Olá, Vitor! Vim pelo site da MSI e preciso de suporte remoto via AnyDesk',
  ),
  security: buildWhatsAppLink(
    'Olá, Vitor! Vim pelo site da MSI e gostaria de um orçamento de câmeras / CFTV',
  ),
} as const

export const COMPANY = {
  name: 'MSI',
  fullName: 'MSI Soluções em Informática',
  tagline: 'Soluções em Informática',
  technician: 'Vitor H. A. Angelo',
  phoneDisplay: '(53) 99977-7050',
  phoneHref: 'tel:+5553999777050',
  region: 'Pelotas e Região',
  remoteTool: 'AnyDesk',
} as const

export interface NavLink {
  label: string
  href: `#${string}`
}

export const NAV_LINKS: NavLink[] = [
  { label: 'Serviços', href: '#servicos' },
  { label: 'Suporte Remoto', href: '#suporte-remoto' },
  { label: 'Segurança', href: '#seguranca' },
  { label: 'Sobre', href: '#sobre' },
]

export const HERO = {
  badge: '⚡ Atendimento Técnico Especializado em Pelotas e Região | Suporte Remoto',
  title: 'Tecnologia, Manutenção e Segurança Completa para Seus Equipamentos e Sua Empresa.',
  highlight: 'Segurança Completa',
  subtitle:
    'Conserto e upgrade de notebooks e computadores, suporte remoto ágil via AnyDesk e instalação de sistemas de câmeras e redes. Diagnóstico transparente e sem burocracia.',
  primaryCta: 'Solicitar Orçamento no WhatsApp',
  secondaryCta: 'Preciso de Suporte Remoto',
  trustPills: [
    { emoji: '🛠️', label: 'Diagnóstico Preciso' },
    { emoji: '💻', label: 'Atendimento Remoto sem Sair de Casa' },
    { emoji: '🔒', label: 'Segurança e CFTV Predial' },
  ],
} as const

export type ServiceIcon = 'laptop' | 'cpu' | 'monitor' | 'camera' | 'network' | 'shield'

export interface Service {
  id: string
  icon: ServiceIcon
  title: string
  description: string
  bullets: string[]
}

export const SERVICES: Service[] = [
  {
    id: 'manutencao-notebooks',
    icon: 'laptop',
    title: 'Conserto de Notebooks',
    description: 'Reparo de placa, tela, teclado, carcaça e conector de carga com peças de qualidade.',
    bullets: ['Troca de tela e teclado', 'Reparo de dobradiças', 'Limpeza e pasta térmica'],
  },
  {
    id: 'upgrade-computadores',
    icon: 'cpu',
    title: 'Upgrade e Montagem de PCs',
    description: 'Mais desempenho com SSD, memória RAM e montagem de computadores sob medida.',
    bullets: ['Instalação de SSD/NVMe', 'Upgrade de memória', 'PCs gamer e de escritório'],
  },
  {
    id: 'suporte-remoto',
    icon: 'monitor',
    title: 'Suporte Remoto (AnyDesk)',
    description: 'Resolução de problemas de software à distância, com segurança e agilidade.',
    bullets: ['Formatação e otimização', 'Remoção de vírus', 'Instalação de programas'],
  },
  {
    id: 'cftv',
    icon: 'camera',
    title: 'Câmeras e CFTV',
    description: 'Projeto e instalação de câmeras para residências, comércios e condomínios.',
    bullets: ['Acesso pelo celular', 'Gravação em DVR/NVR', 'CFTV predial'],
  },
  {
    id: 'redes',
    icon: 'network',
    title: 'Redes e Wi-Fi',
    description: 'Cabeamento estruturado e Wi-Fi estável para casa e empresa.',
    bullets: ['Cabeamento e racks', 'Roteadores e repetidores', 'Cobertura sem pontos cegos'],
  },
  {
    id: 'seguranca-dados',
    icon: 'shield',
    title: 'Backup e Segurança Digital',
    description: 'Proteção dos seus dados com rotinas de backup e boas práticas de segurança.',
    bullets: ['Backup em nuvem e local', 'Recuperação de arquivos', 'Antivírus profissional'],
  },
]

export const REMOTE_SUPPORT_STEPS = [
  { title: 'Chame no WhatsApp', description: 'Descreva o problema em poucas palavras.' },
  { title: 'Abra o AnyDesk', description: 'Envie o código de acesso — leva menos de 1 minuto.' },
  { title: 'Problema resolvido', description: 'Você acompanha tudo na tela, com total transparência.' },
] as const

export const SECURITY_FEATURES = [
  'Câmeras Full HD com visão noturna',
  'Monitoramento em tempo real pelo celular',
  'Instalação limpa e organizada',
  'Projetos para casas, lojas e condomínios',
] as const

export const ABOUT = {
  title: 'Atendimento direto com o técnico',
  paragraphs: [
    'Na MSI você fala diretamente com Vitor H. A. Angelo, técnico responsável por cada diagnóstico e serviço.',
    'Sem intermediários, sem letras miúdas: explicamos o problema, apresentamos o orçamento e só executamos com a sua aprovação.',
  ],
  stats: [
    { value: '100%', label: 'Diagnóstico transparente' },
    { value: 'Remoto', label: 'ou presencial' },
    { value: 'Pelotas', label: 'e região' },
  ],
} as const
