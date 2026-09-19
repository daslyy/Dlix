import { useRef } from 'react';
import useCategory from '../hooks/useCategory';
import Poster from './Poster';

export default function Row({ category, onSelect }) {
  const { movies, loading, error } = useCategory(category);
  const scrollerRef = useRef(null);

  function scrollBy(amount) {
    scrollerRef.current?.scrollBy({ left: amount, behavior: 'smooth' });
  }

  if (error) return null;

  return (
    <section className="mb-8 px-4 sm:px-10">
      <h2 className="text-lg sm:text-xl font-semibold mb-3">{category.title}</h2>

      <div className="relative group/row">
        <button
          onClick={() => scrollBy(-600)}
          aria-label={`Scroll ${category.title} left`}
          className="hidden sm:flex absolute left-0 top-0 bottom-0 z-20 w-10 items-center justify-center
                     bg-linear-to-r from-void to-transparent opacity-0 group-hover/row:opacity-100 transition-opacity"
        >
          <ChevronIcon direction="left" />
        </button>

        <div
          ref={scrollerRef}
          className="reel-scroll flex gap-2 sm:gap-3 overflow-x-auto pb-2 scroll-smooth"
        >
          {loading
            ? Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="shrink-0 w-36 sm:w-44 aspect-2/3 rounded-md bg-charcoal animate-pulse"
                />
              ))
            : movies.map((movie) => (
                <Poster key={movie.id} movie={movie} onSelect={onSelect} />
              ))}
        </div>

        <button
          onClick={() => scrollBy(600)}
          aria-label={`Scroll ${category.title} right`}
          className="hidden sm:flex absolute right-0 top-0 bottom-0 z-20 w-10 items-center justify-center
                     bg-linear-to-l from-void to-transparent opacity-0 group-hover/row:opacity-100 transition-opacity"
        >
          <ChevronIcon direction="right" />
        </button>
      </div>
    </section>
  );
}

function ChevronIcon({ direction }) {
  const path = direction === 'left' ? 'M15 18l-6-6 6-6' : 'M9 18l6-6-6-6';
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d={path} />
    </svg>
  );
}
