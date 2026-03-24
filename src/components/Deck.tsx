import React, { useState, useEffect, useCallback } from 'react';
import { DeckData } from '../constants';
import { Slide } from './Slide';
import { ExportSlide } from './ExportSlide';
import { ChevronLeft, ChevronRight, Maximize2, Download, MousePointer2, ArrowLeft } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const EXPORT_WIDTH = 1600;
const EXPORT_HEIGHT = 900;

interface DeckProps {
  deck: DeckData;
  onBack: () => void;
}

export const Deck: React.FC<DeckProps> = ({ deck, onBack }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  useEffect(() => {
    setCurrentSlide(0);
  }, [deck.id]);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % deck.slides.length);
  }, [deck.slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + deck.slides.length) % deck.slides.length);
  }, [deck.slides.length]);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
      return;
    }

    if (document.exitFullscreen) {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key.toLowerCase() === 'f') toggleFullscreen();
      if (e.key === 'Escape' && !document.fullscreenElement) onBack();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, onBack, prevSlide, toggleFullscreen]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const handleDownload = async () => {
    const btn = document.getElementById('download-btn') as HTMLButtonElement | null;
    if (!btn) {
      return;
    }

    btn.innerText = 'PREPARANDO PDF...';
    btn.disabled = true;

    try {
      const shouldRestoreFullscreen = isFullscreen;

      if (document.fullscreenElement) {
        await document.exitFullscreen();
      }

      setIsExporting(true);
      btn.innerText = 'RENDERIZANDO SLIDES...';
      await new Promise((resolve) => setTimeout(resolve, 300));

      const slideElements = Array.from(document.querySelectorAll<HTMLElement>('[data-export-slide]'));
      if (slideElements.length === 0) {
        throw new Error('Nenhum slide encontrado para exportacao.');
      }

      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'px',
        format: [EXPORT_WIDTH, EXPORT_HEIGHT],
        compress: true
      });

      for (const [index, slideElement] of slideElements.entries()) {
        btn.innerText = `GERANDO PDF ${index + 1}/${slideElements.length}...`;

        const canvas = await html2canvas(slideElement, {
          scale: 2,
          backgroundColor: '#050505',
          useCORS: true,
          logging: false,
          width: EXPORT_WIDTH,
          height: EXPORT_HEIGHT,
          windowWidth: EXPORT_WIDTH,
          windowHeight: EXPORT_HEIGHT
        });

        const imageData = canvas.toDataURL('image/png');
        if (index > 0) {
          pdf.addPage([EXPORT_WIDTH, EXPORT_HEIGHT], 'landscape');
        }

        pdf.addImage(imageData, 'PNG', 0, 0, EXPORT_WIDTH, EXPORT_HEIGHT, undefined, 'FAST');
      }

      pdf.save(deck.pdfFileName);

      if (shouldRestoreFullscreen) {
        await document.documentElement.requestFullscreen();
      }

      btn.innerText = 'PDF GERADO COM SUCESSO!';
    } catch (error) {
      console.error('Erro ao gerar PDF:', error);
      btn.innerText = 'ERRO AO GERAR PDF';
    } finally {
      setIsExporting(false);
      setTimeout(() => {
        btn.innerText = 'DOWNLOAD PDF ESTRATEGICO';
        btn.disabled = false;
      }, 2000);
    }
  };

  const activeSlide = deck.slides[currentSlide];

  return (
    <div className="fixed inset-0 bg-builder-black flex flex-col overflow-hidden">
      <header className="h-20 border-b border-neutral-900 flex items-center justify-between px-8 z-50 bg-builder-black/80 backdrop-blur-sm">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.45em] text-neutral-500 transition-colors hover:text-white"
          >
            <ArrowLeft size={14} />
            Biblioteca
          </button>
          <div className="h-4 w-px bg-neutral-800" />
          <img
            src="/logofernando.png"
            alt="Fernando Ramalho Builder Logo"
            className="h-5 w-auto object-contain"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="flex items-center gap-6">
          <div className="hidden text-right md:block">
            <div className="text-[10px] font-mono uppercase tracking-[0.45em] text-neutral-500">
              {deck.category}
            </div>
            <div className="text-xs uppercase tracking-[0.2em] text-neutral-300">
              {deck.title}
            </div>
          </div>
          <button
            onClick={toggleFullscreen}
            className="p-2 text-neutral-500 hover:text-white transition-colors"
            title="Tela Cheia (F)"
          >
            <Maximize2 size={18} />
          </button>
          <div className="h-4 w-[1px] bg-neutral-800" />
          <div className="font-mono text-[10px] tracking-widest text-neutral-500">
            {String(currentSlide + 1).padStart(2, '0')} / {String(deck.slides.length).padStart(2, '0')}
          </div>
        </div>
      </header>

      <main className="flex-1 relative flex items-center justify-center">
        <div className="w-full h-full max-w-[1920px] mx-auto aspect-[16/9] md:aspect-auto relative">
          <AnimatePresence mode="wait">
            <Slide key={`${deck.id}-${activeSlide.id}`} slide={activeSlide} isActive={true} />
          </AnimatePresence>
        </div>

        <div className="absolute bottom-12 right-12 flex items-center gap-4 z-50">
          <button
            onClick={prevSlide}
            className="w-14 h-14 border border-neutral-900 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300 group"
          >
            <ChevronLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
          </button>
          <button
            onClick={nextSlide}
            className="w-14 h-14 border border-neutral-900 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300 group"
          >
            <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {activeSlide.type === 'cta' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute bottom-32 left-8 md:left-24 z-50"
          >
            <button
              id="download-btn"
              onClick={handleDownload}
              className="px-8 py-4 bg-builder-green text-builder-black font-black text-xs tracking-ultra uppercase hover:bg-white transition-colors flex items-center gap-3"
            >
              <Download size={16} />
              DOWNLOAD PDF ESTRATEGICO
            </button>
          </motion.div>
        )}
      </main>

      <footer className="h-1 bg-neutral-900 relative">
        <motion.div
          className="absolute top-0 left-0 h-full bg-builder-green"
          initial={{ width: 0 }}
          animate={{ width: `${((currentSlide + 1) / deck.slides.length) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </footer>

      <div className="absolute bottom-8 left-8 flex items-center gap-3 text-neutral-600 pointer-events-none">
        <MousePointer2 size={12} />
        <span className="text-[10px] font-mono tracking-widest uppercase">USE AS SETAS DO TECLADO</span>
      </div>

      {isExporting && (
        <div
          className="fixed pointer-events-none opacity-0 overflow-hidden"
          style={{ left: '-10000px', top: 0, width: `${EXPORT_WIDTH}px` }}
          aria-hidden="true"
        >
          {deck.slides.map((slide) => (
            <div
              key={`export-${deck.id}-${slide.id}`}
              data-export-slide
              style={{
                width: `${EXPORT_WIDTH}px`,
                height: `${EXPORT_HEIGHT}px`,
                backgroundColor: '#050505'
              }}
            >
              <ExportSlide slide={slide} coverTitleLines={deck.coverTitleLines} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
