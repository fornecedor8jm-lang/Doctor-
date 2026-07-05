# 🌀 Doctor+ — Dossiê do Projeto (GitHub Repository Edition)

**Doctor+** é uma plataforma de fãs dedicada à organização, catalogação e facilitação do acesso ao rico universo de **Doctor Who**, abrangendo a Série Clássica (*Classic Who*), a Série Moderna (*Modern Who*), Spin-offs consagrados e os icônicos Filmes & Especiais Comemorativos.

Este repositório reúne uma interface web responsiva de alta performance, projetada com foco em acessibilidade e compatibilidade universal, otimizada tanto para navegadores modernos quanto para Smart TVs e dispositivos móveis através do **Modo Lite**.

---

## 📋 Índice
1. [Visão Geral & Conceito](#-visão-geral--conceito)
2. [Ficha Técnica & Créditos do Projeto](#-ficha-técnica--créditos-do-projeto)
3. [Índice Geral de Acervo (Catálogo)](#-índice-geral-de-acervo-catálogo)
4. [Especificações Técnicas da Plataforma](#-especificações-técnicas-da-plataforma)
5. [Histórico de Versões & Notas de Atualização](#-histórico-de-versões--notas-de-atualização)
6. [Instruções de Instalação e Execução Local](#-instruções-de-instalação-e-execução-local)

---

## 🔮 Visão Geral & Conceito

O **Doctor+** nasceu com o propósito de unificar e preservar o acesso ao acervo legendado em português de Doctor Who. Diante da dispersão de links em servidores de nuvem e da dificuldade de navegação por fãs de diferentes gerações, o projeto adota uma estrutura em abas limpas e links diretos ao Google Drive. 

O design visual é inspirado no interior da própria TARDIS (cabine telefônica azul), utilizando uma paleta de cores cósmicas (tons profundos de azul e cinza-escuro) com detalhes em ciano neon.

---

## 👥 Ficha Técnica & Créditos do Projeto

O Doctor+ é um projeto comunitário movido pela paixão de fãs e colaboradores. Abaixo, destacamos a atribuição oficial de cada integrante do projeto:

| Função | Colaborador / Equipe | Descrição |
| :--- | :--- | :--- |
| **Idealização & Direção Geral** | **Eduardo Uruguaiano Frasão** | Responsável pela visão original do projeto, alinhamento de metas e engajamento da comunidade de fãs. |
| **Conceito do Formato** | **Loganwk** | Criador do conceito original do formato visual e estrutural do catálogo simplificado. |
| **Tradução e Legendas** | **Universo Who** | Equipe lendária responsável por traduzir e legendar os arcos clássicos com máxima fidelidade. |
| **Disponibilização de Conteúdo** | **MahBlue Series** | Colaborador essencial no fornecimento de links de armazenamento para a Série Clássica, Spin-offs e Especiais. |
| **Disponibilização de Conteúdo** | **JC** | Responsável pelo catálogo moderno massivo, fornecendo os links de todas as 15 temporadas modernas (2005-2025). |
| **Agradecimento Especial** | **Cunningmunki** | Desenvolvedor e designer pioneiro cuja inspiração técnica abriu caminho para este catálogo. |

---

## 📚 Índice Geral de Acervo (Catálogo)

O catálogo de mídia do Doctor+ é estruturado de forma rigorosa na camada de dados (`src/data.ts`) para garantir a integridade dos metadados e a consistência das referências:

### 1. 📺 Série Clássica (Classic Who)
Aventuras clássicas que contam a fundação da maior lenda da ficção científica:
*   **Temporada 12 Clássica completa (4º Doutor):**
    *   *Robot (Robô)*
    *   *The Ark in Space (A Arca no Espaço)*
    *   *The Sontaran Experiment (O Sontarano Experimental)*
    *   *Genesis of the Daleks (Gênese dos Daleks)*
    *   *Revenge of the Cybermen (Vingança dos Cybermen)*
*   **The Evil of the Daleks:**
    *   Arco clássico do 2º Doutor totalmente integrado em um episódio único unificado no formato de exibição simplificada Doctor+.

### 🌀 2. Série Moderna (Modern Who — 2005 a 2025)
A era contemporânea completa, abrangendo do Nono ao Décimo Quinto Doutor, disponibilizada integralmente por **JC**:
*   **1ª Temporada (Nono Doutor):** O início de tudo com Rose Tyler, Autons e Daleks (2005).
*   **2ª Temporada (Décimo Doutor):** A marcante introdução de David Tennant e o confronto dramático em Canary Wharf (2006).
*   **3ª Temporada (Décimo Doutor):** A jornada cósmica com Martha Jones, os Anjos Lamentáveis (*Blink*) e o retorno do Mestre (2007).
*   **4ª Temporada (Décimo Doutor):** A inesquecível dinâmica com Donna Noble e a união épica de companheiros (2008).
*   **5ª Temporada (Décimo Primeiro Doutor):** Início da era Steven Moffat, introdução de Matt Smith, Amy Pond, Rory e as rachaduras temporais (2010).
*   **6ª Temporada (Décimo Primeiro Doutor):** O mistério da morte do Doutor e as origens de River Song (2011).
*   **7ª Temporada (Décimo Primeiro Doutor):** A despedida dos Ponds e a chegada da garota impossível, Clara Oswald (2012-2013).
*   **8ª Temporada (Décimo Segundo Doutor):** O ciclo reflexivo e denso de Peter Capaldi enfrentando a inteligente Missy (2014).
*   **9ª Temporada (Décimo Segundo Doutor):** A jornada de sobrevivência cósmica com Clara e o aclamado episódio solo *Heaven Sent* (2015).
*   **10ª Temporada (Décimo Segundo Doutor):** A companhia de Bill Potts e Nardole culminando no terrível encontro com os Cybermen originais (2017).
*   **11ª Temporada (Décima Terceira Doutora):** A era de Jodie Whittaker e sua tripulação TARDIS explorando novos tempos (2018).
*   **12ª Temporada (Décima Terceira Doutora):** O surgimento da Criança Atemporal e revelações históricas sobre Gallifrey (2020).
*   **13ª Temporada (Décima Terceira Doutora):** O arco em série única *Doctor Who: Flux* focado na destruição cósmica (2021).
*   **14ª Temporada (Décimo Quinto Doutor):** Nova era vibrante protagonizada por Ncuti Gatwa e Ruby Sunday (2024).
*   **15ª Temporada (Décimo Quinto Doutor):** As novas aventuras eletrizantes e ameaças divinas no panteão (2025).

### 👽 3. Séries Derivadas (Spin-offs)
A expansão do universo expandido de Doctor Who com excelente curadoria:
*   **Sarah Jane's Alien Files:** Dossiê alienígena em 6 episódios detalhados apresentando as maiores ameaças catalogadas pela ex-companheira do Doutor.
*   **Torchwood (Temporadas 1 a 4):** A agência secreta liderada pelo Capitão Jack Harkness protegendo Cardiff de anomalias temporais e extraterrestres.

### ✨ 4. Especiais, Filmes & Extras
Os grandes marcos e celebrações da série:
*   **Shada (1980/2017):** O arco clássico perdido de autoria de Douglas Adams, finalizado com animações e áudios originais.
*   **K9 and Company (1981):** O clássico spin-off piloto focado no cão robótico K9 e Sarah Jane Smith.
*   **Doctor Who: O Filme (1996):** O filme de transição introduzindo o Oitavo Doutor (Paul McGann) em São Francisco.
*   **Especiais de 60 Anos (2023):** Trilogia épica com o retorno de David Tennant (14º Doutor) e Catherine Tate (*The Star Beast*, *Wild Blue Yonder*, *The Giggle*).
*   **Especial de Natal (2023):** *The Church on Ruby Road*, o nascimento da nova era de aventuras de Ncuti Gatwa.

---

## 🛠️ Especificações Técnicas da Plataforma

A aplicação foi estruturada usando tecnologias web modernas que garantem peso pena, carregamento instantâneo de metadados e suporte multiplataforma:

*   **Framework Principal:** React 18
*   **Ferramenta de Build:** Vite (para compilação ultrarrápida de arquivos estáticos)
*   **Linguagem de Programação:** TypeScript (com tipagem estrita de metadados de mídias para evitar crashes de links)
*   **Estilização:** Tailwind CSS (classes utilitárias otimizadas, sem geração de folhas de estilo pesadas)
*   **Ícones:** Lucide React
*   **Animações:** Framer Motion (`motion/react` para transição fluida entre abas e hover de botões)
*   **Mecanismo de Busca:** Filtragem reativa na memória usando expressões regulares flexíveis (busca por título, doutores ou sinopses).
*   **Modo Lite:** Otimizador embutido nas configurações para reduzir animações e efeitos CSS pesados, ideal para Smart TVs antigas.

---

## ⚙️ Histórico de Versões & Notas de Atualização

### v2.1 (Versão Atual)
*   **Lançamento da Série Moderna:** Adição das temporadas 1 a 15 de Doctor Who Moderna de Christopher Eccleston a Ncuti Gatwa.
*   **Filtros de Busca Avançados:** Barra de pesquisa em tempo real agora cobre também todos os dados e doutores da era moderna.
*   **Ajuste Fino de Dados:** Correção do arco *The Evil of the Daleks* para link unificado de exibição, eliminando erros de navegação.
*   **Realinhamento de Créditos:** Reestruturação da seção institucional para atribuir formalmente as contribuições das legendas clássicas (**Universo Who**), dos spin-offs/especiais (**MahBlue Series**) e do acervo moderno (**JC**).
*   **Aprimoramento Estético:** Integração do pôster oficial de temporadas como plano de fundo artístico na aba moderna para imersão completa dos usuários.

### v2.0
*   **Reestruturação do Layout:** Separação estrita de mídias por abas de categorias (*Clássica*, *Moderna*, *Spin-offs*, *Especiais* e *Configurações*), eliminando sobreposição visual.
*   **Implementação do Painel de Controle:** Nova aba centralizada reunindo curiosidades da série, alteração de logos da plataforma, modo lite para Smart TVs e histórico de atualizações.
*   **Fim do Player Embutido Instável:** Substituição completa por links diretos seguros do Google Drive oficial para melhor compatibilidade com Smart TVs e celulares.

---

## 🚀 Instruções de Instalação e Execução Local

Para rodar este projeto em sua máquina local para desenvolvimento ou testes, siga as etapas abaixo:

### Pré-requisitos
*   **Node.js** (versão 18 ou superior recomendada)
*   **npm** (instalado por padrão com o Node.js)

### Passos de Instalação

1.  **Clonar o repositório do GitHub:**
    ```bash
    git clone https://github.com/seu-usuario/doctor-plus.git
    cd doctor-plus
    ```

2.  **Instalar as dependências do projeto:**
    ```bash
    npm install
    ```

3.  **Iniciar o servidor de desenvolvimento local:**
    ```bash
    npm run dev
    ```

4.  **Acessar a aplicação no navegador:**
    Abra o link gerado pelo Vite no terminal (geralmente `http://localhost:3000` ou `http://localhost:5173`).

5.  **Compilar o projeto para produção:**
    ```bash
    npm run build
    ```
    Isso gerará os arquivos estáticos otimizados prontos para hospedagem (Vercel, Netlify, Cloud Run, etc.) na pasta `/dist`.

---

> *"Nós somos todos histórias no final... Apenas faça com que a sua seja uma boa história, hein?"*  
> — **O Décimo Primeiro Doutor**
