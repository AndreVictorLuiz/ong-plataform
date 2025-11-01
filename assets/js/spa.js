// spa.js - Sistema de Single Page Application
class SPARouter {
    constructor() {
        this.routes = {};
        this.currentRoute = '';
        this.mainContent = document.getElementById('main-content');
        this.init();
    }

    init() {
        // Mapear rotas
        this.routes = {
            '/': this.loadHome.bind(this),
            '/projetos': this.loadProjects.bind(this),
            '/cadastro': this.loadRegistration.bind(this)
        };

        // Ouvir mudanças de hash na URL
        window.addEventListener('hashchange', this.handleRouteChange.bind(this));
        
        // Carregar rota inicial
        this.handleRouteChange();
    }

    handleRouteChange() {
        const hash = window.location.hash.slice(1) || '/';
        this.navigate(hash);
    }

    navigate(route) {
        if (this.routes[route]) {
            this.currentRoute = route;
            this.routes[route]();
            this.updateActiveNav(route);
        }
    }

    async loadHome() {
        const template = await this.loadTemplate('home');
        this.render(template);
        this.initializeHomePage();
    }

    async loadProjects() {
        const template = await this.loadTemplate('projects');
        this.render(template);
        this.initializeProjectsPage();
    }

    async loadRegistration() {
        const template = await this.loadTemplate('registration');
        this.render(template);
        this.initializeRegistrationPage();
    }

    async loadTemplate(templateName) {
        try {
            // Em uma aplicação real, buscaria de um servidor
            // Aqui simulo com templates embutidos
            return this.templates[templateName] || '<div>Template não encontrado</div>';
        } catch (error) {
            console.error('Erro ao carregar template:', error);
            return '<div>Erro ao carregar página</div>';
        }
    }

    render(content) {
        if (this.mainContent) {
            this.mainContent.innerHTML = content;
            
            // Disparar evento para inicializar componentes da página
            window.dispatchEvent(new CustomEvent('pageChanged', {
                detail: { route: this.currentRoute }
            }));
        }
    }

    updateActiveNav(route) {
        // Atualizar links de navegação ativos
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${route}`) {
                link.classList.add('active');
            }
        });
    }

    initializeHomePage() {
        // Inicializar componentes específicos da home
        console.log('🏠 Página inicial inicializada');
    }

    initializeProjectsPage() {
        // Inicializar componentes específicos de projetos
        console.log('📋 Página de projetos inicializada');
    }

    initializeRegistrationPage() {
        // Inicializar componentes específicos de cadastro
        console.log('📝 Página de cadastro inicializada');
        // Re-inicializar máscaras e validação para a nova página
        if (window.initMasks) window.initMasks();
        if (window.initValidation) window.initValidation();
    }

    // Templates embutidos (em produção, seriam arquivos separados)
    templates = {
        home: `
            <section id="hero" class="flex flex-col md:flex-row items-center justify-between py-8 container">
                <div class="hero-content text-center md:text-left mb-6 md:mb-0 md:w-1/2">
                    <h1 class="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Transforme Vidas com Ações Concretas</h1>
                    <p class="text-lg text-gray-600 mb-6">Conectamos pessoas dispostas a ajudar com organizações que precisam de apoio</p>
                    <div class="hero-buttons flex flex-col md:flex-row gap-3">
                        <a href="#cadastro" class="btn primary">Quero Ajudar</a>
                        <a href="#projetos" class="btn secondary">Conhecer Projetos</a>
                    </div>
                </div>
                <img src="assets/images/hero-banner.jpg" alt="Pessoas voluntárias" class="rounded-lg shadow-md w-full md:w-1/2">
            </section>

            <section id="sobre" class="py-8 bg-gray-50">
                <div class="container">
                    <h2 class="text-2xl md:text-3xl font-bold text-center mb-8">Sobre a ONG+ Connect</h2>
                    <div class="about-grid grid grid-1 md:grid-3 gap-6">
                        <article class="bg-white p-6 rounded-lg shadow-md">
                            <h3 class="text-xl font-semibold mb-3 text-primary">Missão</h3>
                            <p class="text-gray-600">Democratizar o acesso à tecnologia para organizações do terceiro setor.</p>
                        </article>
                        <article class="bg-white p-6 rounded-lg shadow-md">
                            <h3 class="text-xl font-semibold mb-3 text-primary">Visão</h3>
                            <p class="text-gray-600">Ser a principal plataforma de conexão entre ONGs, voluntários e doadores.</p>
                        </article>
                        <article class="bg-white p-6 rounded-lg shadow-md">
                            <h3 class="text-xl font-semibold mb-3 text-primary">Valores</h3>
                            <p class="text-gray-600">Transparência, colaboração, inovação e compromisso com o impacto social.</p>
                        </article>
                    </div>
                </div>
            </section>
        `,
        projects: `
            <section id="projetos-hero" class="text-center py-8">
                <h1 class="text-3xl md:text-4xl font-bold mb-4">Nossos Projetos Sociais</h1>
                <p class="text-lg text-gray-600">Conheça as iniciativas que estão transformando realidades</p>
            </section>

            <section id="projetos-lista" class="py-8">
                <div class="container">
                    <h2 class="text-2xl md:text-3xl font-bold text-center mb-8">Projetos em Destaque</h2>
                    <div class="grid grid-1 md:grid-2 lg:grid-3 gap-6" id="projects-container">
                        <!-- Projetos serão carregados dinamicamente -->
                    </div>
                </div>
            </section>
        `,
        registration: `
            <section id="cadastro-hero" class="text-center py-8">
                <h1 class="text-3xl md:text-4xl font-bold mb-4">Junte-se à Nossa Causa</h1>
                <p class="text-lg text-gray-600">Escolha como você quer fazer a diferença</p>
            </section>

            <section id="formulario-cadastro" class="py-8">
                <div class="container max-w-2xl">
                    <form id="cadastroForm" class="space-y-6">
                        <!-- Formulário será carregado do template -->
                    </form>
                </div>
            </section>
        `
    };
}

// Exportar função de inicialização
export function initSPA() {
    const spa = new SPARouter();
    window.spaRouter = spa; // Para acesso global se necessário
    return spa;
}