# Dlix

A movie browsing app inspired by streaming platforms, built with React, Vite, Tailwind CSS v4, and the TMDB API.

## Features

- Landing/browse page with a rotating hero banner pulled from trending titles
- Horizontally scrolling category rows (Trending, Top Rated, Action, Comedy, Horror, Romance, Documentaries)
- Poster hover effects with rating/year overlay
- Detail modal with synopsis, genres, runtime, and cast (fetched on open)
- Debounced search wired to the TMDB search endpoint
- Mock auth (sign up / sign in) gating the browse page, persisted to `localStorage`

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Get a free TMDB API key: https://www.themoviedb.org/settings/api

3. Copy the env template and add your key:
   ```bash
   cp .env.example .env
   ```
   Then edit `.env`:
   ```
   VITE_TMDB_API_KEY=your_key_here
   ```

4. Run the dev server:
   ```bash
   npm run dev
   ```

## Project structure

```
src/
  components/
    Navbar.jsx         fixed nav, opaque on scroll, search input
    Banner.jsx          hero banner with random trending pick
    Row.jsx              horizontally scrolling category row
    Poster.jsx           individual poster with hover overlay
    Modal.jsx             detail view (synopsis, cast, genres)
    SearchResults.jsx   grid shown while searching
  context/
    AuthContext.jsx      mock auth (login/signup/logout)
  hooks/
    useCategory.js        fetches a category's movie list
  pages/
    Browse.jsx            main landing page
    Login.jsx               sign in / sign up screen
  services/
    tmdb.js                 TMDB API wrapper + category definitions
```

## Design notes

The visual identity is intentionally its own thing rather than a literal
skin: a near-black "void" background, a coral-ember accent (not Netflix's
red), a condensed cinematic display face for titles, and a recurring
perforated "film-strip" motif (see `.film-strip` in `index.css`) used as a
divider — a nod to physical film stock that ties back to the subject matter.

## Notes for extending this

- Add more rows by appending to `CATEGORIES` in `src/services/tmdb.js`
- Swap the mock `AuthContext` for a real backend (Firebase, Supabase, your
  own API) by replacing the three functions in `AuthContext.jsx` — the rest
  of the app only depends on `user`, `login`, `signup`, `logout`
- `useCategory` is a good pattern to copy if you add a "My List" feature
  backed by an API instead of local state
