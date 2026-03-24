import React from 'react';
import { ArrowRight, LibraryBig, Layers3 } from 'lucide-react';
import { DeckCategory, DeckData } from '../constants';

interface DeckLibraryProps {
  categories: DeckCategory[];
  onOpenDeck: (deck: DeckData) => void;
}

export const DeckLibrary: React.FC<DeckLibraryProps> = ({ categories, onOpenDeck }) => {
  const totalDecks = categories.reduce((sum, category) => sum + category.decks.length, 0);

  return (
    <div className="fixed inset-0 overflow-y-auto bg-builder-black text-white">
      <div className="min-h-full bg-[radial-gradient(circle_at_top_left,_rgba(88,181,115,0.16),_transparent_28%),linear-gradient(180deg,_#0b0b0b_0%,_#050505_58%)]">
        <div className="mx-auto max-w-7xl px-6 py-10 md:px-10 md:py-14">
          <header className="mb-12 flex flex-col gap-8 border border-white/6 bg-white/[0.03] p-8 backdrop-blur-sm md:p-12">
            <div className="flex items-center gap-3">
              <img
                src="/logofernando.png"
                alt="Fernando Ramalho Builder Logo"
                className="h-5 w-auto object-contain"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="grid gap-10 md:grid-cols-[minmax(0,1.4fr)_320px] md:items-end">
              <div className="max-w-4xl">
                <div className="mb-5 flex items-center gap-3 text-[10px] font-mono uppercase tracking-[0.45em] text-neutral-500">
                  <LibraryBig size={14} />
                  Biblioteca de decks
                </div>
                <h1 className="max-w-4xl text-4xl font-black uppercase tracking-[-0.06em] text-white md:text-7xl">
                  Um ponto de entrada para visualizar, organizar e expandir seus decks.
                </h1>
                <p className="mt-6 max-w-2xl text-base leading-7 text-neutral-400 md:text-lg">
                  Cada categoria agrupa os materiais por contexto de uso. Ao clicar em um card, o deck abre no visualizador.
                </p>
              </div>

              <div className="grid gap-4 border border-white/8 bg-black/30 p-6">
                <div className="flex items-center gap-3 text-builder-green">
                  <Layers3 size={16} />
                  <span className="text-[10px] font-mono uppercase tracking-[0.45em]">Resumo</span>
                </div>
                <div className="text-5xl font-black tracking-[-0.06em]">{String(totalDecks).padStart(2, '0')}</div>
                <p className="text-sm leading-6 text-neutral-400">
                  Decks disponíveis hoje para abrir, apresentar e exportar em PDF.
                </p>
              </div>
            </div>
          </header>

          <div className="space-y-10">
            {categories.map((category) => (
              <section key={category.id} className="space-y-5">
                <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                  <div>
                    <div className="mb-2 text-[10px] font-mono uppercase tracking-[0.45em] text-builder-green">
                      Categoria
                    </div>
                    <h2 className="text-2xl font-black uppercase tracking-[-0.05em] md:text-4xl">
                      {category.title}
                    </h2>
                  </div>
                  <p className="max-w-2xl text-sm leading-6 text-neutral-400 md:text-base">
                    {category.description}
                  </p>
                </div>

                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                  {category.decks.map((deck) => (
                    <button
                      key={deck.id}
                      type="button"
                      onClick={() => onOpenDeck(deck)}
                      className="group relative overflow-hidden border border-white/8 bg-white/[0.03] p-6 text-left transition-all duration-300 hover:border-builder-green/40 hover:bg-white/[0.05]"
                    >
                      <div className="absolute inset-0 bg-[linear-gradient(135deg,_rgba(88,181,115,0.14),_transparent_32%)] opacity-60 transition-opacity duration-300 group-hover:opacity-100" />
                      <div className="relative flex h-full flex-col">
                        <div className="mb-8 flex items-start justify-between gap-6">
                          <div>
                            <div className="mb-3 text-[10px] font-mono uppercase tracking-[0.45em] text-neutral-500">
                              {deck.category}
                            </div>
                            <h3 className="max-w-[14ch] text-3xl font-black uppercase tracking-[-0.06em] text-white">
                              {deck.title}
                            </h3>
                          </div>
                          <div className="border border-builder-green/15 px-3 py-2 text-lg font-black text-builder-green/80">
                            {deck.accentLabel}
                          </div>
                        </div>

                        <p className="mb-8 flex-1 text-sm leading-6 text-neutral-400">
                          {deck.description}
                        </p>

                        <div className="flex items-center justify-between border-t border-white/8 pt-4">
                          <span className="text-[10px] font-mono uppercase tracking-[0.45em] text-neutral-500">
                            Abrir deck
                          </span>
                          <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
