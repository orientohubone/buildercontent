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

export interface DeckData {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  accentLabel: string;
  pdfFileName: string;
  coverTitleLines?: string[];
  slides: SlideData[];
}

export interface DeckCategory {
  id: string;
  title: string;
  description: string;
  decks: DeckData[];
}

const innovationSlides: SlideData[] = [
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
    subtitle: 'O presente.',
    content: 'Foco em +10% de eficiência. Melhoria contínua de processos existentes para manter a competitividade no mercado atual.',
    example: 'Exemplo: refino de software e otimização de UX.',
    type: 'content',
    accentText: '+10%'
  },
  {
    id: '03',
    number: '03',
    title: 'INOVAÇÃO DISRUPTIVA',
    subtitle: 'O futuro.',
    content: 'Criação de novos mercados. Obsolescência programada do antigo através de saltos tecnológicos e de modelo de negócio.',
    example: 'Exemplo: Uber vs Táxis. IA Generativa vs Busca Tradicional.',
    type: 'content',
    accentText: '10X'
  },
  {
    id: '04',
    number: '04',
    title: 'A DIFERENÇA REAL',
    subtitle: 'Sobrevivência vs moats.',
    content: 'Incremental = sobrevivência. Disruptiva = fossos duradouros e 10x ROI. A escolha entre competir por migalhas ou definir as regras do jogo.',
    type: 'comparison'
  },
  {
    id: '05',
    number: '05',
    title: 'BUILD THE FUTURE',
    subtitle: 'Próximos passos.',
    content: 'A inovação não é um evento, é um processo de construção contínua.',
    type: 'cta'
  }
];

export const DECK_CATEGORIES: DeckCategory[] = [
  {
    id: 'estrategia-inovacao',
    title: 'Estratégia e Inovação',
    description: 'Decks para discutir posicionamento, vantagem competitiva e construção de futuro.',
    decks: [
      {
        id: 'deck-inovacao-disruptiva-vs-incremental',
        slug: 'inovacao-disruptiva-vs-incremental',
        title: 'Inovação Disruptiva vs Incremental',
        description: 'Um deck sobre diferença de impacto entre melhoria contínua e movimentos que redefinem mercado.',
        category: 'Estratégia e Inovação',
        accentLabel: '10x',
        pdfFileName: 'deck-inovacao-disruptiva-vs-incremental.pdf',
        coverTitleLines: ['INOVAÇÃO', 'DISRUPTIVA VS', 'INCREMENTAL.'],
        slides: innovationSlides
      }
    ]
  }
];

export const ALL_DECKS: DeckData[] = DECK_CATEGORIES.flatMap((category) => category.decks);

export const findDeckBySlug = (slug: string | null | undefined) =>
  ALL_DECKS.find((deck) => deck.slug === slug);
