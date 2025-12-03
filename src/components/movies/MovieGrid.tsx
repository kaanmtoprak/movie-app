import { TmdbMovie } from '@/types/tmdb';
import MovieCard from './MovieCard';
import Skeleton from '@/components/ui/Skeleton';

interface MovieGridProps {
  movies: TmdbMovie[];
  isLoading?: boolean;
  skeletonCount?: number;
}

export default function MovieGrid({
  movies,
  isLoading = false,
  skeletonCount = 12,
}: MovieGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 items-stretch">
        {Array.from({ length: skeletonCount }).map((_, index) => (
          <div key={index} className="space-y-2">
            <Skeleton className="h-[300px] w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  if (movies.length === 0 && !isLoading) {
    return (
      <div className="py-12 text-center">
        <p className="text-lg text-slate-600 dark:text-slate-400">No movies found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 items-stretch">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}

