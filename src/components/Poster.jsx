import { posterUrl } from '../services/tmdb';

export default function Poster({ movie, onSelect }) {
  if (!movie.poster_path) return null;

  const year = movie.release_date?.slice(0, 4);

  return (
    <button
      onClick={() => onSelect(movie)}
      className="group relative shrink-0 w-36 sm:w-44 rounded-md overflow-hidden bg-charcoal
                 transition-transform duration-300 ease-out hover:scale-110 hover:z-10
                 focus:scale-110 focus:z-10 focus:outline-none focus:ring-2 focus:ring-ember"
    >
      <img
        src={posterUrl(movie.poster_path)}
        alt={movie.title}
        loading="lazy"
        className="w-full aspect-[2/3] object-cover"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-void via-void/20 to-transparent
                   opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-300
                   flex flex-col justify-end p-3 text-left"
      >
        <p className="text-sm font-semibold leading-tight line-clamp-2">{movie.title}</p>
        <div className="flex items-center gap-2 mt-1 font-mono text-[11px]">
          {movie.vote_average > 0 && (
            <span className="text-marquee">★ {movie.vote_average.toFixed(1)}</span>
          )}
          {year && <span className="text-fog">{year}</span>}
        </div>
      </div>
      <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-md pointer-events-none group-hover:ring-ember/60 transition-colors" />
    </button>
  );
}
