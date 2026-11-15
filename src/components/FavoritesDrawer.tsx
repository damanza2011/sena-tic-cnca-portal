import React from 'react';
import { X, Trash2, ExternalLink, BookOpen, Heart } from 'lucide-react';
import type { Program } from '../types/program';

interface FavoritesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  favorites: Program[];
  onRemoveFavorite: (id: string) => void;
  onSelectProgram: (program: Program) => void;
}

export const FavoritesDrawer: React.FC<FavoritesDrawerProps> = ({
  isOpen,
  onClose,
  favorites,
  onRemoveFavorite,
  onSelectProgram,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white dark:bg-[#0f172a] shadow-2xl border-l border-slate-200 dark:border-slate-800 flex flex-col">
          
          {/* Drawer Header */}
          <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-900/60">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-500">
                <Heart className="w-5 h-5 fill-rose-500" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-base">
                  Mis Programas Guardados
                </h3>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  {favorites.length} {favorites.length === 1 ? 'programa' : 'programas'} en tu lista
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer List */}
          <div className="flex-1 p-5 overflow-y-auto space-y-3">
            {favorites.length === 0 ? (
              <div className="text-center py-12 space-y-3">
                <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center mx-auto">
                  <Heart className="w-6 h-6" />
                </div>
                <h4 className="font-semibold text-slate-800 dark:text-slate-200 text-sm">
                  Aún no tienes programas guardados
                </h4>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  Haz clic en el corazón de cualquier tarjeta de oferta para guardarla y comparar sus planes de estudio.
                </p>
              </div>
            ) : (
              favorites.map((prog) => (
                <div
                  key={prog.id}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 hover:border-emerald-500/60 transition-all space-y-2.5"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                        {prog.level}
                      </span>
                      <h4 
                        onClick={() => {
                          onClose();
                          onSelectProgram(prog);
                        }}
                        className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white hover:text-emerald-600 cursor-pointer line-clamp-1"
                      >
                        {prog.title}
                      </h4>
                    </div>

                    <button
                      onClick={() => onRemoveFavorite(prog.id)}
                      className="text-slate-400 hover:text-rose-500 p-1"
                      title="Quitar de guardados"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between">
                    <span>{prog.shift}</span>
                    <span className="font-semibold text-emerald-600">{prog.availableSlots} cupos</span>
                  </div>

                  <div className="flex items-center gap-2 pt-1 border-t border-slate-200/60 dark:border-slate-800">
                    <button
                      onClick={() => {
                        onClose();
                        onSelectProgram(prog);
                      }}
                      className="flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-emerald-500 flex items-center justify-center gap-1"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Ver Ficha</span>
                    </button>

                    <a
                      href="https://betowa.sena.edu.co/oferta"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-1.5 px-3 rounded-lg text-xs font-semibold bg-emerald-600 text-white hover:bg-emerald-700 flex items-center justify-center gap-1"
                    >
                      <span>Inscribirme</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer */}
          {favorites.length > 0 && (
            <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60">
              <a
                href="https://betowa.sena.edu.co/oferta"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-xl bg-[#39A900] hover:bg-[#2e8800] text-white text-xs sm:text-sm font-bold shadow-md flex items-center justify-center gap-2"
              >
                <span>Ir al Portal Betowa Oficial</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
