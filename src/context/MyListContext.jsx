import { useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { MyListContext } from "./myListStore";

const STORAGE_KEY = "dlix:my-lists";

function readLists() {
  try {
    const savedLists = window.localStorage.getItem(STORAGE_KEY);
    return savedLists ? JSON.parse(savedLists) : {};
  } catch {
    return {};
  }
}

function movieSnapshot(movie) {
  return {
    id: movie.id,
    title: movie.title,
    poster_path: movie.poster_path,
    backdrop_path: movie.backdrop_path,
    overview: movie.overview,
    release_date: movie.release_date,
    vote_average: movie.vote_average,
  };
}

export function MyListProvider({ children }) {
  const { user } = useAuth();
  const [lists, setLists] = useState(readLists);
  const userId = user?.uid;

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lists));
  }, [lists]);

  const movies = userId ? lists[userId] || [] : [];

  function isSaved(movieId) {
    return movies.some((movie) => movie.id === movieId);
  }

  function toggleMovie(movie) {
    if (!userId || !movie?.id) return;

    setLists((currentLists) => {
      const currentMovies = currentLists[userId] || [];
      const alreadySaved = currentMovies.some((savedMovie) => savedMovie.id === movie.id);
      const nextMovies = alreadySaved
        ? currentMovies.filter((savedMovie) => savedMovie.id !== movie.id)
        : [movieSnapshot(movie), ...currentMovies];

      return { ...currentLists, [userId]: nextMovies };
    });
  }

  const value = { movies, isSaved, toggleMovie };

  return (
    <MyListContext.Provider value={value}>{children}</MyListContext.Provider>
  );
}
