import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMovieById } from "../services/api";


export default function MovieDetails() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        if (id) {
            getMovieById(id).then((data) => {
                setMovie(data);
            });
        }
    }, [id]);

    if (!movie) {
        return (
            <div className="max-w-6xl mx-auto px-4 py-10">
                <div className="text-center text-slate-500">Загрузка...</div>
            </div>
        );
    }

    const year = movie?.startYear || "N/A";
    const rating = movie?.rating?.aggregateRating || "N/A";
    const genres = movie?.genres || [];
    const runtime = movie?.runtimeSeconds 
        ? Math.floor(movie.runtimeSeconds / 60) 
        : "N/A";
    const plotText = movie?.plot || "Информация недоступна";

    return (
        <div className="max-w-6xl mx-auto px-4 py-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Постер */}
                <div className="md:col-span-1">
                    <div className="aspect-[2/3] bg-slate-100 rounded-lg overflow-hidden shadow-lg">
                        {movie?.primaryImage?.url ? (
                            <img 
                                src={movie.primaryImage.url} 
                                alt={movie?.originalTitle}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-400">
                                Нет постера
                            </div>
                        )}
                    </div>
                </div>

                {/* Информация */}
                <div className="md:col-span-2">
                    <h1 className="text-4xl font-bold text-slate-900 mb-2">
                        {movie?.originalTitle}
                    </h1>
                    {movie?.primaryTitle && movie.primaryTitle !== movie?.originalTitle && (
                        <p className="text-lg text-slate-600 mb-6">
                            ({movie.primaryTitle})
                        </p>
                    )}

                    {/* Основная информация */}
                    <div className="bg-slate-50 rounded-lg p-6 mb-8 border border-slate-200">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {/* Год */}
                            <div className="bg-white rounded-lg p-4 border border-slate-200">
                                <div className="text-sm text-slate-600 font-medium mb-1">Год выпуска</div>
                                <div className="text-2xl font-bold text-slate-900">
                                    {year}
                                </div>
                            </div>

                            {/* Рейтинг */}
                            <div className="bg-white rounded-lg p-4 border border-slate-200">
                                <div className="text-sm text-slate-600 font-medium mb-1">Рейтинг</div>
                                <div className="text-2xl font-bold text-amber-600">
                                    {rating !== "N/A" ? (typeof rating === 'number' ? rating.toFixed(1) : rating) : "N/A"}
                                </div>
                            </div>

                            {/* Длительность */}
                            <div className="bg-white rounded-lg p-4 border border-slate-200">
                                <div className="text-sm text-slate-600 font-medium mb-1">Длительность</div>
                                <div className="text-2xl font-bold text-slate-900">
                                    {runtime !== "N/A" ? `${runtime} мин` : "N/A"}
                                </div>
                            </div>

                            {/* Жанры */}
                            <div className="bg-white rounded-lg p-4 border border-slate-200">
                                <div className="text-sm text-slate-600 font-medium mb-1">Жанры</div>
                                <div className="text-sm">
                                    {genres.length > 0 ? (
                                        <div className="flex flex-wrap gap-1">
                                            {genres.map((genre, idx) => (
                                                <span 
                                                    key={idx} 
                                                    className="inline-block bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-semibold"
                                                >
                                                    {genre}
                                                </span>
                                            ))}
                                        </div>
                                    ) : (
                                        <span className="text-slate-500">N/A</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Описание сюжета */}
                    <div className="bg-white rounded-lg p-6 border border-slate-200">
                        <h2 className="text-xl font-bold text-slate-900 mb-4">О фильме</h2>
                        <p className="text-slate-700 leading-relaxed">
                            {plotText}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}