/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo, useEffect } from 'react';
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
  BookOpen,
  History,
  Smartphone,
  Cpu,
  CheckCircle2,
  Settings,
  Users,
  Rocket,
  HelpCircle,
  Clock,
  ChevronRight,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { EPISODES, SITE_UPDATES } from './data';
import { Episode } from './types';

export default function App() {
  // Navigation Tabs for App v2.0:
  // 'classic' | 'spin-offs' | 'specials' | 'coming-soon' | 'config'
  const [activeTab, setActiveTab] = useState<string>('classic'); 
  
  // Sub-filters for better organization inside tabs
  const [selectedClassicSeason, setSelectedClassicSeason] = useState<string>('all'); // 'all' | '10' | '12'
  const [selectedSpinOffFilter, setSelectedSpinOffFilter] = useState<string>('all'); // 'all' | 'sja' | 'torchwood'
  
  // General filters
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDoctorFilter, setSelectedDoctorFilter] = useState<string>('Todos');
  const [activeDetailsEpisode, setActiveDetailsEpisode] = useState<Episode | null>(null);
  const [isLiteMode, setIsLiteMode] = useState<boolean>(false);

  // Active sub-tab inside Configurações for beautiful desktop-app look
  const [activeConfigTab, setActiveConfigTab] = useState<string>('logo'); // 'logo' | 'about' | 'credits' | 'updates' | 'curiosities'

  // Device capability check
  const [deviceCompat, setDeviceCompat] = useState<{ isLimited: boolean; details: string }>({ 
    isLimited: false, 
    details: 'Verificando compatibilidade...' 
  });

  useEffect(() => {
    const ua = navigator.userAgent;
    const limited = [
      'WebOS', 'Tizen', 'SMART-TV', 'AppleTV',
      'PlayStation', 'Xbox', 'Nintendo',
      'Android 4', 'Android 5',
      'MSIE', 'Trident', 'Edge/1', 'Edge/2', 'Edge/3'
    ];
    const hasModernFeatures = (
      typeof Promise !== 'undefined' &&
      typeof fetch !== 'undefined' &&
      typeof document.querySelector !== 'undefined'
    );
    const isLim = limited.some(l => ua.includes(l)) || !hasModernFeatures;
    
    setDeviceCompat({
      isLimited: isLim,
      details: isLim 
        ? 'Dispositivo de TV ou navegador clássico detectado. Recomendamos utilizar o Modo Lite para melhor desempenho.'
        : 'Dispositivo moderno detectado. Todo o potencial gráfico e sonoro está disponível!'
    });

    if (isLim) {
      setIsLiteMode(true);
    }
  }, []);

  // Featured episode selector (Defaults to Genesis of the Daleks Part 1 for premium vibe)
  const defaultFeatured = EPISODES.find(e => e.id === 'genesis-1') || EPISODES[0];
  const [featuredEpisode, setFeaturedEpisode] = useState<Episode>(defaultFeatured);

  // Dynamic Doctors list filtered by the active tab to keep selector neat and meaningful
  const doctors = useMemo(() => {
    let items = EPISODES;
    if (activeTab === 'classic') {
      items = EPISODES.filter(e => e.category === 'classic-10' || e.category === 'classic-12');
    } else if (activeTab === 'spin-offs') {
      items = EPISODES.filter(e => e.category === 'spin-off');
    } else if (activeTab === 'specials') {
      items = EPISODES.filter(e => e.category === 'special');
    } else {
      return ['Todos'];
    }
    
    const list = new Set(items.map(e => e.doctor));
    return ['Todos', ...Array.from(list)];
  }, [activeTab]);

  // Reset filters when changing primary tabs
  useEffect(() => {
    setSelectedDoctorFilter('Todos');
    setSearchQuery('');
  }, [activeTab]);

  // Filter episodes based on Tab, Sub-filters, Search and Doctor
  const filteredEpisodes = useMemo(() => {
    return EPISODES.filter(episode => {
      // 1. Tab boundary filtering
      let matchesTab = false;
      if (activeTab === 'classic') {
        matchesTab = episode.category === 'classic-10' || episode.category === 'classic-12';
        // Classic sub-season filtering
        if (selectedClassicSeason === '10') {
          matchesTab = episode.category === 'classic-10';
        } else if (selectedClassicSeason === '12') {
          matchesTab = episode.category === 'classic-12';
        }
      } else if (activeTab === 'spin-offs') {
        matchesTab = episode.category === 'spin-off';
        // Spin-off sub-brand filtering
        if (selectedSpinOffFilter === 'sja') {
          matchesTab = episode.category === 'spin-off' && episode.id.startsWith('sja-');
        } else if (selectedSpinOffFilter === 'torchwood') {
          matchesTab = episode.category === 'spin-off' && episode.id.startsWith('torchwood-');
        }
      } else if (activeTab === 'specials') {
        matchesTab = episode.category === 'special';
      } else if (activeTab === 'modern') {
        matchesTab = episode.category === 'modern';
      }

      // 2. Search filtering
      const matchesSearch = searchQuery === '' || 
                            episode.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            episode.synopsis.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            episode.doctor.toLowerCase().includes(searchQuery.toLowerCase());

      // 3. Doctor filtering
      const matchesDoctor = selectedDoctorFilter === 'Todos' || episode.doctor === selectedDoctorFilter;

      return matchesTab && matchesSearch && matchesDoctor;
    });
  }, [activeTab, selectedClassicSeason, selectedSpinOffFilter, searchQuery, selectedDoctorFilter]);

  // Helper to open Google Drive direct link safely
  const playEpisode = (url: string) => {
    window.open(url, '_blank');
  };

  // Switch to the Config Tab and trigger the Updates sub-tab
  const handleOpenUpdatesFromHeader = () => {
    setActiveTab('config');
    setActiveConfigTab('updates');
    const configEl = document.getElementById('catalog-section');
    if (configEl) {
      configEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // --- RENDERING LITE MODE (Universal compatibility layout inspired by retro HTML/CSS proposal) ---
  if (isLiteMode) {
    return (
      <div className="min-h-screen bg-[#0a0a1a] text-[#ffffff] font-sans p-4 max-w-4xl mx-auto selection:bg-[#0077ff] selection:text-white">
        {/* Cabeçalho Lite */}
        <div className="bg-gradient-to-r from-[#001a4a] to-[#0033aa] p-6 rounded-2xl text-center mb-6 shadow-lg border border-cyan-500/10">
          <h1 className="text-3xl font-extrabold tracking-wider flex items-center justify-center gap-2">
            🌀 Doctor+ <span className="text-sm bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded-full border border-cyan-500/30 font-mono">LITE</span>
          </h1>
          <p className="text-cyan-200 mt-2 text-sm font-medium">Versão otimizada para Smart TVs, Consoles e Conexões Lentas</p>
          <button 
            onClick={() => setIsLiteMode(false)}
            className="mt-4 px-4 py-1.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-full text-xs transition-all shadow-md cursor-pointer"
          >
            Alternar para Versão Completa ✨
          </button>
        </div>

        {/* Warning Badge */}
        <div className="bg-[#332200] border border-[#ffaa00] p-4 rounded-xl mb-6 text-[#ffcc66] text-xs leading-relaxed flex items-start gap-3">
          <span className="text-lg">⚠️</span>
          <div>
            <strong>Você está usando a versão de Compatibilidade Lite do Doctor+.</strong><br />
            Esta interface foi projetada para carregar instantaneamente sem sobrecarregar a memória de Smart TVs antigas. Os links direcionam direto para o Google Drive seguro.
          </div>
        </div>

        {/* Categories Navigation */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-8">
          {[
            { id: 'classic', label: '📺 Série Clássica' },
            { id: 'modern', label: '🌀 Série Moderna' },
            { id: 'spin-offs', label: '👽 Spin-offs' },
            { id: 'specials', label: '✨ Especiais' },
            { id: 'config', label: '⚙️ Ajustes' }
          ].map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`p-3 rounded-xl font-bold text-[11px] sm:text-xs transition-colors border ${
                activeTab === cat.id 
                  ? 'bg-[#0055cc] text-white border-cyan-400' 
                  : 'bg-[#14142a] text-slate-300 border-slate-800 hover:bg-[#1a1a3a]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Lite Content List */}
        <div className="bg-[#14142a] rounded-2xl p-6 border border-slate-800/80 space-y-6">
          
          {activeTab === 'classic' && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-cyan-400 border-b border-slate-800 pb-2 flex items-center justify-between">
                <span>📺 Série Clássica</span>
                <div className="flex gap-1.5 text-[10px] font-mono">
                  <button onClick={() => setSelectedClassicSeason('all')} className={`px-2 py-0.5 rounded ${selectedClassicSeason === 'all' ? 'bg-[#0055cc]' : 'bg-[#1a1a3a]'}`}>Tudo</button>
                  <button onClick={() => setSelectedClassicSeason('10')} className={`px-2 py-0.5 rounded ${selectedClassicSeason === '10' ? 'bg-[#0055cc]' : 'bg-[#1a1a3a]'}`}>T10</button>
                  <button onClick={() => setSelectedClassicSeason('12')} className={`px-2 py-0.5 rounded ${selectedClassicSeason === '12' ? 'bg-[#0055cc]' : 'bg-[#1a1a3a]'}`}>T12</button>
                </div>
              </h2>

              <div className="space-y-4">
                {filteredEpisodes.map(episode => (
                  <div key={episode.id} className="bg-[#1a1a3a] p-4 rounded-xl border border-[#5555aa]/20 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                    <img src={episode.poster} alt={episode.title} className="w-16 h-24 object-cover rounded-lg border border-slate-800" />
                    <div className="flex-1 space-y-1">
                      <span className="text-[9px] uppercase tracking-wider bg-cyan-500/10 text-cyan-300 px-2 py-0.5 rounded font-mono">{episode.doctor}</span>
                      <h3 className="text-sm font-bold text-white">{episode.title}</h3>
                      <p className="text-[11px] text-slate-400 leading-relaxed line-clamp-2">{episode.synopsis}</p>
                    </div>
                    <button onClick={() => playEpisode(episode.videoUrl)} className="w-full sm:w-auto px-4 py-2 bg-[#0077ff] text-white font-bold text-xs rounded-full cursor-pointer whitespace-nowrap">▶ Assistir</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'spin-offs' && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-cyan-400 border-b border-slate-800 pb-2">👽 Spin-offs & Séries Paralelas</h2>
              <div className="space-y-4">
                {filteredEpisodes.map(episode => (
                  <div key={episode.id} className="bg-[#1a1a3a] p-4 rounded-xl border border-[#5555aa]/20 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                    <img src={episode.poster} alt={episode.title} className="w-16 h-24 object-cover rounded-lg border border-slate-800" />
                    <div className="flex-1 space-y-1">
                      <span className="text-[9px] uppercase tracking-wider bg-cyan-500/10 text-cyan-300 px-2 py-0.5 rounded font-mono">{episode.doctor}</span>
                      <h3 className="text-sm font-bold text-white">{episode.title}</h3>
                      <p className="text-[11px] text-slate-400 leading-relaxed line-clamp-2">{episode.synopsis}</p>
                    </div>
                    <button onClick={() => playEpisode(episode.videoUrl)} className="w-full sm:w-auto px-4 py-2 bg-[#0077ff] text-white font-bold text-xs rounded-full cursor-pointer whitespace-nowrap">▶ Assistir</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'specials' && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-cyan-400 border-b border-slate-800 pb-2">✨ Especiais, Animações & Filmes</h2>
              <div className="space-y-4">
                {filteredEpisodes.map(episode => (
                  <div key={episode.id} className="bg-[#1a1a3a] p-4 rounded-xl border border-[#5555aa]/20 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                    <img src={episode.poster} alt={episode.title} className="w-16 h-24 object-cover rounded-lg border border-slate-800" />
                    <div className="flex-1 space-y-1">
                      <span className="text-[9px] uppercase tracking-wider bg-cyan-500/10 text-cyan-300 px-2 py-0.5 rounded font-mono">{episode.doctor}</span>
                      <h3 className="text-sm font-bold text-white">{episode.title}</h3>
                      <p className="text-[11px] text-slate-400 leading-relaxed line-clamp-2">{episode.synopsis}</p>
                    </div>
                    <button onClick={() => playEpisode(episode.videoUrl)} className="w-full sm:w-auto px-4 py-2 bg-[#0077ff] text-white font-bold text-xs rounded-full cursor-pointer whitespace-nowrap">▶ Assistir</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'modern' && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-cyan-400 border-b border-slate-800 pb-2">🌀 Série Moderna (2005-2025)</h2>
              <div className="space-y-4">
                {filteredEpisodes.map(episode => (
                  <div key={episode.id} className="bg-[#1a1a3a] p-4 rounded-xl border border-[#5555aa]/20 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                    <img src={episode.poster} alt={episode.title} className="w-16 h-24 object-cover rounded-lg border border-slate-800" />
                    <div className="flex-1 space-y-1">
                      <span className="text-[9px] uppercase tracking-wider bg-cyan-500/10 text-cyan-300 px-2 py-0.5 rounded font-mono">{episode.doctor}</span>
                      <h3 className="text-sm font-bold text-white">{episode.title}</h3>
                      <p className="text-[11px] text-slate-400 leading-relaxed line-clamp-2">{episode.synopsis}</p>
                    </div>
                    <button onClick={() => playEpisode(episode.videoUrl)} className="w-full sm:w-auto px-4 py-2 bg-[#0077ff] text-white font-bold text-xs rounded-full cursor-pointer whitespace-nowrap">▶ Assistir</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'config' && (
            <div className="space-y-6">
              <h2 className="text-lg font-bold text-cyan-400 border-b border-slate-800 pb-2">⚙️ Informações & Ajustes</h2>
              
              <div className="space-y-4 text-xs text-slate-300 leading-relaxed">
                <div className="p-4 bg-slate-900 rounded-xl space-y-2">
                  <h4 className="font-bold text-white">Sobre o Projeto</h4>
                  <p>O Doctor+ é uma iniciativa recreativa sem fins lucrativos desenvolvida por fãs brasileiros com profundo amor pelo universo clássico da TARDIS.</p>
                </div>

                <div className="p-4 bg-slate-900 rounded-xl space-y-2">
                  <h4 className="font-bold text-white">Créditos</h4>
                  <p><strong>Idealização:</strong> Eduardo Uruguaiano Frasão</p>
                  <p><strong>Conceito do Formato:</strong> Loganwk</p>
                  <p><strong>Tradução e Legendas:</strong> Universo Who</p>
                  <p><strong>Disponibilização de Conteúdo:</strong> MahBlue Series, JC</p>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Lite Footer */}
        <div className="text-center py-8 text-slate-500 text-xs border-t border-slate-800 mt-8 space-y-2">
          <p>Doctor+ Lite — Versão de Compatibilidade Universal</p>
          <p>© 2021–2026 Projeto Doctor+ • Todos os direitos reservados</p>
        </div>
      </div>
    );
  }

  // --- RENDERING FULL PREMIUM VERSION (React + Framer Motion) ---
  return (
    <div className="min-h-screen bg-[#060814] text-slate-100 font-sans selection:bg-[#06B6D4] selection:text-slate-950">
      
      {/* Dynamic Ambient Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-cyan-900/10 blur-[120px]" />
        <div className="absolute bottom-[-15%] right-[-10%] w-[60%] h-[60%] rounded-full bg-blue-950/20 blur-[150px]" />
        <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.07]" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-slate-800/80 bg-[#060814]/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.div 
              className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-tr from-[#0033aa] to-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.3)] text-white font-bold text-xl cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab('classic')}
            >
              🌀
            </motion.div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-1.5 cursor-pointer" onClick={() => setActiveTab('classic')}>
                Doctor<span className="text-cyan-400 font-extrabold text-2xl font-mono">+</span>
              </h1>
              <p className="text-[10px] uppercase tracking-widest text-cyan-500 font-mono">O Clássico Renovado</p>
            </div>
          </div>

          <div className="flex items-center gap-4 sm:gap-6 text-xs sm:text-sm text-slate-400">
            {/* Quick Toggle for Lite Mode */}
            <button 
              onClick={() => setIsLiteMode(true)}
              className="px-2.5 py-1 bg-slate-900 hover:bg-slate-850 text-[10px] font-mono rounded-lg border border-slate-800 text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer"
              title="Mudar para visualização leve"
            >
              Modo TV 📺
            </button>
            <span className="hidden lg:flex items-center gap-1.5 px-3 py-1 bg-slate-900/60 border border-slate-800 rounded-full text-xs text-slate-300">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              Projeto de Fãs Ativo
            </span>
            <span className="hover:text-cyan-400 cursor-pointer transition-colors font-medium flex items-center gap-1" onClick={handleOpenUpdatesFromHeader}>
              <Sparkles size={14} className="text-cyan-400" />
              Novidades v2.0
            </span>
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Device compatibility disclaimer bar */}
        <div className="p-3 bg-slate-950/80 border border-slate-800 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <Smartphone size={14} className="text-cyan-400" />
            <span>{deviceCompat.details}</span>
          </div>
          {deviceCompat.isLimited && (
            <button 
              onClick={() => setIsLiteMode(true)}
              className="px-3 py-1 bg-[#0077ff] hover:bg-[#0055cc] text-white font-bold rounded-lg transition-colors"
            >
              Ativar Modo Lite 🚀
            </button>
          )}
        </div>

        {/* Hero Section */}
        {activeTab !== 'config' && (
          <section 
            className="relative rounded-2xl overflow-hidden border border-slate-800/80 bg-slate-950 shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
            id="featured-hero"
          >
            {/* Banner background with premium gradients */}
            <div className="absolute inset-0">
              <img 
                src={featuredEpisode.poster} 
                alt={featuredEpisode.title} 
                className="w-full h-full object-cover opacity-30 object-center scale-105 filter blur-[1px] md:blur-0 md:opacity-35 transition-all duration-700" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#060814] via-[#060814]/75 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#060814] via-[#060814]/40 to-transparent hidden md:block" />
            </div>

            <div className="relative z-10 px-6 py-12 md:p-16 max-w-3xl space-y-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-xs font-semibold text-cyan-400 font-mono tracking-wider uppercase">
                ★ Destaque: {featuredEpisode.doctor}
              </span>
              
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
                {featuredEpisode.title}
              </h2>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs md:text-sm text-slate-300">
                <span className="flex items-center gap-1 font-mono">
                  <Calendar size={14} className="text-slate-400" />
                  Exibido em {featuredEpisode.year}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-slate-700" />
                <span>
                  {featuredEpisode.category === 'classic-10' && 'Temporada 10'}
                  {featuredEpisode.category === 'classic-12' && 'Temporada 12'}
                  {featuredEpisode.category === 'spin-off' && 'Spin-off'}
                  {featuredEpisode.category === 'special' && 'Especiais & Extras'}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-slate-700" />
                <span>{featuredEpisode.parts > 1 ? `${featuredEpisode.parts} partes` : 'Filme/Único'}</span>
              </div>

              <p className="text-sm md:text-base text-slate-300/90 leading-relaxed max-w-2xl line-clamp-3 md:line-clamp-none">
                {featuredEpisode.synopsis}
              </p>

              <div className="pt-4 flex flex-wrap gap-3">
                <motion.button 
                  onClick={() => playEpisode(featuredEpisode.videoUrl)}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl shadow-[0_4px_20px_rgba(6,182,212,0.3)] transition-all cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  id="hero-watch-btn"
                >
                  <Play size={18} className="fill-current" />
                  Assistir no Google Drive ↗
                </motion.button>
                <motion.button 
                  onClick={() => setActiveDetailsEpisode(featuredEpisode)}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 text-white font-medium rounded-xl transition-all cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  id="hero-details-btn"
                >
                  <Info size={18} />
                  Mais Detalhes
                </motion.button>
              </div>
            </div>
          </section>
        )}

        {/* Catalog Section Header with Navigation and Search */}
        <section className="space-y-6" id="catalog-section">
          
          {/* Main Title Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/60 pb-5" id="catalog-nav">
            <div>
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <Tv className="text-cyan-400 animate-pulse" size={24} />
                {activeTab === 'classic' && 'Série Clássica (Classic Who)'}
                {activeTab === 'modern' && 'Série Moderna (Modern Who) 🌀'}
                {activeTab === 'spin-offs' && 'Séries Derivadas (Spin-offs)'}
                {activeTab === 'specials' && 'Especiais, Filmes & Extras'}
                {activeTab === 'config' && 'Painel de Configurações & Informações'}
              </h2>
              <p className="text-xs text-slate-400">
                {activeTab === 'classic' && 'Os arcos reorganizados em episódios contínuos com legendas do Universo Who'}
                {activeTab === 'modern' && 'As 15 temporadas completas disponibilizadas por JC'}
                {activeTab === 'spin-offs' && 'As histórias fantásticas de Sarah Jane e a equipe secreta de Torchwood'}
                {activeTab === 'specials' && 'Os grandes marcos e filmes comemorativos da franquia'}
                {activeTab === 'config' && 'Nova logo, créditos da equipe, notas de atualização e curiosidades'}
              </p>
            </div>

            {/* Show controls ONLY if we are in searchable catalog tabs */}
            {activeTab !== 'config' && (
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
                {/* Search input */}
                <div className="relative flex-1 sm:w-64">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input 
                    type="text" 
                    placeholder="Buscar por título, doutor, vilão..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-slate-900/60 border border-slate-800 rounded-xl text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
                    id="search-input"
                  />
                  {searchQuery && (
                    <button 
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 hover:bg-slate-800 rounded text-slate-400 hover:text-white"
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>

                {/* Doctor filter */}
                <div className="relative">
                  <select 
                    value={selectedDoctorFilter}
                    onChange={(e) => setSelectedDoctorFilter(e.target.value)}
                    className="w-full sm:w-auto pl-3 pr-8 py-2 bg-slate-900/60 border border-slate-800 rounded-xl text-sm text-slate-200 focus:outline-none focus:border-cyan-500 cursor-pointer appearance-none"
                    id="doctor-filter"
                  >
                    {doctors.map(doc => (
                      <option key={doc} value={doc}>{doc === 'Todos' ? 'Todos os Doutores' : doc}</option>
                    ))}
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-[10px] font-mono">
                    ▼
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Primary Navigation Tabs — 5 Abas Organizadas do Doctor+ v2.0 */}
          <div className="flex flex-wrap gap-2 p-1.5 bg-slate-950/80 border border-slate-800/80 rounded-xl max-w-4xl overflow-x-auto">
            {[
              { id: 'classic', name: 'Série Clássica', icon: Tv },
              { id: 'modern', name: 'Série Moderna', icon: Rocket },
              { id: 'spin-offs', name: 'Spin-offs', icon: Play },
              { id: 'specials', name: 'Especiais', icon: Sparkles },
              { id: 'config', name: 'Configurações ⚙️', icon: Settings, highlight: true }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  // Default filters inside tabs to avoid empty pages
                  if (tab.id === 'classic') setSelectedClassicSeason('all');
                  if (tab.id === 'spin-offs') setSelectedSpinOffFilter('all');
                }}
                className={`flex items-center gap-1.5 py-2.5 px-4 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === tab.id 
                    ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 shadow-sm' 
                    : tab.highlight 
                      ? 'text-cyan-300 hover:text-cyan-200 border border-transparent bg-cyan-950/20 hover:bg-cyan-950/35'
                      : 'text-slate-400 hover:text-white border border-transparent'
                }`}
                id={`tab-${tab.id}`}
              >
                <tab.icon size={14} className={tab.highlight && activeTab !== tab.id ? 'animate-pulse' : ''} />
                {tab.name}
              </button>
            ))}
          </div>

          {/* Sub-filtering headers depending on the tab selected */}
          {activeTab === 'classic' && (
            <div className="flex gap-2 pb-1 overflow-x-auto">
              {[
                { id: 'all', name: 'Todas as Temporadas' },
                { id: '10', name: 'Temporada 10 (1973)' },
                { id: '12', name: 'Temporada 12 (1974-1975)' }
              ].map(sub => (
                <button
                  key={sub.id}
                  onClick={() => setSelectedClassicSeason(sub.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors border cursor-pointer ${
                    selectedClassicSeason === sub.id 
                      ? 'bg-[#0033aa]/20 border-[#0033aa] text-cyan-300' 
                      : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {sub.name}
                </button>
              ))}
            </div>
          )}

          {activeTab === 'spin-offs' && (
            <div className="flex gap-2 pb-1 overflow-x-auto">
              {[
                { id: 'all', name: 'Todos os Spin-offs' },
                { id: 'sja', name: "Sarah Jane's Alien Files (2010)" },
                { id: 'torchwood', name: 'Torchwood (Temp. 1-4)' }
              ].map(sub => (
                <button
                  key={sub.id}
                  onClick={() => setSelectedSpinOffFilter(sub.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors border cursor-pointer ${
                    selectedSpinOffFilter === sub.id 
                      ? 'bg-cyan-950/25 border-cyan-500/30 text-cyan-300' 
                      : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {sub.name}
                </button>
              ))}
            </div>
          )}

          {/* Catalog grid & content sections */}
          <AnimatePresence mode="wait">
            <motion.div 
              key={`${activeTab}-${selectedClassicSeason}-${selectedSpinOffFilter}-${searchQuery}-${selectedDoctorFilter}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              
              {/* SPECIALS TAB EXCLUSIVE BANNER (Utilizes the awesome provided Specials Banner) */}
              {activeTab === 'specials' && !searchQuery && (
                <div className="relative rounded-xl overflow-hidden border border-slate-800 bg-slate-950 h-40 md:h-48 flex items-center p-6 md:p-10 mb-2 shadow-inner">
                  <img 
                    src="https://files.catbox.moe/u6yu9c.png" 
                    alt="Especiais 2023" 
                    className="absolute inset-0 w-full h-full object-cover opacity-25 md:opacity-35 object-right-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent" />
                  <div className="relative z-10 max-w-lg space-y-2">
                    <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-widest bg-cyan-950/40 px-2.5 py-1 rounded-full border border-cyan-500/20">
                      Coleção Especial
                    </span>
                    <h3 className="text-xl md:text-2xl font-extrabold text-white tracking-tight">Aniversário de 60 Anos & Clássicos Devolvidos</h3>
                    <p className="text-xs text-slate-300 leading-relaxed max-w-md">
                      Uma curadoria extraordinária reunindo os specials de 2023 estrelados por David Tennant, animações de arcos perdidos dos anos 60 e o emocionante telefilme sobre as origens da série.
                    </p>
                  </div>
                </div>
              )}

              {/* MODERN TAB EXCLUSIVE BANNER (Utilizes the awesome provided Seasons Poster) */}
              {activeTab === 'modern' && !searchQuery && (
                <div className="relative rounded-xl overflow-hidden border border-slate-800 bg-slate-950 h-44 md:h-52 flex items-center p-6 md:p-10 mb-2 shadow-inner">
                  <img 
                    src="https://files.catbox.moe/ebpbci.jpeg" 
                    alt="Série Moderna" 
                    className="absolute inset-0 w-full h-full object-cover opacity-20 md:opacity-30 object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/75 to-transparent" />
                  <div className="relative z-10 max-w-xl space-y-2">
                    <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-widest bg-cyan-950/40 px-2.5 py-1 rounded-full border border-cyan-500/20">
                      Coleção Completa
                    </span>
                    <h3 className="text-xl md:text-3xl font-extrabold text-white tracking-tight">Série Moderna (2005-2025)</h3>
                    <p className="text-xs text-slate-300 leading-relaxed max-w-md">
                      As 15 temporadas completas disponibilizadas por JC no Doctor+. De Christopher Eccleston a Ncuti Gatwa, reviva a era de ouro de Doctor Who com links diretos seguros do Google Drive.
                    </p>
                  </div>
                </div>
              )}

              {/* ABA 5: CONFIGURAÇÕES (Centralized information, accordion / desktop settings style) */}
              {activeTab === 'config' && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto pt-2" id="config-panel">
                  
                  {/* Sidebar Navigation */}
                  <div className="lg:col-span-3 space-y-1 bg-slate-950/60 p-2 rounded-xl border border-slate-850">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 px-3 py-2 block">Menu do App</span>
                    {[
                      { id: 'logo', name: 'Identidade Visual 🌀', icon: Tv },
                      { id: 'about', name: 'Sobre o Projeto', icon: BookOpen },
                      { id: 'credits', name: 'Créditos da Equipe', icon: Users },
                      { id: 'updates', name: 'Notas de Atualização', icon: History },
                      { id: 'curiosities', name: 'Curiosidades Clássicas', icon: HelpCircle }
                    ].map(cfgSub => (
                      <button
                        key={cfgSub.id}
                        onClick={() => setActiveConfigTab(cfgSub.id)}
                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-bold transition-all text-left cursor-pointer ${
                          activeConfigTab === cfgSub.id 
                            ? 'bg-[#0033aa]/10 text-cyan-300 border-l-2 border-cyan-400' 
                            : 'text-slate-400 hover:bg-slate-900/60 hover:text-slate-200'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <cfgSub.icon size={13} className="text-cyan-500" />
                          {cfgSub.name}
                        </span>
                        <ChevronRight size={12} className={activeConfigTab === cfgSub.id ? 'text-cyan-400' : 'text-slate-600'} />
                      </button>
                    ))}
                  </div>

                  {/* Settings Content Screen (Perfect container size, never covers the whole screen) */}
                  <div className="lg:col-span-9 bg-slate-950/40 border border-slate-800 rounded-xl p-6 md:p-8 min-h-[400px] shadow-xl relative overflow-hidden flex flex-col justify-between">
                    
                    {/* Background glow effects strictly local inside container */}
                    <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

                    <div>
                      {/* SUB-SCREEN 1: NOVA LOGO DOCTOR+ */}
                      {activeConfigTab === 'logo' && (
                        <div className="space-y-6">
                          <div className="flex items-center gap-2 pb-3 border-b border-slate-900">
                            <Tv className="text-cyan-400" size={18} />
                            <h3 className="text-base font-bold text-white tracking-tight">Nova Identidade Visual — Doctor+ v2.0</h3>
                          </div>
                          
                          {/* Animated Conceptual Logo Presentation Widget */}
                          <div className="flex flex-col items-center justify-center p-8 bg-gradient-to-tr from-slate-950 via-[#0a0f28] to-slate-950 rounded-2xl border border-cyan-500/20 shadow-inner text-center space-y-4 relative overflow-hidden group">
                            
                            {/* Spinning Time Travel Swirl Vector */}
                            <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                              <div className="w-56 h-56 rounded-full border border-dashed border-cyan-500/10 animate-[spin_40s_linear_infinite]" />
                              <div className="w-40 h-40 rounded-full border border-dashed border-blue-500/5 animate-[spin_20s_linear_infinite_reverse]" />
                            </div>

                            <motion.div 
                              className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#0033aa] to-cyan-400 flex items-center justify-center text-white text-3xl shadow-[0_0_30px_rgba(6,182,212,0.4)] relative z-10"
                              animate={{ rotate: 360 }}
                              transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                            >
                              🌀
                            </motion.div>
                            
                            <div className="space-y-1 relative z-10">
                              <h4 className="text-3xl font-extrabold tracking-widest text-white leading-none">
                                DOCTOR<span className="text-cyan-400 font-mono">+</span>
                              </h4>
                              <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-cyan-400/80 font-semibold">O Clássico Renovado</p>
                            </div>
                            
                            <div className="w-12 h-0.5 bg-cyan-500/40 rounded-full relative z-10" />
                            
                            <p className="text-[11px] text-slate-400 max-w-sm leading-relaxed relative z-10">
                              A nova logo do Doctor+ une a icônica espiral temporal (representando a TARDIS) com um "+" circular e expandido, simbolizando nossa missão de estender e preservar o maravilhoso acervo clássico no Brasil.
                            </p>
                          </div>

                          <div className="space-y-3 text-xs text-slate-400 leading-relaxed bg-slate-950/40 p-4 rounded-xl border border-slate-900">
                            <h4 className="font-bold text-slate-200">Elementos Conceituais:</h4>
                            <ul className="list-disc pl-5 space-y-1.5">
                              <li><strong className="text-slate-300">Ícone de Espiral:</strong> Representa o túnel do tempo e o movimento contínuo da TARDIS pelo espaço.</li>
                              <li><strong className="text-slate-300">Azul TARDIS (#0033aa):</strong> A clássica cor britânica que definiu eras na televisão.</li>
                              <li><strong className="text-slate-300">"+" Estilizado:</strong> O sinal de expansão e modernidade do projeto de fãs.</li>
                            </ul>
                          </div>
                        </div>
                      )}

                      {/* SUB-SCREEN 2: SOBRE O PROJETO */}
                      {activeConfigTab === 'about' && (
                        <div className="space-y-6">
                          <div className="flex items-center gap-2 pb-3 border-b border-slate-900">
                            <BookOpen className="text-cyan-400" size={18} />
                            <h3 className="text-base font-bold text-white tracking-tight">Sobre o Projeto Doctor+</h3>
                          </div>
                          
                          <div className="space-y-4 text-xs md:text-sm text-slate-300 leading-relaxed">
                            <p>
                              O <strong className="text-white font-semibold">Doctor+</strong> é muito mais do que um simples organizador de mídias — ele foi idealizado para servir como uma ponte sólida e acolhedora entre gerações antigas e novas de fãs da ficção científica.
                            </p>
                            <p>
                              Nascido com a intenção clara de revitalizar a experiência de assistir à era clássica de Doctor Who no Brasil, o projeto soluciona um obstáculo importante: o antigo formato de arcos com cliffhangers diários que frequentemente afasta novos espectadores acostumados com narrativas de episódios contínuos modernos.
                            </p>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                              <div className="p-4 bg-slate-950/60 border border-slate-900 rounded-xl space-y-1.5">
                                <h4 className="font-bold text-cyan-400 text-xs">🎯 Nossa Missão</h4>
                                <p className="text-[11px] text-slate-400">Reorganizar os arcos históricos em episódios contínuos, modernizar sequências de áudio com respeito, e prover tradução em português de altíssima qualidade.</p>
                              </div>
                              <div className="p-4 bg-slate-950/60 border border-slate-900 rounded-xl space-y-1.5">
                                <h4 className="font-bold text-cyan-400 text-xs">💡 Filosofia Limpa</h4>
                                <p className="text-[11px] text-slate-400">Simplicidade absoluta. Zero logins, sem telas de cadastro e livre de anúncios irritantes. Apenas um clique para mergulhar no tempo e espaço.</p>
                              </div>
                            </div>

                            <div className="p-3 bg-cyan-950/20 border border-cyan-500/10 rounded-lg text-[11px] text-cyan-300 leading-relaxed flex gap-2">
                              <ShieldAlert className="flex-shrink-0 text-cyan-400" size={14} />
                              <span>
                                <strong>Aviso Importante:</strong> Este é um projeto cultural recreativo criado voluntariamente por fãs, sem fins lucrativos ou comerciais de qualquer espécie. Respeitamos inteiramente os direitos autorais da BBC.
                              </span>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* SUB-SCREEN 3: CRÉDITOS DA EQUIPE */}
                      {activeConfigTab === 'credits' && (
                        <div className="space-y-6">
                          <div className="flex items-center gap-2 pb-3 border-b border-slate-900">
                            <Users className="text-cyan-400" size={18} />
                            <h3 className="text-base font-bold text-white tracking-tight">Equipe & Colaboradores</h3>
                          </div>

                          <p className="text-xs text-slate-400 leading-relaxed">
                            O Doctor+ é mantido por fãs generosos e dedicados que disponibilizam tempo voluntário para construir e manter este portal vivo:
                          </p>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                            {[
                              { name: 'Eduardo Uruguaiano Frasão', role: 'Idealização Geral & Coordenação', badge: 'Líder do Projeto' },
                              { name: 'Loganwk', role: 'Conceito da Versão em Episódios', badge: 'Arquitetura' },
                              { name: 'MahBlue Series', role: 'Disponibilização de Especiais & Spin-offs', badge: 'Catálogo' },
                              { name: 'JC', role: 'Disponibilização da Série Moderna (2005-2024, 14 temporadas — em breve)', badge: 'Modern Who' },
                              { name: 'Universo Who', role: 'Traduções em Português da Era Clássica', badge: 'Comunidade' }
                            ].map((col, cIdx) => (
                              <div key={cIdx} className="p-3.5 bg-slate-950/50 border border-slate-900 rounded-xl space-y-1 flex flex-col justify-between hover:border-slate-800 transition-colors">
                                <div className="space-y-1">
                                  <div className="flex items-center justify-between">
                                    <span className="text-[10px] font-mono text-cyan-400 font-semibold">{col.badge}</span>
                                    <span className="text-[10px] text-slate-600">✓</span>
                                  </div>
                                  <h4 className="text-xs font-bold text-white">{col.name}</h4>
                                </div>
                                <p className="text-[11px] text-slate-400 pt-1">{col.role}</p>
                              </div>
                            ))}
                          </div>

                          <div className="pt-2 border-t border-slate-900 flex items-center justify-between text-[11px] text-slate-500">
                            <span>Agradecimento Especial ao pioneiro <strong>Cunningmunki</strong></span>
                            <span>© 2021–2026</span>
                          </div>
                        </div>
                      )}

                      {/* SUB-SCREEN 4: NOTAS DE ATUALIZAÇÃO (Play Store App Store style) */}
                      {activeConfigTab === 'updates' && (
                        <div className="space-y-6">
                          <div className="flex items-center gap-2 pb-3 border-b border-slate-900">
                            <History className="text-cyan-400" size={18} />
                            <h3 className="text-base font-bold text-white tracking-tight">Histórico de Versões do Aplicativo</h3>
                          </div>

                          {/* App Store / Play Store style timeline logs */}
                          <div className="space-y-5">
                            
                            {/* Version 2.1 (Current) */}
                            <div className="p-4 bg-slate-950/60 border border-slate-900 rounded-xl relative overflow-hidden space-y-3">
                              <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500" />
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">v2.1</span>
                                  <h4 className="text-xs font-bold text-white">Lançamento da Série Moderna & Correções</h4>
                                </div>
                                <span className="text-[10px] text-slate-500 font-mono">Julho de 2026</span>
                              </div>
                              
                              <p className="text-[11px] text-cyan-300 font-medium">Disponibilização de todas as 15 temporadas modernas fornecidas pelo colaborador JC, além de correções críticas de dados.</p>
                              
                              <div className="space-y-1 text-[11px] text-slate-400 list-none pl-1">
                                <div className="flex gap-1.5"><span className="text-cyan-400">✓</span><span><strong>Série Moderna Ativa:</strong> Adição das temporadas 1 a 15 de Doctor Who Moderna, de Christopher Eccleston a Ncuti Gatwa com links diretos seguros do Google Drive.</span></div>
                                <div className="flex gap-1.5"><span className="text-cyan-400">✓</span><span><strong>The Evil of the Daleks:</strong> Corrigido o arco clássico para episódio único unificado em formato Doctor+ (link único, sem múltiplas partes inexistentes).</span></div>
                                <div className="flex gap-1.5"><span className="text-cyan-400">✓</span><span><strong>Correção de Créditos:</strong> Ajuste oficial nas atribuições. Universo Who (Traduções clássicas), MahBlue Series (Disponibilização de especiais/spin-offs), e JC (Disponibilização da Série Moderna).</span></div>
                                <div className="flex gap-1.5"><span className="text-cyan-400">✓</span><span><strong>Visual Renovado:</strong> Novo banner com pôster panorâmico oficial da era moderna na aba "Série Moderna" para uma imersão completa.</span></div>
                              </div>
                            </div>

                            {/* Version 2.0 */}
                            <div className="p-4 bg-slate-950/40 border border-slate-900 rounded-xl relative overflow-hidden space-y-3">
                              <div className="absolute top-0 left-0 w-1 h-full bg-slate-700" />
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <span className="text-xs font-mono font-bold text-slate-400 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">v2.0</span>
                                  <h4 className="text-xs font-bold text-slate-300">Reestruturação Completa & Novo Catálogo</h4>
                                </div>
                                <span className="text-[10px] text-slate-500 font-mono">Julho de 2026</span>
                              </div>
                              
                              <p className="text-[11px] text-slate-400">Lançamento de compatibilidade universal e separação estrita de conteúdos por abas para evitar bagunça.</p>
                              
                              <div className="space-y-1 text-[11px] text-slate-500 list-none pl-1">
                                <div className="flex gap-1.5"><span>•</span><span>Organização estrita em abas distintas para facilitar a localização de mídias.</span></div>
                                <div className="flex gap-1.5"><span>•</span><span>Novo painel de Configurações centralizando créditos, logo e curiosidades em um só lugar.</span></div>
                                <div className="flex gap-1.5"><span>•</span><span>Modo Lite de alta compatibilidade para navegadores antigos e Smart TVs.</span></div>
                              </div>
                            </div>

                            {/* Version 1.0 (Initial) */}
                            <div className="p-4 bg-slate-950/30 border border-slate-900 rounded-xl relative overflow-hidden space-y-3">
                              <div className="absolute top-0 left-0 w-1 h-full bg-slate-800" />
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <span className="text-xs font-mono font-bold text-slate-400 bg-slate-800 px-2 py-0.5 rounded">v1.0</span>
                                  <h4 className="text-xs font-bold text-slate-300">Lançamento Inicial</h4>
                                </div>
                                <span className="text-[10px] text-slate-500 font-mono">2025</span>
                              </div>
                              
                              <p className="text-[11px] text-slate-400">Disponibilização da grade inicial de conteúdos legendados.</p>
                              
                              <div className="space-y-1 text-[11px] text-slate-500 list-none pl-1">
                                <div className="flex gap-1.5"><span>•</span><span>Temporada 10 clássica (Fronteira no Espaço e Planeta dos Daleks).</span></div>
                                <div className="flex gap-1.5"><span>•</span><span>Temporada 12 clássica (Robô, A Arca, Gênese e Vingança).</span></div>
                                <div className="flex gap-1.5"><span>•</span><span>Sarah Jane's Alien Files (6 episódios) e Torchwood (Temporadas 1 a 4).</span></div>
                              </div>
                            </div>

                          </div>
                        </div>
                      )}

                      {/* SUB-SCREEN 5: CURIOSIDADES */}
                      {activeConfigTab === 'curiosities' && (
                        <div className="space-y-6">
                          <div className="flex items-center gap-2 pb-3 border-b border-slate-900">
                            <HelpCircle className="text-cyan-400" size={18} />
                            <h3 className="text-base font-bold text-white tracking-tight">Curiosidades dos Bastidores</h3>
                          </div>

                          <div className="space-y-4">
                            {[
                              { 
                                title: '🌀 Origem Inspiradora', 
                                desc: 'O Doctor+ foi inteiramente inspirado no minucioso trabalho original de Cunningmunki, que idealizou a remontagem e melhoria gráfica da era clássica em formato contínuo de episódios convencionais.' 
                              },
                              { 
                                title: '⚡ Gênese Moral', 
                                desc: '"Gênese dos Daleks" na Temporada 12 abriga um dos maiores debates morais da televisão, quando o Quarto Doutor pondera se tem o direito ético de aniquilar os Daleks no nascedouro ou se isso o igualaria a eles.' 
                              },
                              { 
                                title: '🎞️ Arcos Recuperados', 
                                desc: 'Muitos arcos clássicos dos anos 60 foram tragicamente deletados ou apagados dos arquivos originais da BBC. "The Evil of the Daleks" foi carinhosamente reestruturado em animação oficial para que a história não se perdesse.' 
                              },
                              { 
                                title: '🔒 Estabilidade do Player', 
                                desc: 'A decisão do Doctor+ de usar o player oficial direto do Google Drive impede falhas de bloqueios de cookies modernos e garante que legendas nativas rodem suavemente em qualquer navegador.' 
                              }
                            ].map((cur, curIdx) => (
                              <div key={curIdx} className="p-4 bg-[#080b18] border border-slate-900 rounded-xl space-y-1.5 hover:border-slate-800 transition-colors">
                                <h4 className="font-bold text-xs text-white flex items-center gap-2">
                                  {cur.title}
                                </h4>
                                <p className="text-[11px] text-slate-400 leading-relaxed">{cur.desc}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                    </div>

                    {/* Bottom disclaimer bar inside configurations panel */}
                    <div className="mt-8 pt-4 border-t border-slate-900 text-[10px] text-slate-500 text-center flex flex-col sm:flex-row justify-between items-center gap-2">
                      <span>Doctor+ Suite — v2.0 O Clássico Renovado</span>
                      <span>Voltar para a TARDIS em segurança.</span>
                    </div>

                  </div>

                </div>
              )}

              {/* STANDARD EPISODES CATALOG GRID FOR OTHER CLASSIFIED TABS */}
              {activeTab !== 'config' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" id="episodes-grid">
                  {filteredEpisodes.length > 0 ? (
                    filteredEpisodes.map(episode => {
                      const isFeatured = featuredEpisode.id === episode.id;
                      return (
                        <div 
                          key={episode.id}
                          className="group relative flex flex-col bg-[#080b16] border border-slate-800/80 rounded-xl overflow-hidden hover:border-cyan-500/40 transition-all duration-300 hover:shadow-[0_10px_30px_rgba(6,182,212,0.1)]"
                          id={`episode-card-${episode.id}`}
                        >
                          {/* Banner Indicator if featured on top */}
                          {isFeatured && (
                            <div className="absolute top-3 left-3 z-20 px-2 py-0.5 bg-cyan-500 text-slate-950 text-[10px] font-bold rounded font-mono uppercase tracking-wider shadow-md">
                              Destaque
                            </div>
                          )}

                          {/* Poster image container with static and mobile controls */}
                          <div className="relative aspect-[16/10] sm:aspect-[2/3] bg-slate-900 overflow-hidden">
                            <img 
                              src={episode.poster} 
                              alt={episode.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                              loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-60 group-hover:opacity-85 transition-opacity duration-300" />
                            
                            {/* Overlay Controls (Desktop-only Hover and clean permanent tap triggers for Mobile) */}
                            <div className="absolute inset-0 flex flex-col justify-end p-4 gap-2 bg-[#060814]/85 opacity-0 group-hover:opacity-100 sm:group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                              <button 
                                onClick={() => playEpisode(episode.videoUrl)}
                                className="w-full py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 cursor-pointer shadow-md transition-colors"
                                id={`play-btn-${episode.id}`}
                              >
                                <Play size={14} className="fill-current" />
                                Assistir no Drive ↗
                              </button>
                              <button 
                                onClick={() => setActiveDetailsEpisode(episode)}
                                className="w-full py-2 bg-slate-900 hover:bg-slate-850 border border-slate-750 text-slate-200 text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                                id={`details-btn-${episode.id}`}
                              >
                                <Info size={14} />
                                Mais Detalhes
                              </button>
                            </div>
                          </div>

                          {/* Details Area */}
                          <div className="p-4 flex-1 flex flex-col justify-between space-y-3 bg-[#080b18]">
                            <div className="space-y-1.5">
                              <p className="text-[10px] font-semibold text-cyan-400 font-mono tracking-wide uppercase">
                                {episode.doctor}
                              </p>
                              <h3 className="font-bold text-white text-sm sm:text-base line-clamp-1 group-hover:text-cyan-300 transition-colors">
                                {episode.title}
                              </h3>
                              <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                                {episode.synopsis}
                              </p>
                            </div>

                            <div className="flex items-center justify-between pt-2 border-t border-slate-900 text-[11px] text-slate-400 font-mono">
                              <span>Exibido em {episode.year}</span>
                              <span className="px-2 py-0.5 bg-slate-900 border border-slate-800 rounded">
                                {episode.parts > 1 ? `${episode.parts} partes` : 'Completo'}
                              </span>
                            </div>

                            {/* Mobile-only action row (Prevents hover deadlock on smartphones!) */}
                            <div className="grid grid-cols-2 gap-2 pt-1 sm:hidden">
                              <button 
                                onClick={() => playEpisode(episode.videoUrl)}
                                className="py-2.5 bg-cyan-500 text-slate-950 rounded-lg text-xs font-bold flex items-center justify-center gap-1"
                                id={`mobile-play-btn-${episode.id}`}
                              >
                                <Play size={12} className="fill-current" />
                                Assistir no Drive ↗
                              </button>
                              <button 
                                onClick={() => setActiveDetailsEpisode(episode)}
                                className="py-2.5 bg-slate-900 border border-slate-800 text-slate-300 rounded-lg text-xs font-semibold flex items-center justify-center gap-1"
                                id={`mobile-details-btn-${episode.id}`}
                              >
                                <Info size={12} />
                                Detalhes
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="col-span-full py-12 px-4 border border-dashed border-slate-800 rounded-xl text-center space-y-3">
                      <div className="inline-flex p-3 rounded-full bg-slate-900 text-slate-500">
                        <AlertTriangle size={24} />
                      </div>
                      <h3 className="text-base font-bold text-slate-300">Nenhum episódio correspondente</h3>
                      <p className="text-xs text-slate-500 max-w-md mx-auto">
                        Não encontramos resultados para "{searchQuery}" com o filtro selecionado. Experimente redefinir a busca.
                      </p>
                      <button 
                        onClick={() => { setSearchQuery(''); setSelectedDoctorFilter('Todos'); }}
                        className="mt-2 text-xs text-cyan-400 hover:underline cursor-pointer"
                      >
                        Limpar Filtros e Exibir Todos
                      </button>
                    </div>
                  )}
                </div>
              )}

            </motion.div>
          </AnimatePresence>
        </section>

        {/* Footer / Credits */}
        <footer className="border-t border-slate-800/60 pt-8 pb-12 space-y-6 text-xs text-slate-500" id="footer-credits">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <h4 className="font-bold text-slate-300 uppercase tracking-widest text-[10px]">Ficha Técnica & Colaboração</h4>
              <p><strong>Idealização Geral:</strong> Eduardo Uruguaiano Frasão</p>
              <p><strong>Conceito da Versão em Episódios:</strong> Loganwk</p>
              <p><strong>Traduções e Legendas:</strong> Universo Who</p>
              <p><strong>Disponibilização de Conteúdo:</strong> MahBlue Series, JC (Em breve)</p>
            </div>
            <div className="space-y-2 md:text-right">
              <h4 className="font-bold text-slate-300 uppercase tracking-widest text-[10px] md:text-right">Aviso Legal</h4>
              <p>Doctor Who é de propriedade intelectual da British Broadcasting Corporation (BBC).</p>
              <p>Doctor+ é um trabalho puramente recreativo de fãs, sem comercialização ou monetização envolvida.</p>
              <p className="text-cyan-400/60">© 2021–2026 Projeto Doctor+. Desenvolvido com amor à TARDIS.</p>
            </div>
          </div>
        </footer>

      </main>

      {/* EPISODE DETAILS MODAL */}
      <AnimatePresence>
        {activeDetailsEpisode && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setActiveDetailsEpisode(null)}
            id="details-modal-backdrop"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-slate-950 border border-slate-800 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Top Banner Cover */}
              <div className="h-32 bg-slate-900 relative">
                <img 
                  src={activeDetailsEpisode.poster} 
                  alt={activeDetailsEpisode.title} 
                  className="w-full h-full object-cover opacity-20 filter blur-[4px]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent" />
                <button 
                  onClick={() => setActiveDetailsEpisode(null)}
                  className="absolute top-4 right-4 p-1.5 bg-slate-900/80 hover:bg-slate-800 rounded-full text-slate-400 hover:text-white transition-colors"
                  id="close-details-modal"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Main Content Area */}
              <div className="p-6 md:p-8 pt-0 relative z-10 -mt-16">
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Poster Thumbnail */}
                  <div className="w-32 h-48 rounded-xl overflow-hidden border border-slate-800 bg-slate-900 shadow-lg flex-shrink-0 mx-auto md:mx-0">
                    <img 
                      src={activeDetailsEpisode.poster} 
                      alt={activeDetailsEpisode.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Context Info */}
                  <div className="flex-1 space-y-4 text-center md:text-left">
                    <div className="space-y-1">
                      <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
                        {activeDetailsEpisode.doctor}
                      </span>
                      <h3 className="text-xl md:text-2xl font-extrabold text-white leading-tight">
                        {activeDetailsEpisode.title}
                      </h3>
                      <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-3 text-xs text-slate-400">
                        <span>Exibido em {activeDetailsEpisode.year}</span>
                        <span className="w-1 h-1 rounded-full bg-slate-700" />
                        <span>
                          {activeDetailsEpisode.category === 'classic-10' && 'Temporada 10'}
                          {activeDetailsEpisode.category === 'classic-12' && 'Temporada 12'}
                          {activeDetailsEpisode.category === 'spin-off' && 'Spin-off'}
                          {activeDetailsEpisode.category === 'special' && 'Especiais & Extras'}
                        </span>
                        <span className="w-1 h-1 rounded-full bg-slate-700" />
                        <span>{activeDetailsEpisode.parts > 1 ? `${activeDetailsEpisode.parts} partes` : 'Completo'}</span>
                      </div>
                    </div>

                    <div className="flex justify-center md:justify-start gap-3">
                      <button 
                        onClick={() => {
                          playEpisode(activeDetailsEpisode.videoUrl);
                          setActiveDetailsEpisode(null);
                        }}
                        className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-xl shadow-md transition-colors cursor-pointer"
                        id="play-from-details"
                      >
                        <Play size={14} className="fill-current" />
                        Assistir no Drive ↗
                      </button>
                      <button 
                        onClick={() => {
                          setFeaturedEpisode(activeDetailsEpisode);
                          setActiveDetailsEpisode(null);
                        }}
                        className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-300 hover:text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
                        id="set-featured"
                      >
                        <Sparkles size={14} className="text-cyan-400" />
                        Fixar no Banner
                      </button>
                    </div>
                  </div>
                </div>

                {/* Synopsis info */}
                <div className="mt-6 pt-6 border-t border-slate-900 space-y-2">
                  <h4 className="text-sm font-bold text-white flex items-center gap-1.5 justify-center md:justify-start">
                    <Info size={14} className="text-cyan-400" />
                    Sinopse do Conteúdo
                  </h4>
                  <p className="text-sm text-slate-300 leading-relaxed text-center md:text-left">
                    {activeDetailsEpisode.synopsis}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
