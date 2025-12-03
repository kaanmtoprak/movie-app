interface RatingBadgeProps {
  rating: number;
  voteCount?: number;
  size?: 'sm' | 'md' | 'lg';
}

export default function RatingBadge({
  rating,
  voteCount,
  size = 'md',
}: RatingBadgeProps) {
  const sizeClasses = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-1.5',
    lg: 'text-base px-4 py-2',
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 8) return 'bg-green-600 text-white';
    if (rating >= 6) return 'bg-yellow-600 text-white';
    if (rating >= 4) return 'bg-orange-600 text-white';
    return 'bg-red-600 text-white';
  };

  return (
    <div
      className={`inline-flex items-center gap-1.5 rounded-full font-semibold ${sizeClasses[size]} ${getRatingColor(rating)}`}
    >
      <svg
        className="h-4 w-4 fill-current"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
      <span>{rating.toFixed(1)}</span>
      {voteCount !== undefined && (
        <span className="text-xs opacity-90">({voteCount.toLocaleString()})</span>
      )}
    </div>
  );
}

