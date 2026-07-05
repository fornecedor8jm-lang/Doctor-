# 🚀 Doctor+ — Guia Rápido de Compilação do APK (Android Build Guide)

Este guia prático descreve o passo a passo resumido para converter a aplicação web **Doctor+** em um arquivo APK nativo para aparelhos Android ou Smart TVs.

---

## 🏗️ 1. Preparação do Ambiente

Antes de começar, certifique-se de ter instalado em sua máquina de desenvolvimento:
*   **Node.js LTS** (v18+)
*   **Android Studio** com SDK API 34+ e ferramentas de linha de comando (Command-line Tools).
*   **Java Development Kit (JDK 17)**.

---

## 🛠️ 2. Passos para Gerar o APK Localmente

Siga a sequência de comandos abaixo no terminal do seu computador (no diretório raiz do projeto):

### Passo 2.1: Instalar as Dependências do Capacitor
Adicione as pontes nativas e o CLI do Capacitor como dependências no projeto:
```bash
npm install @capacitor/core
npm install -D @capacitor/cli @capacitor/android
```

### Passo 2.2: Compilar a Aplicação Frontend
Gere os arquivos estáticos otimizados pelo Vite na pasta `/dist`:
```bash
npm run build
```

### Passo 2.3: Inicializar a Plataforma Android do Capacitor
Adicione a pasta nativa android (`/android`) que abriga as configurações do Android Studio e Gradle:
```bash
npx cap add android
```

### Passo 2.4: Sincronizar Recursos Web com o Android Nativo
Esse comando copia todos os assets da pasta `/dist` diretamente para dentro do container nativo:
```bash
npx cap sync
```

### Passo 2.5: Compilar o APK pelo Android Studio ou Linha de Comando
*   **Via Android Studio:**
    Abra a pasta `/android` no Android Studio. Vá em **Build > Build Bundle(s) / APK(s) > Build APK(s)**. O Android Studio compilará e abrirá a pasta com o arquivo `.apk`.
    
*   **Via Linha de Comando (Gradle):**
    ```bash
    cd android
    # Para compilar APK de depuração (Debug):
    ./gradlew assembleDebug
    
    # Para compilar APK otimizado e assinado para distribuição (Release):
    ./gradlew assembleRelease
    ```

O APK gerado via linha de comando estará disponível em:
`android/app/build/outputs/apk/debug/app-debug.apk` ou `android/app/build/outputs/apk/release/app-release-unsigned.apk`.

---

## 🔄 3. Como Atualizar o Aplicativo?

Caso faça alterações no código-fonte em React/TypeScript no futuro e queira refletir as mudanças no seu APK:
1.  Compile o código da interface: `npm run build`
2.  Sincronize com o Capacitor: `npx cap sync`
3.  Execute a compilação do Gradle novamente: `cd android && ./gradlew assembleDebug`

---

*Cidade Alta de Gallifrey (CAG) — Mantendo o legado de Doctor Who ativo em todas as telas.*
