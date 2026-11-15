import React from 'react';
import { 
  GraduationCap, 
  MapPin, 
  Phone, 
  Clock,
  ExternalLink
} from 'lucide-react';

export const AdmissionGuide: React.FC = () => {
  const steps = [
    {
      number: '01',
      title: 'Explora y Elige tu Programa',
      desc: 'Consulta los requisitos, perfil ocupacional y jornada en este portal interactivo según tu vocación tecnológica.',
    },
    {
      number: '02',
      title: 'Inscripción en Betowa / SofiaPlus',
      desc: 'Crea tu usuario con tu documento de identidad e inscríbete seleccionando el código oficial del programa.',
    },
    {
      number: '03',
      title: 'Prueba de Selección Web (Fase I)',
      desc: 'Presenta la prueba virtual de competencias básicas (razonamiento lógico, lectura crítica y TIC) según el cronograma.',
    },
    {
      number: '04',
      title: 'Matrícula y Comienzo de Clases',
      desc: 'Carga tus documentos digitales requeridos en la plataforma oficial y asiste a la inducción presencial en la sede.',
    },
  ];

  return (
    <section id="requisitos-admision" className="py-16 border-t border-slate-200/80 dark:border-slate-800 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Step-by-Step Guide */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-[#39A900] bg-emerald-50 dark:bg-emerald-950 px-3 py-1 rounded-full border border-emerald-300 dark:border-emerald-800">
              Paso a Paso
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-3">
              ¿Cómo es el Proceso de Admisión al SENA TIC?
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
              El proceso es 100% gratuito, en línea y sin costo de formularios.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step) => (
              <div 
                key={step.number}
                className="relative p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="text-3xl font-black text-[#39A900]/30 dark:text-emerald-500/30 font-mono mb-2">
                  {step.number}
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Campus Location and Lab Facilities */}
        <div id="sede-contacto" className="p-8 rounded-3xl bg-gradient-to-br from-emerald-900 via-[#00324D] to-slate-950 text-white relative overflow-hidden shadow-2xl">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Sede TIC CNCA
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                Instalaciones de Alta Tecnología para tu Formación
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Contamos con Cyber Range Labs para prácticas de seguridad, laboratorios de desarrollo equipados con GPUs Nvidia para Machine Learning, Media Lab para renderizado 3D y Academia Cisco oficial con racks de enrutamiento empresarial.
              </p>

              <div className="space-y-2.5 pt-2 text-xs sm:text-sm text-slate-200">
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>Sede TIC Colombo Alemán: Carrera 54 # 68-80, Barranquilla</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>Atención al aspirante: Lunes a Viernes de 7:30 a.m. a 5:00 p.m.</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>Línea nacional gratuita: 018000 910270 • Barranquilla: (605) 385 0000</span>
                </div>
              </div>
            </div>

            {/* Quick Action Box */}
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 text-center space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/30">
                <GraduationCap className="w-7 h-7" />
              </div>
              <h4 className="text-lg font-bold text-white">
                ¿Listo para postularte?
              </h4>
              <p className="text-xs text-slate-300">
                Accede directamente a la plataforma oficial de registro de ofertas del SENA para formalizar tu inscripción.
              </p>
              <a
                href="https://betowa.sena.edu.co/oferta"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm transition-all shadow-lg shadow-emerald-500/30"
              >
                <span>Ir a Inscripciones en Betowa</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
