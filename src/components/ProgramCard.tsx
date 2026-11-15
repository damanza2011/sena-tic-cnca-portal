import React, { useState } from 'react';
import { 
  Clock, 
  MapPin, 
  Laptop, 
  Calendar, 
  ArrowRight, 
  Heart, 
  Share2, 
  Check, 
  ChevronRight,
  Users
} from 'lucide-react';
import confetti from 'canvas-confetti';
import type { Program } from '../types/program';

interface ProgramCardProps {
  program: Program;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onSelectProgram: (program: Program) => void;
  viewMode: 'grid' | 'list';
}

export const ProgramCard: React.FC<ProgramCardProps> = ({
  program,
  isFavorite,
  onToggleFavorite,
  onSelectProgram,
  viewMode,
}) => {
  const [copied, setCopied] = useState(false);

  // Status badge styling
  const getStatusBadge = () => {
    switch (program.status) {
      case 'closing_soon':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300 border border-amber-300 dark:border-amber-700/60 animate-pulse">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            {program.statusLabel}
          </span>
        );
      case 'open':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700/60">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            {program.statusLabel}
          </span>
        );
      case 'upcoming':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800 dark:bg-blue-950/80 dark:text-blue-300 border border-blue-300 dark:border-blue-700/60">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            {program.statusLabel}
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
            {program.statusLabel}
          </span>
        );
    }
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isFavorite) {
      confetti({
        particleCount: 30,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#39A900', '#f43f5e', '#3b82f6']
      });
    }
    onToggleFavorite(program.id);
  };

  const handleShareClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const shareText = `¡Mira esta oferta educativa en el SENA TIC CNCA! Programa: ${program.title} (${program.level}) - 100% Gratuito: ${window.location.origin}/#${program.id}`;
    
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const slotsPercent = Math.min(
    100,
    Math.round((program.availableSlots / program.totalSlots) * 100)
  );

  // LIST VIEW LAYOUT
  if (viewMode === 'list') {
    return (
      <div 
        onClick={() => onSelectProgram(program)}
        className="group relative bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 hover:border-emerald-500/80 dark:hover:border-emerald-500/80 p-5 shadow-sm hover:shadow-lg transition-all duration-200 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-6"
      >
        <div className="flex-1 space-y-3">
          {/* Top meta tags */}
          <div className="flex flex-wrap items-center gap-2">
            {getStatusBadge()}
            <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
              {program.code}
            </span>
            <span className="text-xs font-medium text-emerald-700 dark:text-emerald-400">
              {program.level}
            </span>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              {program.category}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
            {program.title}
          </h3>

          <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
            {program.summary}
          </p>

          {/* Key Quick Info Pills */}
          <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-slate-600 dark:text-slate-300 pt-1">
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>{program.duration}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>{program.shift}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Laptop className="w-3.5 h-3.5 text-slate-400" />
              <span>{program.modality}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              <span className="truncate max-w-[200px]">{program.campus}</span>
            </div>
          </div>
        </div>

        {/* Right CTA column in list view */}
        <div className="flex md:flex-col items-center md:items-end justify-between md:justify-center gap-4 shrink-0 border-t md:border-t-0 md:border-l border-slate-100 dark:border-slate-800 pt-4 md:pt-0 md:pl-6">
          {/* Slots count */}
          <div className="text-left md:text-right">
            <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Disponibilidad:
            </div>
            <div className="text-sm font-bold text-slate-900 dark:text-white">
              {program.availableSlots} cupos <span className="font-normal text-xs text-slate-400">/ {program.totalSlots}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleFavoriteClick}
              className={`p-2 rounded-xl border transition-colors ${
                isFavorite 
                  ? 'border-rose-300 bg-rose-50 text-rose-500 dark:bg-rose-950/40 dark:border-rose-900' 
                  : 'border-slate-200 dark:border-slate-700 text-slate-400 hover:text-rose-500'
              }`}
              title="Guardar en favoritos"
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-rose-500' : ''}`} />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onSelectProgram(program);
              }}
              className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-1.5 shadow-sm transition-all"
            >
              <span>Ver Ficha</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // GRID VIEW LAYOUT (DEFAULT)
  return (
    <div 
      onClick={() => onSelectProgram(program)}
      className="group relative bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 hover:border-emerald-500/80 dark:hover:border-emerald-500/80 p-5 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
    >
      {/* Top Header: Badge & Favorite button */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          {getStatusBadge()}

          <div className="flex items-center gap-1">
            {/* Share link button */}
            <button
              onClick={handleShareClick}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title={copied ? '¡Enlace copiado!' : 'Compartir oferta'}
            >
              {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Share2 className="w-4 h-4" />}
            </button>

            {/* Favorite toggle */}
            <button
              onClick={handleFavoriteClick}
              className={`p-1.5 rounded-lg transition-colors ${
                isFavorite 
                  ? 'text-rose-500' 
                  : 'text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30'
              }`}
              title="Guardar programa"
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-rose-500' : ''}`} />
            </button>
          </div>
        </div>

        {/* Level and Category metadata */}
        <div className="flex items-center gap-2 mb-2 text-xs font-semibold">
          <span className="px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60">
            {program.level}
          </span>
          <span className="text-slate-400 dark:text-slate-500">•</span>
          <span className="text-slate-500 dark:text-slate-400 font-medium">
            {program.code}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors leading-snug mb-2.5">
          {program.title}
        </h3>

        {/* Summary */}
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 line-clamp-2 mb-4 leading-relaxed">
          {program.summary}
        </p>

        {/* Tech Skills Pills */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {program.skills.slice(0, 4).map((skill) => (
            <span
              key={skill}
              className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/60"
            >
              {skill}
            </span>
          ))}
          {program.skills.length > 4 && (
            <span className="text-[11px] font-medium px-1.5 py-0.5 rounded-md text-slate-400">
              +{program.skills.length - 4}
            </span>
          )}
        </div>
      </div>

      {/* Card Footer: Metadata & CTA */}
      <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 space-y-3.5">
        
        {/* Quick meta details */}
        <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-300">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{program.duration}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Laptop className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{program.modality}</span>
          </div>
          <div className="flex items-center gap-1.5 col-span-2">
            <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{program.shift}</span>
          </div>
        </div>

        {/* Cupos Bar */}
        <div>
          <div className="flex justify-between items-center text-xs mb-1">
            <span className="text-slate-500 dark:text-slate-400 font-medium flex items-center gap-1">
              <Users className="w-3 h-3" />
              Cupos disponibles
            </span>
            <span className="font-bold text-slate-800 dark:text-slate-200">
              {program.availableSlots} / {program.totalSlots}
            </span>
          </div>
          <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all duration-500 ${
                slotsPercent > 50 
                  ? 'bg-emerald-500' 
                  : slotsPercent > 20 
                    ? 'bg-amber-500' 
                    : 'bg-rose-500'
              }`}
              style={{ width: `${Math.max(8, slotsPercent)}%` }}
            />
          </div>
        </div>

        {/* Buttons Action */}
        <div className="flex items-center gap-2 pt-1">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelectProgram(program);
            }}
            className="flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-semibold bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm hover:shadow transition-all flex items-center justify-center gap-1.5 group-hover:scale-[1.01]"
          >
            <span>Ver Pensum y Ficha</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
