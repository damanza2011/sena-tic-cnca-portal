import React, { useState, useEffect } from 'react';
import { 
  X, 
  Clock, 
  MapPin, 
  Calendar, 
  CheckCircle2, 
  Briefcase, 
  BookOpen, 
  FileText, 
  ExternalLink, 
  Download, 
  Heart, 
  Share2, 
  Layers, 
  DollarSign,
  Laptop
} from 'lucide-react';
import type { Program } from '../types/program';

interface ProgramDetailModalProps {
  program: Program | null;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

export const ProgramDetailModal: React.FC<ProgramDetailModalProps> = ({
  program,
  onClose,
  isFavorite,
  onToggleFavorite,
}) => {
  const [activeTab, setActiveTab] = useState<'resumen' | 'pensum' | 'perfil' | 'requisitos' | 'sede'>('resumen');

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!program) return null;

  const handlePrintOrDownload = () => {
    window.print();
  };

  const handleShareWhatsApp = () => {
    const text = `Hola, te comparto el programa del SENA TIC CNCA: ${program.title} (${program.level}) 100% gratuito. Consulta más detalles en: ${window.location.href}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 md:p-6 animate-in fade-in duration-200">
      
      {/* Click outside backdrop */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Card */}
      <div className="relative w-full max-w-4xl bg-white dark:bg-[#0f172a] rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden z-10 flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="p-6 pb-4 border-b border-slate-200 dark:border-slate-800 bg-gradient-to-r from-emerald-500/10 via-teal-500/5 to-transparent">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700">
                  {program.level}
                </span>
                <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                  Código: {program.code}
                </span>
                <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  {program.category}
                </span>
              </div>
              
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white leading-tight">
                {program.title}
              </h2>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shrink-0"
              aria-label="Cerrar modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Metrics Bar inside Modal */}
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3 border-t border-slate-200/60 dark:border-slate-800/60 text-xs text-slate-600 dark:text-slate-300">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-500" />
              <span><strong>Duración:</strong> {program.duration}</span>
            </div>
            <div className="flex items-center gap-2">
              <Laptop className="w-4 h-4 text-emerald-500" />
              <span><strong>Modalidad:</strong> {program.modality}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-emerald-500" />
              <span><strong>Jornada:</strong> {program.shift}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-emerald-500" />
              <span className="truncate"><strong>Cupos:</strong> {program.availableSlots} de {program.totalSlots}</span>
            </div>
          </div>

          {/* Interactive Navigation Tabs */}
          <div className="mt-5 flex gap-1 sm:gap-2 overflow-x-auto no-scrollbar border-b border-slate-200 dark:border-slate-800 -mb-4">
            {[
              { id: 'resumen', label: '¿Qué aprenderás?', icon: BookOpen },
              { id: 'pensum', label: 'Plan de Formación', icon: Layers },
              { id: 'perfil', label: 'Perfil y Empleo', icon: Briefcase },
              { id: 'requisitos', label: 'Requisitos', icon: FileText },
              { id: 'sede', label: 'Horarios y Sede', icon: MapPin },
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-1.5 px-3 py-2.5 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition-all ${
                    isActive
                      ? 'border-[#39A900] text-[#39A900] dark:text-emerald-400'
                      : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* TAB 1: RESUMEN Y QUÉ APRENDERÁS */}
          {activeTab === 'resumen' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                  Descripción General del Programa
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {program.summary}
                </p>
              </div>

              <div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  Competencias Principales que Desarrollarás
                </h4>
                <div className="space-y-2">
                  {program.whatYouLearn.map((item, index) => (
                    <div 
                      key={index} 
                      className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-800"
                    >
                      <span className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {index + 1}
                      </span>
                      <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white mb-3">
                  Tecnologías y Herramientas que Dominarás
                </h4>
                <div className="flex flex-wrap gap-2">
                  {program.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-semibold text-xs border border-emerald-200 dark:border-emerald-800"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PENSUM Y FASES */}
          {activeTab === 'pensum' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white">
                    Malla Curricular por Fases Formativas
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Estructura pedagógica basada en proyectos reales y etapa productiva.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {program.syllabus.map((phase, pIndex) => (
                  <div 
                    key={pIndex} 
                    className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                        {phase.phase}
                      </span>
                      <span className="text-xs text-slate-400 font-mono">
                        Fase 0{pIndex + 1}
                      </span>
                    </div>

                    <h5 className="text-sm font-bold text-slate-900 dark:text-white mb-3">
                      {phase.title}
                    </h5>

                    <ul className="space-y-1.5">
                      {phase.modules.map((mod, mIndex) => (
                        <li key={mIndex} className="text-xs text-slate-600 dark:text-slate-300 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                          <span>{mod}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: PERFIL DE EGRESO Y EMPLEO */}
          {activeTab === 'perfil' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                  Perfil Ocupacional
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {program.graduateProfile}
                </p>
              </div>

              {/* Rango salarial y mercado */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20">
                <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-300 font-bold text-xs uppercase tracking-wider mb-1">
                  <DollarSign className="w-4 h-4" />
                  Salario Promedio Proyectado en Colombia
                </div>
                <div className="text-2xl font-black text-slate-900 dark:text-white">
                  {program.averageSalary}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Basado en convenios del SENA con empresas del clúster tecnológico nacional.
                </div>
              </div>

              <div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white mb-3">
                  Cargos y Roles a los que Podrás Postularte
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {program.jobRoles.map((role, idx) => (
                    <div 
                      key={idx}
                      className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 flex items-center gap-2.5"
                    >
                      <Briefcase className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">
                        {role}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: REQUISITOS */}
          {activeTab === 'requisitos' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white mb-1">
                  Requisitos de Inscripción y Matrícula
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
                  Documentación exigida por la reglamentación nacional del SENA.
                </p>

                <div className="space-y-2.5">
                  {program.requirements.map((req, rIndex) => (
                    <div 
                      key={rIndex}
                      className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 flex items-start gap-3"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-slate-700 dark:text-slate-200">
                        {req}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 text-xs text-amber-800 dark:text-amber-300">
                <strong>Importante:</strong> La formación en el SENA es 100% gratuita y no requiere intermediarios ni pagos por trámites de inscripción ni exámenes de admisión.
              </div>
            </div>
          )}

          {/* TAB 5: HORARIOS Y SEDE */}
          {activeTab === 'sede' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 space-y-4">
                <div>
                  <div className="text-xs font-semibold text-slate-400">Sede y Laboratorio Asignado</div>
                  <div className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2 mt-1">
                    <MapPin className="w-5 h-5 text-emerald-500 shrink-0" />
                    <span>{program.campus}</span>
                  </div>
                </div>

                <div>
                  <div className="text-xs font-semibold text-slate-400">Horario de Clases</div>
                  <div className="text-sm font-semibold text-slate-800 dark:text-slate-200 mt-1">
                    {program.schedule}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-200 dark:border-slate-700/60 text-xs">
                  <div>
                    <span className="text-slate-400">Cierre de inscripciones:</span>
                    <p className="font-bold text-rose-600 dark:text-rose-400">{program.applicationDeadline}</p>
                  </div>
                  <div>
                    <span className="text-slate-400">Inicio de formación:</span>
                    <p className="font-bold text-emerald-600 dark:text-emerald-400">{program.startDate}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Bottom Sticky Actions */}
        <div className="p-4 sm:p-5 border-t border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/80 flex flex-wrap items-center justify-between gap-3">
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleFavorite(program.id)}
              className={`p-2.5 rounded-xl border transition-colors flex items-center gap-1.5 text-xs font-medium ${
                isFavorite 
                  ? 'border-rose-300 bg-rose-50 text-rose-500 dark:bg-rose-950 dark:border-rose-900' 
                  : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-rose-500'
              }`}
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-rose-500' : ''}`} />
              <span className="hidden sm:inline">{isFavorite ? 'Guardado' : 'Guardar'}</span>
            </button>

            <button
              onClick={handlePrintOrDownload}
              className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5 text-xs font-medium"
              title="Descargar o Imprimir Pensum"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Descargar Pensum</span>
            </button>

            <button
              onClick={handleShareWhatsApp}
              className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 transition-colors flex items-center gap-1.5 text-xs font-medium"
              title="Compartir por WhatsApp"
            >
              <Share2 className="w-4 h-4" />
              <span className="hidden sm:inline">Compartir</span>
            </button>
          </div>

          {/* Primary Action Button */}
          <div className="flex items-center gap-2">
            <a
              href="https://betowa.sena.edu.co/oferta"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-[#39A900] hover:bg-[#2e8800] text-white text-xs sm:text-sm font-bold shadow-md shadow-emerald-600/30 transition-all flex items-center gap-2 active:scale-95"
            >
              <span>Postularme en Betowa</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

        </div>

      </div>
    </div>
  );
};
