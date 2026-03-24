import React, { useState, useEffect, useCallback } from 'react';
import { SLIDES } from '../constants';
import { Slide } from './Slide';
import { Logo } from './Logo';
import { ChevronLeft, ChevronRight, Maximize2, Download, MousePointer2 } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

export const Deck: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'f') toggleFullscreen();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  const handleDownload = () => {
    // Simulated download logic
    const btn = document.getElementById('download-btn');
    if (btn) {
      btn.innerText = "GENERATING PDF...";
      setTimeout(() => {
        btn.innerText = "DOWNLOAD PDF ESTRATÉGICO";
        alert("Simulação: O PDF 'Inovação_Disruptiva_Fernando_Ramalho.pdf' foi gerado com sucesso.");
      }, 1500);
    }
  };

  return (
    <div className="fixed inset-0 bg-builder-black flex flex-col overflow-hidden">
      {/* Header */}
      <header className="h-20 border-b border-neutral-900 flex items-center justify-between px-8 z-50 bg-builder-black/80 backdrop-blur-sm">
        <Logo />
        <div className="flex items-center gap-6">
          <button 
            onClick={toggleFullscreen}
            className="p-2 text-neutral-500 hover:text-white transition-colors"
            title="Tela Cheia (F)"
          >
            <Maximize2 size={18} />
          </button>
          <div className="h-4 w-[1px] bg-neutral-800" />
          <div className="font-mono text-[10px] tracking-widest text-neutral-500">
            {String(currentSlide + 1).padStart(2, '0')} / {String(SLIDES.length).padStart(2, '0')}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 relative flex items-center justify-center">
        <div className="w-full h-full max-w-[1920px] mx-auto aspect-[16/9] md:aspect-auto relative">
          <AnimatePresence mode="wait">
            <Slide 
              key={SLIDES[currentSlide].id} 
              slide={SLIDES[currentSlide]} 
              isActive={true} 
            />
          </AnimatePresence>
        </div>

        {/* Navigation Controls */}
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

        {/* CTA Button for Slide 5 */}
        {currentSlide === 4 && (
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
              DOWNLOAD PDF ESTRATÉGICO
            </button>
          </motion.div>
        )}
      </main>

      {/* Footer / Progress Bar */}
      <footer className="h-1 bg-neutral-900 relative">
        <motion.div 
          className="absolute top-0 left-0 h-full bg-builder-green"
          initial={{ width: 0 }}
          animate={{ width: `${((currentSlide + 1) / SLIDES.length) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </footer>

      {/* Interaction Hint */}
      <div className="absolute bottom-8 left-8 flex items-center gap-3 text-neutral-600 pointer-events-none">
        <MousePointer2 size={12} />
        <span className="text-[10px] font-mono tracking-widest uppercase">USE AS SETAS DO TECLADO</span>
      </div>
    </div>
  );
};
