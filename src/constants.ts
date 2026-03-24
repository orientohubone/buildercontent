export interface SlideData {
  id: string;
  number: string;
  title: string;
  subtitle?: string;
  content: string;
  example?: string;
  type: 'capa' | 'content' | 'comparison' | 'cta';
  accentText?: string;
}

export const SLIDES: SlideData[] = [
  {
    id: '01',
    number: '01',
    title: 'INOVAÇÃO DISRUPTIVA VS INCREMENTAL',
    subtitle: 'A matemática do valor 10x.',
    content: 'Onde o futuro é construído.',
    type: 'capa'
  },
  {
    id: '02',
    number: '02',
    title: 'INOVAÇÃO INCREMENTAL',
    subtitle: 'O Presente.',
    content: 'Foco em +10% de eficiência. Melhoria contínua de processos existentes para manter a competitividade no mercado atual.',
    example: 'Exemplo: Refino de software e otimização de UX.',
    type: 'content',
    accentText: '+10%'
  },
  {
    id: '03',
    number: '03',
    title: 'INOVAÇÃO DISRUPTIVA',
    subtitle: 'O Futuro.',
    content: 'Criação de novos mercados. Obsolescência programada do antigo através de saltos tecnológicos e de modelo de negócio.',
    example: 'Exemplo: Uber vs Táxis. IA Generativa vs Busca Tradicional.',
    type: 'content',
    accentText: '10X'
  },
  {
    id: '04',
    number: '04',
    title: 'A DIFERENÇA REAL',
    subtitle: 'Sobrevivência vs Moats.',
    content: 'Incremental = Sobrevivência. Disruptiva = Fossos (Moats) duradouros e 10x ROI. A escolha entre competir por migalhas ou definir as regras do jogo.',
    type: 'comparison'
  },
  {
    id: '05',
    number: '05',
    title: 'BUILD THE FUTURE',
    subtitle: 'Próximos Passos.',
    content: 'A inovação não é um evento, é um processo de construção contínua.',
    type: 'cta'
  }
];
