// storage.js - Sistema de armazenamento local
class StorageManager {
    constructor() {
        this.prefix = 'ongConnect_';
        this.init();
    }

    init() {
        // Verificar se o storage está disponível
        if (!this.isLocalStorageAvailable()) {
            console.warn('LocalStorage não disponível');
            return;
        }
        console.log('💾 Sistema de armazenamento inicializado');
    }

    isLocalStorageAvailable() {
        try {
            const test = 'test';
            localStorage.setItem(test, test);
            localStorage.removeItem(test);
            return true;
        } catch (e) {
            return false;
        }
    }

    // Salvar dados
    set(key, value) {
        try {
            const storageKey = this.prefix + key;
            const data = JSON.stringify(value);
            localStorage.setItem(storageKey, data);
            return true;
        } catch (error) {
            console.error('Erro ao salvar no storage:', error);
            return false;
        }
    }

    // Recuperar dados
    get(key, defaultValue = null) {
        try {
            const storageKey = this.prefix + key;
            const data = localStorage.getItem(storageKey);
            return data ? JSON.parse(data) : defaultValue;
        } catch (error) {
            console.error('Erro ao recuperar do storage:', error);
            return defaultValue;
        }
    }

    // Remover dados
    remove(key) {
        try {
            const storageKey = this.prefix + key;
            localStorage.removeItem(storageKey);
            return true;
        } catch (error) {
            console.error('Erro ao remover do storage:', error);
            return false;
        }
    }

    // Limpar todos os dados da aplicação
    clear() {
        try {
            Object.keys(localStorage)
                .filter(key => key.startsWith(this.prefix))
                .forEach(key => localStorage.removeItem(key));
            return true;
        } catch (error) {
            console.error('Erro ao limpar storage:', error);
            return false;
        }
    }

    // Gerenciar dados de usuário
    salvarUsuario(usuario) {
        return this.set('usuario', usuario);
    }

    obterUsuario() {
        return this.get('usuario');
    }

    // Gerenciar dados de formulário (salvar rascunho)
    salvarRascunho(formId, dados) {
        return this.set(`rascunho_${formId}`, dados);
    }

    obterRascunho(formId) {
        return this.get(`rascunho_${formId}`, {});
    }

    // Gerenciar preferências
    salvarPreferencias(preferencias) {
        return this.set('preferencias', preferencias);
    }

    obterPreferencias() {
        return this.get('preferencias', {
            tema: 'claro',
            notificacoes: true
        });
    }
}

// Instância global
const storageManager = new StorageManager();

// Exportar funções
export function initStorage() {
    return storageManager;
}

export function useStorage() {
    return storageManager;
}