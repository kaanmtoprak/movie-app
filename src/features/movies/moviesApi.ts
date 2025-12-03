import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {
  TmdbMovie,
  TmdbPaginatedResponse,
  TmdbGenre,
  TmdbCredits,
  TmdbMovieDetails,
  TmdbPerson,
  TmdbPersonCredits,
} from '@/types/tmdb';
import { getTmdbLanguage } from '@/lib/tmdbLanguage';
import { type Locale } from '@/lib/locales';

const TMDB_ACCESS_TOKEN = process.env.NEXT_PUBLIC_TMDB_API_KEY;

if (!TMDB_ACCESS_TOKEN && typeof window !== 'undefined') {
  console.error(
    'NEXT_PUBLIC_TMDB_API_KEY is not set. Please create a .env.local file with your TMDB access token.'
  );
}

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://api.themoviedb.org/3',
  prepareHeaders: (headers) => {
    headers.set('Accept', 'application/json');
    if (TMDB_ACCESS_TOKEN) {
      headers.set('Authorization', `Bearer ${TMDB_ACCESS_TOKEN}`);
    }
    return headers;
  },
});

/**
 * RTK Query API for TMDB endpoints
 */
export const moviesApi = createApi({
  reducerPath: 'moviesApi',
  baseQuery,
  tagTypes: ['Movie', 'MovieDetails', 'Credits'],
  endpoints: (builder) => ({
    // Get popular movies
    getPopularMovies: builder.query<
      TmdbPaginatedResponse<TmdbMovie>,
      { page?: number; locale?: Locale }
    >({
      query: ({ page = 1, locale = 'en' }) => ({
        url: '/movie/popular',
        params: {
          language: getTmdbLanguage(locale),
          page,
        },
      }),
      providesTags: ['Movie'],
    }),

    // Get trending movies
    getTrendingMovies: builder.query<
      TmdbPaginatedResponse<TmdbMovie>,
      { page?: number; locale?: Locale }
    >({
      query: ({ page = 1, locale = 'en' }) => ({
        url: '/trending/movie/week',
        params: {
          language: getTmdbLanguage(locale),
          page,
        },
      }),
      providesTags: ['Movie'],
    }),

    // Get now playing movies
    getNowPlayingMovies: builder.query<
      TmdbPaginatedResponse<TmdbMovie>,
      { page?: number; locale?: Locale }
    >({
      query: ({ page = 1, locale = 'en' }) => ({
        url: '/movie/now_playing',
        params: {
          language: getTmdbLanguage(locale),
          page,
        },
      }),
      providesTags: ['Movie'],
    }),

    // Get top rated movies
    getTopRatedMovies: builder.query<
      TmdbPaginatedResponse<TmdbMovie>,
      { page?: number; locale?: Locale }
    >({
      query: ({ page = 1, locale = 'en' }) => ({
        url: '/movie/top_rated',
        params: {
          language: getTmdbLanguage(locale),
          page,
        },
      }),
      providesTags: ['Movie'],
    }),

    // Get upcoming movies
    getUpcomingMovies: builder.query<
      TmdbPaginatedResponse<TmdbMovie>,
      { page?: number; locale?: Locale }
    >({
      query: ({ page = 1, locale = 'en' }) => ({
        url: '/movie/upcoming',
        params: {
          language: getTmdbLanguage(locale),
          page,
        },
      }),
      providesTags: ['Movie'],
    }),

    // Search movies
    searchMovies: builder.query<
      TmdbPaginatedResponse<TmdbMovie>,
      { query: string; page?: number; locale?: Locale }
    >({
      query: ({ query, page = 1, locale = 'en' }) => ({
        url: '/search/movie',
        params: {
          query,
          page,
          include_adult: false,
          language: getTmdbLanguage(locale),
        },
      }),
      providesTags: ['Movie'],
    }),

    // Get movie details
    getMovieDetails: builder.query<TmdbMovieDetails, { movieId: number; locale?: Locale }>({
      query: ({ movieId, locale = 'en' }) => ({
        url: `/movie/${movieId}`,
        params: {
          language: getTmdbLanguage(locale),
        },
      }),
      providesTags: (result, error, { movieId }) => [{ type: 'MovieDetails', id: movieId }],
    }),

    // Get movie credits
    getMovieCredits: builder.query<TmdbCredits, { movieId: number; locale?: Locale }>({
      query: ({ movieId, locale = 'en' }) => ({
        url: `/movie/${movieId}/credits`,
        params: {
          language: getTmdbLanguage(locale),
        },
      }),
      providesTags: (result, error, { movieId }) => [{ type: 'Credits', id: movieId }],
    }),

    // Get genres list
    getGenres: builder.query<{ genres: TmdbGenre[] }, { locale?: Locale }>({
      query: ({ locale = 'en' }) => ({
        url: '/genre/movie/list',
        params: {
          language: getTmdbLanguage(locale),
        },
      }),
    }),

    // Get person details
    getPersonDetails: builder.query<TmdbPerson, { personId: number; locale?: Locale }>({
      query: ({ personId, locale = 'en' }) => ({
        url: `/person/${personId}`,
        params: {
          language: getTmdbLanguage(locale),
        },
      }),
      providesTags: (result, error, { personId }) => [{ type: 'MovieDetails', id: `person-${personId}` }],
    }),

    // Get person movie credits
    getPersonMovieCredits: builder.query<TmdbPersonCredits, { personId: number; locale?: Locale }>({
      query: ({ personId, locale = 'en' }) => ({
        url: `/person/${personId}/movie_credits`,
        params: {
          language: getTmdbLanguage(locale),
        },
      }),
      providesTags: (result, error, { personId }) => [{ type: 'MovieDetails', id: `person-credits-${personId}` }],
    }),
  }),
});

export const {
  useGetPopularMoviesQuery,
  useGetTrendingMoviesQuery,
  useGetNowPlayingMoviesQuery,
  useGetTopRatedMoviesQuery,
  useGetUpcomingMoviesQuery,
  useSearchMoviesQuery,
  useGetMovieDetailsQuery,
  useGetMovieCreditsQuery,
  useGetGenresQuery,
  useGetPersonDetailsQuery,
  useGetPersonMovieCreditsQuery,
} = moviesApi;

