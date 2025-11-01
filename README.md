# 🎯 ONG+ Connect - Plataforma Solidária

## 📋 Descrição
Plataforma web desenvolvida para conectar voluntários, doadores e organizações do terceiro setor. **Agora com sistema SPA e funcionalidades JavaScript avançadas.**

## 🎯 Objetivo
Trabalho acadêmico - **Entrega III: Interatividade e Funcionalidades**  
Disciplina: Fundamentos Web

## 🚀 Tecnologias Utilizadas
- **HTML5 Semântico**
- **CSS3 Avançado** (Grid, Flexbox, Variáveis CSS)
- **JavaScript ES6+** (Módulos, SPA, Validações)
- **Design System** próprio
- **Single Page Application**
- **LocalStorage API**

## ✨ Funcionalidades Implementadas

### ✅ Entrega I - Fundamentos
- [x] 3 páginas HTML5 semânticas
- [x] Formulário com validação nativa
- [x] Máscaras JavaScript (CPF, telefone, CEP)
- [x] Estrutura organizada em pastas

### ✅ Entrega II - Estilização
- [x] **Sistema de Design** com variáveis CSS
- [x] **Layout Responsivo** (5 breakpoints)
- [x] **CSS Grid & Flexbox**
- [x] **Navegação sofisticada** com menu hambúrguer
- [x] **Componentes** (cards, botões, formulários)
- [x] **Design System** completo

### ✅ Entrega III - Interatividade (NOVO)
- [x] **Single Page Application** - Roteamento sem recarregamento
- [x] **Sistema de Validação Avançado** - CPF, idade, CEP em tempo real
- [x] **Integração com API ViaCEP** - Preenchimento automático de endereço
- [x] **Sistema de Templates** - Componentes dinâmicos
- [x] **Armazenamento Local** - Salvar dados e preferências
- [x] **Módulos JavaScript** - Arquitetura organizada e escalável

## 📂 Estrutura do Projeto (ATUALIZADA)
```
📁 ong-plataform/
├── 📄 index.html              # Página inicial
├── 📄 projetos.html           # Catálogo de projetos  
├── 📄 cadastro.html           # Formulário de cadastro
├── 📁 assets/
│   ├── 📁 css/
│   │   ├── 🎨 style.css       # Arquivo principal
│   │   ├── 🎨 variables.css   # Design Tokens
│   │   ├── 🎨 layout.css      # Sistema de grid
│   │   ├── 🎨 components.css  # Componentes reutilizáveis
│   │   └── 🎨 responsive.css  # Breakpoints
│   ├── 📁 js/                 # 🔥 NOVA ESTRUTURA
│   │   ├── ⚡ main.js         # Orquestrador principal
│   │   ├── ⚡ spa.js          # Sistema SPA e roteamento
│   │   ├── ⚡ validation.js   # Validações avançadas
│   │   ├── ⚡ storage.js      # Gerenciamento localStorage
│   │   ├── ⚡ templates.js    # Templates dinâmicos
│   │   └── ⚡ scripts.js      # Funcionalidades básicas
│   └── 📁 images/
│       ├── 🖼️ hero-banner.jpg
│       ├── 🖼️ projeto-1.jpg
│       └── 🖼️ projeto-2.jpg
└── 📄 README.md
```

## 🔥 Novas Funcionalidades JavaScript

### **🎯 Sistema SPA (spa.js)**
- Navegação fluida entre páginas
- Roteamento baseado em hash
- Templates dinâmicos
- Atualização de estado da navegação

### **✅ Validação Avançada (validation.js)**
```javascript
// Validações implementadas:
- CPF com algoritmo real de validação
- Idade mínima (18 anos)
- CEP com API ViaCEP integrada
- Email e telefone formatados
- Campos obrigatórios em tempo real
```

### **💾 Armazenamento (storage.js)**
- Salvar dados do usuário
- Rascunhos de formulário
- Preferências da aplicação

### **🎨 Templates Dinâmicos (templates.js)**
- Cards de projetos renderizados dinamicamente
- Mensagens de feedback
- Componentes reutilizáveis

## 🎨 Sistema de Design
- **Cores:** 12 cores na paleta
- **Tipografia:** 8 tamanhos hierárquicos  
- **Espaçamento:** Sistema modular (8px base)
- **Breakpoints:** 5 pontos responsivos

## 🚀 Como Executar
```bash
# Clone o repositório
git clone https://github.com/AndreVictorLuiz/ong-plataform.git

# Acesse o diretório
cd ong-plataform

# Execute com servidor local
python -m http.server 8000
# ou
npx http-server
```

## 👨‍💻 Desenvolvido por
**André Victor Luiz**  
GitHub: [@AndreVictorLuiz](https://github.com/AndreVictorLuiz)

---

*Projeto acadêmico - Todos os direitos reservados*  
**🎓 Entregas concluídas: Fundamentos → Estilização → Interatividade**
