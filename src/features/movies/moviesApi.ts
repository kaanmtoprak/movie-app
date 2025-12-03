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

export const moviesApi = createApi({
  reducerPath: 'moviesApi',
  baseQuery,
  tagTypes: ['Movie', 'MovieDetails', 'Credits'],
  endpoints: (builder) => ({
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

    getMovieDetails: builder.query<TmdbMovieDetails, { movieId: number; locale?: Locale }>({
      query: ({ movieId, locale = 'en' }) => ({
        url: `/movie/${movieId}`,
        params: {
          language: getTmdbLanguage(locale),
        },
      }),
      providesTags: (result, error, { movieId }) => [{ type: 'MovieDetails', id: movieId }],
    }),

    getMovieCredits: builder.query<TmdbCredits, { movieId: number; locale?: Locale }>({
      query: ({ movieId, locale = 'en' }) => ({
        url: `/movie/${movieId}/credits`,
        params: {
          language: getTmdbLanguage(locale),
        },
      }),
      providesTags: (result, error, { movieId }) => [{ type: 'Credits', id: movieId }],
    }),

    getGenres: builder.query<{ genres: TmdbGenre[] }, { locale?: Locale }>({
      query: ({ locale = 'en' }) => ({
        url: '/genre/movie/list',
        params: {
          language: getTmdbLanguage(locale),
        },
      }),
    }),

    getPersonDetails: builder.query<TmdbPerson, { personId: number; locale?: Locale }>({
      query: ({ personId, locale = 'en' }) => ({
        url: `/person/${personId}`,
        params: {
          language: getTmdbLanguage(locale),
        },
      }),
      providesTags: (result, error, { personId }) => [{ type: 'MovieDetails', id: `person-${personId}` }],
    }),

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

