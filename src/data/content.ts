/**
 * Fonte única de verdade para os dados da MSI Soluções em Informática.
 * Altere textos, contatos e serviços aqui — os componentes apenas consomem.
 */

export const WHATSAPP_NUMBER = '5553999777050'

/** Mensagens pré-definidas por contexto/seção (segmentação para maior conversão). */
export const WHATSAPP_MESSAGES = {
  default: 'Olá, Vitor! Vim pelo site da MSI e gostaria de um orçamento.',
  remoteSupport: 'Olá, Vitor! Preciso de suporte remoto urgente no meu computador.',
  hardware: 'Olá, Vitor! Gostaria de um diagnóstico para meu notebook/computador.',
  security: 'Olá, Vitor! Gostaria de um orçamento para instalação de câmeras e redes.',
  sales: 'Olá, Vitor! Gostaria de consultar equipamentos/toners disponíveis.',
} as const

export type WhatsAppTopic = keyof typeof WHATSAPP_MESSAGES

/** Gera um link wa.me com mensagem pré-definida (codificada com segurança). */
export const buildWhatsAppLink = (message: string = WHATSAPP_MESSAGES.default): string =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`

/** Link do WhatsApp para um tópico específico. */
export const getWhatsAppLink = (topic: WhatsAppTopic = 'default'): string =>
  buildWhatsAppLink(WHATSAPP_MESSAGES[topic])

export const WHATSAPP_LINKS: Record<WhatsAppTopic, string> = {
  default: getWhatsAppLink('default'),
  remoteSupport: getWhatsAppLink('remoteSupport'),
  hardware: getWhatsAppLink('hardware'),
  security: getWhatsAppLink('security'),
  sales: getWhatsAppLink('sales'),
}

/** Site oficial do AnyDesk (download do instalador). */
export const ANYDESK_URL = 'https://anydesk.com'

/**
 * Slots de imagem. Para trocar, basta salvar o arquivo com o mesmo nome em
 * public/images/vitor/ — enquanto não existir, um placeholder limpo é exibido.
 */
export const IMAGE_DIR = '/images/vitor'
export const IMAGES = {
  workbench: `${IMAGE_DIR}/bancada-pc.jpg`,
  remoteSupport: `${IMAGE_DIR}/suporte-anydesk.jpg`,
  cctv: `${IMAGE_DIR}/instalacao-cftv.jpg`,
  profile: `${IMAGE_DIR}/vitor-perfil.jpg`,
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
  { label: 'Escolas', href: '#escolas' },
  { label: 'Sobre', href: '#sobre' },
]

export type TrustItemIcon = 'wrench' | 'headphones' | 'shield' | 'school'

export interface TrustItem {
  icon: TrustItemIcon
  label: string
}

export const HERO = {
  badge: 'Manutenção Especializada, Suporte Remoto e Infraestrutura para Escolas e Empresas',
  title: 'Tecnologia, Manutenção e Segurança Completa para Seus Equipamentos e Sua Empresa.',
  highlight: 'Segurança Completa',
  subtitle:
    'Conserto e upgrade de notebooks e computadores, suporte remoto ágil via AnyDesk e instalação de sistemas de câmeras e redes. Diagnóstico transparente e sem burocracia.',
  primaryCta: 'Solicitar Orçamento',
  secondaryCta: 'Preciso de Suporte Remoto',
  trustItems: [
    { icon: 'wrench', label: 'Diagnóstico Preciso' },
    { icon: 'headphones', label: 'Atendimento Remoto sem Sair de Casa' },
    { icon: 'shield', label: 'Câmeras e Monitoramento' },
    { icon: 'school', label: 'Parceiro Tecnológico para Escolas da Região' },
  ] as TrustItem[],
} as const

export type ServiceIcon = 'laptop' | 'cpu' | 'monitor' | 'camera' | 'network' | 'shield'

export interface Service {
  id: string
  icon: ServiceIcon
  title: string
  description: string
  bullets: string[]
  /** Tópico da mensagem de WhatsApp usada no botão do card. */
  topic: WhatsAppTopic
  cta: string
}

export const SERVICES: Service[] = [
  {
    id: 'manutencao-notebooks',
    icon: 'laptop',
    title: 'Conserto de Notebooks',
    description: 'Reparo de placa, tela, teclado e conector de carga com peças de qualidade.',
    bullets: [
      'Recuperação de carcaças quebradas e dobradiças',
      'Análise avançada de placa-mãe',
      'Troca de tela e teclado',
      'Limpeza e pasta térmica',
    ],
    topic: 'hardware',
    cta: 'Pedir Diagnóstico',
  },
  {
    id: 'upgrade-computadores',
    icon: 'cpu',
    title: 'Upgrade e Montagem de PCs',
    description: 'Mais desempenho com SSD, memória RAM e montagem de computadores sob medida.',
    bullets: ['Instalação de SSD/NVMe', 'Upgrade de memória', 'PCs gamer e de escritório'],
    topic: 'hardware',
    cta: 'Pedir Diagnóstico',
  },
  {
    id: 'suporte-remoto',
    icon: 'monitor',
    title: 'Suporte Remoto (AnyDesk)',
    description: 'Resolução de problemas de software à distância, com segurança e agilidade.',
    bullets: ['Formatação e otimização', 'Remoção de vírus', 'Instalação de programas'],
    topic: 'remoteSupport',
    cta: 'Suporte Remoto Agora',
  },
  {
    id: 'cftv',
    icon: 'camera',
    title: 'Câmeras e Monitoramento',
    description: 'Instalação de câmeras com visualização fácil e segura direto no seu celular.',
    bullets: [
      'Projetos para casas, condomínios e empresas',
      'Acompanhe tudo pelo celular em tempo real',
      'Gravação contínua com visão noturna',
    ],
    topic: 'security',
    cta: 'Orçar Câmeras',
  },
  {
    id: 'redes',
    icon: 'network',
    title: 'Redes e Wi-Fi',
    description: 'Cabeamento estruturado e Wi-Fi estável para casa e empresa.',
    bullets: ['Cabeamento e racks', 'Roteadores e repetidores', 'Cobertura sem pontos cegos'],
    topic: 'security',
    cta: 'Orçar Rede',
  },
  {
    id: 'seguranca-dados',
    icon: 'shield',
    title: 'Backup e Segurança Digital',
    description: 'Proteção dos seus dados com rotinas de backup e boas práticas de segurança.',
    bullets: ['Backup em nuvem e local', 'Recuperação de arquivos', 'Antivírus profissional'],
    topic: 'default',
    cta: 'Pedir Orçamento',
  },
]

export const REMOTE_SUPPORT_STEPS = [
  { title: 'Chame no WhatsApp', description: 'Descreva o problema em poucas palavras.' },
  { title: 'Abra o AnyDesk', description: 'Envie o código de acesso — leva menos de 1 minuto.' },
  { title: 'Problema resolvido', description: 'Você acompanha tudo na tela, com total transparência.' },
] as const

export const SECURITY_FEATURES = [
  'Monitoramento em tempo real pelo celular',
  'Câmeras Full HD com visão noturna nítida',
  'Projetos para residências, condomínios e comércios',
  'Instalação limpa e organizada',
] as const

export const SALES = {
  eyebrow: 'Vendas e Suprimentos',
  title: 'Equipamentos e suprimentos para casa e escritório',
  description:
    'Computadores sob medida, PCs Gamer, impressoras, toners e suprimentos de escritório — consulte disponibilidade e preços direto com o técnico.',
  items: [
    'Computadores sob medida',
    'PCs Gamer',
    'Impressoras',
    'Toners',
    'Suprimentos de escritório',
  ],
  cta: 'Consultar Disponibilidade',
} as const

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
