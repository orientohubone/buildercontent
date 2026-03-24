import { useEffect, useState } from 'react';
import { ALL_DECKS, DECK_CATEGORIES, DeckData, findDeckBySlug } from './constants';
import { Deck } from './components/Deck';
import { DeckLibrary } from './components/DeckLibrary';

const getDeckFromLocation = () => {
  if (typeof window === 'undefined') {
    return null;
  }

  const params = new URLSearchParams(window.location.search);
  return findDeckBySlug(params.get('deck')) ?? null;
};

export default function App() {
  const [selectedDeck, setSelectedDeck] = useState<DeckData | null>(() => getDeckFromLocation() ?? ALL_DECKS[0] ?? null);
  const [showLibrary, setShowLibrary] = useState(() => getDeckFromLocation() === null);

  useEffect(() => {
    const handlePopState = () => {
      const deck = getDeckFromLocation();
      setSelectedDeck(deck ?? ALL_DECKS[0] ?? null);
      setShowLibrary(deck === null);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const openDeck = (deck: DeckData) => {
    const params = new URLSearchParams(window.location.search);
    params.set('deck', deck.slug);
    const nextUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.pushState({}, '', nextUrl);
    setSelectedDeck(deck);
    setShowLibrary(false);
  };

  const backToLibrary = () => {
    window.history.pushState({}, '', window.location.pathname);
    setShowLibrary(true);
  };

  return (
    <div className="min-h-screen bg-builder-black">
      {showLibrary || !selectedDeck ? (
        <DeckLibrary categories={DECK_CATEGORIES} onOpenDeck={openDeck} />
      ) : (
        <Deck deck={selectedDeck} onBack={backToLibrary} />
      )}
    </div>
  );
}
