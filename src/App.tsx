/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo, useEffect, useRef } from 'react';
import { 
  Play, 
  Info, 
  Search, 
  Calendar, 
  ExternalLink, 
  X, 
  Tv, 
  Sparkles, 
  AlertTriangle,
  Clock,
  ChevronRight,
  ArrowRight,
  CheckCircle2,
  HelpCircle,
  Volume2,
  ChevronLeft,
  Flame,
  Award,
  BookOpen,
  Compass,
  Trophy,
  Activity,
  User,
  RotateCcw,
  Check,
  AlertOctagon
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { EPISODES, SITE_UPDATES } from './data';
import { Episode } from './types';
import { CURIOSITIES, Curiosity } from './curiositiesData';
import { QUIZ_QUESTIONS, QuizQuestion } from './quizData';

// Função auxiliar para redirecionar imagens do Catbox através de um proxy CDN confiável.
// Isso resolve o bloqueio que provedores de internet (ISPs) no Brasil aplicam ao domínio files.catbox.moe
// e também resolve problemas de bloqueio de referer em navegadores e iframes.
function getProxyImageUrl(url: string): string {
  if (!url) return '';
  if (url.includes('catbox.moe')) {
    return `https://images.weserv.nl/?url=${encodeURIComponent(url)}`;
  }
  return url;
}

export default function App() {
  // Navigation: 'inicio' | 'informacoes' | 'curiosidades' | 'quiz' | 'novidades'
  const [activeTab, setActiveTab] = useState<string>('inicio'); 
  
  // States
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeDetailsEpisode, setActiveDetailsEpisode] = useState<Episode | null>(null);
  
  // Featured rotating banner state
  const [featuredIndex, setFeaturedIndex] = useState<number>(0);
  
  const featuredItems = useMemo(() => {
    // Select representing episodes across different eras
    return EPISODES.filter(e => 
      e.id === 'spec-2023-1' || 
      e.id === 'classic-1-1' || 
      e.id === 'evil-daleks' || 
      e.id === 'modern-1' ||
      e.id === 'modern-14'
    );
  }, []);

  // Auto-rotate featured banner every 12 seconds
  useEffect(() => {
    if (featuredItems.length <= 1) return;
    const interval = setInterval(() => {
      setFeaturedIndex((prev) => (prev + 1) % featuredItems.length);
    }, 12000);
    return () => clearInterval(interval);
  }, [featuredItems]);

  // Real-time information states
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  // Season management per row category (Aba própria por temporada)
  const [selectedSeasons, setSelectedSeasons] = useState<Record<string, number>>({
    classic: 7, // Default to 7 so the user immediately sees the new Season 7 arcos, or let's allow starting at 1 or 7. Let's make it 7 because it's the highlight, or let's start at 1, but 7 is great. Let's start with 1, they can select 7! Wait, let's set classic default to 1, modern to 1, torchwood to 1, sja to 1.
    modern: 1,
    torchwood: 1,
    sja: 1
  });
  
  // 70 Curiosidades state
  const [curiositiesSearch, setCuriositiesSearch] = useState<string>('');
  const [selectedCuriosity, setSelectedCuriosity] = useState<Curiosity | null>(null);
  const [isSpinningCuriosity, setIsSpinningCuriosity] = useState<boolean>(false);

  // Quiz state
  const [quizStarted, setQuizStarted] = useState<boolean>(false);
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0); // 0-39
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [consecutiveErrors, setConsecutiveErrors] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState<number>(0);
  const [quizCompleted, setQuizCompleted] = useState<boolean>(false);
  const [quizFeedbacks, setQuizFeedbacks] = useState<{
    correct: boolean;
    consecutiveReset: boolean;
    fallbackQuestion: number | null;
  } | null>(null);

  // Clock updates every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Format real-time parameters
  const timeInfo = useMemo(() => {
    const daysOfWeek = [
      'Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 
      'Quinta-feira', 'Sexta-feira', 'Sábado'
    ];
    const months = [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];
    
    const dayName = daysOfWeek[currentTime.getDay()];
    const dayNum = String(currentTime.getDate()).padStart(2, '0');
    const monthName = months[currentTime.getMonth()];
    const yearNum = currentTime.getFullYear();
    const hours = String(currentTime.getHours()).padStart(2, '0');
    const minutes = String(currentTime.getMinutes()).padStart(2, '0');
    const seconds = String(currentTime.getSeconds()).padStart(2, '0');
    
    // Week number of the year calculation
    const d = new Date(Date.UTC(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate()));
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    const weekNum = Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);

    return {
      fullDate: `${dayName}, ${dayNum} de ${monthName} de ${yearNum}`,
      dayOfWeek: dayName,
      dayOfMonth: dayNum,
      month: monthName,
      year: yearNum,
      weekOfYear: weekNum,
      hours,
      minutes,
      seconds
    };
  }, [currentTime]);

  // Quiz logic - Shuffle helper
  const startNewQuiz = () => {
    const shuffled = [...QUIZ_QUESTIONS].sort(() => Math.random() - 0.5);
    setQuizQuestions(shuffled);
    setCurrentQuestionIndex(0);
    setSelectedOptionIndex(null);
    setIsAnswered(false);
    setConsecutiveErrors(0);
    setScore(0);
    setIncorrectAnswers(0);
    setQuizCompleted(false);
    setQuizFeedbacks(null);
    setQuizStarted(true);
  };

  // Safe Havens definitions
  const safeHavens = [5, 10, 15, 20, 25, 30, 35];

  const handleSelectOption = (index: number) => {
    if (isAnswered) return;
    setSelectedOptionIndex(index);
  };

  const handleConfirmAnswer = () => {
    if (selectedOptionIndex === null || isAnswered) return;

    const currentQuestion = quizQuestions[currentQuestionIndex];
    const isCorrect = selectedOptionIndex === currentQuestion.answerIndex;
    setIsAnswered(true);

    let nextConsecutiveErrors = consecutiveErrors;
    let fallbackTo = null;
    let consecutiveReset = false;

    if (isCorrect) {
      setScore(prev => prev + 1);
      setConsecutiveErrors(0);
    } else {
      setIncorrectAnswers(prev => prev + 1);
      nextConsecutiveErrors += 1;
      setConsecutiveErrors(nextConsecutiveErrors);

      if (nextConsecutiveErrors >= 2) {
        // Reset completely to Question 1
        consecutiveReset = true;
        setConsecutiveErrors(0);
      } else {
        // Fall back to nearest reached safe haven (Question Number is 1-indexed)
        const currentQuestionNumber = currentQuestionIndex + 1;
        // Find safe havens that are strictly less than currentQuestionNumber
        const reachedHavens = safeHavens.filter(haven => haven < currentQuestionNumber);
        if (reachedHavens.length > 0) {
          fallbackTo = Math.max(...reachedHavens);
        } else {
          fallbackTo = 1; // back to start
        }
      }
    }

    setQuizFeedbacks({
      correct: isCorrect,
      consecutiveReset,
      fallbackQuestion: fallbackTo
    });
  };

  const handleNextQuestion = () => {
    if (!quizFeedbacks) return;

    if (quizFeedbacks.correct) {
      const nextIndex = currentQuestionIndex + 1;
      if (nextIndex >= 40) {
        setQuizCompleted(true);
      } else {
        setCurrentQuestionIndex(nextIndex);
        setSelectedOptionIndex(null);
        setIsAnswered(false);
        setQuizFeedbacks(null);
      }
    } else {
      if (quizFeedbacks.consecutiveReset) {
        // Reset to Question 1
        setCurrentQuestionIndex(0);
        setSelectedOptionIndex(null);
        setIsAnswered(false);
        setQuizFeedbacks(null);
      } else if (quizFeedbacks.fallbackQuestion !== null) {
        // Fall back to 1-indexed question number
        setCurrentQuestionIndex(quizFeedbacks.fallbackQuestion - 1);
        setSelectedOptionIndex(null);
        setIsAnswered(false);
        setQuizFeedbacks(null);
      } else {
        // Fall back to start if no havens
        setCurrentQuestionIndex(0);
        setSelectedOptionIndex(null);
        setIsAnswered(false);
        setQuizFeedbacks(null);
      }
    }
  };

  // Curiosidades randomized drawer
  const drawRandomCuriosity = () => {
    setIsSpinningCuriosity(true);
    let counter = 0;
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * CURIOSITIES.length);
      setSelectedCuriosity(CURIOSITIES[randomIndex]);
      counter++;
      if (counter > 15) {
        clearInterval(interval);
        setIsSpinningCuriosity(false);
      }
    }, 80);
  };

  // Map episode details or dynamic curiosities
  const getEpisodeCuriosity = (episode: Episode) => {
    if (episode.curiosities) return episode.curiosities;
    
    if (episode.doctor.includes("Terceiro")) {
      return "O Terceiro Doutor passou grande parte de sua encarnação exilado na Terra, usando artes marciais venusianas e dirigindo o clássico carro amarelo Bessie.";
    }
    if (episode.doctor.includes("Quarto")) {
      return "O Quarto Doutor é a encarnação de maior duração na era clássica, eternizado por seu gigantesco cachecol multicolorido e seu amor por Jelly Babies.";
    }
    if (episode.doctor.includes("Décimo Quarto")) {
      return "Esta encarnação adotou a fisionomia do Décimo Doutor devido a uma necessidade subconsciente de retornar para Donna Noble e resolver traumas do passado.";
    }
    if (episode.doctor.includes("Décimo Quinto")) {
      return "Ncuti Gatwa brilha com um carisma avassalador, trazendo figurinos fashionistas dinâmicos e uma sensibilidade emocional inigualável à TARDIS.";
    }
    if (episode.doctor.includes("Nono")) {
      return "O Nono Doutor vestia uma jaqueta simples de couro preto, retratando o sofrimento rústico de um sobrevivente traumatizado pela Guerra do Tempo.";
    }
    if (episode.doctor.includes("Décimo Doutor")) {
      return "Famoso pelo terno listrado e tênis Converse, esta encarnação de David Tennant esconde uma fúria formidável por trás de um sorriso brincalhão.";
    }
    if (episode.doctor.includes("Décimo Primeiro")) {
      return "Matt Smith foi o ator mais jovem a ser escalado como o Doutor, trazendo uma fisicalidade excêntrica de cientista maluco e o slogan 'Geronimo!'.";
    }
    if (episode.doctor.includes("Décimo Segundo")) {
      return "Peter Capaldi, fã incondicional de Doctor Who desde os 5 anos, entregou um Doutor rebelde de jaqueta forrada que tocava guitarra elétrica na TARDIS.";
    }
    if (episode.doctor.includes("Décima Terceira")) {
      return "Jodie Whittaker trouxe uma leveza otimista e senso de equipe insuperável, guiando sua tripulação carinhosamente apelidada de 'fam'.";
    }
    if (episode.title.includes("Class")) {
      return "A série Class foi criada pelo escritor Patrick Ness e foca nas consequências cósmicas que afetam a lendária escola Coal Hill Academy.";
    }
    if (episode.id.startsWith("tales-tardis-")) {
      return "Neste spin-off comemorativo de 60 anos, lendários Doutores e companheiros do passado se reúnem na TARDIS da Lembrança para reviver e refletir sobre suas aventuras clássicas mais marcantes.";
    }
    
    return "Este arco icônico faz parte do patrimônio de ficção científica da BBC, expandindo as lendas dos Senhores do Tempo e de seus inimigos clássicos.";
  };

  // Categorize episodes for Netflix style rows
  const categorizedRows = useMemo(() => {
    const classic = EPISODES.filter(e => e.category && e.category.startsWith('classic'));
    const modern = EPISODES.filter(e => e.category === 'modern');
    const specials = EPISODES.filter(e => e.category === 'special' && e.id !== 'adventure-space-time');
    const torchwood = EPISODES.filter(e => e.category === 'spin-off' && e.id.startsWith('torchwood'));
    const sja = EPISODES.filter(e => e.category === 'spin-off' && (e.id.startsWith('sja') || e.id.startsWith('tsja')));
    const talesTardis = EPISODES.filter(e => e.category === 'spin-off' && e.id.startsWith('tales-tardis'));
    
    // Movies & Docs row contains "Uma Aventura no Tempo e Espaço", K-9 Series, Class OST, and Class Episodes
    const moviesAndDocs = [
      ...EPISODES.filter(e => e.id === 'adventure-space-time'),
      ...EPISODES.filter(e => e.id === 'k-9-series'),
      ...EPISODES.filter(e => e.id === 'class-ost'),
      ...EPISODES.filter(e => e.id.startsWith('class-') && e.id !== 'class-ost')
    ];

    return [
      { id: 'classic', title: "Doctor Who Clássico", items: classic, hasSeasons: true },
      { id: 'modern', title: "Série Moderna", items: modern, hasSeasons: true },
      { id: 'specials', title: "Especiais", items: specials, hasSeasons: false },
      { id: 'tales-tardis', title: "Tales of the TARDIS (2023)", items: talesTardis, hasSeasons: false },
      { id: 'torchwood', title: "Torchwood", items: torchwood, hasSeasons: true },
      { id: 'sja', title: "Sarah Jane Adventures", items: sja, hasSeasons: true },
      { id: 'movies', title: "Filmes e Documentários", items: moviesAndDocs, hasSeasons: false },
    ];
  }, []);

  // Filtered search results across all catalogue
  const searchResults = useMemo(() => {
    if (!searchQuery) return [];
    return EPISODES.filter(episode => 
      episode.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      episode.synopsis.toLowerCase().includes(searchQuery.toLowerCase()) ||
      episode.doctor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      episode.year.includes(searchQuery)
    );
  }, [searchQuery]);

  // Featured episode at the top banner: dynamic rotating item
  const featuredEpisodeBanner = useMemo(() => {
    return featuredItems[featuredIndex] || EPISODES.find(e => e.id === 'spec-2023-1') || EPISODES[0];
  }, [featuredIndex, featuredItems]);

  // Helper to open links safely
  const openExternalUrl = (url: string) => {
    window.open(url, '_blank');
  };

  // Filter 70 curiosidades
  const filteredCuriosities = useMemo(() => {
    if (!curiositiesSearch) return CURIOSITIES;
    return CURIOSITIES.filter(c => 
      c.title.toLowerCase().includes(curiositiesSearch.toLowerCase()) ||
      c.text.toLowerCase().includes(curiositiesSearch.toLowerCase()) ||
      String(c.number).includes(curiositiesSearch)
    );
  }, [curiositiesSearch]);

  // Horizontal row scroll triggers
  const rowRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const scrollRow = (rowId: string, direction: 'left' | 'right') => {
    const el = rowRefs.current[rowId];
    if (el) {
      const scrollAmount = direction === 'left' ? -500 : 500;
      el.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#141414] text-white font-sans selection:bg-[#E50914] selection:text-white overflow-x-hidden">
      
      {/* NETFLIX STYLE STICKY HEADER */}
      <header className="sticky top-0 z-50 bg-gradient-to-b from-black to-zinc-950/95 border-b border-red-950/30 backdrop-blur-md px-4 md:px-12 py-4 flex flex-col md:flex-row items-center justify-between gap-4 transition-all duration-300">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 md:gap-8 w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center gap-4">
            {/* Logo */}
            <div 
              onClick={() => { setActiveTab('inicio'); setSearchQuery(''); }}
              className="flex items-center gap-1 cursor-pointer group shrink-0"
            >
              <span className="text-3xl font-extrabold text-[#E50914] tracking-tighter drop-shadow-[0_0_12px_rgba(229,9,20,0.5)] transition-transform duration-300 group-hover:scale-105">
                DOCTOR
              </span>
              <span className="text-3xl font-light text-white tracking-widest bg-[#E50914] px-1.5 py-0.2 rounded-md font-mono">
                +
              </span>
            </div>

            {/* Sincronizador Temporal Real-Time */}
            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-0.5 pl-3 border-l border-zinc-800 text-[10px] md:text-xs text-gray-400 font-mono select-none">
              <span className="text-white font-bold tracking-wider bg-zinc-900 border border-zinc-800 px-1.5 py-0.5 rounded shadow-inner animate-pulse">
                {timeInfo.hours}:{timeInfo.minutes}:{timeInfo.seconds}
              </span>
              <span className="hidden sm:inline text-zinc-300">
                {timeInfo.dayOfMonth}/{timeInfo.month.slice(0, 3)}/{timeInfo.year}
              </span>
              <span className="bg-[#E50914]/10 border border-[#E50914]/30 px-1 py-0.2 rounded text-[9px] text-[#E50914] font-black uppercase tracking-wider">
                Semana #{timeInfo.weekOfYear}
              </span>
            </div>
          </div>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <button 
              onClick={() => { setActiveTab('inicio'); setSearchQuery(''); }}
              className={`transition-colors cursor-pointer ${activeTab === 'inicio' ? 'text-[#E50914] font-bold' : 'text-gray-300 hover:text-white'}`}
            >
              Início
            </button>
            <button 
              onClick={() => setActiveTab('curiosidades')}
              className={`transition-colors cursor-pointer flex items-center gap-1.5 ${activeTab === 'curiosidades' ? 'text-[#E50914] font-bold' : 'text-gray-300 hover:text-white'}`}
            >
              <Sparkles size={15} />
              70 Curiosidades
            </button>
            <button 
              onClick={() => { setActiveTab('quiz'); if(!quizStarted) startNewQuiz(); }}
              className={`transition-colors cursor-pointer flex items-center gap-1.5 ${activeTab === 'quiz' ? 'text-[#E50914] font-bold' : 'text-gray-300 hover:text-white'}`}
            >
              <Trophy size={15} />
              Quiz Doctor Who
            </button>
            <button 
              onClick={() => setActiveTab('creditos')}
              className={`transition-colors cursor-pointer flex items-center gap-1.5 ${activeTab === 'creditos' ? 'text-[#E50914] font-bold' : 'text-gray-300 hover:text-white'}`}
            >
              <User size={15} />
              Créditos
            </button>
            <button 
              onClick={() => setActiveTab('novidades')}
              className={`transition-colors cursor-pointer flex items-center gap-1.5 ${activeTab === 'novidades' ? 'text-[#E50914] font-bold' : 'text-gray-300 hover:text-white'}`}
            >
              <Compass size={15} />
              Avisos & Suporte
            </button>
          </nav>
        </div>

        {/* Search input and Profile Badge */}
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative flex-grow md:flex-grow-0">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
              <Search size={16} />
            </span>
            <input
              type="text"
              placeholder="Pesquisar catálogo..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (activeTab !== 'inicio' && activeTab !== 'curiosidades') {
                  setActiveTab('inicio');
                }
              }}
              className="w-full md:w-64 pl-10 pr-4 py-1.5 bg-zinc-900 border border-zinc-800 text-sm text-white placeholder-gray-400 rounded-full focus:outline-none focus:ring-2 focus:ring-[#E50914] focus:border-transparent transition-all"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-white"
              >
                <X size={15} />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 border border-red-950/40 bg-zinc-950/40 px-3 py-1 rounded-full text-xs text-red-500 font-mono font-bold select-none">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E50914] animate-pulse" />
            v57.0
          </div>
        </div>
      </header>

      {/* MOBILE NAV NAVIGATION TRACK (visible only on smaller screens) */}
      <div className="md:hidden grid grid-cols-5 gap-1 bg-zinc-950 border-b border-red-950/30 py-3 text-[10px] font-semibold px-1">
        <button 
          onClick={() => { setActiveTab('inicio'); setSearchQuery(''); }}
          className={`py-1 rounded transition-colors text-center ${activeTab === 'inicio' ? 'bg-[#E50914]/10 text-[#E50914]' : 'text-gray-400'}`}
        >
          Início
        </button>
        <button 
          onClick={() => setActiveTab('curiosidades')}
          className={`py-1 rounded transition-colors text-center ${activeTab === 'curiosidades' ? 'bg-[#E50914]/10 text-[#E50914]' : 'text-gray-400'}`}
        >
          Curiosidades
        </button>
        <button 
          onClick={() => { setActiveTab('quiz'); if(!quizStarted) startNewQuiz(); }}
          className={`py-1 rounded transition-colors text-center ${activeTab === 'quiz' ? 'bg-[#E50914]/10 text-[#E50914]' : 'text-gray-400'}`}
        >
          Quiz
        </button>
        <button 
          onClick={() => setActiveTab('creditos')}
          className={`py-1 rounded transition-colors text-center ${activeTab === 'creditos' ? 'bg-[#E50914]/10 text-[#E50914]' : 'text-gray-400'}`}
        >
          Créditos
        </button>
        <button 
          onClick={() => setActiveTab('novidades')}
          className={`py-1 rounded transition-colors text-center ${activeTab === 'novidades' ? 'bg-[#E50914]/10 text-[#E50914]' : 'text-gray-400'}`}
        >
          Suporte
        </button>
      </div>

      {/* MAIN SCREEN ROUTING */}
      <main className="pb-24">
        
        {/* TAB 1: INÍCIO (CATALOGUE ROWS & HERO BANNER) */}
        {activeTab === 'inicio' && (
          <div>
            {/* If there is a search query active, show search results page. Otherwise show default home */}
            {searchQuery ? (
              <div className="px-4 md:px-12 py-12">
                <h2 className="text-2xl font-bold mb-2">
                  Resultados da pesquisa para "<span className="text-[#E50914]">{searchQuery}</span>"
                </h2>
                <p className="text-gray-400 text-sm mb-8">Encontrados {searchResults.length} itens no catálogo</p>

                {searchResults.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                    {searchResults.map((episode) => (
                      <motion.div
                        key={episode.id}
                        whileHover={{ scale: 1.05 }}
                        className="bg-zinc-900 rounded-xl overflow-hidden cursor-pointer border border-zinc-800 hover:border-[#E50914] transition-all group"
                        onClick={() => setActiveDetailsEpisode(episode)}
                      >
                        <div className="aspect-[2/3] relative overflow-hidden bg-black">
                          <img 
                            src={getProxyImageUrl(episode.poster)} 
                            alt={episode.title}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover group-hover:opacity-90 transition-opacity"
                          />
                          {episode.isTeraBox && (
                            <span className="absolute top-2 right-2 text-[10px] font-bold bg-[#ffaa00] text-black px-2 py-0.5 rounded-full shadow-md">
                              TeraBox 🔒
                            </span>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                            <span className="bg-[#E50914] text-white p-2 rounded-full shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform">
                              <Play size={14} fill="currentColor" />
                            </span>
                          </div>
                        </div>
                        <div className="p-3">
                          <div className="text-[10px] text-red-500 font-semibold mb-1 uppercase tracking-wider">{episode.doctor}</div>
                          <h3 className="text-xs font-bold line-clamp-1">{episode.title}</h3>
                          <div className="text-[10px] text-gray-400 font-mono mt-1">{episode.year} • {episode.parts} {episode.parts === 1 ? 'Eps' : 'Partes'}</div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-20 bg-zinc-950/50 border border-zinc-900 rounded-2xl">
                    <AlertTriangle className="mx-auto text-red-600 mb-4" size={48} />
                    <h3 className="text-lg font-bold text-gray-300">Nenhum conteúdo encontrado</h3>
                    <p className="text-gray-500 text-sm mt-1 max-w-md mx-auto">
                      Não encontramos episódios correspondentes aos termos digitados. Tente buscar por "Sarah Jane", "Daleks", "Clássico", "Torchwood" ou temporadas específicas.
                    </p>
                  </div>
                )}
              </div>
            ) : (
              // Normal Netflix Home Layout
              <div>
                {/* 1. HERO BANNER */}
                <section className="relative min-h-[50vh] md:min-h-[80vh] flex items-end justify-start bg-black overflow-hidden border-b border-red-950/10">
                  {/* Dynamic Gradient / Image Cover */}
                  <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-10" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-black/30 z-10" />
                    <img 
                      src={getProxyImageUrl(featuredEpisodeBanner.poster)} 
                      alt={featuredEpisodeBanner.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center scale-105 filter brightness-[0.6] contrast-110 blur-[1px] md:blur-0 transition-all duration-1000"
                    />
                  </div>

                  {/* Banner Content */}
                  <div className="relative z-20 max-w-3xl px-4 md:px-12 pb-12 md:pb-24 pt-32 space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/10 border border-red-600/30 text-xs text-red-500 font-mono font-bold">
                      <Flame size={12} className="text-red-500 animate-pulse" />
                      RECOMENDADO PARA VOCÊ // TEMPORAL HIGHLIGHT
                    </div>
                    
                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter drop-shadow-lg text-white">
                      {featuredEpisodeBanner.title}
                    </h1>
                    
                    <div className="flex flex-wrap items-center gap-3 md:gap-4 text-xs font-semibold text-gray-300 font-mono">
                      <span className="text-[#E50914] font-black uppercase tracking-wider">{featuredEpisodeBanner.doctor}</span>
                      <span className="text-gray-400">•</span>
                      <span>{featuredEpisodeBanner.year}</span>
                      <span className="text-gray-400">•</span>
                      <span className="px-1.5 py-0.2 bg-zinc-800 rounded border border-zinc-700 text-white text-[10px]">HD</span>
                      <span className="text-gray-400">•</span>
                      <span>{featuredEpisodeBanner.parts} {featuredEpisodeBanner.parts === 1 ? 'Parte Única' : 'Partes'}</span>
                    </div>

                    <p className="text-xs md:text-sm lg:text-base text-gray-300 leading-relaxed max-w-xl drop-shadow line-clamp-3 md:line-clamp-none">
                      {featuredEpisodeBanner.synopsis}
                    </p>

                    <div className="flex flex-wrap gap-3 pt-2">
                      <button 
                        onClick={() => openExternalUrl(featuredEpisodeBanner.videoUrl)}
                        className="flex items-center gap-2 px-5 py-2.5 bg-[#E50914] hover:bg-[#B80710] text-white font-bold rounded-lg text-xs md:text-sm transition-all shadow-lg hover:scale-105 cursor-pointer"
                      >
                        <Play size={16} fill="currentColor" />
                        Assistir no Drive
                      </button>
                      <button 
                        onClick={() => setActiveDetailsEpisode(featuredEpisodeBanner)}
                        className="flex items-center gap-2 px-5 py-2.5 bg-zinc-900/80 hover:bg-zinc-800 text-white font-bold rounded-lg text-xs md:text-sm transition-all border border-zinc-700 hover:scale-105 cursor-pointer"
                      >
                        <Info size={16} />
                        Mais Informações
                      </button>
                      <button 
                        onClick={() => setFeaturedIndex((prev) => (prev + 1) % featuredItems.length)}
                        className="flex items-center gap-2 px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg text-xs md:text-sm transition-all border border-white/10 hover:scale-105 cursor-pointer"
                        title="Ver próximo destaque"
                      >
                        <ChevronRight size={16} />
                        Próximo Destaque
                      </button>
                    </div>

                    {/* Carousel slide indicator dots */}
                    <div className="flex items-center gap-1.5 pt-4">
                      {featuredItems.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setFeaturedIndex(idx)}
                          className={`h-1.5 rounded-full transition-all duration-500 ${idx === featuredIndex ? 'w-6 bg-[#E50914]' : 'w-2 bg-zinc-600 hover:bg-zinc-400'}`}
                          aria-label={`Ver slide de destaque ${idx + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                </section>

                {/* 2. CATALOGUE ROWS */}
                <section className="px-4 md:px-12 py-12 space-y-12 bg-gradient-to-b from-zinc-950 to-[#141414]">
                  {categorizedRows.map((row) => {
                    const seasons = row.hasSeasons
                      ? Array.from(new Set(row.items.map((item) => item.season))).sort((a: number, b: number) => a - b)
                      : [];
                    const activeSeason = selectedSeasons[row.id] || (seasons.length > 0 ? seasons[0] : 1);
                    const filteredItems = row.hasSeasons
                      ? row.items.filter((item) => item.season === activeSeason)
                      : row.items;

                    return (
                      <div key={row.id} className="relative group/row space-y-4">
                        {/* Row Title */}
                        <div className="flex items-center justify-between">
                          <h2 className="text-xl md:text-2xl font-extrabold tracking-tight hover:text-red-500 cursor-pointer transition-colors flex items-center gap-1">
                            {row.title}
                            <ChevronRight size={20} className="text-[#E50914]" />
                          </h2>
                        </div>

                        {/* Season Tabs (Abas exclusivas por temporada) */}
                        {row.hasSeasons && seasons.length > 1 && (
                          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
                            {seasons.map((seasonNum) => {
                              const isActive = activeSeason === seasonNum;
                              return (
                                <button
                                  key={seasonNum}
                                  onClick={() => setSelectedSeasons(prev => ({ ...prev, [row.id]: seasonNum }))}
                                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                                    isActive
                                      ? 'bg-[#E50914] text-white shadow-md shadow-red-600/20 scale-105 border border-[#E50914]'
                                      : 'bg-zinc-900 text-gray-400 hover:text-white hover:bg-zinc-800 border border-zinc-800/80'
                                  }`}
                                >
                                  {row.id === 'classic' ? `Série Clássica - Temp. ${seasonNum}` : `Temp. ${seasonNum}`}
                                </button>
                              );
                            })}
                          </div>
                        )}

                        {/* Carousel Viewport */}
                        <div className="relative">
                          {/* Scroll Arrows */}
                          <button 
                            onClick={() => scrollRow(row.id, 'left')}
                            className="absolute left-0 top-1/2 -translate-y-1/2 z-30 w-10 h-24 bg-black/60 hover:bg-[#E50914]/80 text-white border-r border-red-950/20 rounded-r-lg opacity-0 group-hover/row:opacity-100 transition-opacity flex items-center justify-center cursor-pointer shadow-lg hover:scale-x-105"
                          >
                            <ChevronLeft size={24} />
                          </button>
                          <button 
                            onClick={() => scrollRow(row.id, 'right')}
                            className="absolute right-0 top-1/2 -translate-y-1/2 z-30 w-10 h-24 bg-black/60 hover:bg-[#E50914]/80 text-white border-l border-red-950/20 rounded-l-lg opacity-0 group-hover/row:opacity-100 transition-opacity flex items-center justify-center cursor-pointer shadow-lg hover:scale-x-105"
                          >
                            <ChevronRight size={24} />
                          </button>

                          {/* Row Container */}
                          <div 
                            ref={(el) => { rowRefs.current[row.id] = el; }}
                            className="flex gap-4 overflow-x-auto scrollbar-none scroll-smooth pb-4"
                          >
                            {filteredItems.map((episode) => (
                              <div 
                                key={episode.id}
                                className="flex-none w-40 sm:w-48 md:w-56 bg-zinc-900 rounded-lg overflow-hidden border border-zinc-800/60 hover:border-[#E50914] transition-all duration-300 relative group cursor-pointer"
                                onClick={() => setActiveDetailsEpisode(episode)}
                              >
                                {/* Poster Image */}
                                <div className="aspect-[2/3] relative overflow-hidden bg-black">
                                  <img 
                                    src={getProxyImageUrl(episode.poster)} 
                                    alt={episode.title}
                                    referrerPolicy="no-referrer"
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                  />
                                  {episode.isTeraBox && (
                                    <div className="absolute top-2 right-2 z-10 text-[9px] font-bold bg-[#ffaa00] text-black px-1.5 py-0.5 rounded border border-yellow-400 font-sans shadow-md">
                                      TeraBox ⚠️
                                    </div>
                                  )}
                                </div>

                                {/* Simple Info Overlay */}
                                <div className="p-3 space-y-1 bg-gradient-to-t from-black to-zinc-900/90">
                                  <div className="text-[10px] text-red-500 font-semibold tracking-wider uppercase font-mono truncate">
                                    {episode.doctor}
                                  </div>
                                  <h3 className="text-xs font-bold text-white line-clamp-1 group-hover:text-[#E50914] transition-colors">
                                    {episode.title}
                                  </h3>
                                  <div className="text-[10px] text-gray-400 font-mono">
                                    {episode.year} • {episode.parts} {episode.parts === 1 ? 'Eps' : 'Partes'}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </section>
              </div>
            )}
          </div>
        )}



        {/* TAB 3: 70 CURIOSIDADES (BENTO STYLE CURIOSITIES SECTION) */}
        {activeTab === 'curiosidades' && (
          <div className="max-w-6xl mx-auto px-4 md:px-12 py-12">
            <div className="space-y-8">
              
              <div className="text-center space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/10 border border-red-600/30 text-xs text-red-500 font-mono font-bold">
                  <BookOpen size={12} />
                  ALMANAQUE GALÁCTICO COMPLETO
                </div>
                <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
                  70 Curiosidades Extraordinárias
                </h1>
                <p className="text-gray-400 max-w-xl mx-auto text-sm">
                  Explore fatos fascinantes sobre os bastidores, produção, Doutores, vilões lendários e a rica história da maior série de ficção científica do mundo!
                </p>
                
                {/* DRAW RANDOM FACT TRIGGER */}
                <div className="pt-2">
                  <button
                    onClick={drawRandomCuriosity}
                    disabled={isSpinningCuriosity}
                    className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold rounded-full text-xs shadow-lg hover:scale-105 transition-all cursor-pointer disabled:opacity-50"
                  >
                    <RotateCcw size={14} className={isSpinningCuriosity ? 'animate-spin' : ''} />
                    {isSpinningCuriosity ? 'Localizando Fato...' : 'Sorteador TARDIS (Fato Aleatório!)'}
                  </button>
                </div>
              </div>

              {/* SEARCH BOX FOR CURIOSITIES */}
              <div className="max-w-md mx-auto">
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                    <Search size={15} />
                  </span>
                  <input
                    type="text"
                    placeholder="Pesquisar entre as 70 curiosidades..."
                    value={curiositiesSearch}
                    onChange={(e) => setCuriositiesSearch(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 bg-zinc-900 border border-zinc-800 text-xs text-white placeholder-gray-500 rounded-lg focus:outline-none focus:ring-1 focus:ring-red-600 focus:border-transparent"
                  />
                  {curiositiesSearch && (
                    <button 
                      onClick={() => setCuriositiesSearch('')}
                      className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-white"
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>
              </div>

              {/* LIST OF CURIOSITIES */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCuriosities.map((curiosity) => (
                  <div
                    key={curiosity.number}
                    onClick={() => setSelectedCuriosity(curiosity)}
                    className="bg-zinc-900/40 border border-zinc-800/80 hover:border-red-600 p-6 rounded-2xl space-y-3 cursor-pointer transition-all duration-300 hover:bg-zinc-900/80 group relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 p-4 font-mono text-4xl font-black text-red-600/10 group-hover:text-red-600/20 transition-colors select-none">
                      {String(curiosity.number).padStart(2, '0')}
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 flex items-center justify-center rounded-full bg-red-600 text-white font-mono text-xs font-bold">
                        {curiosity.number}
                      </span>
                      <h3 className="font-bold text-sm text-gray-200 line-clamp-1 group-hover:text-white transition-colors pr-8">
                        {curiosity.title}
                      </h3>
                    </div>

                    <p className="text-xs text-gray-400 line-clamp-3 leading-relaxed">
                      {curiosity.text}
                    </p>

                    <div className="text-[10px] text-red-500 font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      Ler curiosidade completa
                      <ArrowRight size={10} />
                    </div>
                  </div>
                ))}
              </div>

              {/* EMPTY SEARCH STATE */}
              {filteredCuriosities.length === 0 && (
                <div className="text-center py-16 bg-zinc-950/40 rounded-2xl border border-zinc-900">
                  <p className="text-gray-400 text-sm">Nenhum fato encontrado para a sua busca.</p>
                  <button 
                    onClick={() => setCuriositiesSearch('')}
                    className="mt-2 text-xs text-red-500 hover:underline font-semibold"
                  >
                    Limpar pesquisa
                  </button>
                </div>
              )}

            </div>
          </div>
        )}

        {/* TAB 4: QUIZ DOCTOR WHO (HIGH SUSPENSE GAME SHOW WITH CHECKPOINTS) */}
        {activeTab === 'quiz' && (
          <div className="max-w-4xl mx-auto px-4 md:px-12 py-12">
            <div className="space-y-8">
              
              <div className="text-center space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/10 border border-red-600/30 text-xs text-red-500 font-mono font-bold">
                  <Trophy size={12} className="text-red-500" />
                  DESAFIO MÁXIMO DE CONHECIMENTOS
                </div>
                <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
                  Quiz Doctor Who
                </h1>
                <p className="text-gray-400 max-w-xl mx-auto text-sm">
                  Você é capaz de encarar o teste final dos Senhores do Tempo? São 40 perguntas eletrizantes com portos seguros e eliminação consecutiva rápida!
                </p>
              </div>

              {/* GAME CONTAINER WITH NETFLIX INSPIRED CARDS */}
              <div className="bg-zinc-950 border border-red-950/40 rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 to-black" />

                {/* STATE 1: START SCREEN */}
                {!quizStarted && !quizCompleted && (
                  <div className="text-center py-8 space-y-6 max-w-lg mx-auto">
                    <div className="w-16 h-16 rounded-full bg-red-600/10 border border-red-600/30 flex items-center justify-center mx-auto text-red-500">
                      <HelpCircle size={32} />
                    </div>

                    <div className="space-y-2">
                      <h2 className="text-xl font-bold text-white">Regras do Desafio Galáctico:</h2>
                      <div className="text-left text-xs text-gray-400 space-y-2.5 bg-zinc-900/50 p-4 rounded-xl border border-zinc-800">
                        <p>🔹 <strong>Perguntas:</strong> São 40 perguntas cuidadosamente elaboradas e totalmente embaralhadas.</p>
                        <p>⚓ <strong>Portos Seguros:</strong> Perguntas <strong>5, 10, 15, 20, 25, 30 e 35</strong> são check-points de segurança. Se você errar, retornará ao porto seguro mais próximo já alcançado!</p>
                        <p>⚠️ <strong>Regra Especial de Eliminação:</strong> Se você errar <strong>duas perguntas consecutivas</strong>, independentemente da fase, seu progresso será totalmente reiniciado de volta à Pergunta 1!</p>
                      </div>
                    </div>

                    <button
                      onClick={startNewQuiz}
                      className="w-full py-3.5 bg-[#E50914] hover:bg-[#B80710] text-white font-bold rounded-xl transition-all hover:scale-102 shadow-lg text-sm cursor-pointer"
                    >
                      Iniciar Desafio Cósmico 🚀
                    </button>
                  </div>
                )}

                {/* STATE 2: ACTIVE QUESTION SCREEN */}
                {quizStarted && !quizCompleted && quizQuestions.length > 0 && (
                  <div className="space-y-6">
                    
                    {/* Header game stats */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-900">
                      <div className="space-y-1">
                        <span className="text-xs font-mono font-bold text-red-500 uppercase tracking-widest block">
                          DESAFIO ATUAL
                        </span>
                        <h3 className="text-lg font-black text-white">
                          Pergunta {currentQuestionIndex + 1} de 40
                        </h3>
                      </div>

                      {/* Stat badget counters */}
                      <div className="flex items-center gap-3 text-xs font-mono">
                        <div className="bg-emerald-950/40 border border-emerald-900/30 text-emerald-400 px-3 py-1 rounded-full flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          Acertos: {score}
                        </div>
                        <div className="bg-red-950/40 border border-red-900/30 text-red-400 px-3 py-1 rounded-full flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                          Erros: {incorrectAnswers}
                        </div>
                      </div>
                    </div>

                    {/* Progress Bar with checkpoints markers */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-[10px] text-gray-500 font-mono">
                        <span>Progresso</span>
                        <span className="text-red-500 font-bold">
                          {Math.round(((currentQuestionIndex) / 40) * 100)}% concluído
                        </span>
                      </div>
                      
                      {/* Bar container */}
                      <div className="h-2 w-full bg-zinc-900 rounded-full relative overflow-hidden">
                        {/* Shuffled progression bar */}
                        <div 
                          className="h-full bg-gradient-to-r from-red-600 to-[#E50914] transition-all duration-300" 
                          style={{ width: `${((currentQuestionIndex + 1) / 40) * 100}%` }}
                        />
                      </div>

                      {/* Safe haven indicators */}
                      <div className="flex justify-between items-center text-[9px] text-gray-400 font-mono px-1">
                        <span className="flex items-center gap-0.5"><span className="text-red-500">⚓</span> Porto Seguro: Q5, Q10, Q15, Q20, Q25, Q30, Q35</span>
                        <span className="font-bold text-red-500">
                          {(() => {
                            const currentNum = currentQuestionIndex + 1;
                            const next = safeHavens.find(haven => haven > currentNum);
                            return next ? `Próximo Porto Seguro: Q${next}` : 'Destino Final!';
                          })()}
                        </span>
                      </div>
                    </div>

                    {/* Consecutive error alert */}
                    {consecutiveErrors > 0 && (
                      <div className="bg-red-950/30 border border-red-900/50 p-3 rounded-xl text-xs text-red-400 flex items-center gap-2 font-mono">
                        <AlertTriangle size={14} className="text-red-500 animate-bounce" />
                        <strong>Cuidado:</strong> Você já possui 1 erro acumulado! Outro erro seguido causará um reset fatal de volta à pergunta 1!
                      </div>
                    )}

                    {/* Question text */}
                    <div className="py-2">
                      <h4 className="text-base sm:text-lg font-bold text-white leading-relaxed">
                        {quizQuestions[currentQuestionIndex].question}
                      </h4>
                    </div>

                    {/* Options buttons */}
                    <div className="grid grid-cols-1 gap-3 pt-2">
                      {quizQuestions[currentQuestionIndex].options.map((option, index) => {
                        // Style options dynamically if answered
                        let btnStyle = "bg-zinc-900 border-zinc-800 hover:border-red-600 hover:bg-zinc-800/80 text-white";
                        
                        if (isAnswered) {
                          const isCorrectIndex = index === quizQuestions[currentQuestionIndex].answerIndex;
                          const isSelected = index === selectedOptionIndex;

                          if (isCorrectIndex) {
                            btnStyle = "bg-emerald-950/60 border-emerald-500 text-emerald-300 font-bold";
                          } else if (isSelected) {
                            btnStyle = "bg-red-950/60 border-red-500 text-red-300 font-bold";
                          } else {
                            btnStyle = "bg-zinc-900/40 border-zinc-900 text-gray-500 cursor-not-allowed";
                          }
                        } else {
                          if (index === selectedOptionIndex) {
                            btnStyle = "bg-zinc-850 border-red-600 text-white ring-2 ring-red-600/40";
                          }
                        }

                        return (
                          <button
                            key={index}
                            onClick={() => handleSelectOption(index)}
                            disabled={isAnswered}
                            className={`w-full p-4 rounded-xl border text-left text-xs sm:text-sm font-medium transition-all duration-200 flex items-center justify-between gap-4 cursor-pointer ${btnStyle}`}
                          >
                            <span>{option}</span>
                            <span className="flex-none font-mono text-[10px] bg-black/40 px-2 py-0.5 rounded text-gray-400">
                              {['A', 'B', 'C', 'D'][index]}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Navigation or Confirm controls */}
                    <div className="pt-4 flex justify-end">
                      {!isAnswered ? (
                        <button
                          onClick={handleConfirmAnswer}
                          disabled={selectedOptionIndex === null}
                          className="px-6 py-2.5 bg-red-600 hover:bg-red-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold rounded-lg text-xs tracking-wider uppercase transition-all shadow-md cursor-pointer"
                        >
                          Confirmar Resposta 📡
                        </button>
                      ) : (
                        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 bg-zinc-900/60 p-4 rounded-xl border border-zinc-800">
                          <div className="text-xs">
                            {quizFeedbacks?.correct ? (
                              <p className="text-emerald-400 font-bold flex items-center gap-1.5">
                                <CheckCircle2 size={14} /> Resposta Correta! Avançando...
                              </p>
                            ) : (
                              <div className="space-y-1 text-left">
                                <p className="text-red-500 font-bold flex items-center gap-1.5">
                                  <AlertOctagon size={14} /> Resposta Incorreta!
                                </p>
                                <p className="text-gray-400 text-[11px]">
                                  {quizFeedbacks?.consecutiveReset 
                                    ? "🚨 Limite de erros consecutivos atingido! Resetado para a Pergunta 1." 
                                    : `⚓ Progresso retornado para o Porto Seguro mais próximo: Pergunta ${quizFeedbacks?.fallbackQuestion}.`}
                                </p>
                              </div>
                            )}
                          </div>
                          
                          <button
                            onClick={handleNextQuestion}
                            className="w-full sm:w-auto px-6 py-2 bg-[#E50914] hover:bg-[#B80710] text-white font-bold rounded-lg text-xs tracking-wider uppercase transition-all cursor-pointer"
                          >
                            {quizFeedbacks?.correct ? 'Próxima Pergunta ➔' : 'Continuar Jornada ➔'}
                          </button>
                        </div>
                      )}
                    </div>

                  </div>
                )}

                {/* STATE 3: QUIZ COMPLETED OR WON */}
                {quizCompleted && (
                  <div className="text-center py-8 space-y-6 max-w-md mx-auto">
                    <div className="w-20 h-20 rounded-full bg-emerald-600/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-500 animate-bounce">
                      <Award size={48} />
                    </div>

                    <div className="space-y-2">
                      <h2 className="text-2xl font-black text-white">Parabéns, Senhor do Tempo! 🌟</h2>
                      <p className="text-sm text-gray-400">
                        Você completou com sucesso o teste supremo de 40 perguntas do Doctor+ e superou a barreira do tempo!
                      </p>
                    </div>

                    {/* Stats results block */}
                    <div className="bg-zinc-900/80 border border-zinc-800 p-6 rounded-2xl grid grid-cols-2 gap-4 text-center font-mono">
                      <div>
                        <span className="text-[10px] text-gray-500 uppercase font-bold block">Acertos Totais</span>
                        <span className="text-3xl font-black text-emerald-400">{score}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-gray-500 uppercase font-bold block">Erros Totais</span>
                        <span className="text-3xl font-black text-red-500">{incorrectAnswers}</span>
                      </div>
                      <div className="col-span-2 pt-2 border-t border-zinc-800">
                        <span className="text-[10px] text-gray-500 uppercase font-bold block">Aproveitamento</span>
                        <span className="text-2xl font-black text-[#E50914]">{Math.round((score / 40) * 100)}%</span>
                      </div>
                    </div>

                    <div className="pt-2">
                      <button
                        onClick={startNewQuiz}
                        className="w-full py-3 bg-[#E50914] hover:bg-[#B80710] text-white font-bold rounded-xl text-xs transition-all shadow-lg cursor-pointer"
                      >
                        Jogar Novamente 🔄
                      </button>
                    </div>
                  </div>
                )}

              </div>

            </div>
          </div>
        )}

        {/* TAB 5: NOVIDADES & CENTRAL DE SUPORTE */}
        {activeTab === 'novidades' && (
          <div className="max-w-5xl mx-auto px-4 md:px-12 py-12 space-y-12 animate-fade-in">
            {/* Header section */}
            <div className="text-center space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/10 border border-red-600/30 text-xs text-red-500 font-mono font-bold">
                <Sparkles size={12} />
                CENTRAL DE AVISOS, NOVIDADES & SUPORTE NATIVO
              </div>
              <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white uppercase">
                Central de Comunicação Doctor+
              </h1>
              <p className="text-gray-400 max-w-2xl mx-auto text-sm">
                Fique por dentro das atualizações, confira o cronograma de novos lançamentos e entre em contato direto com a equipe.
              </p>
            </div>

            {/* BENTO GRID: AVISOS & SUPORTE */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
              
              {/* ⚠️ Central de Avisos Card */}
              <div className="bg-gradient-to-br from-amber-950/10 to-zinc-950 border border-amber-500/20 p-6 rounded-2xl flex flex-col justify-between space-y-4 shadow-xl">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-amber-500">
                    <AlertTriangle size={20} />
                    <h3 className="text-lg font-bold uppercase tracking-wider font-sans">
                      ⚠️ Central de Avisos
                    </h3>
                  </div>
                  
                  <div className="space-y-4 text-xs text-gray-300 leading-relaxed">
                    <div className="p-3 bg-amber-500/5 rounded-xl border border-amber-500/10 space-y-1">
                      <strong className="text-amber-400 block font-bold text-xs uppercase font-mono">📅 Dias de Atualização:</strong>
                      <p>Segunda, Quarta e Sexta-feira.</p>
                    </div>

                    <div className="p-3 bg-red-500/5 rounded-xl border border-red-500/10 space-y-1">
                      <strong className="text-red-400 block font-bold text-xs uppercase font-mono">⚠️ Possíveis Interrupções:</strong>
                      <p>
                        O cronograma pode ser afetado se houver problemas de infraestrutura no app ou se as artes e pôsteres oficiais dos episódios não carregarem corretamente. Sempre avisaremos qualquer eventualidade aqui na nossa central.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="pt-3 border-t border-zinc-900 text-[10px] text-amber-500/60 font-mono uppercase tracking-widest">
                  Status: Operando Estavelmente 🌀
                </div>
              </div>

              {/* 📱 Suporte e Contatos & Grupo Oficial */}
              <div className="space-y-6 flex flex-col justify-between">
                
                {/* Support channels list */}
                <div className="bg-zinc-900/30 border border-zinc-800 p-6 rounded-2xl space-y-4 flex-grow">
                  <h3 className="text-base font-bold text-white flex items-center gap-2 uppercase font-sans">
                    <span className="text-[#E50914]">📱</span> Suporte & Contatos Diretos
                  </h3>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Se precisar de ajuda ou encontrar algum erro no carregamento de links, fale diretamente com nossa equipe técnica via WhatsApp:
                  </p>

                  <div className="space-y-3">
                    <a 
                      href="https://wa.me/5599999999999?text=Ol%C3%A1%20Loganwk!%20Preciso%20de%20ajuda%20com%20o%20app%20Doctor%2B" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3 bg-zinc-950/60 hover:bg-[#E50914]/10 rounded-xl border border-zinc-900 hover:border-[#E50914]/30 transition-all group cursor-pointer"
                    >
                      <div>
                        <span className="text-[10px] font-mono font-semibold text-red-500 uppercase tracking-wider">Desenvolvedor</span>
                        <strong className="text-white block font-sans text-sm">Loganwk</strong>
                      </div>
                      <span className="text-xs text-gray-400 group-hover:text-red-500 flex items-center gap-1 font-mono">
                        Falar no WhatsApp <ExternalLink size={12} />
                      </span>
                    </a>

                    <a 
                      href="https://wa.me/5599999999998?text=Ol%C3%A1%20Eduardo!%20Preciso%20de%20ajuda%20com%20o%20app%20Doctor%2B" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3 bg-zinc-950/60 hover:bg-[#E50914]/10 rounded-xl border border-zinc-900 hover:border-[#E50914]/30 transition-all group cursor-pointer"
                    >
                      <div>
                        <span className="text-[10px] font-mono font-semibold text-red-500 uppercase tracking-wider">Suporte de Conteúdo</span>
                        <strong className="text-white block font-sans text-sm">Eduardo Uruguaiano Frasão</strong>
                      </div>
                      <span className="text-xs text-gray-400 group-hover:text-red-500 flex items-center gap-1 font-mono">
                        Falar no WhatsApp <ExternalLink size={12} />
                      </span>
                    </a>

                    <a 
                      href="https://wa.me/5599999999997?text=Ol%C3%A1%20Luis%20Felipe!%20Preciso%20de%20ajuda%20t%C3%A9cnica%20com%20o%20app%20Doctor%2B" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3 bg-zinc-950/60 hover:bg-[#E50914]/10 rounded-xl border border-zinc-900 hover:border-[#E50914]/30 transition-all group cursor-pointer"
                    >
                      <div>
                        <span className="text-[10px] font-mono font-semibold text-red-500 uppercase tracking-wider">Suporte Técnico</span>
                        <strong className="text-white block font-sans text-sm">Luis Felipe</strong>
                      </div>
                      <span className="text-xs text-gray-400 group-hover:text-red-500 flex items-center gap-1 font-mono">
                        Falar no WhatsApp <ExternalLink size={12} />
                      </span>
                    </a>
                  </div>
                </div>

                {/* 🔗 Grupo Oficial Card */}
                <div className="bg-gradient-to-br from-red-950/10 to-zinc-950 border border-zinc-800 p-6 rounded-2xl space-y-3 shadow-md">
                  <h4 className="text-sm font-bold text-white flex items-center gap-1.5 uppercase font-sans">
                    <span className="text-[#E50914]">🔗</span> Grupo Oficial de Fãs
                  </h4>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Acesse o grupo <strong>Cidade Alta de Gallifrey</strong> para acompanhar novidades em primeira mão e interagir com outros Whovians:
                  </p>
                  <a 
                    href="https://chat.whatsapp.com/GrQTI6h7xlHIQLDMqam8tk?s=cl&p=a&ilr=0&amv=0" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center gap-2 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs transition-all shadow-md hover:shadow-emerald-600/10 cursor-pointer uppercase font-mono"
                  >
                    Entrar no Grupo Oficial 💬
                  </a>
                </div>

              </div>

            </div>

            {/* CHRONOLOGICAL TIMELINE OF RELEASES */}
            <div className="space-y-6 pt-6">
              <h2 className="text-2xl font-extrabold text-white flex items-center gap-2">
                <span className="text-[#E50914]">⏳</span> Histórico de Versões do App
              </h2>
              
              <div className="space-y-6">
                
                {/* VERSION 57.0 (TALES OF THE TARDIS SPIN-OFF RELEASE) */}
                <div className="p-6 bg-zinc-950 border border-red-500/30 rounded-2xl relative overflow-hidden space-y-4 shadow-xl">
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-[#E50914]" />
                  
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-zinc-900">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-red-500 bg-red-600/10 px-2 py-0.5 rounded border border-red-500/20">
                        v57.0 (Atual)
                      </span>
                      <h4 className="font-bold text-white text-sm">Novo Spin-Off: Tales of the TARDIS (2023) Completo e Legendado!</h4>
                    </div>
                    <span className="text-[10px] text-gray-500 font-mono">Julho de 2026</span>
                  </div>

                  <p className="text-xs text-gray-300 leading-relaxed font-medium">
                    Trazemos com exclusividade o aclamado spin-off comemorativo de 60 anos, no qual Doutores clássicos e companheiros icônicos se reúnem na especial TARDIS da Lembrança para rever e discutir suas jornadas memoráveis, com todos os 6 episódios já ativos via Google Drive.
                  </p>

                  <ul className="space-y-2 text-xs text-gray-400">
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 font-bold">✓</span>
                      <span><strong>Novo Carrossel Dedicado:</strong> Fileira exclusiva "Tales of the TARDIS (2023)" adicionada diretamente ao catálogo inicial, facilitando o acesso rápido de ponta a ponta.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 font-bold">✓</span>
                      <span><strong>6 Episódios Legendados em HD:</strong> Transmissão estável e links ativos para Earthshock, The Mind Robber, Vengeance on Varos, The Three Doctors, The Time Meddler e The Curse of Fenric.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 font-bold">✓</span>
                      <span><strong>Acervo Histórico:</strong> Materiais e legendas resgatadas do blog TARDIS Stream através de knupp e F.B. Cavalcante do blog Deposito do Tempo.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 font-bold">✓</span>
                      <span><strong>Pôsteres Oficiais Integrados:</strong> Resolução remasterizada do pôster promocional da BBC aplicada individualmente a cada card.</span>
                    </li>
                  </ul>
                </div>

                {/* VERSION 56.0 (PREVIOUS RELEASE) */}
                <div className="p-6 bg-zinc-900/20 border border-zinc-800 rounded-2xl relative overflow-hidden space-y-4">
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-zinc-700" />
                  
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-zinc-850">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-gray-400 bg-zinc-850 px-2 py-0.5 rounded border border-zinc-750">
                        v56.0
                      </span>
                      <h4 className="font-bold text-gray-300 text-sm">Organização Multitemporal: Abas Exclusivas por Temporada, 7ª Temporada Clássica & Suporte Centralizado</h4>
                    </div>
                    <span className="text-[10px] text-gray-500 font-mono">Julho de 2026</span>
                  </div>

                  <p className="text-xs text-gray-400 leading-relaxed font-medium">
                    Um salto de magnitude de versão que atende à principal demanda estrutural de nossa comunidade, trazendo isolamento perfeito de temporadas para uma visualização limpa e intuitiva, junto com o colossal lançamento da era do Terceiro Doutor.
                  </p>
                </div>

                {/* VERSION 55.55 (PREVIOUS RELEASE) */}
                <div className="p-6 bg-zinc-900/20 border border-zinc-800 rounded-2xl relative overflow-hidden space-y-4">
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-zinc-700" />
                  
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-zinc-850">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-gray-400 bg-zinc-850 px-2 py-0.5 rounded border border-zinc-750">
                        v55.55
                      </span>
                      <h4 className="font-bold text-gray-300 text-sm">Atualização Multidimensional: Era Clássica Vol. 1, Destaques Dinâmicos & Sincronização UX</h4>
                    </div>
                    <span className="text-[10px] text-gray-500 font-mono">Julho de 2026</span>
                  </div>

                  <p className="text-xs text-gray-400 leading-relaxed font-medium">
                    Um salto monumental de versão representando um gigantesco volume de trabalho que resgata a era de ouro original de Doctor Who e introduz controles dinâmicos de destaque e refinamentos de navegação sem precedentes.
                  </p>
                </div>

                {/* VERSION 27.77 */}
                <div className="p-6 bg-zinc-900/40 border border-zinc-800 rounded-2xl relative overflow-hidden space-y-4">
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-zinc-700" />
                  
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-zinc-850">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-gray-400 bg-zinc-850 px-2 py-0.5 rounded border border-zinc-700">
                        v27.77
                      </span>
                      <h4 className="font-bold text-gray-300 text-sm">Atualização Massiva de Pôsteres & Alinhamento de Metadados</h4>
                    </div>
                    <span className="text-[10px] text-gray-500 font-mono">Julho de 2026</span>
                  </div>

                  <p className="text-xs text-gray-400 leading-relaxed">
                    Grande salto na numeração de versão em total conformidade com a nova diretiva de versionamento por impacto e magnitude, consolidando correções visuais e estruturais profundas no acervo.
                  </p>
                </div>

                {/* VERSION 22.9 (CURRENT NETFLIX REDESIGN) */}
                <div className="p-6 bg-zinc-900/40 border border-zinc-800 rounded-2xl relative overflow-hidden space-y-4">
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-zinc-700" />
                  
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-zinc-850">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-gray-400 bg-zinc-850 px-2 py-0.5 rounded border border-zinc-700">
                        v22.9
                      </span>
                      <h4 className="font-bold text-gray-300 text-sm">Redesenho Total da Experiência Netflix</h4>
                    </div>
                    <span className="text-[10px] text-gray-500 font-mono">Julho de 2026</span>
                  </div>

                  <p className="text-xs text-gray-400 leading-relaxed">
                    Substituição completa do design clássico azul TARDIS pela nova interface imersiva inspirada na Netflix, com vermelho principal, botões de destaque, gradientes e navegação de alta fidelidade de streaming profissional.
                  </p>
                </div>

                {/* VERSION 17.9 (SARAH JANE) */}
                <div className="p-6 bg-zinc-900/40 border border-zinc-800 rounded-2xl relative overflow-hidden space-y-4">
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-zinc-700" />
                  
                  <div className="flex items-center justify-between pb-2 border-b border-zinc-850">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-gray-400 bg-zinc-850 px-2 py-0.5 rounded border border-zinc-700">
                        v17.9
                      </span>
                      <h4 className="font-bold text-gray-300 text-sm">Super Atualização SJA & Salto de Magnitude</h4>
                    </div>
                    <span className="text-[10px] text-gray-500 font-mono font-medium">Julho de 2026</span>
                  </div>

                  <p className="text-xs text-gray-400 leading-relaxed">
                    Grande salto na numeração de versão para indicar o colossal volume de conteúdo adicionado: disponibilização das 5 temporadas completas de Sarah Jane Adventures por JC e MahBlue, incluindo o piloto e tributo especial totalmente catalogados.
                  </p>
                </div>

              </div>

            </div>
          </div>
        )}

        {/* TAB 6: CRÉDITOS */}
        {activeTab === 'creditos' && (
          <div className="max-w-5xl mx-auto px-4 md:px-12 py-12 space-y-12">
            {/* Header section */}
            <div className="text-center space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E50914]/10 border border-[#E50914]/30 text-xs text-[#E50914] font-mono font-bold">
                <User size={12} />
                CRÉDITOS & HISTÓRIA DO PROJETO
              </div>
              <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white uppercase">
                A Gênese do Doctor+
              </h1>
              <p className="text-gray-400 max-w-xl mx-auto text-sm">
                Conheça a história e os bastidores da criação deste ecossistema único de streaming de fã para fã.
              </p>
            </div>

            {/* Immersive cinematic introductory text */}
            <div className="bg-zinc-950 border border-zinc-900 rounded-3xl p-6 md:p-10 relative overflow-hidden space-y-6">
              <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/5 blur-3xl rounded-full" />
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-600/5 blur-3xl rounded-full" />
              
              <div className="border-l-4 border-[#E50914] pl-4 md:pl-6 space-y-4">
                <span className="text-[10px] text-[#E50914] font-mono font-bold uppercase tracking-widest">O Paradoxo Inicial</span>
                <p className="text-lg md:text-xl font-medium text-gray-100 leading-relaxed italic">
                  "Tudo começou com um paradoxo. De um lado, uma obra-prima da ficção científica: Doctor Who. Uma série genial, que atravessou décadas desde 1963, com roteiros brilhantes e personagens inapagáveis. Do outro, o espectador moderno, acostumado a maratonas fluidas, resoluções 4K e narrativas contínuas."
                </p>
              </div>

              <div className="text-sm text-gray-400 leading-relaxed space-y-4">
                <p>
                  O problema era claro. A série clássica, com seus episódios curtos de 25 minutos, cheios de *cliffhangers* e efeitos visuais datados dos anos 60 e 70, era uma barreira intransponível para muitos. Além disso, no Brasil, o material estava espalhado, sem legendas oficiais e difícil de encontrar. O público abandonava a série clássica não por falta de interesse, mas por falta de acessibilidade.
                </p>
                <p>
                  Mas o fandom não se cala diante de um desafio. Em algum lugar da internet, uma ideia ousada começou a tomar forma.
                </p>
              </div>
            </div>

            {/* The Founders/Architects section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Creator 1: Cunningmunki */}
              <div className="bg-zinc-900/40 border border-zinc-800 p-6 rounded-2xl space-y-4 flex flex-col justify-between hover:border-red-600/20 transition-all duration-300">
                <div className="space-y-2">
                  <span className="text-[10px] font-mono text-[#E50914] bg-[#E50914]/10 border border-[#E50914]/20 px-2 py-0.5 rounded font-bold uppercase">
                    A Faísca
                  </span>
                  <h3 className="text-xl font-bold text-white font-sans">Cunningmunki</h3>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Teve uma visão original: o que seria possível se esses episódios curtos e fragmentados fossem reorganizados? E se múltiplas partes fossem fundidas em um único vídeo coeso, como um filme, e se os efeitos fossem sutilmente modernizados sem perder o charme original? Essa foi a semente.
                  </p>
                </div>
                <div className="pt-4 border-t border-zinc-850 text-[10px] text-gray-500 font-mono">
                  Ideia & Concepção Original
                </div>
              </div>

              {/* Creator 2: Loganwk */}
              <div className="bg-zinc-900/40 border border-zinc-800 p-6 rounded-2xl space-y-4 flex flex-col justify-between hover:border-red-600/20 transition-all duration-300">
                <div className="space-y-2">
                  <span className="text-[10px] font-mono text-[#E50914] bg-[#E50914]/10 border border-[#E50914]/20 px-2 py-0.5 rounded font-bold uppercase">
                    O Catalisador
                  </span>
                  <h3 className="text-xl font-bold text-white font-sans">Loganwk</h3>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Como o verdadeiro catalisador, ele reconheceu o potencial daquela ideia. Ele mobilizou a comunidade Whovian brasileira, reunindo acervo, entusiasmo e pessoas. Ele plantou o desejo coletivo de ter algo melhor, garantindo o robusto acervo vital da série clássica.
                  </p>
                </div>
                <div className="pt-4 border-t border-zinc-850 text-[10px] text-gray-500 font-mono">
                  Curadoria & Mobilização Comunitária
                </div>
              </div>

              {/* Creator 3: Eduardo Uruguaiano Frasão */}
              <div className="bg-zinc-900/40 border border-zinc-800 p-6 rounded-2xl space-y-4 flex flex-col justify-between hover:border-red-600/20 transition-all duration-300">
                <div className="space-y-2">
                  <span className="text-[10px] font-mono text-[#E50914] bg-[#E50914]/10 border border-[#E50914]/20 px-2 py-0.5 rounded font-bold uppercase">
                    O Arquiteto
                  </span>
                  <h3 className="text-xl font-bold text-white font-sans">Eduardo U. Frasão</h3>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Em absoluto sigilo, ele assumiu o imenso desafio tecnológico. Ele pegou a visão original, o entusiasmo comunitário e começou a transformar tudo isso em linhas de código funcionais, arquitetando toda a fundação técnica do projeto atual.
                  </p>
                </div>
                <div className="pt-4 border-t border-zinc-850 text-[10px] text-gray-500 font-mono">
                  Desenvolvimento Técnico & Arquitetura
                </div>
              </div>

            </div>

            {/* Development timeline - bento style */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              
              {/* Left Column: A Caminhada Técnica */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <span className="text-[#E50914]">⚙️</span> A Caminhada Técnica
                </h2>
                <p className="text-xs text-gray-400 leading-relaxed">
                  A construção não foi fácil. Houve cinco rascunhos secretos até que a equipe chegasse ao produto final polido de hoje:
                </p>

                <div className="relative border-l-2 border-zinc-800 pl-6 ml-2 space-y-6 text-xs text-gray-300">
                  <div className="relative">
                    <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-zinc-900 border-2 border-zinc-700" />
                    <span className="font-mono font-bold text-red-500">v0.1</span>
                    <p className="text-gray-400">Apenas uma prova de conceito inicial, demonstrando com sucesso que a fusão fluida de episódios era viável.</p>
                  </div>
                  <div className="relative">
                    <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-zinc-900 border-2 border-zinc-700" />
                    <span className="font-mono font-bold text-red-500">v0.2</span>
                    <p className="text-gray-400">Foco estético completo, estruturando pela primeira vez uma interface digna de uma verdadeira plataforma premium.</p>
                  </div>
                  <div className="relative">
                    <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-red-600 border-2 border-zinc-900 animate-pulse" />
                    <span className="font-mono font-bold text-[#E50914]">v0.3</span>
                    <p className="text-gray-400"><strong>O Grande Gargalo:</strong> O motor de vídeo. Players customizados e codecs conflitantes geravam instabilidade. A solução veio ao simplificar: integrou-se o player nativo do Google Drive para máxima compatibilidade e estabilidade.</p>
                  </div>
                  <div className="relative">
                    <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-zinc-900 border-2 border-zinc-700" />
                    <span className="font-mono font-bold text-red-500">v0.4</span>
                    <p className="text-gray-400">Aplicação da consagrada filosofia "Menos é Mais", podando todas as distrações desnecessárias da tela.</p>
                  </div>
                  <div className="relative">
                    <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-[#E50914] border-2 border-black" />
                    <span className="font-mono font-bold text-white">v1.0+</span>
                    <p className="text-gray-200">Consolidação definitiva do ecossistema de exibição do Doctor+.</p>
                  </div>
                </div>
              </div>

              {/* Right Column: O Manifesto & Hub Comunitário */}
              <div className="space-y-6">
                
                {/* Manifesto Ético Card */}
                <div className="bg-gradient-to-br from-red-950/10 to-zinc-950 border border-red-950/30 p-6 rounded-2xl space-y-3">
                  <h3 className="text-base font-bold text-white flex items-center gap-1.5 uppercase font-sans">
                    <span className="text-[#E50914]">✦</span> Manifesto Ético Estrito
                  </h3>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    O projeto cresceu sob uma premissa simples e inegociável: <strong>de fãs para fãs</strong>. Sem telas de login, sem qualquer coleta de dados pessoais, sem anúncios intrusivos e sem perfis algorítmicos. O custo de manutenção do projeto é pago integralmente com pura paixão. Uma confiança descentralizada baseada em um pacto social sincero com o fandom para garantir que o legado de Doctor Who seja eternamente honrado.
                  </p>
                </div>

                {/* Hub Comunitário Card */}
                <div className="bg-zinc-900/30 border border-zinc-800 p-6 rounded-2xl space-y-4">
                  <h3 className="text-base font-bold text-white uppercase font-sans">
                    Hub Comunitário Whovian
                  </h3>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    O Doctor+ é sustentado de forma descentralizada por mentes brilhantes de toda a comunidade brasileira:
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="bg-zinc-950/60 p-3 rounded-xl border border-zinc-900 space-y-1">
                      <strong className="text-white block font-semibold">Loganwk</strong>
                      <span className="text-gray-400 text-[11px] block leading-tight">Provedor vital do gigantesco acervo da série clássica de Doctor Who.</span>
                    </div>
                    <div className="bg-zinc-950/60 p-3 rounded-xl border border-zinc-900 space-y-1">
                      <strong className="text-white block font-semibold">JC</strong>
                      <span className="text-gray-400 text-[11px] block leading-tight">Garante a transmissão e suporte estável das 15 temporadas modernas.</span>
                    </div>
                    <div className="bg-zinc-950/60 p-3 rounded-xl border border-zinc-900 space-y-1">
                      <strong className="text-white block font-semibold">MahBlue Séries</strong>
                      <span className="text-gray-400 text-[11px] block leading-tight">Contribuição essencial com os catálogos de spin-offs como Torchwood e Class.</span>
                    </div>
                    <div className="bg-zinc-950/60 p-3 rounded-xl border border-zinc-900 space-y-1">
                      <strong className="text-white block font-semibold">Universo Who</strong>
                      <span className="text-gray-400 text-[11px] block leading-tight">Responsável direto pela localização precisa, legendagem e imersão cultural nacional.</span>
                    </div>
                  </div>
                </div>

              </div>

            </div>

            {/* Impact & Conclusion Card */}
            <div className="bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 border border-zinc-800/80 rounded-3xl p-6 md:p-8 text-center space-y-4 relative overflow-hidden">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-red-600/5 blur-3xl rounded-full" />
              
              <h3 className="text-lg font-bold text-white uppercase tracking-wider font-sans">
                Mais do que Streaming: Salvaguarda Cultural
              </h3>
              <p className="text-xs text-gray-300 max-w-3xl mx-auto leading-relaxed">
                O Doctor+ democratizou o acesso, removendo barreiras técnicas e financeiras. Ele revitalizou a obra de arte que amamos, permitindo que novas gerações redescubram os arcos clássicos e modernos em formatos amigáveis e maratonáveis. E, acima de tudo, ele garante a preservação histórica do legado traduzido em nosso idioma.
              </p>
              
              <div className="pt-2 text-sm font-semibold text-[#E50914] font-mono tracking-widest uppercase">
                A TARDIS ganhou uma nova porta de entrada para o Brasil. 🌀✨
              </div>
            </div>

          </div>
        )}

      </main>

      {/* FOOTER */}
      <footer className="bg-black border-t border-zinc-900 py-8 text-center text-xs text-gray-500 space-y-2 px-4">
        <p className="font-mono text-red-600/80 tracking-widest uppercase font-bold text-[10px]">
          🌀 DOCTOR+ // CADA SEGUNDO IMPORTA NA JORNADA
        </p>
        <p>Desenvolvido para fãs de Doctor Who pela Cidade Alta de Gallifrey (CAG).</p>
        <p className="text-[10px]">Todos os direitos reservados à BBC Worldwide. Doctor Who e TARDIS são marcas registradas.</p>
      </footer>

      {/* NETFLIX OVERLAY DETAILS MODAL */}
      <AnimatePresence>
        {activeDetailsEpisode && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-sm flex justify-center items-start md:items-center p-4 py-8 md:py-12"
            onClick={() => setActiveDetailsEpisode(null)}
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-zinc-950 border border-red-950/40 rounded-3xl overflow-hidden max-w-2xl w-full relative shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button 
                onClick={() => setActiveDetailsEpisode(null)}
                className="absolute top-4 right-4 z-50 bg-black/60 hover:bg-red-600 text-white p-2 rounded-full border border-zinc-800 transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>

              {/* Large poster cover */}
              <div className="relative aspect-video bg-black overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent z-10" />
                <img 
                  src={getProxyImageUrl(activeDetailsEpisode.poster)} 
                  alt={activeDetailsEpisode.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center scale-102 filter brightness-90"
                />
                
                {/* Visual Title / Doctor Badge inside Image */}
                <div className="absolute bottom-6 left-6 right-6 z-20 space-y-1">
                  <div className="text-[10px] text-red-500 font-bold uppercase tracking-widest font-mono">
                    {activeDetailsEpisode.doctor}
                  </div>
                  <h2 className="text-xl md:text-3xl font-black text-white drop-shadow-md">
                    {activeDetailsEpisode.title}
                  </h2>
                </div>
              </div>

              {/* Detailed information block */}
              <div className="p-6 md:p-8 space-y-6">
                
                <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-gray-300 font-mono">
                  <span className="text-red-500 font-bold">Netflix Match</span>
                  <span>Ano {activeDetailsEpisode.year}</span>
                  <span className="px-1.5 py-0.2 bg-zinc-800 rounded text-white text-[10px]">HD</span>
                  <span>{activeDetailsEpisode.parts} {activeDetailsEpisode.parts === 1 ? 'Episódio' : 'Partes'}</span>
                  {activeDetailsEpisode.season && (
                    <span className="bg-red-600/10 border border-red-600/30 text-red-500 px-2 py-0.5 rounded text-[10px]">
                      Temp. {activeDetailsEpisode.season}
                    </span>
                  )}
                </div>

                {/* Synopsis */}
                <div className="space-y-2">
                  <h4 className="text-xs font-mono font-bold text-gray-400 uppercase tracking-wider">
                    Sinopse do Conteúdo
                  </h4>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    {activeDetailsEpisode.synopsis}
                  </p>
                </div>

                {/* Curiosities / Facts specific to this item */}
                <div className="bg-zinc-900/60 border border-zinc-850 p-4 rounded-xl space-y-1.5">
                  <div className="flex items-center gap-1.5 text-red-500 font-mono text-[10px] font-bold uppercase tracking-wider">
                    <Sparkles size={12} />
                    Curiosidades & Fatos
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed italic">
                    "{getEpisodeCuriosity(activeDetailsEpisode)}"
                  </p>
                </div>

                {/* Exclusive TeraBox Warn block if needed */}
                {activeDetailsEpisode.isTeraBox && (
                  <div className="bg-amber-950/20 border border-amber-900/40 p-4 rounded-xl space-y-1 text-xs text-amber-500 leading-relaxed">
                    <p className="font-bold flex items-center gap-1">
                      ⚠️ Aviso Importante (Disponível exclusivamente para clientes do TeraBox)
                    </p>
                    <p className="text-gray-400 text-[11px]">
                      Este conteúdo está hospedado no TeraBox e só poderá ser acessado por usuários que possuam uma conta na plataforma. Caso você não seja cliente do TeraBox, será necessário criar uma conta ou fazer login para visualizar os episódios.
                    </p>
                  </div>
                )}

                {/* Play action */}
                <div className="pt-4 flex flex-col sm:flex-row justify-between items-center gap-3 border-t border-zinc-900 mt-4">
                  <button
                    onClick={() => setActiveDetailsEpisode(null)}
                    className="w-full sm:w-auto px-6 py-3 bg-zinc-900 hover:bg-zinc-850 text-gray-300 hover:text-white font-bold rounded-lg text-xs tracking-wider uppercase transition-all border border-zinc-800 cursor-pointer text-center"
                  >
                    Voltar ao Catálogo
                  </button>

                  {activeDetailsEpisode.isTeraBox ? (
                    <button
                      onClick={() => {
                        openExternalUrl(activeDetailsEpisode.videoUrl);
                        setActiveDetailsEpisode(null);
                      }}
                      className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3 bg-[#ffaa00] hover:bg-[#e09500] text-black font-bold rounded-lg text-xs tracking-wider uppercase transition-all hover:scale-105 cursor-pointer"
                    >
                      <ExternalLink size={15} />
                      Assistir no TeraBox
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        openExternalUrl(activeDetailsEpisode.videoUrl);
                        setActiveDetailsEpisode(null);
                      }}
                      className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3 bg-[#E50914] hover:bg-[#B80710] text-white font-bold rounded-lg text-xs tracking-wider uppercase transition-all hover:scale-105 cursor-pointer"
                    >
                      <Play size={15} fill="currentColor" />
                      Assistir no Drive
                    </button>
                  )}
                </div>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CURIOSIDADE FACT OVERLAY DETAILED MODAL */}
      <AnimatePresence>
        {selectedCuriosity && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedCuriosity(null)}
          >
            <motion.div 
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-zinc-950 border border-red-950/40 p-6 md:p-8 rounded-3xl max-w-md w-full text-center space-y-4 relative shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedCuriosity(null)}
                className="absolute top-4 right-4 bg-zinc-900 hover:bg-red-600 text-white p-1.5 rounded-full border border-zinc-800 transition-colors cursor-pointer"
              >
                <X size={14} />
              </button>

              <span className="w-12 h-12 flex items-center justify-center rounded-full bg-[#E50914]/10 border border-red-600 text-[#E50914] font-mono text-lg font-black mx-auto">
                {selectedCuriosity.number}
              </span>

              <div className="space-y-1">
                <span className="text-[10px] text-gray-500 font-mono uppercase font-bold tracking-widest block">
                  CURIOSIDADE DO UNIVERSO
                </span>
                <h3 className="text-lg font-bold text-white">
                  {selectedCuriosity.title}
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                {selectedCuriosity.text}
              </p>

              <div className="pt-2">
                <button
                  onClick={() => setSelectedCuriosity(null)}
                  className="w-full py-2 bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-800 font-bold rounded-lg text-xs transition-colors cursor-pointer"
                >
                  Fechar registro
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
