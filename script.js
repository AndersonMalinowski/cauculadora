// Importa a biblioteca math.js para parsing seguro de expressões matemáticas
// Carregada via CDN no HTML (adicionar <script src="https://cdnjs.cloudflare.com/ajax/libs/mathjs/12.0.0/math.min.js"></script> no HTML)
const display = document.getElementById('display');

// Adiciona um caractere ou operador ao display
function appendToDisplay(value) {
    // Valida entrada para evitar caracteres inválidos
    const validInputs = /[0-9.+\-*/()]/;
    if (validInputs.test(value) || value === '') {
        display.value += value;
    }
}

// Limpa o display
function clearDisplay() {
    display.value = '';
}

// Aplica funções científicas ao valor atual no display
function applyFunction(func) {
    try {
        const currentValue = display.value || '0'; // Usa '0' como fallback para display vazio
        switch (func) {
            case 'sin':
                display.value = `sin(${currentValue})`;
                break;
            case 'cos':
                display.value = `cos(${currentValue})`;
                break;
            case 'tan':
                display.value = `tan(${currentValue})`;
                break;
            case 'sqrt':
                display.value = `sqrt(${currentValue})`;
                break;
            case 'pow':
                display.value = `pow(${currentValue}, 2)`;
                break;
            default:
                display.value = 'Erro';
        }
    } catch (error) {
        display.value = 'Erro';
        console.error('Erro ao aplicar função:', error);
    }
}

// Calcula a expressão no display usando math.js
function calculate() {
    try {
        // Substitui símbolos para compatibilidade com math.js
        let expression = display.value
            .replace(/÷/g, '/')
            .replace(/×/g, '*');
        
        // Usa math.js para avaliar a expressão de forma segura
        const result = math.evaluate(expression);
        
        // Verifica se o resultado é válido
        if (typeof result === 'number' && isFinite(result)) {
            display.value = result.toFixed(4); // Limita a 4 casas decimais
        } else {
            display.value = 'Erro';
        }
    } catch (error) {
        display.value = 'Erro';
        console.error('Erro ao calcular:', error);
    }
}

// Gerencia entrada via teclado
function handleKeyboardInput(event) {
    const key = event.key;
    
    // Números, operadores e ponto
    if (/[0-9.]|[+\-*/]/.test(key)) {
        appendToDisplay(key);
    }
    // Enter para calcular
    else if (key === 'Enter') {
        calculate();
    }
    // Escape para limpar
    else if (key === 'Escape') {
        clearDisplay();
    }
    // Backspace para apagar o último caractere
    else if (key === 'Backspace') {
        display.value = display.value.slice(0, -1);
    }
}

// Adiciona o evento de teclado
document.addEventListener('keydown', handleKeyboardInput);
