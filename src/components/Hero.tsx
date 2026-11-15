import React from 'react';
import { 
  Search, 
  Sparkles, 
  Users, 
  ShieldCheck, 
  TrendingUp, 
  X,
  Code2
} from 'lucide-react';

interface HeroProps {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  totalPrograms: number;
  totalSlots: number;
  onSelectCategoryChip: (category: string) => void;
  onOpenChatbot: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  searchQuery,
  setSearchQuery,
  totalPrograms,
  totalSlots,
  onSelectCategoryChip,
  onOpenChatbot,
}) => {
  const quickSearches = [
    { label: 'ADSO / Desarrollo', query: 'ADSO' },
    { label: 'Ciberseguridad & SOC', query: 'Ciberseguridad' },
    { label: 'Inteligencia Artificial', query: 'Inteligencia Artificial' },
    { label: 'Cloud AWS & Azure', query: 'Cloud' },
    { label: 'Flutter / Móviles', query: 'Flutter' },
    { label: 'React 19 & Next.js', query: 'React' },
  ];

  return (
    <div className="relative overflow-hidden pt-10 pb-16 lg:pt-14 lg:pb-20 border-b border-slate-200/60 dark:border-slate-800/80">
      {/* Decorative gradient glow backgrounds */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-tr from-emerald-500/15 via-teal-400/10 to-indigo-500/15 blur-3xl pointer-events-none -z-10 rounded-full" />
      <div className="absolute -top-20 -right-20 w-80 h-80 bg-emerald-500/10 blur-3xl rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Notification Badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/70 text-emerald-800 dark:text-emerald-300 text-xs sm:text-sm font-medium shadow-sm">
            <span className="flex h-2 w-2 rounded-full bg-[#39A900] animate-ping" />
            <span className="font-bold">Convocatoria I-2026 Abierta</span>
            <span className="text-emerald-600 dark:text-emerald-400 hidden sm:inline">• Sede TIC Colombo Alemán</span>
          </div>
        </div>

        {/* Main Title & Value Prop */}
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.15]">
            El Futuro Digital Empieza Aquí:{' '}
            <span className="bg-gradient-to-r from-[#39A900] via-emerald-500 to-teal-500 bg-clip-text text-transparent">
              Sede TIC SENA CNCA
            </span>
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-slate-600 dark:text-slate-300 font-normal max-w-3xl mx-auto leading-relaxed">
            Fórmate <strong>100% gratis</strong> en carreras y cursos de alta demanda tecnológica: Desarrollo Fullstack, Ciberseguridad Ofensiva, Inteligencia Artificial, Redes Cisco y Arquitectura Cloud con laboratorios de última generación.
          </p>
        </div>

        {/* Global Search Bar */}
        <div className="mt-8 max-w-3xl mx-auto">
          <div className="relative flex items-center shadow-xl shadow-slate-200/50 dark:shadow-black/30 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700/80 focus-within:border-[#39A900] dark:focus-within:border-emerald-500 transition-all p-1.5 sm:p-2">
            <div className="pl-3 text-slate-400">
              <Search className="w-5 h-5 sm:w-6 sm:h-6 text-[#39A900]" />
            </div>
            
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="¿Qué quieres aprender? Ej: Python, ADSO, Ciberseguridad, React, Cloud..."
              className="w-full bg-transparent px-3 py-2 text-sm sm:text-base text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
              aria-label="Buscar en la oferta formativa"
            />

            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors mr-1"
                aria-label="Borrar búsqueda"
              >
                <X className="w-4 h-4" />
              </button>
            )}

            {/* AI Assistant Quick Pill */}
            <button
              onClick={onOpenChatbot}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-xs sm:text-sm font-semibold shadow-md shadow-indigo-500/25 transition-all shrink-0 active:scale-95"
            >
              <Sparkles className="w-4 h-4" />
              <span>Orientador IA</span>
            </button>
          </div>

          {/* Quick Search Tags */}
          <div className="mt-3 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium mr-1">
              Búsquedas sugeridas:
            </span>
            {quickSearches.map((tag) => (
              <button
                key={tag.query}
                onClick={() => {
                  setSearchQuery(tag.query);
                  onSelectCategoryChip(tag.query);
                }}
                className={`text-xs px-3 py-1 rounded-full border transition-all ${
                  searchQuery.toLowerCase() === tag.query.toLowerCase()
                    ? 'bg-emerald-500 text-white border-emerald-500 font-semibold'
                    : 'bg-white dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-emerald-400 hover:text-emerald-600 dark:hover:text-emerald-400'
                }`}
              >
                {tag.label}
              </button>
            ))}
          </div>
        </div>

        {/* Live Metrics Grid */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto">
          
          <div className="p-4 rounded-2xl bg-white/70 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200/80 dark:border-slate-700/60 shadow-sm flex items-center space-x-3.5">
            <div className="p-3 rounded-xl bg-emerald-100 dark:bg-emerald-950/70 text-[#39A900]">
              <Code2 className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-black text-slate-900 dark:text-white">
                {totalPrograms}
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                Programas TIC Activos
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/70 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200/80 dark:border-slate-700/60 shadow-sm flex items-center space-x-3.5">
            <div className="p-3 rounded-xl bg-blue-100 dark:bg-blue-950/70 text-blue-600 dark:text-blue-400">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-black text-slate-900 dark:text-white">
                +{totalSlots}
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                Cupos Disponibles
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/70 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200/80 dark:border-slate-700/60 shadow-sm flex items-center space-x-3.5">
            <div className="p-3 rounded-xl bg-amber-100 dark:bg-amber-950/70 text-amber-600 dark:text-amber-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-black text-slate-900 dark:text-white">
                $0 COP
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                100% Gratuito y Público
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/70 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200/80 dark:border-slate-700/60 shadow-sm flex items-center space-x-3.5">
            <div className="p-3 rounded-xl bg-purple-100 dark:bg-purple-950/70 text-purple-600 dark:text-purple-400">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-black text-slate-900 dark:text-white">
                87%
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                Empleabilidad TIC SENA
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
