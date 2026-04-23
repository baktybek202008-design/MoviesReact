import { Link } from "react-router-dom";
import { useFavorites } from "../context/favorites-context";
import type React from "react";


export default function MovieCard({ movie }: { movie: any }) {
    const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites();
    
    const handleFavorites = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if(isFavorite(movie.id)) {
            removeFromFavorites(movie.id);
        } else {
            addToFavorites(movie.id);
        }
    };

    const favorite = isFavorite(movie.id);
    const year = movie?.startYear || "N/A";
    const rating = movie.rating?.aggregateRating || "N/A";
    const genres = movie?.genres || [];

    return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow">
      <Link to={`/movie/${movie.id}`} className="flex-1">
        <div className="aspect-[2/3] overflow-hidden bg-slate-100 relative">
          {movie.primaryImage?.url ? (
            <img
              src={movie.primaryImage.url}
              alt={movie.primaryTitle}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-slate-400">
              Нет постера
            </div>
          )}
          {rating !== "N/A" && (
            <div className="absolute top-2 right-2 bg-amber-500 text-white text-sm font-bold rounded-full w-10 h-10 flex items-center justify-center shadow-lg">
              {typeof rating === 'number' ? rating.toFixed(1) : rating}
            </div>
          )}
        </div>

        <div className="p-4">
          <h3 className="font-bold text-slate-800 line-clamp-2 leading-tight h-10">
            {movie.primaryTitle}
          </h3>
          
          <div className="flex items-center justify-between mt-2">
            <span className="text-xs text-slate-500">{year}</span>
            {rating !== "N/A" && (
              <div className="flex items-center gap-1">
                <span className="text-yellow-400">★</span>
                <span className="text-xs font-semibold text-slate-700">{parseFloat(rating).toFixed(1)}</span>
              </div>
            )}
          </div>

          {genres.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1">
              {genres.slice(0, 2).map((genre, idx) => (
                <span 
                  key={idx} 
                  className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-2 py-1 rounded"
                >
                  {genre}
                </span>
              ))}
              {genres.length > 2 && (
                <span className="text-xs text-slate-500 px-1">+{genres.length - 2}</span>
              )}
            </div>
          )}
        </div>
      </Link>

      <div className="p-4 pt-0">
        <button
          onClick={handleFavorites}
          className={`w-full py-2 px-4 rounded-lg font-medium transition-all active:scale-95 ${
            favorite
              ? "bg-rose-50 text-rose-600 border border-rose-200 hover:bg-rose-100"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          {favorite ? "Удалить" : "В избранное"}
        </button>
      </div>
    </div>
  );
}