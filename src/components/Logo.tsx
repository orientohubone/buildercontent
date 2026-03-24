import React from 'react';

export const Logo: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* 
          Substitua 'logo.png' pelo nome real do arquivo que você subiu.
          Certifique-se de que o arquivo esteja na pasta /public ou importe-o se estiver em /src/assets
      */}
      <img 
        src="/logo.png" 
        alt="Fernando Ramalho Builder Logo" 
        className="h-12 w-auto object-contain"
        referrerPolicy="no-referrer"
        onError={(e) => {
          // Fallback caso a imagem não seja encontrada
          const target = e.currentTarget;
          target.style.display = 'none';
          const span = document.createElement('span');
          span.className = "font-extralight text-2xl tracking-[0.4em] text-builder-green uppercase";
          span.innerText = "RAMALHO";
          target.parentElement?.appendChild(span);
        }}
      />
    </div>
  );
};
