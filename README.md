# 🎯 EekCards - PWA de Estudos IBGE

Progressive Web App para estudos do concurso **IBGE - Agente de Pesquisas e Mapeamento**, otimizada para uso offline durante plantões noturnos.

## ✨ Características

- 🌙 **Design Cyber-Dark**: Alta legibilidade em ambientes escuros
- 🧠 **Sistema SRS (SM-2)**: Repetição espaçada inteligente
- 💬 **Tutor Dinâmico**: Mensagens motivacionais contextuais
- 📱 **100% Offline**: Funciona sem internet
- 📊 **10 Flashcards**: Ética IBGE + Setor Censitário
- 🎨 **Animações 3D**: Flip suave dos cards

## 🚀 Início Rápido

### Opção 1: Servidor Local
```bash
cd eekcards
npx serve . -l 3000
# Abra: http://localhost:3000
```

### Opção 2: Instalação PWA
1. Abra no navegador (Chrome/Safari)
2. Menu → "Adicionar à tela inicial"
3. Use como app nativo!

## 📚 Como Estudar

1. Leia a **pergunta** no card
2. Tente responder mentalmente
3. **Clique** para revelar a resposta
4. Avalie honestamente:
   - 😰 **Errei** → Revisão em 1 dia
   - 🤔 **Difícil** → Revisão em 3 dias
   - 😎 **Fácil** → Revisão em 7 dias

O algoritmo SRS otimiza automaticamente seu cronograma de revisões!

## 📊 Distribuição de Estudo

- **35%** Conhecimentos Técnicos
- **30%** Geografia
- **25%** Português
- **10%** Matemática (revisão rápida)

## 🔧 Tecnologias

- HTML5 / CSS3 / JavaScript Vanilla
- Service Worker para cache offline
- LocalStorage para persistência
- Google Fonts (Inter)

## 📦 Deploy

### GitHub Pages
```bash
git init
git add .
git commit -m "Deploy EekCards"
git push origin main
# Ativar Pages nas configurações
```

### Netlify/Vercel
```bash
npx netlify-cli deploy --dir=. --prod
# ou
npx vercel . --prod
```

## 💾 Backup

Clique em **💾 Exportar** no rodapé para baixar seu progresso em JSON.

## 📱 Compatibilidade

- ✅ Chrome (Android/Desktop)
- ✅ Safari (iOS 11.3+)
- ✅ Edge
- ✅ Firefox (com limitações PWA)

## 🎯 Estrutura

```
eekcards/
├── index.html         # Estrutura principal
├── style.css          # Design Cyber-Dark
├── script.js          # Lógica SRS + Flashcards
├── manifest.json      # Configuração PWA
├── service-worker.js  # Cache offline
└── README.md          # Este arquivo
```

## 📖 Conteúdo

### Código de Ética IBGE (6 cards)
- Objetivos e princípios
- Deveres com dados
- Sigilo estatístico
- Valores éticos
- Conduta profissional

### Setor Censitário (4 cards)
- Definições
- Tipos de setores
- Critérios de delimitação
- Importância operacional

## 🌙 Tutor Dinâmico

O componente "Tutor" adapta mensagens baseado em:
- **Horário**: Manhã/Tarde/Noite
- **Plantão**: Detecta 19h-07h
- **Progresso**: Incentivo baseado em desempenho

## 🔐 Privacidade

- Todos os dados salvos **localmente** no dispositivo
- Nenhuma informação enviada para servidores
- Funciona 100% offline

## 📞 Suporte

Para dúvidas ou sugestões, consulte a [documentação completa](walkthrough.md).

---

> 💪 **"Guerreiro do Plantão, cada sessão te aproxima da aprovação!"**

**Desenvolvido por**: eek029 Sistemas e Automação  
**Versão**: 1.0.0  
**Licença**: MIT
