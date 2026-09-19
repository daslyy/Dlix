import axios from 'axios';

const READ_ACCESS_TOKEN = import.meta.env.VITE_TMDB_READ_ACCESS_TOKEN;
const BASE_URL = 'https://api.themoviedb.org/3';


export const IMAGE_BASE = 'https://image.tmdb.org/t/p/';
export const backdropUrl = (path, size = 'original') =>
  path ? `${IMAGE_BASE}${size}${path}` : null;
export const posterUrl = (path, size = 'w500') =>
  path ? `${IMAGE_BASE}${size}${path}` : null;

//axios setup
const tmdb = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${READ_ACCESS_TOKEN}`,
    accept: 'application/json',
  },
});

// Category rows shown on the browse page.
// key = internal id, title = row label, endpoint = TMDB path
export const CATEGORIES = [
  { key: 'trending', title: 'Trending Now', endpoint: '/trending/movie/week' },
  { key: 'top_rated', title: 'Top Rated', endpoint: '/movie/top_rated' },
  { key: 'action', title: 'Action Thrillers', endpoint: '/discover/movie', params: { with_genres: 28 } },
  { key: 'comedy', title: 'Comedies', endpoint: '/discover/movie', params: { with_genres: 35 } },
  { key: 'horror', title: 'Horror', endpoint: '/discover/movie', params: { with_genres: 27 } },
  { key: 'romance', title: 'Romance', endpoint: '/discover/movie', params: { with_genres: 10749 } },
  { key: 'documentary', title: 'Documentaries', endpoint: '/discover/movie', params: { with_genres: 99 } },
];

export async function fetchCategory({ endpoint, params = {} }) {
  const { data } = await tmdb.get(endpoint, { params });
  return data.results || [];
}

export async function fetchTrendingForHero() {
  const { data } = await tmdb.get('/trending/movie/day');
  return data.results || [];
}

export async function fetchMovieDetails(movieId) {
  const { data } = await tmdb.get(`/movie/${movieId}`, {
    params: { append_to_response: 'videos,credits' },
  });
  return data;
}

export async function searchMovies(query) {
  if (!query?.trim()) return [];
  const { data } = await tmdb.get('/search/movie', {
    params: { query },
  });
  return data.results || [];
}

export default tmdb;
