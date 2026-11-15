import { useState, useEffect, useMemo } from 'react';
import rawPrograms from './data/programs.json';
import type { Program, FilterState } from './types/program';
import { createProgramSearchIndex, filterAndSortPrograms } from './utils/search';

import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Filters } from './components/Filters';
import { ProgramCard } from './components/ProgramCard';
import { ProgramDetailModal } from './components/ProgramDetailModal';
import { ChatbotWidget } from './components/ChatbotWidget';
import { FavoritesDrawer } from './components/FavoritesDrawer';
import { AdmissionGuide } from './components/AdmissionGuide';
import { Footer } from './components/Footer';

import { SearchX, RotateCcw } from 'lucide-react';

export function App() {
  const programs = rawPrograms as Program[];

  // Dark Mode State
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('sena_theme');
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('sena_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('sena_theme', 'light');
    }
  }, [darkMode]);

  // Favorites State
  const [favoriteIds, setFavoriteIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('sena_favorites');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const toggleFavorite = (id: string) => {
    setFavoriteIds(prev => {
      const next = prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id];
      localStorage.setItem('sena_favorites', JSON.stringify(next));
      return next;
    });
  };

  const favoritePrograms = useMemo(() => {
    return programs.filter(p => favoriteIds.includes(p.id));
  }, [programs, favoriteIds]);

  // Filter & Search State
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: '',
    level: 'all',
    category: 'all',
    modality: 'all',
    shift: 'all',
    onlyAvailableSlots: false,
    sortBy: 'featured',
  });

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);

  // Fuse.js Index for Instant Fuzzy Search
  const fuseIndex = useMemo(() => createProgramSearchIndex(programs), [programs]);

  // Filtered Programs Result
  const filteredPrograms = useMemo(() => {
    return filterAndSortPrograms(programs, filters, fuseIndex);
  }, [programs, filters, fuseIndex]);

  // Total Slots Metric
  const totalSlotsSum = useMemo(() => {
    return programs.reduce((acc, curr) => acc + curr.availableSlots, 0);
  }, [programs]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#090d16] text-slate-900 dark:text-slate-100 transition-colors">
      
      {/* Institutional Top Header */}
      <Header
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        favoritesCount={favoriteIds.length}
        onOpenFavorites={() => setIsFavoritesOpen(true)}
        onOpenChatbot={() => setIsChatbotOpen(true)}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          searchQuery={filters.searchQuery}
          setSearchQuery={(q) => setFilters(prev => ({ ...prev, searchQuery: q }))}
          totalPrograms={programs.length}
          totalSlots={totalSlotsSum}
          onSelectCategoryChip={(query) => setFilters(prev => ({ ...prev, searchQuery: query }))}
          onOpenChatbot={() => setIsChatbotOpen(true)}
        />

        {/* Content Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          
          {/* Filters Bar */}
          <Filters
            filters={filters}
            setFilters={setFilters}
            viewMode={viewMode}
            setViewMode={setViewMode}
            totalFiltered={filteredPrograms.length}
            totalAll={programs.length}
          />

          {/* Programs Catalog Display */}
          {filteredPrograms.length === 0 ? (
            <div className="py-20 text-center space-y-4 max-w-md mx-auto">
              <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center mx-auto">
                <SearchX className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                No encontramos programas con esos filtros
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Prueba buscando otros términos o restablece los filtros para ver la oferta académica completa.
              </p>
              <button
                onClick={() => setFilters({
                  searchQuery: '',
                  level: 'all',
                  category: 'all',
                  modality: 'all',
                  shift: 'all',
                  onlyAvailableSlots: false,
                  sortBy: 'featured',
                })}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold transition-all shadow-md"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Restablecer todos los filtros</span>
              </button>
            </div>
          ) : (
            <div 
              className={
                viewMode === 'grid' 
                  ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4' 
                  : 'space-y-4 pt-4'
              }
            >
              {filteredPrograms.map((program) => (
                <ProgramCard
                  key={program.id}
                  program={program}
                  isFavorite={favoriteIds.includes(program.id)}
                  onToggleFavorite={toggleFavorite}
                  onSelectProgram={setSelectedProgram}
                  viewMode={viewMode}
                />
              ))}
            </div>
          )}

        </div>

        {/* Admission Guide & Campus Section */}
        <AdmissionGuide />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Detail Modal */}
      <ProgramDetailModal
        program={selectedProgram}
        onClose={() => setSelectedProgram(null)}
        isFavorite={selectedProgram ? favoriteIds.includes(selectedProgram.id) : false}
        onToggleFavorite={toggleFavorite}
      />

      {/* Favorites Drawer */}
      <FavoritesDrawer
        isOpen={isFavoritesOpen}
        onClose={() => setIsFavoritesOpen(false)}
        favorites={favoritePrograms}
        onRemoveFavorite={toggleFavorite}
        onSelectProgram={setSelectedProgram}
      />

      {/* Sara TIC Voice & Text Chatbot */}
      <ChatbotWidget
        programs={programs}
        isOpen={isChatbotOpen}
        onToggle={() => setIsChatbotOpen(!isChatbotOpen)}
        onSelectProgram={setSelectedProgram}
      />

    </div>
  );
}
export default App;
