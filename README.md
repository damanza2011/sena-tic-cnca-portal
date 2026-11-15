# SENA TIC CNCA - Portal Inteligente de Ofertas Educativas

Plataforma web de última generación para la oferta formativa de la **Sede TIC del Centro Nacional Colombo Alemán (CNCA)**, diseñada para superar la experiencia de usuario y rendimiento del portal Betowa oficial del SENA.

---

## 🚀 Características Principales

1. **Búsqueda Instantánea Difusa (Fuzzy Search):**
   - Motor impulsado por `Fuse.js` que indexa títulos, códigos de programa, tecnologías asociadas, perfiles laborales y competencias en tiempo real.
2. **Filtros Facetados Reactivos:**
   - Filtro por Nivel: Tecnólogo, Técnico, Especialización Tecnológica y Curso Corto.
   - Filtro por Área Temática: Desarrollo de Software, Ciberseguridad, Inteligencia Artificial, Redes Cisco, Multimedia & Videojuegos, Cloud Computing.
   - Filtro por Modalidad (Presencial Sede TIC, Híbrido, 100% Virtual) y Jornada (Mañana, Tarde, Noche, Fin de semana).
   - Interruptor para ocultar formaciones sin cupos disponibles.
3. **Alternador de Vistas:**
   - Vista en Cuadrícula (Grid) y Vista en Lista detallada.
4. **Ficha Técnica y Modal Interactivo:**
   - 5 pestañas de información: ¿Qué aprenderás?, Plan de formación / Pensum por fases, Perfil de egreso y salarios promedio proyectados en Colombia, Requisitos de matrícula y Horarios de laboratorios.
   - Botón de descarga/impresión directa de Pensum y botón de compartir por WhatsApp con un clic.
5. **Orientadora Vocacional IA "Sara TIC" (Voz y Texto):**
   - Interacción conversacional con entrada de voz mediante **Web Speech API** (reconocimiento en vivo).
   - Síntesis de voz (Text-to-Speech) en español para escuchar las recomendaciones.
   - Motor de recomendación inteligente que analiza intereses y sugiere 1 a 3 programas específicos con acceso directo a sus fichas.
   - Sección de preguntas frecuentes inmediatas (costos, etapas productivas, proceso de admisión).
6. **Favoritos Persistentes:**
   - Guarda ofertas en el navegador (LocalStorage) con animación de confetti y panel lateral drawer para comparar o postularse en lote.
7. **Diseño Visual e Institucional:**
   - Colores oficiales del SENA (Verde institucional `#39A900`, Azul marino `#00324D`).
   - Modo oscuro y modo claro con persistencia.
   - Totalmente responsivo y adaptado a móviles (Mobile First).

---

## 🛠️ Stack Tecnológico

- **React 19 + TypeScript (Strict Mode)**
- **Vite 8**
- **Tailwind CSS v4** + `@tailwindcss/vite`
- **Lucide React** (Iconografía vectorial moderna)
- **Fuse.js** (Búsqueda difusa)
- **Canvas Confetti** (Microinteracciones visuales)
- **Web Speech API** (Speech Recognition & Speech Synthesis)

---

## 💻 Instrucciones de Uso

Para iniciar el portal en modo de desarrollo:

```bash
cd sena-cnca-portal
npm install
npm run dev
```

O haz doble clic en el archivo raíz:
- `iniciar-sena-portal.bat`
- `iniciar-sena-portal.ps1`
