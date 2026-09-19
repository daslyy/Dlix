import { useState, useEffect } from "react";
import { fetchMovieDetails, backdropUrl } from "../services/tmdb";

export default function Modal({ movie, onClose }) {
  const [details, setDetails] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);

  useEffect(() => {
    if (!movie) return;
    setDetails(null);
    fetchMovieDetails(movie.id).then(setDetails);
  }, [movie]);

  useEffect(() => {
    function handleKey(e) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  if (!movie) return null;

  const cast = details?.credits?.cast
    ?.slice(0, 5)
    .map((c) => c.name)
    .join(", ");
  const genres = details?.genres?.map((g) => g.name).join(" · ");
  const runtime = details?.runtime
    ? `${Math.floor(details.runtime / 60)}h ${details.runtime % 60}m`
    : null;

  const trailer = details?.videos?.results?.find(
    (video) =>
      video.site === "YouTube" && video.type === "Trailer" && video.key,
  );

  return (
    <div
      className="fixed inset-0 z-100 bg-black/80 flex items-start sm:items-center justify-center p-0 sm:p-6 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative bg-charcoal w-full sm:max-w-2xl sm:rounded-lg overflow-hidden my-0 sm:my-auto animate-flicker"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-void/70 hover:bg-void flex items-center justify-center"
        >
          <CloseIcon />
        </button>

        <div className="relative h-56 sm:h-72">
          {(details?.backdrop_path || movie.backdrop_path) && (
            <img
              src={backdropUrl(details?.backdrop_path || movie.backdrop_path)}
              alt=""
              className="w-full h-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-linear-to-t from-charcoal via-charcoal/20 to-transparent" />
          <h2 className="absolute bottom-4 left-6 font-display text-4xl sm:text-5xl tracking-wide drop-shadow-lg">
            {movie.title}
          </h2>
        </div>

        <div className="p-6">
          <div className="flex flex-wrap items-center gap-3 mb-4 font-mono text-xs text-fog">
            {movie.vote_average > 0 && (
              <span className="text-marquee font-semibold">
                ★ {movie.vote_average.toFixed(1)}
              </span>
            )}
            {movie.release_date && (
              <span>{movie.release_date.slice(0, 4)}</span>
            )}
            {runtime && <span>{runtime}</span>}
            {genres && <span>{genres}</span>}
          </div>

          <p className="text-sm sm:text-base text-paper/90 leading-relaxed mb-4">
            {movie.overview || "No synopsis available."}
          </p>

          {cast && (
            <p className="text-sm text-fog">
              <span className="text-paper/70">Cast: </span>
              {cast}
            </p>
          )}

          {/* play trailer */}
          <div className="flex gap-3 mt-6">
            <button
              onClick={() => setShowTrailer(true)}
              disabled={!trailer}
              className="flex items-center gap-2 bg-paper text-void font-semibold px-6 py-2.5 rounded hover:bg-fog transition-colors"
            >
              <PlayIcon />
              {trailer ? "Play Trailer" : "Trailer Unavailable"}
            </button>

            <button className="bg-charcoal-light text-paper font-semibold px-6 py-2.5 rounded hover:bg-charcoal-light/70 transition-colors">
              + My List
            </button>
          </div>
        </div>
      </div>
      {showTrailer && trailer && (
        <div
          className="fixed inset-0 z-100 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setShowTrailer(false)}
        >
          <div
            className="relative w-full max-w-5xl aspect-video bg-black rounded-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowTrailer(false)}
              className="absolute top-3 right-3 z-10 bg-black/70 text-white w-10 h-10 rounded-full text-xl hover:bg-black transition-colors"
            >
              ✕
            </button>

            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1`}
              title={`${details.title} Trailer`}
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </div>
  );
}

function CloseIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}
