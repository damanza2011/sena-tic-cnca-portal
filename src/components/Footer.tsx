import React from 'react';
import { GraduationCap, ExternalLink, Shield, Globe } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-[#060a12] border-t border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Brand info */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#39A900] to-[#15803d] flex items-center justify-center text-white">
                <GraduationCap className="w-5 h-5" />
              </div>
              <span className="font-black text-lg text-slate-900 dark:text-white">
                SENA <span className="text-[#39A900]">TIC CNCA</span>
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md leading-relaxed">
              Plataforma inteligente de oferta formativa de la Sede TIC del Centro Colombo Alemán (CNCA). Diseñada con estándares modernos de experiencia de usuario, búsqueda difusa y orientador de voz IA.
            </p>
            <div className="flex items-center gap-3 text-xs text-slate-400">
              <span className="flex items-center gap-1">
                <Shield className="w-3.5 h-3.5 text-emerald-500" />
                Educación Gratuita
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Globe className="w-3.5 h-3.5 text-blue-500" />
                Certificación Oficial Colombia
              </span>
            </div>
          </div>

          {/* Links Ecosistema SENA */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
              Ecosistema SENA
            </h4>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li>
                <a href="https://betowa.sena.edu.co/oferta" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-600 flex items-center gap-1">
                  <span>Portal Oficial Betowa</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="http://oferta.senasofiaplus.edu.co" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-600 flex items-center gap-1">
                  <span>SENA SofiaPlus</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="https://ape.sena.edu.co" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-600 flex items-center gap-1">
                  <span>Agencia Pública de Empleo (APE)</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="https://www.sena.edu.co" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-600 flex items-center gap-1">
                  <span>Portal Institucional SENA</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Áreas TIC */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
              Áreas de Formación
            </h4>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li>Desarrollo de Software y Móvil</li>
              <li>Ciberseguridad y Hacking Ético</li>
              <li>Inteligencia Artificial y ML</li>
              <li>Cloud Computing AWS & Azure</li>
              <li>Redes Cisco y Telecomunicaciones</li>
            </ul>
          </div>

        </div>

        {/* Bottom Credits */}
        <div className="pt-8 border-t border-slate-200 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <div>
            © 2026 Servicio Nacional de Aprendizaje (SENA) • Regional Atlántico / Sede TIC CNCA - Carrera 54 # 68-80, Barranquilla.
          </div>
          <div className="flex items-center gap-1">
            <span>Desarrollado con pasión para la comunidad de aprendices TIC</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
