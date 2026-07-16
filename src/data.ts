/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Episode, Season, SiteUpdate } from './types';
import { SJA_EPISODES } from './sjaData';
import { CLASS_EPISODES } from './classData';

export const SEASONS: Season[] = [
  { number: 1, name: 'Temporada 1' },
  { number: 2, name: 'Temporada 2' },
  { number: 10, name: 'Temporada 10' },
  { number: 12, name: 'Temporada 12' }
];

export const SITE_UPDATES: SiteUpdate[] = [
  {
    version: 'v1.0.1',
    title: 'Compatibilidade Lite',
    date: 'Julho de 2026',
    objective: 'Criar uma versão alternativa que funcione de forma universal em Smart TVs, consoles e navegadores antigos sem travar a tela.',
    implementations: [
      {
        title: 'Detecção Automática',
        description: 'Implementação de script inteligente de verificação de capacidades do navegador para garantir a melhor renderização.'
      },
      {
        title: 'Interface Lite (Otimizada)',
        description: 'Desenvolvimento de visual minimalista e leve com carregamento veloz para conexões lentas ou aparelhos de pouca memória.'
      }
    ]
  },
  {
    version: 'v1.0.2',
    title: 'Polyfills e Fallbacks',
    date: 'Julho de 2026',
    objective: 'Garantir que funcionalidades modernas do JavaScript e CSS rodem em navegadores antigos.',
    implementations: [
      {
        title: 'Compatibilidade de Redes',
        description: 'Suporte estendido para requisições assíncronas (fetch) e Promises nativas em navegadores desatualizados.'
      },
      {
        title: 'Estilização Resiliente',
        description: 'Fallbacks universais de layouts CSS Grid e Flexbox, além de tratamento para carregamento progressivo de imagens.'
      }
    ]
  },
  {
    version: 'v1.0.3',
    title: 'Carregamento Progressivo',
    date: 'Julho de 2026',
    objective: 'Melhorar radicalmente a experiência do usuário durante o carregamento de imagens pesadas.',
    implementations: [
      {
        title: 'Skeletons Screens',
        description: 'Animações suaves de "Shimmer" simulam a estrutura do site enquanto o conteúdo final é carregado pelas APIs.'
      },
      {
        title: 'Controle de Timeout',
        description: 'Sistema preventivo que remove telas de carregamento automaticamente caso ocorra falha de conexão.'
      }
    ]
  },
  {
    version: 'v1.0.4',
    title: 'Player Confiável e Direto',
    date: 'Julho de 2026',
    objective: 'Acabar com o erro de "Conexão Recusada" do Google Drive causado pelo bloqueio de cookies de terceiros.',
    implementations: [
      {
        title: 'Links Estáveis ↗',
        description: 'Substituição total de players embutidos frágeis por links diretos super seguros que abrem em novas abas do Google Drive.'
      },
      {
        title: 'Fim dos Travamentos',
        description: 'Maior estabilidade na reprodução, suporte integral a legendas nativas e sem consumo indevido de memória local.'
      }
    ]
  },
  {
    version: 'v1.0.5',
    title: 'Otimização para Smart TVs',
    date: 'Julho de 2026',
    objective: 'Garantir usabilidade impecável para quem assiste deitado no sofá utilizando controle remoto.',
    implementations: [
      {
        title: 'Navegação por D-pad (Teclado)',
        description: 'Mapeamento inteligente de teclas direcionais para pular de card em card facilmente, com foco visual demarcado.'
      },
      {
        title: 'Fontes e Escala de TV',
        description: 'Ajuste de densidade e aumento da escala de fontes para leitura confortável a metros de distância.'
      }
    ]
  },
  {
    version: 'v1.0.6',
    title: 'Modo Offline e Sem JavaScript',
    date: 'Julho de 2026',
    objective: 'Oferecer conteúdo alternativo e descritivo mesmo para aparelhos com script totalmente desligado.',
    implementations: [
      {
        title: 'Tags Resilientes <noscript>',
        description: 'Mensagens informativas personalizadas e fluxos adaptados quando o interpretador de código está desativado.'
      }
    ]
  },
  {
    version: 'v1.0.7',
    title: 'Diagnóstico e Central de Erros',
    date: 'Julho de 2026',
    objective: 'Coletar e analisar erros de renderização invisíveis para corrigir falhas de forma proativa.',
    implementations: [
      {
        title: 'Logs Internos Seguros',
        description: 'Registro local de capacidades de renderização para auxiliar futuras melhorias sem comprometer a privacidade.'
      }
    ]
  }
];

