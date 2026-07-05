# 🚀 Guia de Configuração do Capacitor para APK Android

Este guia vai ajudá-lo a configurar o Capacitor e gerar um APK da aplicação Doctor+.

## 📋 Pré-requisitos

Antes de começar, você precisa ter instalado:

1. **Node.js** (v18+) e npm
2. **Java Development Kit (JDK)** (v11+)
   - Download: https://www.oracle.com/java/technologies/javase-jdk11-downloads.html
   - Ou use: `sudo apt install openjdk-11-jdk` (Linux)

3. **Android Studio** 
   - Download: https://developer.android.com/studio
   - Instale os SDKs necessários durante a instalação

4. **Android SDK** (mínimo API 24)
   - Abra Android Studio → SDK Manager → Instale Android 7.0 (API 24) ou superior

## 🔧 Configuração de Variáveis de Ambiente

### Linux/Mac:
```bash
export JAVA_HOME=/path/to/jdk
export ANDROID_HOME=$HOME/Android/Sdk
export PATH=$ANDROID_HOME/platform-tools:$ANDROID_HOME/tools:$PATH
```

### Windows:
```
JAVA_HOME = C:\Program Files\Java\jdk-11
ANDROID_HOME = C:\Users\YourUser\AppData\Local\Android\Sdk
PATH += %ANDROID_HOME%\platform-tools;%ANDROID_HOME%\tools
```

## 📱 Passo a Passo de Configuração

### 1️⃣ Instalar Dependências do Projeto
```bash
npm install
```

### 2️⃣ Compilar a Aplicação Web
```bash
npm run build
```

### 3️⃣ Inicializar Capacitor (já foi feito, mas para referência)
```bash
npx cap init
```

### 4️⃣ Adicionar Plataforma Android
```bash
npx cap add android
```

### 5️⃣ Sincronizar Alterações
```bash
npx cap sync
```

### 6️⃣ Abrir Projeto no Android Studio
```bash
npx cap open android
```

## 🏗️ Gerar APK

### Opção 1: Via Android Studio (Recomendado)
1. Abra Android Studio
2. Execute o projeto em um emulador ou dispositivo conectado
3. Em seguida, vá para **Build → Build Bundle(s) / APK(s) → Build APK(s)**

### Opção 2: Via Linha de Comando
```bash
cd android
./gradlew assembleDebug  # Para APK de Debug
./gradlew assembleRelease  # Para APK de Release (requer keystore)
```

O APK estará em: `android/app/build/outputs/apk/debug/app-debug.apk`

### Opção 3: Script Rápido
```bash
npm run build:apk
```

## 🔑 Gerar APK Assinado (Release)

Para publicar na Google Play Store, você precisa assinar o APK:

### 1. Gerar Keystore (apenas uma vez)
```bash
keytool -genkey -v -keystore doctor-plus-key.keystore \
  -keyalg RSA -keysize 2048 -validity 10000 \
  -alias doctor-plus-key
```

### 2. Configurar Gradle para Assinar
Edite `android/app/build.gradle`:

```gradle
android {
    signingConfigs {
        release {
            storeFile file('/path/to/doctor-plus-key.keystore')
            storePassword 'sua_senha'
            keyAlias 'doctor-plus-key'
            keyPassword 'sua_senha'
        }
    }
    buildTypes {
        release {
            signingConfig signingConfigs.release
        }
    }
}
```

### 3. Compilar APK Assinado
```bash
cd android
./gradlew assembleRelease
```

## 📲 Testar APK no Dispositivo

### Via Adb (Android Debug Bridge):
```bash
adb install android/app/build/outputs/apk/debug/app-debug.apk
```

### Via Android Studio:
1. Conecte um dispositivo Android via USB
2. Ative "Modo Desenvolvedor" no dispositivo
3. Clique em **Run** no Android Studio

## 🐛 Troubleshooting

### Erro: "ANDROID_HOME não configurado"
```bash
export ANDROID_HOME=$HOME/Android/Sdk
```

### Erro: "Java não encontrado"
Verifique se JAVA_HOME está configurado corretamente.

### Erro: "Gradle build failed"
```bash
cd android
./gradlew clean
./gradlew build
```

### APK não instala no dispositivo
- Desinstale versões anteriores
- Verifique a versão mínima do Android (API 24+)
- Tente transferir via USB em vez de Wi-Fi

## 📊 Verificar Versão do APK

```bash
aapt dump badging android/app/build/outputs/apk/debug/app-debug.apk
```

## 🎉 Pronto!

Seu APK está pronto para distribuição! 🚀

Para publicar na Google Play Store:
1. Crie uma conta Google Play Developer (taxa única de $25)
2. Faça upload do APK assinado
3. Configure descrição, screenshots e permissões
4. Publique!

---

**Dúvidas?** Consulte a [documentação oficial do Capacitor](https://capacitorjs.com/docs/android)
