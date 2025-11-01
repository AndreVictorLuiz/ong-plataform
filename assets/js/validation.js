// validation.js - Sistema avançado de validação de formulários
class FormValidator {
    constructor(formId) {
        this.form = document.getElementById(formId);
        this.fields = {};
        this.errors = {};
        this.init();
    }

    init() {
        if (!this.form) return;

        // Mapear campos e suas regras de validação
        this.setupFieldRules();
        
        // Adicionar event listeners para validação em tempo real
        this.setupRealTimeValidation();
        
        // Prevenir envio se houver erros
        this.form.addEventListener('submit', this.handleSubmit.bind(this));
    }

    setupFieldRules() {
        // Definir regras para cada campo
        this.fields = {
            'nome-completo': {
                required: true,
                minLength: 3,
                maxLength: 100,
                pattern: /^[A-Za-zÀ-ÿ\s]{3,}$/,
                messages: {
                    required: 'Nome completo é obrigatório',
                    minLength: 'Nome deve ter pelo menos 3 caracteres',
                    pattern: 'Nome deve conter apenas letras e espaços'
                }
            },
            'email': {
                required: true,
                pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                messages: {
                    required: 'E-mail é obrigatório',
                    pattern: 'Digite um e-mail válido'
                }
            },
            'cpf': {
                required: true,
                pattern: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
                validate: this.validarCPF.bind(this),
                messages: {
                    required: 'CPF é obrigatório',
                    pattern: 'CPF deve estar no formato 000.000.000-00',
                    invalid: 'CPF inválido'
                }
            },
            'telefone': {
                required: true,
                pattern: /^\(\d{2}\)\s\d{4,5}-\d{4}$/,
                messages: {
                    required: 'Telefone é obrigatório',
                    pattern: 'Telefone deve estar no formato (00) 00000-0000'
                }
            },
            'nascimento': {
                required: true,
                validate: this.validarIdade.bind(this),
                messages: {
                    required: 'Data de nascimento é obrigatória',
                    invalid: 'Você deve ter pelo menos 18 anos'
                }
            },
            'cep': {
                required: true,
                pattern: /^\d{5}-\d{3}$/,
                validate: this.validarCEP.bind(this),
                messages: {
                    required: 'CEP é obrigatório',
                    pattern: 'CEP deve estar no formato 00000-000',
                    invalid: 'CEP não encontrado'
                }
            }
        };
    }

    setupRealTimeValidation() {
        Object.keys(this.fields).forEach(fieldName => {
            const field = this.form.querySelector(`[name="${fieldName}"]`);
            if (field) {
                // Validar ao sair do campo
                field.addEventListener('blur', () => {
                    this.validateField(fieldName, field.value);
                });

                // Limpar erro ao digitar
                field.addEventListener('input', () => {
                    this.clearFieldError(fieldName);
                });
            }
        });
    }

    validateField(fieldName, value) {
        const rules = this.fields[fieldName];
        if (!rules) return true;

        this.clearFieldError(fieldName);

        // Verificar campo obrigatório
        if (rules.required && (!value || value.trim() === '')) {
            this.showFieldError(fieldName, rules.messages.required);
            return false;
        }

        // Verificar padrão regex
        if (rules.pattern && value && !rules.pattern.test(value)) {
            this.showFieldError(fieldName, rules.messages.pattern);
            return false;
        }

        // Verificar validação customizada
        if (rules.validate && value) {
            const customValidation = rules.validate(value);
            if (!customValidation.isValid) {
                this.showFieldError(fieldName, customValidation.message || rules.messages.invalid);
                return false;
            }
        }

        // Verificar tamanho mínimo
        if (rules.minLength && value && value.length < rules.minLength) {
            this.showFieldError(fieldName, rules.messages.minLength);
            return false;
        }

        // Verificar tamanho máximo
        if (rules.maxLength && value && value.length > rules.maxLength) {
            this.showFieldError(fieldName, rules.messages.maxLength);
            return false;
        }

        // Campo válido
        this.showFieldSuccess(fieldName);
        return true;
    }

    showFieldError(fieldName, message) {
        const field = this.form.querySelector(`[name="${fieldName}"]`);
        if (!field) return;

        // Adicionar classe de erro
        field.classList.add('error');
        field.classList.remove('success');

        // Criar ou atualizar mensagem de erro
        let errorElement = field.parentNode.querySelector('.error-message');
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            field.parentNode.appendChild(errorElement);
        }

