// main.js - Arquivo principal que orquestra todos os módulos
import { initSPA } from './spa.js';
import { initTemplates } from './templates.js';
import { initValidation } from './validation.js';
import { initStorage } from './storage.js';
import { initMenu } from './menu.js';
import { initMasks } from './masks.js';

// Inicializar todas as funcionalidades quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 ONG+ Connect - Inicializando aplicação...');
    
    // Inicializar SPA
    initSPA();
    
    // Inicializar templates
    initTemplates();
    
    // Inicializar validação de formulários
    initValidation();
    
    // Inicializar armazenamento local
    initStorage();
    
    // Inicializar menu hambúrguer
    initMenu();
    
    // Inicializar máscaras
    initMasks();
    
    console.log('✅ Aplicação inicializada com sucesso!');
});

// Exportar para uso global se necessário
window.ONGApp = {
    initSPA,
    initTemplates,
    initValidation,
    initStorage
};