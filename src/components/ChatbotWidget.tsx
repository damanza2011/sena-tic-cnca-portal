import React, { useState, useEffect, useRef } from 'react';
import { 
  Bot, 
  X, 
  Send, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  ArrowRight
} from 'lucide-react';
import type { Program } from '../types/program';

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
  recommendedPrograms?: Program[];
}

interface ChatbotWidgetProps {
  programs: Program[];
  isOpen: boolean;
  onToggle: () => void;
  onSelectProgram: (program: Program) => void;
}

export const ChatbotWidget: React.FC<ChatbotWidgetProps> = ({
  programs,
  isOpen,
  onToggle,
  onSelectProgram,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'bot',
      text: '¡Hola! Soy Sara TIC, tu orientadora vocacional inteligente de la sede SENA CNCA. 🚀\n\nCuéntame qué te gusta (programar software, ciberseguridad, inteligencia artificial, videojuegos, hardware) o si buscas horarios en la noche o virtual. ¡O puedes hablarme presionando el micrófono! 🎙️',
      timestamp: 'Ahora'
    }
  ]);
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Recognition ref
  const recognitionRef = useRef<any>(null);

  // Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  // Speech Recognition Setup
  useEffect(() => {
    const SpeechRecognition = 
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.lang = 'es-CO';
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        handleSendQuery(transcript);
      };

      recognition.onerror = (event: any) => {
        console.warn('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, [programs]);

  // Speech Synthesis (Speak bot response)
  const speakText = (text: string) => {
    if (!voiceEnabled || !window.speechSynthesis) return;

    window.speechSynthesis.cancel();
    // Clean emojis and markdown for speech
    const cleanText = text.replace(/[*#_`🚀🎙️💡👉]/g, '').slice(0, 220);
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'es-CO';
    utterance.rate = 1.05;

    window.speechSynthesis.speak(utterance);
  };

  const toggleMic = () => {
    if (!recognitionRef.current) {
      alert('Tu navegador no soporta entrada de voz por Web Speech API. Puedes escribir tu consulta en el teclado.');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
    } else {
      try {
        recognitionRef.current.start();
      } catch (err) {
        console.error(err);
      }
    }
  };

  // Logic to process user queries and find best matches
  const handleSendQuery = (queryText: string) => {
    const text = queryText.trim();
    if (!text) return;

    // Add user message
    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');

    // Generate intelligent response
    setTimeout(() => {
      const lower = text.toLowerCase();
      let botResponse = '';
      let recommended: Program[] = [];

      // 1. FAQs Check
      if (lower.includes('gratis') || lower.includes('costo') || lower.includes('precio') || lower.includes('pagar')) {
        botResponse = '¡Toda la formación en el SENA es 100% gratuita y pública! 🇨🇴\n\nNo existen costos de matrícula, mensualidades ni exámenes de admisión. Cualquier cobro por parte de terceros es ilegal.';
      } else if (lower.includes('inscribir') || lower.includes('proceso') || lower.includes('betowa') || lower.includes('sofiaplus') || lower.includes('cómo')) {
        botResponse = 'Para inscribirte sigue estos 3 pasos:\n1. Regístrate en betowa.sena.edu.co o oferta.senasofiaplus.edu.co.\n2. Busca el código del programa que te interese.\n3. Presenta la prueba virtual de competencias en la fecha asignada.';
      } else if (lower.includes('productiva') || lower.includes('pasantia') || lower.includes('empresa') || lower.includes('contrato')) {
        botResponse = 'En los programas técnicos y tecnólogos tienes una etapa productiva (6 a 9 meses) remunerada bajo Contrato de Aprendizaje, donde adquieres experiencia real en empresas aliadas del sector tecnológico.';
      } else {
        // 2. Program Recommendation Engine
        if (lower.includes('program') || lower.includes('software') || lower.includes('web') || lower.includes('adso') || lower.includes('python') || lower.includes('react')) {
          recommended = programs.filter(p => p.category === 'Desarrollo de Software');
          botResponse = `Si te apasiona el desarrollo de software y la programación, te recomiendo ampliamente estos programas estrella con alta demanda laboral:`;
        } else if (lower.includes('ciber') || lower.includes('seguridad') || lower.includes('hacker') || lower.includes('soc') || lower.includes('virus')) {
          recommended = programs.filter(p => p.category === 'Ciberseguridad');
          botResponse = `¡Excelente elección! La ciberseguridad es una de las áreas mejor remuneradas. En el SENA CNCA contamos con un Cyber Range Lab para prácticas ofensivas y defensivas:`;
        } else if (lower.includes('ia') || lower.includes('inteligencia artificial') || lower.includes('machine') || lower.includes('datos') || lower.includes('prompt')) {
          recommended = programs.filter(p => p.category === 'Inteligencia Artificial');
          botResponse = `La Inteligencia Artificial está transformando la industria. Aquí tienes los programas especializados en modelos de aprendizaje, visión computacional y LLMs:`;
        } else if (lower.includes('redes') || lower.includes('cisco') || lower.includes('infraestructura') || lower.includes('telecomunicaciones')) {
          recommended = programs.filter(p => p.category === 'Infraestructura y Redes');
          botResponse = `Para redes empresariales, servidores y telecomunicaciones, nuestra academia Cisco es líder nacional:`;
        } else if (lower.includes('juego') || lower.includes('videojuego') || lower.includes('unity') || lower.includes('unreal') || lower.includes('3d') || lower.includes('animación')) {
          recommended = programs.filter(p => p.category === 'Multimedia & Videojuegos');
          botResponse = `En nuestro Media Lab aprenderás desarrollo de videojuegos 2D/3D con Unity, Unreal Engine 5 y modelado en Blender:`;
        } else if (lower.includes('noche') || lower.includes('nocturna') || lower.includes('tarde')) {
          recommended = programs.filter(p => p.shift.includes('Nocturna') || p.shift.includes('Mixta'));
          botResponse = `He encontrado estos programas en horario nocturno o mixto para que puedas estudiar sin interferir con tu jornada laboral:`;
        } else if (lower.includes('virtual') || lower.includes('distancia') || lower.includes('en linea') || lower.includes('online')) {
          recommended = programs.filter(p => p.modality === '100% Virtual');
          botResponse = `Aquí tienes los programas 100% virtuales dictados por la Sede TIC con flexibilidad de horarios:`;
        } else {
          // General match by skills or keywords
          const matched = programs.filter(p => 
            p.title.toLowerCase().includes(lower) || 
            p.skills.some(s => s.toLowerCase().includes(lower))
          );
          if (matched.length > 0) {
            recommended = matched.slice(0, 3);
            botResponse = `Basado en lo que mencionas, estos programas coinciden con tu perfil formativo:`;
          } else {
            recommended = programs.filter(p => p.featured).slice(0, 2);
            botResponse = `Te sugiero explorar nuestras formaciones tecnológicas con mayor número de cupos e inserción laboral este trimestre:`;
          }
        }
      }

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: botResponse,
        recommendedPrograms: recommended.slice(0, 3),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botMsg]);
      speakText(botResponse);
    }, 600);
  };

  const quickPrompts = [
    '¿Qué estudiar si me gusta programar?',
    'Quiero estudiar Ciberseguridad',
    'Cursos de Inteligencia Artificial',
    '¿Tienen programas en jornada nocturna?',
    '¿Cómo me inscribo en Betowa?',
  ];

  return (
    <>
      {/* Floating Trigger Button */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isOpen && (
          <button
            onClick={onToggle}
            className="group relative flex items-center gap-3 px-4 py-3.5 rounded-full bg-gradient-to-r from-emerald-600 via-[#39A900] to-teal-600 text-white shadow-2xl shadow-emerald-600/40 hover:shadow-emerald-600/60 transition-all hover:scale-105 active:scale-95 border-2 border-white/20"
            aria-label="Abrir Orientador Vocacional IA"
          >
            <div className="relative">
              <Bot className="w-6 h-6 animate-bounce-subtle" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-amber-400 ring-2 ring-emerald-700 animate-ping" />
            </div>

            <div className="flex flex-col text-left pr-1">
              <span className="text-xs font-bold leading-none">Sara TIC • IA</span>
              <span className="text-[10px] text-emerald-100 font-medium leading-tight">Orientador con Voz</span>
            </div>
          </button>
        )}
      </div>

      {/* Chat Window Panel */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[calc(100vw-32px)] sm:w-[420px] h-[580px] max-h-[85vh] bg-white dark:bg-[#0f172a] rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-200">
          
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-[#39A900] via-emerald-600 to-teal-700 text-white flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center ring-2 ring-white/30">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-sm">Sara TIC</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/25 font-semibold">
                    Voz & Texto
                  </span>
                </div>
                <div className="text-[11px] text-emerald-100 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
                  Orientadora Vocacional SENA
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              {/* Voice toggle */}
              <button
                onClick={() => setVoiceEnabled(!voiceEnabled)}
                className="p-2 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                title={voiceEnabled ? 'Silenciar voz del asistente' : 'Activar voz del asistente'}
                aria-label="Voz del asistente"
              >
                {voiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-white/50" />}
              </button>

              {/* Close */}
              <button
                onClick={onToggle}
                className="p-2 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Cerrar chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-slate-50/70 dark:bg-slate-900/40">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-[#39A900] text-white rounded-br-sm shadow-sm'
                      : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-bl-sm border border-slate-200/80 dark:border-slate-700/70 shadow-sm'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>
                </div>

                {/* If the bot returned program recommendations */}
                {msg.recommendedPrograms && msg.recommendedPrograms.length > 0 && (
                  <div className="mt-2.5 w-full space-y-2">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                      Programas sugeridos para ti:
                    </span>
                    {msg.recommendedPrograms.map((prog) => (
                      <div
                        key={prog.id}
                        onClick={() => onSelectProgram(prog)}
                        className="p-2.5 rounded-xl bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 hover:border-emerald-500 cursor-pointer transition-all flex items-center justify-between group"
                      >
                        <div className="pr-2">
                          <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 uppercase">
                            {prog.level}
                          </span>
                          <h6 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1 group-hover:text-emerald-600">
                            {prog.title}
                          </h6>
                          <span className="text-[10px] text-slate-500 dark:text-slate-400">
                            {prog.shift} • {prog.availableSlots} cupos
                          </span>
                        </div>
                        <ArrowRight className="w-4 h-4 text-emerald-600 dark:text-emerald-400 group-hover:translate-x-1 transition-transform shrink-0" />
                      </div>
                    ))}
                  </div>
                )}

                <span className="text-[10px] text-slate-400 mt-1 px-1">
                  {msg.timestamp}
                </span>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts Chips */}
          <div className="px-3 py-2 bg-white dark:bg-slate-900 border-t border-slate-200/60 dark:border-slate-800 flex gap-1.5 overflow-x-auto no-scrollbar">
            {quickPrompts.map((prompt) => (
              <button
                key={prompt}
                onClick={() => handleSendQuery(prompt)}
                className="whitespace-nowrap text-[11px] px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-emerald-50 dark:hover:bg-emerald-950/60 hover:text-emerald-600 transition-colors shrink-0"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input & Voice Controls */}
          <div className="p-3 bg-white dark:bg-[#0f172a] border-t border-slate-200 dark:border-slate-800">
            {isListening && (
              <div className="mb-2 flex items-center justify-center gap-2 py-1 px-3 bg-rose-50 dark:bg-rose-950/50 rounded-xl text-rose-600 dark:text-rose-400 text-xs font-semibold animate-pulse">
                <span className="w-2 h-2 rounded-full bg-rose-600 animate-ping" />
                <span>Escuchando tu voz... Habla ahora</span>
              </div>
            )}

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendQuery(input);
              }}
              className="flex items-center gap-2"
            >
              {/* Mic Button */}
              <button
                type="button"
                onClick={toggleMic}
                className={`p-2.5 rounded-xl transition-all ${
                  isListening
                    ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/40 animate-pulse'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-emerald-600'
                }`}
                title="Hablar por micrófono"
              >
                {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </button>

              {/* Text Input */}
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Escribe tu consulta o interés..."
                className="flex-1 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 text-xs sm:text-sm rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#39A900]"
              />

              {/* Submit */}
              <button
                type="submit"
                disabled={!input.trim()}
                className="p-2.5 rounded-xl bg-[#39A900] hover:bg-[#2e8800] disabled:opacity-40 text-white shadow-md transition-all shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

        </div>
      )}
    </>
  );
};
