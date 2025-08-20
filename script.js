document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.btn');

    let currentInput = '0';
    let expression = '';

    const updateDisplay = (value) => {
        display.textContent = value;
    };

    const isOperator = (char) => {
        return ['+', '-', '*', '/', '%'].includes(char);
    };

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.getAttribute('data-value');

            if (value === 'C') {
                expression = '';
                currentInput = '0';
                updateDisplay(currentInput);
                return;
            }

            if (value === 'backspace') {
                expression = expression.slice(0, -1);
                currentInput = expression || '0';
                updateDisplay(currentInput);
                return;
            }

            if (value === '=') {
                try {
                    const result = eval(expression);
                    currentInput = result;
                    expression = String(result);
                    updateDisplay(currentInput);
                } catch (error) {
                    currentInput = 'Erro';
                    expression = '';
                    updateDisplay(currentInput);
                }
                return;
            }

            // Lógica para evitar operadores duplicados
            if (isOperator(value) && isOperator(expression.slice(-1))) {
                expression = expression.slice(0, -1) + value;
            } else if (expression === '0' && !isOperator(value)) {
                 expression = value;
            } else {
                expression += value;
            }

            updateDisplay(expression);
        });
    });
});
