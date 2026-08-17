import Poster from './Poster';

export default function SearchResults({ query, results, loading, onSelect }) {
  return (
    <div className="pt-28 px-4 sm:px-10 min-h-screen">
      <h2 className="text-lg sm:text-xl font-semibold mb-6">
        {loading ? 'Searching…' : `Results for "${query}"`}
      </h2>

      {!loading && results.length === 0 && (
        <p className="text-fog">No titles found. Try a different search.</p>
      )}

      <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 gap-3">
        {results.map((movie) => (
          <Poster key={movie.id} movie={movie} onSelect={onSelect} />
        ))}
      </div>
    </div>
  );
}
