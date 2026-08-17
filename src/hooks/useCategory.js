import { useState, useEffect } from 'react';
import { fetchCategory } from '../services/tmdb';

export default function useCategory(category) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    fetchCategory(category)
      .then((results) => {
        if (!cancelled) setMovies(results);
      })
      .catch((err) => {
        if (!cancelled) setError(err);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [category]);

  return { movies, loading, error };
}