const BASE_EPISODES: Episode[] = [
  // --- TEMPORADA 1 (1963-1964) ---
  {
    id: 'classic-1-1',
    title: 'Arco 001 – An Unearthly Child',
    doctor: 'Primeiro Doutor',
    year: '1963-1964',
    synopsis: 'O início de tudo: dois professores descobrem que uma de suas alunas possui conhecimentos incomuns e a seguem até um ferro-velho, onde encontram sua misteriosa cabine policial chamada TARDIS e seu enigmático avô, o Doutor.',
    videoUrl: 'https://drive.google.com/open?id=1iKG5Bv0QCtTlV_-Eqzd1an-6_DASVNg5',
    poster: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663627993377/OGSFqHTnHUVKTAlV.jpg',
    parts: 4,
    season: 1,
    category: 'classic-1'
  },
  {
    id: 'classic-1-2',
    title: 'Arco 002 – The Daleks',
    doctor: 'Primeiro Doutor',
    year: '1963-1964',
    synopsis: 'A primeira aparição histórica dos maiores inimigos do Doutor. A TARDIS pousa no planeta Skaro, devastado por uma guerra nuclear, onde os pacíficos Thals e os implacáveis e mutantes Daleks duelam pela sobrevivência.',
    videoUrl: 'https://drive.google.com/open?id=14XiFPYl-PFwXRUSyaShZ3di8AvWtDWDd',
    poster: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663627993377/mjZcNPvWwHAjGENN.jpg',
    parts: 7,
    season: 1,
    category: 'classic-1'
  },
  {
    id: 'classic-1-3',
    title: 'Arco 003 – The Edge Of Destruction',
    doctor: 'Primeiro Doutor',
    year: '1964',
    synopsis: 'Uma pequena explosão na TARDIS deixa todos os tripulantes inconscientes e, ao acordarem, começam a agir de forma paranoica e hostil uns com os outros sob uma força misteriosa.',
    videoUrl: 'https://drive.google.com/open?id=18TjEOTDDa7zIYmlCQiBpXosmudwYP1fi',
    poster: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663627993377/WVquFquprqyvVYBV.jpg',
    parts: 2,
    season: 1,
    category: 'classic-1'
  },
  {
    id: 'classic-1-4',
    title: 'Arco 004 – Marco Polo',
    doctor: 'Primeiro Doutor',
    year: '1964',
    synopsis: 'A tripulação da TARDIS pousa na Ásia Central em 1289 e encontra o lendário explorador veneziano Marco Polo na sua caravana rumo a Pequim.',
    videoUrl: 'https://drive.google.com/open?id=1cBSyNbx632jCBUeAL4u9K0qleuKLY1a8',
    poster: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663627993377/rgeMKoFVtAYJgDfP.jpg',
    parts: 7,
    season: 1,
    category: 'classic-1'
  },
  {
    id: 'classic-1-5',
    title: 'Arco 005 – The Keys of Marinus',
    doctor: 'Primeiro Doutor',
    year: '1964',
    synopsis: 'O Doutor e seus companheiros são recrutados para recuperar as quatro chaves da Consciência de Marinus, um computador de justiça espalhado pelo planeta antes que caiam em mãos erradas.',
    videoUrl: 'https://drive.google.com/open?id=1q_TLVI9rE5DtlU92Nl6CWJh_BMkH_wmK',
    poster: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663627993377/YNuiVDcrxWlnWfgL.jpg',
    parts: 6,
    season: 1,
    category: 'classic-1'
  },
  {
    id: 'classic-1-6',
    title: 'Arco 006 – The Aztecs',
    doctor: 'Primeiro Doutor',
    year: '1964',
    synopsis: 'A TARDIS materializa-se no México do século XV. Barbara é confundida com a reencarnação do sumo sacerdote asteca Yetaxa e tenta usar sua influência para abolir os sacrifícios humanos.',
    videoUrl: 'https://drive.google.com/open?id=12PeRPVOV0XMc9ibH1Ufycq4LivBh3Jx4',
    poster: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663627993377/FGESewUWVLyJhBhU.jpg',
    parts: 4,
    season: 1,
    category: 'classic-1'
  },
  {
    id: 'classic-1-7',
    title: 'Arco 007 – The Sensorites',
    doctor: 'Primeiro Doutor',
    year: '1964',
    synopsis: 'Uma misteriosa raça telepática conhecida como os Sensorites mantém uma tripulação humana como refém e o Doutor precisa intervir para negociar a paz e descobrir as verdadeiras intenções deles.',
    videoUrl: 'https://drive.google.com/open?id=1_CekLYcI7GxzIYqBJL2HAj3rueBU-Li8',
    poster: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663627993377/hTVEEbbleuRgUzvT.jpg',
    parts: 6,
    season: 1,
    category: 'classic-1'
  },
  {
    id: 'classic-1-8',
    title: 'Arco 008 – The Reign of Terror',
    doctor: 'Primeiro Doutor',
    year: '1964',
    synopsis: 'O Doutor e seus amigos materializam-se na França durante a violenta Revolução Francesa de 1794, onde se veem envolvidos nos perigosos eventos do Reinado do Terror liderado por Robespierre.',
    videoUrl: 'https://drive.google.com/open?id=11-Ei_0Slulf54_DKtnw7VCd5z2XFhv7c',
    poster: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663627993377/cllATxfbxhuuPymY.jpg',
    parts: 6,
    season: 1,
    category: 'classic-1'
  },

  // --- TEMPORADA 2 (1964-1965) ---
  {
    id: 'classic-2-1',
    title: 'Arco 009 – Planet of Giants',
    doctor: 'Primeiro Doutor',
    year: '1964',
    synopsis: 'A TARDIS sofre um mau funcionamento de tamanho, reduzindo o Doutor, Susan, Ian e Barbara a meros centímetros de altura ao pousarem em um jardim inglês comum.',
    videoUrl: 'https://drive.google.com/open?id=1nGQKJMQGDz2qgFDK9yDQTjzCex2CP5gI',
    poster: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663627993377/UiAnZeZuTvVHjgLI.jpg',
    parts: 3,
    season: 2,
    category: 'classic-2'
  },
  {
    id: 'classic-2-2',
    title: 'Arco 010 – The Dalek Invasion of Earth',
    doctor: 'Primeiro Doutor',
    year: '1964',
    synopsis: 'O Doutor e seus companheiros retornam a Londres, mas descobrem que a Terra do século XXII foi invadida e escravizada pelos impiedosos Daleks.',
    videoUrl: 'https://drive.google.com/open?id=13HxX6nDAT6GkdUCRuSHbDOdoerKeUMX5',
    poster: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663627993377/SiiLZpEuXRkuhCHX.jpg',
    parts: 6,
    season: 2,
    category: 'classic-2'
  },
  {
    id: 'classic-2-3',
    title: 'Arco 011 – The Rescue',
    doctor: 'Primeiro Doutor',
    year: '1965',
    synopsis: 'Em busca de novos rumos, o Doutor encontra os sobreviventes de uma nave acidentada sob o controle do misterioso e temível Bennett.',
    videoUrl: 'https://drive.google.com/open?id=1BmEbdIcJ6NjbXZc8phYGG6vVmFbnQQtL',
    poster: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663627993377/MyCsVMGZOeChfwsM.jpg',
    parts: 2,
    season: 2,
    category: 'classic-2'
  },
  {
    id: 'classic-2-4',
    title: 'Arco 012 – The Romans',
    doctor: 'Primeiro Doutor',
    year: '1965',
    synopsis: 'Uma relaxante folga na Itália do século I se transforma em caos absoluto quando o Doutor é confundido com um grande músico e Ian e Barbara são vendidos como escravos.',
    videoUrl: 'https://drive.google.com/open?id=1JbkpF1caTFGszeebKzYu_PMK7rRUY_bF',
    poster: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663627993377/qAazqcXmhStGCsVl.jpg',
    parts: 4,
    season: 2,
    category: 'classic-2'
  },
  {
    id: 'classic-2-5',
    title: 'Arco 013 – The Web Planet',
    doctor: 'Primeiro Doutor',
    year: '1965',
    synopsis: 'A TARDIS é arrastada para o estranho e inóspito planeta Vortis, onde formigas gigantes lutam contra criaturas parecidas com borboletas sob o controle do malévolo Animus.',
    videoUrl: 'https://drive.google.com/open?id=1y40PmnjfMSXm8ROv3VdPpAux1m5CzUyY',
    poster: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663627993377/BzPURUKxFGYqFudJ.jpg',
    parts: 6,
    season: 2,
    category: 'classic-2'
  },
  {
    id: 'classic-2-6',
    title: 'Arco 014 – The Crusade',
    doctor: 'Primeiro Doutor',
    year: '1965',
    synopsis: 'A TARDIS materializa-se na Palestina do século XII, durante a Terceira Cruzada. Barbara é capturada pelos sarracenos e o Doutor precisa intervir junto a Ricardo Coração de Leão.',
    videoUrl: 'https://drive.google.com/open?id=1Do4Jhepl8rqIwL0lSOhg4n64ZHWLK6nh',
    poster: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663627993377/FUPhYFVYOxqFpgIz.jpg',
    parts: 4,
    season: 2,
    category: 'classic-2'
  },
  {
    id: 'classic-2-7',
    title: 'Arco 015 – The Space Museum',
    doctor: 'Primeiro Doutor',
    year: '1965',
    synopsis: 'Ao chegarem no planeta Xeros, a tripulação descobre uma exposição fantasmagórica que prevê seu próprio futuro sombrio como itens de museu.',
    videoUrl: 'https://drive.google.com/open?id=1oRqptKGo5Z6UtCFkdaUV19X-f3jGAigR',
    poster: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663627993377/XTCYHfRiVqJYUrmX.jpg',
    parts: 4,
    season: 2,
    category: 'classic-2'
  },
  {
    id: 'classic-2-8',
    title: 'Arco 016 – The Chase',
    doctor: 'Primeiro Doutor',
    year: '1965',
    synopsis: 'Os Daleks constroem sua própria máquina do tempo e dão início a uma implacável perseguição multitemporal para destruir o Doutor e seus amigos.',
    videoUrl: 'https://drive.google.com/open?id=1zJPAii0PPLSU7O2eSqpIu12okAToGjv5',
    poster: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663627993377/FyFBDmtzTywAVssN.jpg',
    parts: 6,
    season: 2,
    category: 'classic-2'
  },
  {
    id: 'classic-2-9',
    title: 'Arco 017 – The Time Meddler',
    doctor: 'Primeiro Doutor',
    year: '1965',
    synopsis: 'O Doutor e seus companheiros chegam na Inglaterra saxônica de 1066 e descobrem que outro membro de sua própria espécie está tentando mudar o rumo da história mundial.',
    videoUrl: 'https://drive.google.com/open?id=1uuMa7IdhvwNrt4c304JqaHbWcuBDNw4I',
    poster: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663627993377/SaNTokOUqIlMMmCe.jpg',
    parts: 4,
    season: 2,
    category: 'classic-2'
  },

  // --- TEMPORADA 7 (1970) ---
  {
    id: 'classic-7-1',
    title: 'Arco 01 – Spearhead from Space',
    doctor: 'Terceiro Doutor',
    year: '1970',
    synopsis: 'O recém-regenerado Terceiro Doutor exila-se na Terra e deve deter uma invasão de Autons controlados pela Consciência Nestene.',
    videoUrl: 'https://drive.google.com/file/d/1XItbNbDw1lb5UtHYIht3LinjCyOqy3YV/view',
    poster: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663627993377/WfbTdkFHuzQfIRNK.jpg',
    parts: 4,
    season: 7,
    category: 'classic-7'
  },
  {
    id: 'classic-7-2',
    title: 'Arco 02 – The Silurians (Parte 1)',
    doctor: 'Terceiro Doutor',
    year: '1970',
    synopsis: 'O Doutor investiga misteriosos picos de energia em uma central de pesquisas nucleares subterrânea, deparando-se com os Silurians, répteis inteligentes ancestrais da Terra.',
    videoUrl: 'https://drive.google.com/file/d/1ssTvDNRKa7_IPS_9IKcjCrfblDBBh9nX/view',
    poster: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663627993377/GBaEBOStufPRBPes.jpg',
    parts: 3,
    season: 7,
    category: 'classic-7'
  },
  {
    id: 'classic-7-3',
    title: 'Arco 03 – The Silurians (Parte 2)',
    doctor: 'Terceiro Doutor',
    year: '1970',
    synopsis: 'A tensão escala quando os Silurians ameaçam exterminar a humanidade com um vírus mortal, e o Doutor tenta mediar uma paz frágil antes que a UNIT tome medidas drásticas.',
    videoUrl: 'https://drive.google.com/file/d/1m9GLPW_11Xjzz7FzmsYIwtgB85iMYU3m/view',
    poster: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663627993377/ZlXPDqTPMdwaCwbJ.jpg',
    parts: 4,
    season: 7,
    category: 'classic-7'
  },
  {
    id: 'classic-7-4',
    title: 'Arco 04 – The Ambassadors of Death (Parte 1)',
    doctor: 'Terceiro Doutor',
    year: '1970',
    synopsis: 'A sonda espacial Mars Probe 7 retorna à Terra após anos em silêncio, mas o contato com os astronautas é perdido, iniciando uma corrida secreta para resgatá-los.',
    videoUrl: 'https://drive.google.com/file/d/1ML6gkMAklW9TvZdOZTqk6YPkiEGZRcFD/view',
    poster: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663627993377/pkXqqlBovzdyhspW.jpg',
    parts: 3,
    season: 7,
    category: 'classic-7'
  },
  {
    id: 'classic-7-5',
    title: 'Arco 05 – The Ambassadors of Death (Parte 2)',
    doctor: 'Terceiro Doutor',
    year: '1970',
    synopsis: 'O Doutor e a UNIT descobrem que alienígenas sequestraram os astronautas humanos e que uma conspiração militar dentro da própria Terra ameaça iniciar um conflito interplanetário fatal.',
    videoUrl: '',
    poster: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663627993377/ggwlxGBxrlqAkuST.jpg',
    parts: 4,
    season: 7,
    category: 'classic-7'
  },
  {
    id: 'classic-7-6',
    title: 'Arco 06 – Inferno (Parte 1)',
    doctor: 'Terceiro Doutor',
    year: '1970',
    synopsis: 'O Doutor atua como consultor em um projeto de perfuração profunda da crosta terrestre que libera uma estranha gosma verde capaz de transformar humanos em bestas selvagens.',
    videoUrl: '',
    poster: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663627993377/CWBCkyjmrFUAwfZq.jpg',
    parts: 3,
    season: 7,
    category: 'classic-7'
  },
  {
    id: 'classic-7-7',
    title: 'Arco 07 – Inferno (Parte 2)',
    doctor: 'Terceiro Doutor',
    year: '1970',
    synopsis: 'Após ser acidentalmente enviado para uma dimensão paralela apocalíptica, o Doutor corre contra o tempo para retornar ao seu universo original e impedir que a perfuração destrua a Terra.',
    videoUrl: '',
    poster: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663627993377/UOIrLtDPiPwfWJng.jpg',
    parts: 4,
    season: 7,
    category: 'classic-7'
  },

  // --- TEMPORADA 10 ---
  {
    id: 'frontier-1',
    title: 'Fronteira no Espaço (Parte 1)',
    doctor: 'Terceiro Doutor',
    year: '1973',
    synopsis: 'O Doutor e Jo são capturados em meio à crescente tensão entre os impérios da Terra e de Draconia no século XXVI. Eles descobrem que o Mestre e os Daleks estão trabalhando secretamente para provocar uma guerra total entre as duas potências, usando dispositivos de hipnose sônica para fazer com que cada lado veja o outro como o agressor.',
    videoUrl: 'https://drive.google.com/file/d/1bO2DpmooWjC4HH2gDcpd_1IUupTK2kjc/view?usp=sharing',
    poster: 'https://files.catbox.moe/6r83y3.png',
    parts: 2,
    season: 10,
    category: 'classic-10'
  },
  {
    id: 'frontier-2',
    title: 'Fronteira no Espaço (Parte 2)',
    doctor: 'Terceiro Doutor',
    year: '1973',
    synopsis: 'Continuação do confronto épico do século XXVI: Com os impérios à beira de uma guerra total armada pelo Mestre e os Daleks, o Doutor deve arriscar tudo para expor os verdadeiros agressores e impedir a catástrofe galáctica.',
    videoUrl: 'https://drive.google.com/file/d/1KWjKzNezyiAlOtKtELI-f_weDnZvSNHn/view?usp=drive_link',
    poster: 'https://files.catbox.moe/6r83y3.png',
    parts: 2,
    season: 10,
    category: 'classic-10'
  },
  {
    id: 'daleks-1',
    title: 'Planeta dos Daleks (Parte 1)',
    doctor: 'Terceiro Doutor',
    year: '1973',
    synopsis: 'Continuando diretamente de Fronteira no Espaço, o Doutor chega ferido ao planeta Spiridon. Lá, ele e Jo se unem a um grupo de Thals para enfrentar um exército de Daleks que possuem a tecnologia de invisibilidade. O Doutor descobre que há um exército de dez mil Daleks escondidos no planeta, aguardando o momento certo para conquistar a galáxia.',
    videoUrl: 'https://drive.google.com/file/d/1r1xCvznhsws3rjq5V0_AHlGcLfMT_ZT1/view?usp=sharing',
    poster: 'https://files.catbox.moe/pje6he.png',
    parts: 2,
    season: 10,
    category: 'classic-10'
  },
  {
    id: 'daleks-2',
    title: 'Planeta dos Daleks (Parte 2)',
    doctor: 'Terceiro Doutor',
    year: '1973',
    synopsis: 'Conclusão em Spiridon: O Doutor e os bravos combatentes Thals lançam um ataque audacioso para desativar a tecnologia de invisibilidade e conter a ameaça dos dez mil Daleks ocultos antes que eles despertem de seu sono congelado.',
    videoUrl: 'https://drive.google.com/file/d/1qpU6VKjoqvUEbkXGT8o2zUhxX2yZ78Om/view?usp=sharing',
    poster: 'https://files.catbox.moe/pje6he.png',
    parts: 2,
    season: 10,
    category: 'classic-10'
  },

  // --- TEMPORADA 12 ---
  {
    id: 'robot',
    title: 'Robô',
    doctor: 'Quarto Doutor',
    year: '1974',
    synopsis: 'Após sua regeneração, o Quarto Doutor precisa se adaptar à sua nova identidade enquanto investiga o roubo de planos ultrassecretos para uma arma de desintegração — um caso que pode colocar a humanidade em risco.',
    videoUrl: 'https://drive.google.com/file/d/1_TAO4CznGXopmvneLG5ht2ltFHLAuFG3/view?usp=sharing',
    poster: 'https://files.catbox.moe/8pqwj3.png',
    parts: 1,
    season: 12,
    category: 'classic-12'
  },
  {
    id: 'space-ark',
    title: 'A Arca Espacial',
    doctor: 'Quarto Doutor',
    year: '1975',
    synopsis: 'Milhares de anos no futuro, a Terra se tornou inabitável. A bordo da estação espacial Nerva, os sobreviventes da raça humana flutuam entre as estrelas em animação suspensa. O Doutor, Sarah e Harry chegam para descobrir que sistemas vitais foram sabotados — e que não estão sozinhos.',
    videoUrl: 'https://drive.google.com/file/d/1Ck73rlIvdyKkRLQM9Eh4IKMc8MFrQdRK/view?usp=sharing',
    poster: 'https://files.catbox.moe/la4ex6.png',
    parts: 1,
    season: 12,
    category: 'classic-12'
  },
  {
    id: 'sontaran',
    title: 'O Experimento Sontaran',
    doctor: 'Quarto Doutor',
    year: '1975',
    synopsis: 'Em uma Terra futura se recuperando de fulgurações solares devastadoras, o Quarto Doutor, Harry e Sarah descobrem o Major Styre, um guerreiro Sontaran, conduzindo experimentos cruéis com astronautas que capturou durante sua investigação do planeta rejuvenescido.',
    videoUrl: 'https://drive.google.com/file/d/1jGVO_A3uvG-HpSfgya73kVN0sd1siM8p/view?usp=sharing',
    poster: 'https://files.catbox.moe/hw6gg8.png',
    parts: 1,
    season: 12,
    category: 'classic-12'
  },
  {
    id: 'genesis-1',
    title: 'Gênese dos Daleks (Parte 1)',
    doctor: 'Quarto Doutor',
    year: '1975',
    synopsis: 'Os Senhores do Tempo convocam o Doutor a Skaro, planeta natal de seus velhos inimigos, os Daleks, em um momento da história anterior à sua evolução. Lá, ele conhece seu criador, o cientista maligno Davros, e enfrenta um dilema moral: ele tem o direito de destruir os Daleks antes que eles sejam criados?',
    videoUrl: 'https://drive.google.com/file/d/18ka-wvcslCs1xOljUwiW2CeEZomhE4uc/view?usp=sharing',
    poster: 'https://files.catbox.moe/nuyfc7.png',
    parts: 2,
    season: 12,
    category: 'classic-12'
  },
  {
    id: 'genesis-2',
    title: 'Gênese dos Daleks (Parte 2)',
    doctor: 'Quarto Doutor',
    year: '1975',
    synopsis: 'Continuação: A verdade sobre a origem dos Daleks é revelada, e o Doutor enfrenta um dilema moral impossível ao lidar com o nascimento da máquina de extermínio definitiva.',
    videoUrl: 'https://drive.google.com/file/d/1wahmHap5k-GIQzbgd11VHci5JzQiy0aJ/view?usp=sharing',
    poster: 'https://files.catbox.moe/nuyfc7.png',
    parts: 2,
    season: 12,
    category: 'classic-12'
  },
  {
    id: 'cybermen-revenge',
    title: 'A Vingança dos Cybermen',
    doctor: 'Quarto Doutor',
    year: '1975',
    synopsis: 'Os Cybermen planejam destruir Voga, o Planeta de Ouro — um material que é letal para eles. O Doutor, Sarah e Harry precisam impedi-los antes que uma arma devastadora seja usada, em uma corrida contra o tempo que determinará o destino da galáxia.',
    videoUrl: 'https://drive.google.com/file/d/1h6dJk01RjyeFQF8igtbBpazLCHOPf7pj/view?usp=sharing',
    poster: 'https://files.catbox.moe/9sge7s.png',
    parts: 1,
    season: 12,
    category: 'classic-12'
  },

  // --- SPIN-OFFS ---
  {
    id: 'sja-1',
    title: "Sarah Jane's Alien Files — Episódio 1",
    doctor: 'Clyde & Rani',
    year: '2010',
    synopsis: "Clyde e Rani catalogam informações confidenciais a respeito de ameaças alienígenas no Sr. Smith, o supercomputador inteligente de Sarah Jane, para auxiliar futuros defensores da Terra caso ela esteja incapacitada.",
    videoUrl: 'https://drive.google.com/file/d/1XP-7fk_Ua6w97OQkgzLWpIi3io-LKgLC/view?usp=sharing',
    poster: 'https://files.catbox.moe/9ia7ps.png',
    parts: 1,
    season: 1,
    category: 'spin-off'
  },
  {
    id: 'sja-2',
    title: "Sarah Jane's Alien Files — Episódio 2",
    doctor: 'Clyde & Rani',
    year: '2010',
    synopsis: "Análise detalhada de novos espécimes e ameaças extraterrestres que tentaram invadir nosso planeta. Dossiê atualizado no banco de dados do Sr. Smith.",
    videoUrl: 'https://drive.google.com/file/d/1bW-GXh3zgK37Hy38PzIVRacuk-auiI8j/view?usp=sharing',
    poster: 'https://files.catbox.moe/9ia7ps.png',
    parts: 1,
    season: 1,
    category: 'spin-off'
  },
  {
    id: 'sja-3',
    title: "Sarah Jane's Alien Files — Episódio 3",
    doctor: 'Clyde & Rani',
    year: '2010',
    synopsis: "Compilado de registros preventivos sobre os vilões e criaturas cósmicas que colocaram a humanidade sob extremo perigo.",
    videoUrl: 'https://drive.google.com/file/d/1uGvOFcRIiP65I_XAzdUBIIwU-e-gljnu/view?usp=sharing',
    poster: 'https://files.catbox.moe/9ia7ps.png',
    parts: 1,
    season: 1,
    category: 'spin-off'
  },
  {
    id: 'sja-4',
    title: "Sarah Jane's Alien Files — Episódio 4",
    doctor: 'Clyde & Rani',
    year: '2010',
    synopsis: "Quarto dossiê de registros de contatos e invasões frustradas na pacata e perigosa vizinhança da Rua Bannerman.",
    videoUrl: 'https://drive.google.com/file/d/1Hrh9NmTNk84wVa3NEHhZz-ByfYQ4blW0/view?usp=sharing',
    poster: 'https://files.catbox.moe/9ia7ps.png',
    parts: 1,
    season: 1,
    category: 'spin-off'
  },
  {
    id: 'sja-5',
    title: "Sarah Jane's Alien Files — Episódio 5",
    doctor: 'Clyde & Rani',
    year: '2010',
    synopsis: "Quinto compilado minucioso de registros confidenciais que ajudam Clyde, Rani e Luke a proteger o planeta contra novos conquistadores cósmicos.",
    videoUrl: 'https://drive.google.com/file/d/1AhKqeHVSugiJFMqFMdz5EhL5-9jHpBta/view?usp=sharing',
    poster: 'https://files.catbox.moe/9ia7ps.png',
    parts: 1,
    season: 1,
    category: 'spin-off'
  },
  {
    id: 'sja-6',
    title: "Sarah Jane's Alien Files — Episódio 6",
    doctor: 'Clyde & Rani',
    year: '2010',
    synopsis: "Último episódio dos arquivos alienígenas confidenciais organizados pela herdeira espiritual de Sarah Jane Smith.",
    videoUrl: 'https://drive.google.com/file/d/1CfUp5nlGzU92pUDAwcxA8_tylYjiJ-Xa/view?usp=sharing',
    poster: 'https://files.catbox.moe/9ia7ps.png',
    parts: 1,
    season: 1,
    category: 'spin-off'
  },
  {
    id: 'torchwood-1',
    title: 'Torchwood — Temporada 1',
    doctor: 'Capitão Jack Harkness',
    year: '2006',
    synopsis: 'O Capitão Jack Harkness lidera uma equipe de investigadores fora do governo que defende a Terra contra ameaças alienígenas usando tecnologia extraterrestre recuperada na fenda de Cardiff.',
    videoUrl: 'https://mahblue6.blogspot.com/2020/02/torchwood-1-temporada-legendada.html',
    poster: 'https://files.catbox.moe/hnixyi.png',
    parts: 13,
    season: 1,
    category: 'spin-off'
  },
  {
    id: 'torchwood-2',
    title: 'Torchwood — Temporada 2',
    doctor: 'Capitão Jack Harkness',
    year: '2008',
    synopsis: 'A destemida equipe de Torchwood em Cardiff enfrenta novas anomalias temporais intensas, perigos cibernéticos e segredos dolorosos do passado sombrio do Capitão Jack.',
    videoUrl: 'https://drive.google.com/drive/folders/1u-f74z9jtNNh0yUe4XeR6GR7bx70X1TD?usp=sharing',
    poster: 'https://files.catbox.moe/hnixyi.png',
    parts: 13,
    season: 2,
    category: 'spin-off'
  },
  {
    id: 'torchwood-3',
    title: 'Torchwood — Temporada 3 (Children of Earth)',
    doctor: 'Capitão Jack Harkness',
    year: '2009',
    synopsis: 'Uma das sagas mais tensas e sombrias da ficção científica: os enigmáticos alienígenas conhecidos como os 456 exigem um sacrifício terrível de 10% de todas as crianças da Terra.',
    videoUrl: 'https://mahblue6.blogspot.com/2020/02/torchwood-3-temporada-legendada.html',
    poster: 'https://files.catbox.moe/hnixyi.png',
    parts: 5,
    season: 3,
    category: 'spin-off'
  },
  {
    id: 'torchwood-4',
    title: 'Torchwood — Temporada 4 (Miracle Day)',
    doctor: 'Capitão Jack Harkness',
    year: '2011',
    synopsis: 'De repente, ninguém mais morre no planeta Terra. O fim da mortalidade humana gera uma crise geopolítica e de recursos sem precedentes na história que Torchwood precisa conter.',
    videoUrl: 'https://mahblue6.blogspot.com/2020/02/torchwood-4-temporada-legendada.html',
    poster: 'https://files.catbox.moe/hnixyi.png',
    parts: 10,
    season: 4,
    category: 'spin-off'
  },

  // --- TALES OF THE TARDIS (2023) ---
  {
    id: 'tales-tardis-1',
    title: 'Tales of the TARDIS — Earthshock',
    doctor: 'Quinto Doutor & Tegan',
    year: '2023',
    synopsis: 'O Quinto Doutor e Tegan se reúnem para relembrar a trágica e marcante batalha contra os Cybermen.',
    videoUrl: 'https://drive.google.com/file/d/1r43FK32Zd_1-GYfcr27KO82_-pW5fbrq/view?usp=sharing',
    poster: 'https://drive.google.com/thumbnail?id=1TZU5i1Ift3Vg7E3js36cqrrUcsg4pOUK&sz=w800',
    parts: 1,
    season: 1,
    category: 'spin-off'
  },
  {
    id: 'tales-tardis-2',
    title: 'Tales of the TARDIS — The Mind Robber',
    doctor: 'Jamie & Zoe',
    year: '2023',
    synopsis: 'Jamie e Zoe se encontram novamente para recordar suas jornadas surreais na Terra da Ficção.',
    videoUrl: 'https://drive.google.com/file/d/1w2lVryoyFaVslKzNfyRFPXEdj8uUHS3P/view?usp=drive_link',
    poster: 'https://drive.google.com/thumbnail?id=1TZU5i1Ift3Vg7E3js36cqrrUcsg4pOUK&sz=w800',
    parts: 1,
    season: 1,
    category: 'spin-off'
  },
  {
    id: 'tales-tardis-3',
    title: 'Tales of the TARDIS — Vengeance on Varos',
    doctor: 'Sexto Doutor & Peri',
    year: '2023',
    synopsis: 'O Sexto Doutor e Peri relembram os perigos televisivos e sombrios do planeta Varos.',
    videoUrl: 'https://drive.google.com/file/d/1rrdtzDtQW3AcWPNovTNTexoKWi0TIIoo/view?usp=drive_link',
    poster: 'https://drive.google.com/thumbnail?id=1TZU5i1Ift3Vg7E3js36cqrrUcsg4pOUK&sz=w800',
    parts: 1,
    season: 1,
    category: 'spin-off'
  },
  {
    id: 'tales-tardis-4',
    title: 'Tales of the TARDIS — The Three Doctors',
    doctor: 'Jo Jones & Clyde Langer',
    year: '2023',
    synopsis: 'Jo Jones (Jo Grant) e Clyde Langer se encontram e ela relata a épica aliança entre três encarnações do Doutor.',
    videoUrl: 'https://drive.google.com/file/d/1gGTenHv3p5YNAfS2oulVFQqzjJN-_gCh/view?usp=drive_link',
    poster: 'https://drive.google.com/thumbnail?id=1TZU5i1Ift3Vg7E3js36cqrrUcsg4pOUK&sz=w800',
    parts: 1,
    season: 1,
    category: 'spin-off'
  },
  {
    id: 'tales-tardis-5',
    title: 'Tales of the TARDIS — The Time Meddler',
    doctor: 'Steven & Vicki',
    year: '2023',
    synopsis: 'Steven e Vicki recordam suas antigas viagens com o Primeiro Doutor e o encontro com o Monge.',
    videoUrl: 'https://drive.google.com/file/d/1FwZ5kvnv3RcWRFnPgyBL4JTByXH6qoAp/view?usp=sharing',
    poster: 'https://drive.google.com/thumbnail?id=1TZU5i1Ift3Vg7E3js36cqrrUcsg4pOUK&sz=w800',
    parts: 1,
    season: 1,
    category: 'spin-off'
  },
  {
    id: 'tales-tardis-6',
    title: 'Tales of the TARDIS — The Curse of Fenric',
    doctor: 'Sétimo Doutor & Ace',
    year: '2023',
    synopsis: 'O Sétimo Doutor e Ace refletem sobre o jogo de xadrez cósmico e os horrores manipuladores de Fenric.',
    videoUrl: 'https://drive.google.com/file/d/1C7slCYOcUkK6iIrUeJeVWvJ_PwApW3Ae/view?usp=drive_link',
    poster: 'https://drive.google.com/thumbnail?id=1TZU5i1Ift3Vg7E3js36cqrrUcsg4pOUK&sz=w800',
    parts: 1,
    season: 1,
    category: 'spin-off'
  },

  // --- ESPECIAIS & EXTRAS ---
  {
    id: 'evil-daleks',
    title: 'The Evil of the Daleks — Animação Legendada',
    doctor: 'Segundo Doutor',
    year: '1967',
    synopsis: 'Este arco icônico foi a primeira aparição do imponente Imperador Dalek na série de TV. Uma obra-prima gótica originalmente apagada dos arquivos da BBC nos anos 60 e carinhosamente reconstituída em animação oficial.',
    videoUrl: 'https://drive.google.com/drive/folders/1n5HHdB8VokzkCv5CqDJxq8nqgUTsnm5w?usp=sharing',
    poster: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663627993377/hySbGHmOVRNvdxEv.jpg',
    parts: 1,
    season: 4,
    category: 'special'
  },
  {
    id: 'adventure-space-time',
    title: 'Uma Aventura no Espaço e Tempo',
    doctor: 'William Hartnell',
    year: '2013',
    synopsis: 'Telefilme da BBC que dramatiza com maestria a emocionante criação e os bastidores das gravações de Doctor Who em 1963. Estrelando David Bradley como o marcante ator original William Hartnell.',
    videoUrl: 'https://drive.google.com/file/d/1WA-0qMUT-gy2hoQj0HCuN1gUf6g-BDbl/view?usp=sharing',
    poster: 'https://files.catbox.moe/3a11qz.jpg',
    parts: 1,
    season: 1,
    category: 'special'
  },
  {
    id: 'spec-2023-1',
    title: 'Especiais 2023 — A Besta Estelar',
    doctor: 'Décimo Quarto Doutor',
    year: '2023',
    synopsis: 'O recém-regenerado Décimo Quarto Doutor (David Tennant) e sua icônica companheira Donna Noble se reencontram em Londres. Eles são jogados em uma batalha cósmica quando uma nave cai na cidade protegendo o fofo e ardiloso Meep.',
    videoUrl: 'https://drive.google.com/drive/folders/1jIhkoHIbuqcSKbdk4-lfugs-FILTQHux?usp=sharing',
    poster: 'https://files.catbox.moe/47bnqg.jpg',
    parts: 1,
    season: 2023,
    category: 'special'
  },
  {
    id: 'spec-2023-2',
    title: 'Especiais 2023 — Wild Blue Yonder',
    doctor: 'Décimo Quarto Doutor',
    year: '2023',
    synopsis: 'Imediatamente após a queda, a TARDIS defeituosa envia o Doutor e Donna para o limite extremo do universo. Presos em uma nave silenciosa e abandonada, eles enfrentam duplicatas malévolas conhecidas como "Não-Coisas".',
    videoUrl: 'https://drive.google.com/drive/folders/1IKGYmE0H2Sk8iXgG0qAZdS6_ihaPeLuD',
    poster: 'https://files.catbox.moe/q690wm.jpg',
    parts: 1,
    season: 2023,
    category: 'special'
  },
  {
    id: 'spec-2023-3',
    title: 'Especiais 2023 — The Giggle',
    doctor: 'Décimo Quarto Doutor',
    year: '2023',
    synopsis: 'A risada de um misterioso fantoche através das telas de TV está enlouquecendo e colapsando toda a raça humana. O Doutor e Donna se unem à UNIT para combater o lendário vilão cósmico: O Fabricante de Brinquedos.',
    videoUrl: 'https://drive.google.com/drive/folders/1277lXpRMPdbGFCb-v-6i8wn2jvmV07LM?usp=sharing',
    poster: 'https://files.catbox.moe/fxit28.jpg',
    parts: 1,
    season: 2023,
    category: 'special'
  },
  // --- SÉRIE MODERNA (DISPONIBILIZADA POR JC) ---
  {
    id: 'modern-1',
    title: 'Série Moderna — 1ª Temporada',
    doctor: 'Nono Doutor',
    year: '2005',
    synopsis: 'O renascimento moderno de Doctor Who. O Nono Doutor e Rose Tyler viajam no tempo e no espaço, enfrentando Autons, Daleks e o Slitheen.',
    videoUrl: 'https://drive.google.com/drive/folders/1tipC1tw2x85ZZsvaqpeeM_H-sGeTKaTJ',
    poster: 'https://files.catbox.moe/ebpbci.jpeg',
    parts: 13,
    season: 1,
    category: 'modern'
  },
  {
    id: 'modern-2',
    title: 'Série Moderna — 2ª Temporada',
    doctor: 'Décimo Doutor',
    year: '2006',
    synopsis: 'A introdução do carismático Décimo Doutor. Ao lado de Rose, ele enfrenta Cybermen, Lobisomens e o trágico confronto na Baía do Lobo Mau.',
    videoUrl: 'https://drive.google.com/drive/folders/1qipiTfMf_njXPeAh3N7Ai807OFjWYJpr',
    poster: 'https://files.catbox.moe/ebpbci.jpeg',
    parts: 13,
    season: 2,
    category: 'modern'
  },
  {
    id: 'modern-3',
    title: 'Série Moderna — 3ª Temporada',
    doctor: 'Décimo Doutor',
    year: '2007',
    synopsis: 'O Doutor viaja com a estudante de medicina Martha Jones. Juntos, eles enfrentam os icônicos Anjos Lamentáveis (Blink) e o retorno do Mestre.',
    videoUrl: 'https://drive.google.com/drive/folders/1u0N6xscFNNxPaNABGHEojwQ3mOcJ6oyA',
    poster: 'https://files.catbox.moe/ebpbci.jpeg',
    parts: 13,
    season: 3,
    category: 'modern'
  },
  {
    id: 'modern-4',
    title: 'Série Moderna — 4ª Temporada',
    doctor: 'Décimo Doutor',
    year: '2008',
    synopsis: 'A inesquecível dinâmica entre o Doutor e Donna Noble. Uma temporada épica que culmina na reunião de todos os companheiros contra Davros e os Daleks.',
    videoUrl: 'https://drive.google.com/drive/folders/1mL7cWOpVyK5uUGdpJpBAuOf8OIY7kK3A',
    poster: 'https://files.catbox.moe/ebpbci.jpeg',
    parts: 13,
    season: 4,
    category: 'modern'
  },
  {
    id: 'modern-5',
    title: 'Série Moderna — 5ª Temporada',
    doctor: 'Décimo Primeiro Doutor',
    year: '2010',
    synopsis: 'Início da era de Steven Moffat e a chegada do Décimo Primeiro Doutor, Amy Pond e Rory Williams. Desvende os mistérios das rachaduras na parede e a mística River Song.',
    videoUrl: 'https://drive.google.com/drive/folders/13-AfYtvvTqosPBWPtH1GUiYlnMRrPBCm',
    poster: 'https://files.catbox.moe/ebpbci.jpeg',
    parts: 13,
    season: 5,
    category: 'modern'
  },
  {
    id: 'modern-6',
    title: 'Série Moderna — 6ª Temporada',
    doctor: 'Décimo Primeiro Doutor',
    year: '2011',
    synopsis: 'A morte do Doutor no Lago Silêncio inicia uma rede de mistérios temporais. Conheça a verdade sobre a origem de River Song e os perigos do Silêncio.',
    videoUrl: 'https://drive.google.com/drive/folders/17Y8BdNH-kZ00rXyOdWOAH2UFOLHBP5M7',
    poster: 'https://files.catbox.moe/ebpbci.jpeg',
    parts: 13,
    season: 6,
    category: 'modern'
  },
  {
    id: 'modern-7',
    title: 'Série Moderna — 7ª Temporada',
    doctor: 'Décimo Primeiro Doutor',
    year: '2012-2013',
    synopsis: 'A despedida emocionante dos Ponds e a chegada da Garota Impossível, Clara Oswald. Culmina nos preparativos para o aniversário de 50 anos da série.',
    videoUrl: 'https://drive.google.com/drive/folders/1Q6e1qnAeeKmAC8XNck5_B_qweOtvXDHF',
    poster: 'https://files.catbox.moe/ebpbci.jpeg',
    parts: 13,
    season: 7,
    category: 'modern'
  },
  {
    id: 'modern-8',
    title: 'Série Moderna — 8ª Temporada',
    doctor: 'Décimo Segundo Doutor',
    year: '2014',
    synopsis: 'A era sombria e reflexiva do Décimo Segundo Doutor. Clara Oswald o ajuda a responder à pergunta fundamental: "Eu sou um bom homem?" e a enfrentar a misteriosa Missy.',
    videoUrl: 'https://drive.google.com/drive/folders/17yrMj9hH16rsZtlyz2h8hE9iIbGO8P4q',
    poster: 'https://files.catbox.moe/ebpbci.jpeg',
    parts: 12,
    season: 8,
    category: 'modern'
  },
  {
    id: 'modern-9',
    title: 'Série Moderna — 9ª Temporada',
    doctor: 'Décimo Segundo Doutor',
    year: '2015',
    synopsis: 'O Doutor e Clara enfrentam as consequências de suas viagens quase obsessivas. Apresentando Ashildr (Maisie Williams) e o espetacular episódio solo Heaven Sent.',
    videoUrl: 'https://drive.google.com/drive/folders/117a3y45-WFqSlkufmdsrmlKfE2whJlUC',
    poster: 'https://files.catbox.moe/ebpbci.jpeg',
    parts: 12,
    season: 9,
    category: 'modern'
  },
  {
    id: 'modern-10',
    title: 'Série Moderna — 10ª Temporada',
    doctor: 'Décimo Segundo Doutor',
    year: '2017',
    synopsis: 'O Doutor assume a tutela de um cofre misterioso com a ajuda de Nardole e da nova companheira Bill Potts, levando a um confronto final com os Cybermen originais.',
    videoUrl: 'https://drive.google.com/drive/folders/127jqXFzeXG_HR6mH5mq1SNKJ3iro-Fun',
    poster: 'https://files.catbox.moe/ebpbci.jpeg',
    parts: 12,
    season: 10,
    category: 'modern'
  },
  {
    id: 'modern-11',
    title: 'Série Moderna — 11ª Temporada',
    doctor: 'Décima Terceira Doutora',
    year: '2018',
    synopsis: 'A primeira encarnação feminina do Doutor. Ao lado de sua "fam" (Ryan, Yasmin e Graham), ela explora novos horizontes cósmicos com um novo estilo visual.',
    videoUrl: 'https://drive.google.com/drive/folders/1N3kBIA-gZxtpl6cxQ0B5_V6ytqnz82wf',
    poster: 'https://files.catbox.moe/ebpbci.jpeg',
    parts: 10,
    season: 11,
    category: 'modern'
  },
  {
    id: 'modern-12',
    title: 'Série Moderna — 12ª Temporada',
    doctor: 'Décima Terceira Doutora',
    year: '2020',
    synopsis: 'Revelações chocantes sobre o passado de Gallifrey e a revelação da Criança Atemporal. O retorno do Mestre e dos Cybermen em uma batalha pela sobrevivência.',
    videoUrl: 'https://drive.google.com/drive/folders/1ZJCohUzQF7dq4FBCkoMdgmqT3Jaaty0F',
    poster: 'https://files.catbox.moe/ebpbci.jpeg',
    parts: 10,
    season: 12,
    category: 'modern'
  },
  {
    id: 'modern-13',
    title: 'Série Moderna — 13ª Temporada (Flux)',
    doctor: 'Décima Terceira Doutora',
    year: '2021',
    synopsis: 'O arco contínuo Doctor Who: Flux. O universo está se despedaçando sob a influência do Flux, e a Doutora precisa correr contra o fim de tudo.',
    videoUrl: 'https://drive.google.com/drive/folders/1VxsceYq6amXMHEZujxy0xAqUhSLHpUXX',
    poster: 'https://files.catbox.moe/ebpbci.jpeg',
    parts: 6,
    season: 13,
    category: 'modern'
  },
  {
    id: 'modern-14',
    title: 'Série Moderna — 14ª Temporada',
    doctor: 'Décimo Quinto Doutor',
    year: '2024',
    synopsis: 'A fantástica nova era iniciada com o alegre Décimo Quinto Doutor e Ruby Sunday, misturando mistérios rúnicos, deuses do panteão e viagens no tempo eletrizantes.',
    videoUrl: 'https://drive.google.com/drive/folders/1PtsYIZSOuXIkcS2BQotdUD8Tl_8YznsT',
    poster: 'https://files.catbox.moe/ebpbci.jpeg',
    parts: 8,
    season: 14,
    category: 'modern'
  },
  {
    id: 'modern-15',
    title: 'Série Moderna — 15ª Temporada',
    doctor: 'Décimo Quinto Doutor',
    year: '2025',
    synopsis: 'As novas aventuras incríveis do Décimo Quinto Doutor e sua tripulação TARDIS expandida, desbravando novos segredos espaciais e ameaças divinas.',
    videoUrl: 'https://drive.google.com/drive/folders/1VTTl8bWjPkCmq18CKytQzU_qqP3sgRa3',
    poster: 'https://files.catbox.moe/ebpbci.jpeg',
    parts: 8,
    season: 15,
    category: 'modern'
  }
];

