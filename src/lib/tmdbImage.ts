const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

export function getPosterUrl(
  posterPath: string | null,
  size: 'w154' | 'w185' | 'w342' | 'w500' | 'w780' | 'original' = 'w500'
): string | null {
  if (!posterPath) return null;
  return `${TMDB_IMAGE_BASE_URL}/${size}${posterPath}`;
}

export function getBackdropUrl(
  backdropPath: string | null,
  size: 'w300' | 'w780' | 'w1280' | 'original' = 'w780'
): string | null {
  if (!backdropPath) return null;
  return `${TMDB_IMAGE_BASE_URL}/${size}${backdropPath}`;
}

export function getProfileUrl(
  profilePath: string | null,
  size: 'w45' | 'w185' | 'h632' | 'original' = 'w185'
): string | null {
  if (!profilePath) return null;
  return `${TMDB_IMAGE_BASE_URL}/${size}${profilePath}`;
}

