# 🛒 CHECKLIST_COMPRAS.md — Entregáveis, Checklist de Repositório & Guia Termux (Doctor+)

Este guia serve como um inventário do repositório, checklist de conformidade dos pacotes móveis, e instruções completas para baixar, compilar e obter o APK diretamente em seu dispositivo Android utilizando o terminal **Termux**.

---

## 📦 1. O que está no Repositório? (Inventário)

O repositório do **Doctor+** está 100% estruturado para desenvolvimento web e geração de pacotes Android nativos. Segue a lista de arquivos de controle fundamentais presentes:

*   **`capacitor.config.ts`**: Configuração global da ponte nativa móvel, declarando o App ID `com.cag.doctorstreaming` e apontando para a pasta compilada `dist`.
*   **`.github/workflows/build-apk.yml`**: Automação integrada de CI/CD que gera o APK e publica como artefato em nuvem a cada push no repositório.
*   **`package.json`**: Lista completa de dependências do app, incluindo scripts de desenvolvimento e builds otimizadas.
*   **`.gitignore`**: Exclui pastas pesadas geradas de forma dinâmica (como `node_modules/`, `dist/` e artefatos de build do android) para manter o repositório limpo e leve.
*   **`README.md`**: Dossiê completo do projeto para o GitHub, contendo créditos da equipe (Eduardo, Loganwk, JC, MahBlue, Universo Who), índice de episódios e especificações web.
*   **`APK_SPECIFICATIONS.md`**: Especificações técnicas de empacotamento, versionamento e troubleshooting da desenvolvedora **CAG (Cidade Alta de Gallifrey)**.
*   **`CHECKLIST_COMPRAS.md`**: Este próprio documento com checklist de conformidade e guia de download/compilação via Termux.

---

## 📱 2. O que o APK de Produção Contém?

O arquivo `.apk` final gerado de forma automatizada inclui:
1.  **Código-Fonte Otimizado**: Todo o bundle HTML, CSS (Tailwind) e JS compilado em sua versão mais leve disponível.
2.  **Mecanismo de WebView de Alto Desempenho**: Renderização veloz dos cards e transição de abas.
3.  **Assinatura de Segurança Nativa**: Certificação de integridade configurada para execução segura no Android.
4.  **Links Diretos Seguros**: Conectividade para abrir links do Google Drive diretamente nos reprodutores de mídia favoritos do Android (como VLC Player, MX Player ou o próprio Google Drive).

---

## ⚙️ 3. Processo Automático Explicado (GitHub Actions)

A cada alteração enviada ao repositório GitHub (`git push`), o workflow automático `.github/workflows/build-apk.yml` executa as seguintes etapas nos servidores do GitHub em nuvem:
1.  **Montagem de Máquina Linux Virtual (Ubuntu Latest)**.
2.  **Instalação do Node.js e Java Development Kit (JDK 17)** necessários para compilação Android.
3.  **Instalação dos pacotes web e build do projeto via React e Vite** (`dist/`).
4.  **Sincronização dos arquivos web com o container Android nativo** (`android/`).
5.  **Execução do compilador Gradle** para gerar o executável Android (`app-release-unsigned.apk`).
6.  **Armazenamento do APK resultante como Artefato de Download** na própria aba "Actions" do GitHub para download público instantâneo!

---

## 🐚 4. Guia Completo: Baixar, Compilar e Instalar o APK pelo Termux (Android)

Se você deseja compilar o APK diretamente do seu celular Android ou baixar o APK compilado pelo GitHub Actions via terminal utilizando o **Termux**, siga as instruções práticas abaixo:

### Pré-requisitos no Termux
Abra o Termux e atualize o sistema de pacotes, concedendo também acesso de armazenamento para poder salvar o APK na sua pasta de Downloads:
```bash
# Atualizar repositórios e pacotes existentes
pkg update -y && pkg upgrade -y

# Conceder permissão de armazenamento ao Termux (Cria a pasta storage/)
termux-setup-storage
```

---

### Opção A: Como Compilar o APK Direto no Celular usando o Termux
Se você quiser clonar este repositório e compilar o APK localmente usando o próprio processamento do seu celular Android, siga estas etapas:

#### 1. Instalar as Ferramentas Necessárias no Termux
Você precisará do Git, Node.js, e JDK (Java) para rodar o build móvel:
```bash
pkg install git nodejs-lts openjdk-17 -y
```

#### 2. Clonar o Repositório e Instalar Dependências
```bash
git clone <URL_DO_SEU_REPOSITORIO_GITHUB>
cd <NOME_DA_PASTA_DO_REPOSITORIO>

# Instalar dependências de desenvolvimento do projeto
npm install
```

#### 3. Instalar o Capacitor e Inicializar o Android
```bash
# Instalar o CLI do Capacitor localmente
npm install @capacitor/core
npm install -D @capacitor/cli @capacitor/android

# Adicionar a plataforma nativa do Android
npx cap add android
```

#### 4. Executar os Scripts de Compilação
```bash
# 1. Compilar o frontend em React
npm run build

# 2. Sincronizar o build com a pasta android nativa
npx cap sync

# 3. Compilar o APK usando o Gradle embutido
cd android
./gradlew assembleDebug
```

#### 5. Mover o APK Compilado para a pasta de Downloads do Celular
Após a finalização bem-sucedida, o APK estará salvo nas profundezas do diretório do Termux. Para movê-lo de forma limpa para a sua pasta de downloads normal do celular (onde você pode clicar e instalar facilmente):
```bash
cp app/build/outputs/apk/debug/app-debug.apk ~/storage/shared/Download/doctor-plus-debug.apk
echo "Sucesso! O APK foi copiado para a pasta de Downloads do seu celular com o nome 'doctor-plus-debug.apk'"
```

---

### Opção B: Baixar o APK Pré-Compilado do GitHub via Termux
Se você já usou o GitHub Actions para compilar o APK e quer apenas baixá-lo rapidamente usando comandos do Termux:

1.  **Instalar a ferramenta de download cURL ou wget:**
    ```bash
    pkg install wget -y
    ```

2.  **Baixar o APK gerado direto para a sua pasta de Downloads:**
    Substitua o link abaixo pela URL do seu arquivo APK público ou release do GitHub:
    ```bash
    wget -O ~/storage/shared/Download/doctor-plus.apk "https://github.com/seu-usuario/seu-repositorio/releases/download/v2.1.0/doctor-plus.apk"
    ```

3.  **Instalar o APK baixado pelo terminal:**
    Para instalar diretamente pelo terminal Termux (pode requerer permissões adicionais):
    ```bash
    termux-open ~/storage/shared/Download/doctor-plus.apk
    ```

---

## 📜 5. Scripts Úteis de Terminal para Desenvolvimento Rápido

Aqui estão atalhos rápidos que você pode colocar nos scripts do `package.json` para facilitar os comandos:

*   `npm run clean` — Limpa as pastas temporárias de build (`dist/` e cache).
*   `npx cap sync` — Envia as alterações que você fez no React direto para as telas do Android.
*   `npx cap open android` — Abre o projeto no Android Studio de forma instantânea se você estiver desenvolvendo em um PC/notebook.

---

*Dossiê elaborado em conformidade e distribuído pela Cidade Alta de Gallifrey (CAG).*
