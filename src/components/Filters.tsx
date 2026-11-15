import React from 'react';
import { 
  RotateCcw, 
  LayoutGrid, 
  List
} from 'lucide-react';
import type { FilterState } from '../types/program';

interface FiltersProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  viewMode: 'grid' | 'list';
  setViewMode: (mode: 'grid' | 'list') => void;
  totalFiltered: number;
  totalAll: number;
}

export const Filters: React.FC<FiltersProps> = ({
  filters,
  setFilters,
  viewMode,
  setViewMode,
  totalFiltered,
  totalAll,
}) => {
  const levels = [
    { value: 'all', label: 'Todos los niveles' },
    { value: 'Tecnólogo', label: 'Tecnólogo (27 meses)' },
    { value: 'Técnico', label: 'Técnico (15 meses)' },
    { value: 'Especialización Tecnológica', label: 'Especialización (6 meses)' },
    { value: 'Curso Corto', label: 'Cursos Cortos (40-48h)' },
  ];

  const categories = [
    { value: 'all', label: 'Todas las áreas TIC' },
    { value: 'Desarrollo de Software', label: 'Desarrollo de Software & Web' },
    { value: 'Ciberseguridad', label: 'Ciberseguridad & SOC' },
    { value: 'Inteligencia Artificial', label: 'Inteligencia Artificial & Datos' },
    { value: 'Infraestructura y Redes', label: 'Redes Cisco & Conectividad' },
    { value: 'Multimedia & Videojuegos', label: 'Videojuegos & Multimedia' },
    { value: 'Automatización & Cloud', label: 'Cloud Computing & IoT' },
  ];

  const modalities = [
    { value: 'all', label: 'Todas las modalidades' },
    { value: 'Presencial Sede TIC', label: 'Presencial Sede TIC' },
    { value: 'Híbrido', label: 'Híbrido' },
    { value: '100% Virtual', label: '100% Virtual' },
  ];

  const shifts = [
    { value: 'all', label: 'Todas las jornadas' },
    { value: 'Diurna (Mañana)', label: 'Diurna (Mañana)' },
    { value: 'Mixta (Tarde)', label: 'Mixta (Tarde)' },
    { value: 'Nocturna', label: 'Nocturna' },
    { value: 'Fines de Semana', label: 'Fines de Semana' },
  ];

  const hasActiveFilters = 
    filters.level !== 'all' || 
    filters.category !== 'all' || 
    filters.modality !== 'all' || 
    filters.shift !== 'all' || 
    filters.onlyAvailableSlots ||
    filters.searchQuery.length > 0;

  const handleResetFilters = () => {
    setFilters({
      searchQuery: '',
      level: 'all',
      category: 'all',
      modality: 'all',
      shift: 'all',
      onlyAvailableSlots: false,
      sortBy: 'featured',
    });
  };

  return (
    <div id="oferta-academica" className="py-6 scroll-mt-24">
      {/* Top Bar: Title, Count, Sort, View Mode */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Catálogo de Oferta TIC Vigente
            </h2>
            <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
              {totalFiltered} de {totalAll} programas
            </span>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Filtra por área de interés, nivel académico o modalidad de estudio.
          </p>
        </div>

        {/* View mode & Sort */}
        <div className="flex items-center gap-3 self-end md:self-auto">
          {/* Sort By Select */}
          <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
            <span className="text-xs font-medium text-slate-400 hidden sm:inline">Ordenar:</span>
            <select
              value={filters.sortBy}
              onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value as any }))}
              className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs sm:text-sm rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#39A900]"
            >
              <option value="featured">Destacados y recomendados</option>
              <option value="slots">Mayor disponibilidad de cupos</option>
              <option value="title">Nombre del programa (A-Z)</option>
            </select>
          </div>

          {/* Grid/List switch */}
          <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'grid' 
                  ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-sm' 
                  : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
              }`}
              title="Vista en cuadrícula"
              aria-label="Vista de cuadrícula"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'list' 
                  ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-sm' 
                  : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
              }`}
              title="Vista en lista detallada"
              aria-label="Vista de lista"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Advanced Filter Select Controls */}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Nivel */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-600 dark:text-slate-300">
            Nivel de Formación
          </label>
          <select
            value={filters.level}
            onChange={(e) => setFilters(prev => ({ ...prev, level: e.target.value }))}
            className="w-full bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs sm:text-sm rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#39A900]"
          >
            {levels.map(l => (
              <option key={l.value} value={l.value}>{l.label}</option>
            ))}
          </select>
        </div>

        {/* Área Temática */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-600 dark:text-slate-300">
            Área Tecnológica
          </label>
          <select
            value={filters.category}
            onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
            className="w-full bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs sm:text-sm rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#39A900]"
          >
            {categories.map(c => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>
        </div>

        {/* Modalidad */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-600 dark:text-slate-300">
            Modalidad de Aprendizaje
          </label>
          <select
            value={filters.modality}
            onChange={(e) => setFilters(prev => ({ ...prev, modality: e.target.value }))}
            className="w-full bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs sm:text-sm rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#39A900]"
          >
            {modalities.map(m => (
              <option key={m.value} value={m.value}>{m.label}</option>
            ))}
          </select>
        </div>

        {/* Jornada */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-600 dark:text-slate-300">
            Jornada / Horario
          </label>
          <select
            value={filters.shift}
            onChange={(e) => setFilters(prev => ({ ...prev, shift: e.target.value }))}
            className="w-full bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs sm:text-sm rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#39A900]"
          >
            {shifts.map(s => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Filter Toggles & Clear Button */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 pt-2">
        {/* Toggle Checkbox: Solo con cupos disponibles */}
        <label className="inline-flex items-center gap-2 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={filters.onlyAvailableSlots}
            onChange={(e) => setFilters(prev => ({ ...prev, onlyAvailableSlots: e.target.checked }))}
            className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-slate-300 dark:border-slate-700 dark:bg-slate-800"
          />
          <span className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300">
            Ocultar programas sin cupos o cerrados
          </span>
        </label>

        {/* Reset Filter Button */}
        {hasActiveFilters && (
          <button
            onClick={handleResetFilters}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-rose-600 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300 py-1 px-3 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Limpiar filtros activos
          </button>
        )}
      </div>
    </div>
  );
};
