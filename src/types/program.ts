export type ProgramLevel = 'Tecnólogo' | 'Técnico' | 'Especialización Tecnológica' | 'Curso Corto';
export type ProgramModality = 'Presencial Sede TIC' | 'Híbrido' | '100% Virtual';
export type ProgramShift = 'Diurna (Mañana)' | 'Mixta (Tarde)' | 'Nocturna' | 'Fines de Semana';
export type ProgramCategory = 
  | 'Desarrollo de Software' 
  | 'Ciberseguridad' 
  | 'Infraestructura y Redes' 
  | 'Inteligencia Artificial' 
  | 'Multimedia & Videojuegos' 
  | 'Automatización & Cloud';

export type ProgramStatus = 'open' | 'closing_soon' | 'upcoming' | 'closed';

export interface SyllabusPhase {
  phase: string;
  title: string;
  modules: string[];
}

export interface Program {
  id: string;
  code: string;
  title: string;
  level: ProgramLevel;
  category: ProgramCategory;
  modality: ProgramModality;
  shift: ProgramShift;
  schedule: string;
  duration: string;
  campus: string;
  status: ProgramStatus;
  statusLabel: string;
  totalSlots: number;
  availableSlots: number;
  startDate: string;
  applicationDeadline: string;
  featured: boolean;
  summary: string;
  skills: string[];
  whatYouLearn: string[];
  graduateProfile: string;
  jobRoles: string[];
  averageSalary: string;
  requirements: string[];
  syllabus: SyllabusPhase[];
  directLink: string;
}

export interface FilterState {
  searchQuery: string;
  level: string;
  category: string;
  modality: string;
  shift: string;
  onlyAvailableSlots: boolean;
  sortBy: 'featured' | 'deadline' | 'slots' | 'title';
}