const MANUS_CLASSIC_POSTERS: Record<number, string> = {
  8: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663627992424/WRMrCePEdKzXmnHq.png',
  9: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663627992424/mJFfMHFTREywmctq.png',
  10: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663627993377/TvoxVUtSSTnAOTbc.jpg',
  12: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663627993377/cdsAxXuGaSNuRVCm.jpg',
  13: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663627992424/bBnVidVWQeOacKKs.png',
  14: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663627992424/EKBSiEdbDfomXirG.png',
  15: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663627992424/GiTeBytNtwmICbyU.png',
  17: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663627992424/teqBsgwLsdLPNuBT.png',
  18: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663627992424/penirzppAGdcSumE.png',
  19: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663627992424/HaAtmAkYyUVgciPj.png'
};

const MANUS_TORCHWOOD_POSTERS: Record<number, string> = {
  1: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663627993377/ebNtHNDToTujPzFo.jpg',
  2: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663627992424/wzHsWpjBsnMulOde.png',
  3: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663627992424/UYDRKiUULQNGNtKs.png',
  4: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663627992424/mYdaWmePTIDVoMJB.png'
};

const MANUS_SJA_POSTERS: Record<number, string> = {
  1: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663627992424/erKdxCREeFUEaDoM.png',
  2: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663627992424/KDCMSJJqcMELktDQ.png',
  3: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663627992424/PcHpGyilBjFJFadV.png',
  4: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663627992424/CsapkmnxjBtTodbJ.png',
  5: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663627992424/xmMaPQGXhwtUtxoZ.png'
};

