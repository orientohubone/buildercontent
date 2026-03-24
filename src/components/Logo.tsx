import React from 'react';

export const Logo: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      <span className="font-extralight text-2xl tracking-[0.4em] text-builder-green uppercase">
        RAMALHO
      </span>
    </div>
  );
};