        errorElement.innerHTML = message;
        this.errors[fieldName] = message;
    }

    showFieldSuccess(fieldName) {
        const field = this.form.querySelector(`[name="${fieldName}"]`);
        if (!field) return;

        field.classList.remove('error');
        field.classList.add('success');
        this.clearFieldError(fieldName);
    }

    clearFieldError(fieldName) {
        const field = this.form.querySelector(`[name="${fieldName}"]`);
        if (!field) return;

        const errorElement = field.parentNode.querySelector('.error-message');
        if (errorElement) {
            errorElement.remove();
        }
        delete this.errors[fieldName];
    }

    validarCPF(cpf) {
        // Remover caracteres não numéricos
        cpf = cpf.replace(/\D/g, '');

        // Verificar se tem 11 dígitos
        if (cpf.length !== 11) {
            return { isValid: false, message: 'CPF deve ter 11 dígitos' };
        }

        // Verificar se todos os dígitos são iguais
        if (/^(\d)\1+$/.test(cpf)) {
            return { isValid: false, message: 'CPF inválido' };
        }

        // Validar dígitos verificadores (algoritmo simplificado)
        let soma = 0;
        for (let i = 0; i < 9; i++) {
            soma += parseInt(cpf.charAt(i)) * (10 - i);
        }
        
        let resto = soma % 11;
        let digito1 = resto < 2 ? 0 : 11 - resto;

        if (digito1 !== parseInt(cpf.charAt(9))) {
            return { isValid: false, message: 'CPF inválido' };
        }

        return { isValid: true };
    }

    validarIdade(dataNascimento) {
        const nascimento = new Date(dataNascimento);
        const hoje = new Date();
        const idade = hoje.getFullYear() - nascimento.getFullYear();
        const mes = hoje.getMonth() - nascimento.getMonth();

        if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
            return { 
                isValid: idade - 1 >= 18, 
                message: 'Você deve ter pelo menos 18 anos' 
            };
        }

        return { 
            isValid: idade >= 18, 
            message: 'Você deve ter pelo menos 18 anos' 
        };
    }

    async validarCEP(cep) {
        try {
            // Simular consulta à API de CEP
            const response = await fetch(`https://viacep.com.br/ws/${cep.replace('-', '')}/json/`);
            const data = await response.json();
            
            if (data.erro) {
                return { isValid: false, message: 'CEP não encontrado' };
            }

            // Preencher automaticamente endereço se CEP for válido
            this.preencherEndereco(data);
            return { isValid: true };

        } catch (error) {
            return { isValid: false, message: 'Erro ao consultar CEP' };
        }
    }

    preencherEndereco(dadosCEP) {
        const enderecoField = this.form.querySelector('[name="endereco"]');
        const cidadeField = this.form.querySelector('[name="cidade"]');
        const estadoField = this.form.querySelector('[name="estado"]');

        if (enderecoField) {
            enderecoField.value = `${dadosCEP.logradouro} - ${dadosCEP.bairro}`;
        }
        if (cidadeField) {
            cidadeField.value = dadosCEP.localidade;
        }
        if (estadoField) {
            estadoField.value = dadosCEP.uf;
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        
        // Validar todos os campos
        let formIsValid = true;
        Object.keys(this.fields).forEach(fieldName => {
            const field = this.form.querySelector(`[name="${fieldName}"]`);
            if (field) {
                const isValid = this.validateField(fieldName, field.value);
                if (!isValid) formIsValid = false;
            }
        });

        if (formIsValid) {
            this.showSuccessMessage();
            this.form.submit();
        } else {
            this.showErrorMessage('Por favor, corrija os erros antes de enviar.');
        }
    }

    showSuccessMessage() {
        // Usar template para mensagem de sucesso
        const successHTML = window.renderTemplate('successMessage', {
            mensagem: 'Cadastro realizado com sucesso!'
        });
        
        document.body.insertAdjacentHTML('beforeend', successHTML);
        
        // Remover mensagem após 5 segundos
        setTimeout(() => {
            const message = document.querySelector('.success-message');
            if (message) message.remove();
        }, 5000);
    }

    showErrorMessage(message) {
        alert(message); // Em produção, usar um toast ou modal
    }
}

// Exportar função de inicialização
export function initValidation() {
    const forms = document.querySelectorAll('form[data-validate]');
    forms.forEach(form => {
        new FormValidator(form.id);
    });
    
    console.log('✅ Sistema de validação inicializado');
}