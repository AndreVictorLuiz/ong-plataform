// templates.js - Sistema de templates JavaScript
class TemplateManager {
    constructor() {
        this.templates = {};
        this.loadTemplates();
    }

    loadTemplates() {
        // Templates para projetos (simulando dados dinâmicos)
        this.templates.projetoCard = (projeto) => `
            <article class="card bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <img src="${projeto.imagem}" alt="${projeto.alt}" class="card-img w-full h-48 object-cover">
                <div class="card-content p-6">
                    <h3 class="text-xl font-semibold mb-3">${projeto.titulo}</h3>
                    <p class="text-gray-600 mb-4">${projeto.descricao}</p>
                    <div class="flex justify-between items-center">
                        <span class="badge ${projeto.categoria === 'educacao' ? 'badge-primary' : 'badge-secondary'}">
                            ${projeto.categoria}
                        </span>
                        <span class="text-sm text-gray-500">${projeto.voluntarios} voluntários</span>
                    </div>
                    <div class="project-actions mt-4 flex gap-2">
                        <button class="btn primary flex-1" onclick="ONGApp.inscreverProjeto(${projeto.id})">
                            Participar
                        </button>
                        <button class="btn secondary flex-1" onclick="ONGApp.verDetalhes(${projeto.id})">
                            Detalhes
                        </button>
                    </div>
                </div>
            </article>
        `;

        // Template para mensagens de validação
        this.templates.validationError = (mensagem, campoId) => `
            <div class="error-message flex items-center mt-1 p-2 bg-red-50 border border-red-200 rounded text-red-700 text-sm" data-field="${campoId}">
                <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
                </svg>
                ${mensagem}
            </div>
        `;

        // Template para feedback de sucesso
        this.templates.successMessage = (mensagem) => `
            <div class="success-message fixed top-4 right-4 z-50 p-4 bg-green-50 border border-green-200 rounded-lg shadow-lg max-w-sm">
                <div class="flex items-center">
                    <svg class="w-5 h-5 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                    </svg>
                    <span class="text-green-800 font-medium">${mensagem}</span>
                </div>
            </div>
        `;
    }

    render(templateName, data) {
        const template = this.templates[templateName];
        if (typeof template === 'function') {
            return template(data);
        }
        return template || '';
    }

    // Método para carregar templates externos (futura melhoria)
    async loadExternalTemplate(url) {
        try {
            const response = await fetch(url);
            return await response.text();
        } catch (error) {
            console.error('Erro ao carregar template externo:', error);
            return '';
        }
    }
}

// Instância global do gerenciador de templates
const templateManager = new TemplateManager();

// Exportar funções principais
export function initTemplates() {
    console.log('📝 Sistema de templates inicializado');
    return templateManager;
}

export function renderTemplate(templateName, data = {}) {
    return templateManager.render(templateName, data);
}

export function preloadTemplates(templateUrls) {
    return Promise.all(
        templateUrls.map(url => templateManager.loadExternalTemplate(url))
    );
}