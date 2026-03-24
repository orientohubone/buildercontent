import React from 'react';
import { SlideData } from '../constants';

interface ExportSlideProps {
  slide: SlideData;
  coverTitleLines?: string[];
}

const colors = {
  background: '#050505',
  white: '#ffffff',
  whiteMuted: 'rgba(255, 255, 255, 0.02)',
  green: '#58B573',
  greenSoft: 'rgba(88, 181, 115, 0.2)',
  greenBorder: 'rgba(88, 181, 115, 0.1)',
  neutral500: '#737373',
  neutral400: '#a3a3a3',
  neutral300: '#d4d4d4',
  neutral900: '#171717',
  neutral800: '#262626'
};

export const ExportSlide: React.FC<ExportSlideProps> = ({ slide, coverTitleLines }) => {
  const titleLines =
    slide.type === 'capa'
      ? coverTitleLines ?? slide.title.split('\n')
      : slide.title.split('\n');

  return (
    <div
      data-slide-content
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '64px 96px',
        boxSizing: 'border-box',
        backgroundColor: colors.background,
        color: colors.white,
        fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif'
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: '34vw',
          fontWeight: 900,
          lineHeight: 1,
          color: colors.whiteMuted,
          pointerEvents: 'none',
          userSelect: 'none',
          fontFamily: '"JetBrains Mono", ui-monospace, SFMono-Regular, monospace'
        }}
      >
        {slide.number}
      </div>

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '1120px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
          <div style={{ width: '48px', height: '1px', backgroundColor: colors.green }} />
          <span
            style={{
              fontFamily: '"JetBrains Mono", ui-monospace, SFMono-Regular, monospace',
              fontSize: '10px',
              letterSpacing: '0.5em',
              textTransform: 'uppercase',
              color: colors.neutral500
            }}
          >
            SLIDE / {slide.number}
          </span>
        </div>

        <h2
          style={{
            margin: '0 0 32px 0',
            fontSize: '88px',
            fontWeight: 900,
            lineHeight: 0.9,
            letterSpacing: '-0.05em',
            textTransform: 'uppercase',
            maxWidth: slide.type === 'capa' ? '1180px' : 'none'
          }}
        >
          {titleLines.map((line, index) => (
            <React.Fragment key={`${slide.id}-title-${index}`}>
              {index > 0 ? <br /> : null}
              {line}
            </React.Fragment>
          ))}
          {slide.type !== 'capa' ? <span style={{ color: colors.green }}>.</span> : null}
        </h2>

        {slide.type === 'capa' && <div style={{ marginBottom: '48px', opacity: 0.8 }} />}

        {slide.subtitle && (
          <p
            style={{
              margin: '0 0 48px 0',
              maxWidth: '640px',
              fontSize: '30px',
              fontWeight: 500,
              lineHeight: 1.3,
              color: colors.neutral400
            }}
          >
            {slide.subtitle}
          </p>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr)', gap: '48px' }}>
          <div>
            <p
              style={{
                margin: 0,
                paddingLeft: '32px',
                borderLeft: `1px solid ${colors.neutral800}`,
                fontSize: '28px',
                lineHeight: 1.6,
                color: colors.neutral300
              }}
            >
              {slide.content}
            </p>

            {slide.example && (
              <div
                style={{
                  marginTop: '32px',
                  padding: '24px',
                  backgroundColor: 'rgba(23, 23, 23, 0.3)',
                  border: `1px solid ${colors.neutral900}`,
                  boxSizing: 'border-box'
                }}
              >
                <span
                  style={{
                    display: 'block',
                    marginBottom: '8px',
                    fontFamily: '"JetBrains Mono", ui-monospace, SFMono-Regular, monospace',
                    fontSize: '10px',
                    letterSpacing: '0.3em',
                    textTransform: 'uppercase',
                    color: colors.green
                  }}
                >
                  CASE STUDY
                </span>
                <p style={{ margin: 0, color: colors.neutral400, fontSize: '24px', fontStyle: 'italic', lineHeight: 1.5 }}>
                  {slide.example}
                </p>
              </div>
            )}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {slide.accentText ? (
              <div
                style={{
                  padding: '32px',
                  border: `1px solid ${colors.greenBorder}`,
                  color: colors.greenSoft,
                  fontSize: '96px',
                  fontWeight: 900,
                  lineHeight: 1,
                  transform: 'rotate(3deg)'
                }}
              >
                {slide.accentText}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};
