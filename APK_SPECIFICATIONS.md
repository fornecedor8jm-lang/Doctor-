# 📑 APK_SPECIFICATIONS.md — Especificações Técnicas do App (Doctor+)

Este dossiê técnico detalha as especificações operacionais, arquitetura de empacotamento e diretrizes de compilação da plataforma móvel **Doctor+** para o ecossistema Android.

---

## 🏢 Identificação do Projeto & Assinatura

O desenvolvimento, registro e distribuição móvel do aplicativo estão sob a chancela da empresa licenciadora oficial e desenvolvedora fictícia do universo de Doctor Who:

*   **Empresa Desenvolvedora / Proprietária:** CAG (CIDADE ALTA DE GALLIFREY)
*   **Nome Oficial do Aplicativo (App Name):** Doctor+
*   **Identificador Único do Pacote (Application ID / Package Name):** `com.cag.doctorstreaming`
*   **Versão Alvo Atual:** v2.1.0
*   **SDK Android Mínimo Suportado (Min SDK):** API 22 (Android 5.1 - Lollipop)
*   **SDK Android Alvo (Target SDK):** API 34 (Android 14)

---

## 🛠️ Arquitetura de Empacotamento (Hybrid Stack)

O aplicativo móvel **Doctor+** foi projetado seguindo a arquitetura **Híbrida Web-Native** usando a engine do **CapacitorJS**. Isso permite que o código-fonte em React 19 seja executado dentro de uma Web View de altíssima performance no Android, mantendo a responsividade do layout e links de carregamento.

```
       [ Interface React 19 / Vite ]
                     │
         (Compilado em HTML/JS/CSS)
                     │  (Vite Build -> dist/)
                     ▼
       [ Capacitor Android Bridge ]  <─── capacitor.config.ts
                     │
          (Engine nativa WebView)
                     │  (Gradle Sync -> android/)
                     ▼
       [ Pacote Nativo APK Android ]  ───► com.cag.doctorstreaming
```

---

## 🚀 Fluxo de Build (Do Código ao Executável)

O pipeline de geração do APK do aplicativo divide-se em três etapas fundamentais:

### 1. Compilação Web (Web Production Build)
Gera os arquivos otimizados e minimizados em JavaScript/CSS dentro do diretório `/dist`.
```bash
npm run build
```

### 2. Sincronização do Capacitor (Capacitor Sync)
Copia o pacote compilado `/dist` e o integra diretamente no container nativo Android localizado em `/android`, atualizando arquivos de manifesto e dependências gradle.
```bash
npx cap sync
```

### 3. Compilação Nativa (Gradle Assembly)
Utiliza as ferramentas de build do Android SDK e Gradle para gerar o arquivo `.apk` final.
*   **Debug APK (Para testes rápidos):** `./gradlew assembleDebug`
*   **Release APK (Pronto para distribuição):** `./gradlew assembleRelease`

---

## 📈 Versionamento Semântico (SemVer)

O aplicativo segue estritamente a convenção de versionamento de três números `M.m.p` alinhada com as atualizações de catálogo e correções de dados do Doctor+:

1.  **M (Major):** Reestruturação total ou mudança estrutural crítica (Ex: Versão v2.0 com abas limpas e novo layout).
2.  **m (Minor):** Adição de novos blocos massivos de catálogo (Ex: Versão v2.1 adicionando as 15 temporadas modernas).
3.  **p (Patch):** Correções pontuais de bugs de links, layout, ou ortografia (Ex: v2.1.1 corrigindo arcos como *The Evil of the Daleks*).

No arquivo `android/app/build.gradle`, o controle é mantido através de:
*   `versionCode`: Um número inteiro incremental que sobe a cada nova build enviada (Ex: `210`).
*   `versionName`: A string de exibição para o usuário (Ex: `"2.1.0"`).

---

## 🔍 Solução de Problemas (Troubleshooting)

### 1. Erro: "Cleartext HTTP traffic not permitted"
*   **Sintoma:** O aplicativo abre em tela preta ou não carrega os links do Google Drive.
*   **Causa:** O Android por padrão bloqueia conexões HTTP não seguras em versões mais novas.
*   **Solução:** Certifique-se de que a flag `androidScheme` no `capacitor.config.ts` está definida como `'https'`. Caso necessário, configure o atributo `android:usesCleartextTraffic="true"` no arquivo `AndroidManifest.xml`.

### 2. Erro: "Webview out of date" ou Elementos Não Renderizam
*   **Sintoma:** Animações do Framer Motion falham ou travam em celulares ou Smart TVs mais antigos.
*   **Solução:**
    *   Habilite o **Modo Lite** no painel de configurações internas do Doctor+ no próprio aplicativo.
    *   No dispositivo de destino, certifique-se de atualizar o componente **Android System WebView** pela Google Play Store.

### 3. Erro: "Could not find bundle" ou Tela Branca ao Iniciar
*   **Sintoma:** O aplicativo abre, mas fica infinitamente travado em uma tela em branco.
*   **Causa:** O Capacitor tentou sincronizar os arquivos nativos antes de você rodar o comando `npm run build`, deixando o diretório `/dist` vazio ou desatualizado.
*   **Solução:** Sempre execute o comando `npm run build` antes de rodar `npx cap sync`.

---

*Desenvolvido sob as diretrizes do Alto Conselho da Cidade Alta de Gallifrey (CAG).*
