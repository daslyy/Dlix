import { useState, useEffect, useCallback } from 'react';
import Navbar from '../components/Navbar';
import Banner from '../components/Banner';
import Row from '../components/Row';
import Modal from '../components/Modal';
import SearchResults from '../components/SearchResults';
import MyList from '../components/MyList';
import { CATEGORIES, searchMovies } from '../services/tmdb';
import useMyList from '../hooks/useMyList';

export default function Browse() {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [view, setView] = useState('browse');
  const { movies, isSaved, toggleMovie } = useMyList();

  const handleSearch = useCallback((value) => {
    setQuery(value);
    if (value.trim()) setView('browse');
  }, []);

  function handleViewChange(nextView) {
    setView(nextView);
    if (nextView === 'list') setQuery('');
  }

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
      <Navbar onSearch={handleSearch} view={view} onViewChange={handleViewChange} />

      {isSearching ? (
        <SearchResults
          query={query}
          results={searchResults}
          loading={searching}
          onSelect={setSelectedMovie}
        />
      ) : view === 'list' ? (
        <MyList
          movies={movies}
          onSelect={setSelectedMovie}
          onBrowse={() => handleViewChange('browse')}
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

      <Modal
        movie={selectedMovie}
        onClose={() => setSelectedMovie(null)}
        isSaved={selectedMovie ? isSaved(selectedMovie.id) : false}
        onToggleMyList={toggleMovie}
      />
    </div>
  );
}
