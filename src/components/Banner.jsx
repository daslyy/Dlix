import { useState, useEffect } from 'react';
import { fetchTrendingForHero, backdropUrl } from '../services/tmdb';

export default function Banner({ onMoreInfo }) {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    fetchTrendingForHero().then((results) => {
      if (results.length) {
        const pick = results[Math.floor(Math.random() * Math.min(results.length, 8))];
        setMovie(pick);
      }
    });
  }, []);

  if (!movie) {
    return <div className="h-[70vh] bg-charcoal animate-pulse" />;
  }

  const truncate = (str, n) => (str?.length > n ? str.slice(0, n).trim() + '…' : str);

  return (
    <div className="relative h-[85vh] min-h-[520px] w-full grain">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${backdropUrl(movie.backdrop_path)})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-void via-void/40 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-void/90 via-void/10 to-transparent" />

      <div className="relative h-full flex flex-col justify-end px-4 sm:px-10 pb-24 max-w-2xl">
        <span className="font-mono text-xs tracking-widest text-marquee mb-3">
          #1 IN MOVIES TODAY
        </span>
        <h1 className="font-display text-5xl sm:text-7xl leading-none tracking-wide mb-4 drop-shadow-lg">
          {movie.title}
        </h1>
        <p className="text-fog text-sm sm:text-base mb-6 leading-relaxed">
          {truncate(movie.overview, 160)}
        </p>
        <div className="flex gap-3">
          <button
            onClick={() => onMoreInfo?.(movie)}
            className="flex items-center gap-2 bg-paper text-void font-semibold px-6 py-2.5 rounded hover:bg-fog transition-colors"
          >
            <PlayIcon /> Play
          </button>
          <button
            onClick={() => onMoreInfo?.(movie)}
            className="flex items-center gap-2 bg-charcoal-light/80 text-paper font-semibold px-6 py-2.5 rounded hover:bg-charcoal-light transition-colors"
          >
            <InfoIcon /> More Info
          </button>
        </div>
      </div>
    </div>
  );
}

function PlayIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  );
}
