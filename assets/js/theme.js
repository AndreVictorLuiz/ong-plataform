// theme.js - Gerenciador de temas
function setTheme(themeName) {
    document.documentElement.setAttribute('data-theme', themeName);
    localStorage.setItem('theme', themeName);
}

// Carregar tema salvo
const savedTheme = localStorage.getItem('theme') || 'light';
setTheme(savedTheme);
