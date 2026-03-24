import React from 'react';
import { SlideData } from '../constants';
import { motion } from 'motion/react';

interface SlideProps {
  slide: SlideData;
  isActive: boolean;
  disableAnimation?: boolean;
}

export const Slide: React.FC<SlideProps> = ({ slide, isActive, disableAnimation = false }) => {
  if (!isActive) return null;

  return (
    <motion.div
      data-slide-content
      initial={disableAnimation ? false : { opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={disableAnimation ? undefined : { opacity: 0, x: -20 }}
      transition={disableAnimation ? { duration: 0 } : { duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="w-full h-full flex flex-col justify-center px-8 md:px-24 relative overflow-hidden"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[40vw] font-black text-white/[0.02] pointer-events-none select-none font-mono">
        {slide.number}
      </div>

      <div className="relative z-10 max-w-5xl">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-[1px] bg-builder-green" />
          <span className="font-mono text-[10px] tracking-ultra text-neutral-500 uppercase">
            SLIDE / {slide.number}
          </span>
        </div>

        <h2 className="text-5xl md:text-8xl lg:text-[120px] font-black tracking-tighter leading-presentation uppercase mb-8">
          {slide.title}<span className="text-builder-green">.</span>
        </h2>

        {slide.type === 'capa' && (
          <div className="mb-12 opacity-80">
            {/* Removido o logo da capa */}
          </div>
        )}

        {slide.subtitle && (
          <p className="text-xl md:text-3xl text-neutral-400 font-medium mb-12 max-w-2xl">
            {slide.subtitle}
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-8">
            <p className="text-lg md:text-xl text-neutral-300 leading-relaxed border-l border-neutral-800 pl-8">
              {slide.content}
            </p>

            {slide.example && (
              <div className="mt-8 p-6 bg-neutral-900/30 border border-neutral-900">
                <span className="font-mono text-[10px] tracking-widest text-builder-green uppercase block mb-2">CASE STUDY</span>
                <p className="text-neutral-400 italic">{slide.example}</p>
              </div>
            )}
          </div>

          {slide.accentText && (
            <div className="md:col-span-4 flex items-center justify-center">
              <div className="text-6xl md:text-8xl font-black text-builder-green/20 border border-builder-green/10 p-8 rotate-3 hover:rotate-0 transition-transform duration-500">
                {slide.accentText}
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};
