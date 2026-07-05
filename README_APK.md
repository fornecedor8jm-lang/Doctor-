# 📱 Doctor Streaming - CAG (CIDADE ALTA DE GALLIFREY)

Guia para gerar APK automático via GitHub Actions.

## 🚀 Como Funciona

### Fluxo Automático (Recomendado)

1. **Você edita o código**
   ```bash
   # Faça suas mudanças nos arquivos
   ```

2. **Envia para o GitHub**
   ```bash
   git add .
   git commit -m "Descrição da mudança"
   git push origin main
   ```

3. **GitHub compila automaticamente**
   - GitHub Actions inicia
   - Compila o código React
   - Gera o APK em poucos minutos

4. **Baixa o APK**
   - Vai em: https://github.com/fornecedor8jm-lang/Doctor-/actions
   - Clica no workflow "Build APK for Android"
   - Desce até "Artifacts"
   - Baixa o arquivo `doctor-cag-X.X.X.apk`

---

## 📥 Instalar no Android/TV

### Passo 1: Transferir o APK
- Coloque o arquivo APK no seu Android/TV
- Use USB, email, ou download direto

### Passo 2: Ativar Instalação de Fontes Desconhecidas
- **Android Phone:** Configurações → Segurança → Fontes Desconhecidas ✅
- **Android TV:** Configurações → Segurança → Origens Desconhecidas ✅

### Passo 3: Instalar
- Abra o arquivo APK
- Clique em "Instalar"
- Pronto! 🎉

---

## 🔄 Atualizar a App

Sempre que quiser uma nova versão:

```bash
git add .
git commit -m "Nova versão - descrição aqui"
git push origin main
```

**Automático!** Um novo APK será gerado em minutos.

---

## 📊 Acompanhar o Build

1. Acesse: https://github.com/fornecedor8jm-lang/Doctor-
2. Clique em **"Actions"**
3. Veja o status do workflow em tempo real
4. Se der erro, clique no workflow para ver os logs

---

## 🎯 Informações do APK

| Info | Valor |
|------|-------|
| **App ID** | `com.cag.doctorstreaming` |
| **Nome** | Doctor Streaming |
| **Empresa** | CIDADE ALTA DE GALLIFREY |
| **Tipo** | Debug (Sem Assinatura) |
| **Compatibilidade** | Android 5.0+ e Android TV |

---

## ⚠️ Importante

- ✅ APK **SEM assinatura digital** (ideal para testes/distribuição interna)
- ✅ Funciona em **Android Phone e Android TV**
- ✅ Build automático a cada push
- ✅ Versão em formato: `doctor-cag-1.0.0.apk`

---

## 🆘 Problemas?

**APK não baixa?**
- Verifique se o workflow terminou (verde ✅)
- Scroll down na página do workflow

**App não instala?**
- Certifique-se que "Fontes desconhecidas" está ativada
- Tente desinstalar versão antiga antes

**Erro no workflow?**
- Clique no workflow para ver logs detalhados
- Procure pela mensagem de erro em vermelho

---

**Pronto para começar! Faça seu primeiro push e veja a magia acontecer! 🚀**