const MANUS_MODERN_POSTERS: Record<number, string> = {
  1: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663627993377/yUbmcFXXsfGDdCRQ.jpg',
  2: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663627993377/wjFHomzMgBujrBDf.jpg',
  3: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663627993377/GkOZLevCgEUDGnYe.jpg',
  4: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663627993377/etMSugpvnQsCUrHu.jpg',
  5: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663627993377/jZCjtwzJvPQPmUAd.jpg',
  6: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663627993377/KMkjHIwIEmqVGDiU.jpg',
  7: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663627993377/DuvGHllYKhhfbTiU.jpg',
  8: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663627993377/aabYOkCufjBtJVlS.jpg',
  9: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663627993377/QLaMzpqMcnqUaSoA.jpg',
  10: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663627993377/nzuhvCtOPwIpaTKW.jpg',
  11: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663627993377/drGqJZBhQhYIblIl.jpg',
  12: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663627993377/CwlJVYKvALSYZGzs.jpg',
  13: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663627993377/MbcjxbGdpdtMWMTt.jpg',
  14: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663627993377/pVjpVDakAmeNdAli.jpg',
  15: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663627993377/yYaWoGIJuBBNBaMi.jpg'
};

const MANUS_CLASS_POSTER = 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663627992424/UySUAEtBioaVdxLp.png';
const MANUS_SPECIAL_2023_POSTER = 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663627993377/MymhZxoKyEchtYrQ.jpg';
const MANUS_ADVENTURE_SPACE_TIME_POSTER = 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663627993377/RPKkBydOAptItEPD.jpg';
const MANUS_K9_ADVENTURES_POSTER = 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663627993377/DIDZKhCOrIQzQOhC.jpg';

