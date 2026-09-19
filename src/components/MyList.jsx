import Poster from "./Poster";

export default function MyList({ movies, onSelect, onBrowse }) {
  return (
    <main className="pt-28 px-4 sm:px-10 min-h-screen">
      <h1 className="font-display text-4xl tracking-wide mb-2">My List</h1>
      <p className="text-fog mb-6">
        {movies.length === 1 ? "1 saved title" : `${movies.length} saved titles`}
      </p>

      {movies.length === 0 ? (
        <div className="max-w-md rounded-lg border border-charcoal-light bg-charcoal p-6">
          <h2 className="text-lg font-semibold mb-2">Your list is empty</h2>
          <p className="text-fog text-sm mb-5">
            Browse movies and use the My List button in a title's details to save it here.
          </p>
          <button
            type="button"
            onClick={onBrowse}
            className="bg-ember hover:bg-ember-deep transition-colors font-semibold px-5 py-2.5 rounded"
          >
            Browse titles
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 gap-3">
          {movies.map((movie) => (
            <Poster key={movie.id} movie={movie} onSelect={onSelect} />
          ))}
        </div>
      )}
    </main>
  );
}
