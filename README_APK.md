# 📱 Doctor Streaming - Build APK para Android

Guia completo para gerar e distribuir o APK da app Doctor Streaming.

## 🚀 Início Rápido

### Opção 1: Build Automático (GitHub Actions)
1. Faça push para a branch `main`
2. O workflow automático gera o APK
3. Baixe na aba **Actions** ou **Releases**

### Opção 2: Build Local

#### Pré-requisitos
- Node.js 18+
- Java 17+
- Android SDK
- Capacitor CLI

#### Passos

```bash
# 1. Instalar dependências
npm install

# 2. Build da aplicação React
npm run build

# 3. Adicionar plataforma Android (primeira vez)
npx @capacitor/cli add android

# 4. Sincronizar arquivos
npx @capacitor/cli sync android

# 5. Abrir Android Studio
npx @capacitor/cli open android

# 6. Compilar APK no Android Studio
# - Clique em Build → Build Bundle(s)/APK(s) → Build APK(s)
```

## 🔐 Configurar Assinatura Digital (Importante!)

Para publicar na Play Store, você precisa assinar o APK digitalmente.

### Gerar Chave de Assinatura

```bash
keytool -genkey -v -keystore doctor-key.keystore \
  -keyalg RSA -keysize 2048 -validity 10000 \
  -alias doctor-key
```

### Configurar Secrets no GitHub

Vá para **Settings → Secrets and variables → Actions** e adicione:

| Secret | Descrição |
|--------|-----------|
| `SIGNING_KEY` | Chave em base64 (veja abaixo) |
| `KEY_ALIAS` | Nome da chave (ex: `doctor-key`) |
| `KEYSTORE_PASSWORD` | Senha da keystore |
| `KEY_PASSWORD` | Senha da chave |

#### Converter Keystore para Base64

```bash
base64 doctor-key.keystore | tr -d '\n' | xclip -selection clipboard
```

Depois cole o resultado no GitHub Secret `SIGNING_KEY`.

## 📦 Saída do Build

O APK gerado fica em:
```
android/app/build/outputs/apk/release/app-release-unsigned.apk
```

## 📥 Como Instalar no Android

### Mobile
1. Baixe o APK para seu phone
2. Vá em **Configurações → Segurança** e ative "Fontes desconhecidas"
3. Abra o arquivo APK
4. Toque em "Instalar"

### Android TV
1. Use um navegador no Android TV ou ADB
2. Baixe o APK
3. Execute: `adb install doctor-*.apk`

## 🔄 Atualizar a App

### Via GitHub Actions (Automático)
Simplesmente faça push para `main`:
```bash
git add .
git commit -m "Nova versão da app"
git push origin main
```

### Manual (Local)
```bash
npm run build
npx @capacitor/cli sync android
cd android && ./gradlew assembleRelease
```

## 🐛 Solução de Problemas

### Erro: "Gradle sync failed"
```bash
cd android
./gradlew clean
./gradlew sync
```

### Erro: "SDK not found"
```bash
# Instale o SDK correto
sdkmanager "platforms;android-34"
sdkmanager "build-tools;34.0.0"
```

### App não abre
- Verifique `capacitor.config.ts`
- Certifique-se de que `dist/` foi gerado
- Execute `npm run build` antes de sincronizar

## 📊 Versioning

Use tags para marcar releases:
```bash
git tag v1.0.0
git push origin v1.0.0
```

Ou dispare o workflow manualmente com versão:
- Vá em **Actions → Build APK → Run workflow**
- Insira a versão desejada

## 🎯 Próximos Passos

1. ✅ Configurar assinatura digital
2. ✅ Testar em Android TV
3. ✅ Publicar na Google Play Store
4. ✅ Configurar auto-update

---

**Dúvidas?** Verifique os logs em **Actions** no GitHub!
