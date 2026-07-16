export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  answerIndex: number; // Index in the options array (0 to 3)
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "O que significa a sigla TARDIS?",
    options: [
      "Time And Relative Dimension In Space",
      "Time And Relative Distance In Space",
      "Temporal And Relative Dimension In Space",
      "Time And Reality Dimension In Space"
    ],
    answerIndex: 0
  },
  {
    id: 2,
    question: "Qual ator interpretou o Primeiro Doutor em 1963?",
    options: [
      "Patrick Troughton",
      "William Hartnell",
      "Jon Pertwee",
      "Tom Baker"
    ],
    answerIndex: 1
  },
  {
    id: 3,
    question: "Qual é o planeta natal dos Daleks?",
    options: [
      "Gallifrey",
      "Skaro",
      "Mondas",
      "Raxacoricofallapatorius"
    ],
    answerIndex: 1
  },
  {
    id: 4,
    question: "Em qual ano a série clássica de Doctor Who estreou na televisão britânica?",
    options: [
      "1960",
      "1963",
      "1965",
      "1970"
    ],
    answerIndex: 1
  },
  {
    id: 5,
    question: "Qual desses vilões estreou na série clássica de 1966 como ciborgues de Mondas?",
    options: [
      "Cybermen",
      "Daleks",
      "Sontarans",
      "Ice Warriors"
    ],
    answerIndex: 0
  },
  {
    id: 6,
    question: "Como se chama a neta do Primeiro Doutor, que viajou com ele no início da série?",
    options: [
      "Rose Tyler",
      "Sarah Jane Smith",
      "Susan Foreman",
      "Clara Oswald"
    ],
    answerIndex: 2
  },
  {
    id: 7,
    question: "Qual Doutor é famoso por usar um cachecol incrivelmente longo e multicolorido?",
    options: [
      "Terceiro Doutor",
      "Quarto Doutor",
      "Quinto Doutor",
      "Sexto Doutor"
    ],
    answerIndex: 1
  },
  {
    id: 8,
    question: "Quem foi a companion que ganhou o aclamado spin-off 'The Sarah Jane Adventures'?",
    options: [
      "Martha Jones",
      "Sarah Jane Smith",
      "Amy Pond",
      "Donna Noble"
    ],
    answerIndex: 1
  },
  {
    id: 9,
    question: "O spin-off 'Torchwood' é liderado por qual personagem marcante?",
    options: [
      "Capitão Jack Harkness",
      "Mickey Smith",
      "Danny Pink",
      "Rory Williams"
    ],
    answerIndex: 0
  },
  {
    id: 10,
    question: "O nome 'Torchwood' é um anagrama de qual palavra ou expressão?",
    options: [
      "Doctor Who",
      "Time Lord",
      "Tardis Box",
      "Cybermen"
    ],
    answerIndex: 0
  },
  {
    id: 11,
    question: "Qual ator interpretou o Nono Doutor no retorno da série em 2005?",
    options: [
      "David Tennant",
      "Christopher Eccleston",
      "Matt Smith",
      "Peter Capaldi"
    ],
    answerIndex: 1
  },
  {
    id: 12,
    question: "A frase clássica 'Bad Wolf' (Lobo Mau) é a grande pista da primeira temporada de qual companion?",
    options: [
      "Martha Jones",
      "Donna Noble",
      "Rose Tyler",
      "Clara Oswald"
    ],
    answerIndex: 2
  },
  {
    id: 13,
    question: "Qual companion viajou com o Doutor durante a 3ª temporada moderna (2007) e estudava medicina?",
    options: [
      "Rose Tyler",
      "Donna Noble",
      "Martha Jones",
      "Amy Pond"
    ],
    answerIndex: 2
  },
  {
    id: 14,
    question: "Qual famosa atriz interpretou a companion Donna Noble?",
    options: [
      "Billie Piper",
      "Catherine Tate",
      "Karen Gillan",
      "Jenna Coleman"
    ],
    answerIndex: 1
  },
  {
    id: 15,
    question: "Quem é o criador intelectual e cientista chefe dos Daleks?",
    options: [
      "The Master",
      "Davros",
      "Rassilon",
      "Omega"
    ],
    answerIndex: 1
  },
  {
    id: 16,
    question: "Qual criatura alienígena petrifica e só consegue se mover quando não está sendo observada?",
    options: [
      "Silurians",
      "Anjos Lamentáveis (Weeping Angels)",
      "Zygons",
      "Sontarans"
    ],
    answerIndex: 1
  },
  {
    id: 17,
    question: "Quem é a misteriosa mulher que possui um diário com formato de TARDIS azul e viaja no tempo em sentido inverso ao Doutor?",
    options: [
      "Missy",
      "Clara Oswald",
      "River Song",
      "Susan Foreman"
    ],
    answerIndex: 2
  },
  {
    id: 18,
    question: "Qual peça de roupa o Décimo Primeiro Doutor (Matt Smith) popularizou como sendo extremamente estilosa ('cool')?",
    options: [
      "Gravata borboleta (Bow tie)",
      "Cachecol longo",
      "Óculos 3D",
      "Sobretudo marrom"
    ],
    answerIndex: 0
  },
  {
    id: 19,
    question: "Qual ator interpretou o Décimo Segundo Doutor, famoso por usar óculos de sol sônicos e tocar guitarra?",
    options: [
      "Peter Capaldi",
      "Matt Smith",
      "John Hurt",
      "Ncuti Gatwa"
    ],
    answerIndex: 0
  },
  {
    id: 20,
    question: "Quem foi a primeira mulher a interpretar o papel principal do Doutor na série de TV regular?",
    options: [
      "Jo Martin",
      "Michelle Gomez",
      "Jodie Whittaker",
      "Alex Kingston"
    ],
    answerIndex: 2
  },
  {
    id: 21,
    question: "Qual era o grito de guerra ou bordão marcante do Décimo Doutor (David Tennant)?",
    options: [
      "Geronimo!",
      "Allons-y!",
      "Fantastic!",
      "Bow ties are cool!"
    ],
    answerIndex: 1
  },
  {
    id: 22,
    question: "A bi-regeneração ocorreu pela primeira vez em qual especial de 2023?",
    options: [
      "The Star Beast",
      "Wild Blue Yonder",
      "The Giggle",
      "The Church on Ruby Road"
    ],
    answerIndex: 2
  },
  {
    id: 23,
    question: "Qual ator interpreta o atual Décimo Quinto Doutor na era iniciada em 2023?",
    options: [
      "Ncuti Gatwa",
      "David Tennant",
      "John Hurt",
      "Peter Capaldi"
    ],
    answerIndex: 0
  },
  {
    id: 24,
    question: "Onde o Doutor guarda seu papel psíquico?",
    options: [
      "Na fenda sônica",
      "No bolso de seu paletó ou sobretudo",
      "Em uma gaveta secreta da TARDIS",
      "No colar de pescoço"
    ],
    answerIndex: 1
  },
  {
    id: 25,
    question: "Qual é a cor clássica da fenda sônica do Décimo Doutor?",
    options: [
      "Verde",
      "Azul",
      "Vermelha",
      "Amarela"
    ],
    answerIndex: 1
  },
  {
    id: 26,
    question: "Qual o nome do spin-off de 2016 ambientado na Coal Hill Academy?",
    options: [
      "Class",
      "K-9 Adventures",
      "Torchwood",
      "The Sarah Jane Adventures"
    ],
    answerIndex: 0
  },
  {
    id: 27,
    question: "Quantos corações possui um Senhor do Tempo de Gallifrey?",
    options: [
      "Um",
      "Dois",
      "Três",
      "Quatro"
    ],
    answerIndex: 1
  },
  {
    id: 28,
    question: "Qual vilão de Doctor Who é o governante e nêmesis político de Gallifrey que se passa pelo pseudônimo Harold Saxon?",
    options: [
      "O Mestre (The Master)",
      "Rassilon",
      "Davros",
      "The Toymaker"
    ],
    answerIndex: 0
  },
  {
    id: 29,
    question: "Quem compôs a música de abertura original de 1963?",
    options: [
      "Murray Gold",
      "Ron Grainer & Delia Derbyshire",
      "Blair Mowat",
      "Hans Zimmer"
    ],
    answerIndex: 1
  },
  {
    id: 30,
    question: "Qual companion é conhecida como a 'Garota Impossível' por ter se espalhado pela linha temporal do Doutor?",
    options: [
      "Amy Pond",
      "Clara Oswald",
      "Bill Potts",
      "Ruby Sunday"
    ],
    answerIndex: 1
  },
  {
    id: 31,
    question: "Qual Doutor usava um aipo na lapela de seu terno?",
    options: [
      "Segundo Doutor",
      "Quinto Doutor",
      "Sétimo Doutor",
      "Oitavo Doutor"
    ],
    answerIndex: 1
  },
  {
    id: 32,
    question: "O 'War Doctor' (Doutor da Guerra) foi interpretado por qual lendário ator?",
    options: [
      "John Hurt",
      "Richard Griffiths",
      "Ian McKellen",
      "Michael Gambon"
    ],
    answerIndex: 0
  },
  {
    id: 33,
    question: "Qual raça guerreira clonada de pescoço curto tem como maior inimigo o Doutor, a quem chamam de 'A Tempestade Iminente'?",
    options: [
      "Sontarans",
      "Slytheen",
      "Zygons",
      "Ice Warriors"
    ],
    answerIndex: 0
  },
  {
    id: 34,
    question: "Qual era o nome de batismo do cão robô do Doutor?",
    options: [
      "K-9",
      "Rusty",
      "K9 Mark V",
      "K-10"
    ],
    answerIndex: 0
  },
  {
    id: 35,
    question: "A companion Amy Pond cresceu com uma rachadura em sua parede. Quem era seu marido e também companheiro de viagem?",
    options: [
      "Rory Williams",
      "Mickey Smith",
      "Danny Pink",
      "Jack Harkness"
    ],
    answerIndex: 0
  },
  {
    id: 36,
    question: "O robô K-9 foi criado originalmente para qual propósito de produção na década de 1970?",
    options: [
      "Ser um companheiro permanente",
      "Uma aparição de um único episódio em 'The Invisible Enemy'",
      "Para vender brinquedos",
      "Para atrair o público jovem"
    ],
    answerIndex: 1
  },
  {
    id: 37,
    question: "Qual atriz interpretou a companion Bill Potts na 10ª temporada moderna?",
    options: [
      "Pearl Mackie",
      "Mandip Gill",
      "Freema Agyeman",
      "Lalla Ward"
    ],
    answerIndex: 0
  },
  {
    id: 38,
    question: "Qual Doutor carrega um guarda-chuva com cabo em formato de ponto de interrogação?",
    options: [
      "Sexto Doutor",
      "Sétimo Doutor",
      "Oitavo Doutor",
      "Nono Doutor"
    ],
    answerIndex: 1
  },
  {
    id: 39,
    question: "Quem compôs a trilha sonora original de 'Class'?",
    options: [
      "Murray Gold",
      "Blair Mowat",
      "John Debney",
      "Dudley Simpson"
    ],
    answerIndex: 1
  },
  {
    id: 40,
    question: "Qual é o nome da atual companheira do Décimo Quinto Doutor que estreou no Natal de 2023?",
    options: [
      "Ruby Sunday",
      "Clara Oswald",
      "Bill Potts",
      "Rose Tyler"
    ],
    answerIndex: 0
  }
];