const RAW_EPISODES: Episode[] = [...BASE_EPISODES, ...SJA_EPISODES, ...CLASS_EPISODES];

export const EPISODES: Episode[] = RAW_EPISODES.map(ep => {
  let poster = ep.poster;

  if (ep.category && ep.category.startsWith('classic')) {
    poster = MANUS_CLASSIC_POSTERS[ep.season] || poster;
  } else if (ep.id.startsWith('torchwood-')) {
    poster = MANUS_TORCHWOOD_POSTERS[ep.season] || poster;
  } else if (ep.id.startsWith('tsja-') || ep.id.startsWith('sja-')) {
    poster = MANUS_SJA_POSTERS[ep.season] || poster;
  } else if (ep.id.startsWith('class-') || ep.id === 'class-ost') {
    poster = MANUS_CLASS_POSTER;
  } else if (ep.category === 'modern') {
    poster = MANUS_MODERN_POSTERS[ep.season] || poster;
  } else if (ep.id.startsWith('spec-2023-')) {
    poster = MANUS_SPECIAL_2023_POSTER;
  } else if (ep.id === 'adventure-space-time') {
    poster = MANUS_ADVENTURE_SPACE_TIME_POSTER;
  } else if (ep.id === 'k-9-series') {
    poster = MANUS_K9_ADVENTURES_POSTER;
  } else if (poster.includes('catbox.moe')) {
    poster = 'https://image.tmdb.org/t/p/w500/49WJgS5H3A6CuLIYirvIK3K667T.jpg';
  }

  return { ...ep, poster };
});
