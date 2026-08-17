import { useState, useEffect, useCallback } from 'react';
import Navbar from '../components/Navbar';
import Banner from '../components/Banner';
import Row from '../components/Row';
import Modal from '../components/Modal';
import SearchResults from '../components/SearchResults';
import { CATEGORIES, searchMovies } from '../services/tmdb';

export default function Browse() {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);

  const handleSearch = useCallback((value) => {
    setQuery(value);
  }, []);

  useEffect(() => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }
    let cancelled = false;
    setSearching(true);
    searchMovies(query)
      .then((results) => {
        if (!cancelled) setSearchResults(results);
      })
      .finally(() => {
        if (!cancelled) setSearching(false);
      });
    return () => {
      cancelled = true;
    };
  }, [query]);

  const isSearching = query.trim().length > 0;

  return (
    <div className="min-h-screen bg-void text-paper">
      <Navbar onSearch={handleSearch} />

      {isSearching ? (
        <SearchResults
          query={query}
          results={searchResults}
          loading={searching}
          onSelect={setSelectedMovie}
        />
      ) : (
        <>
          <Banner onMoreInfo={setSelectedMovie} />
          <div className="film-strip -mt-6 relative z-10" />
          <div className="pt-8 pb-16">
            {CATEGORIES.map((category) => (
              <Row key={category.key} category={category} onSelect={setSelectedMovie} />
            ))}
          </div>
        </>
      )}

      <Modal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
    </div>
  );
}
