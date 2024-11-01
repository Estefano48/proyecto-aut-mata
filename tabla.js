
// determinar transiciones entre estados
function getTransition(state, input) {
    const transitionTable = {
        q0: {
            '+': document.getElementById('q0-plus').value,
            'E': document.getElementById('q0-E').value,
            '-': document.getElementById('q0-minus').value,
            '*': document.getElementById('q0-asterisk').value,
            'digit': document.getElementById('q0-digit').value,
            'FDC': document.getElementById('q0-FDC').value
        },
        q1: {
            '+': document.getElementById('q1-plus').value,
            'E': document.getElementById('q1-E').value,
            '-': document.getElementById('q1-minus').value,
            '*': document.getElementById('q1-asterisk').value,
            'digit': document.getElementById('q1-digit').value,
            'FDC': document.getElementById('q1-FDC').value
        },
        q2: {
            '+': document.getElementById('q2-plus').value,
            'E': document.getElementById('q2-E').value,
            '-': document.getElementById('q2-minus').value,
            '*': document.getElementById('q2-asterisk').value,
            'digit': document.getElementById('q2-digit').value,
            'FDC': document.getElementById('q2-FDC').value
        },
        q3: {
            '+': document.getElementById('q3-plus').value,
            'E': document.getElementById('q3-E').value,
            '-': document.getElementById('q3-minus').value,
            '*': document.getElementById('q3-asterisk').value,
            'digit': document.getElementById('q3-digit').value,
            'FDC': document.getElementById('q3-FDC').value
        },
        q4: {
            '+': document.getElementById('q4-plus').value,
            'E': document.getElementById('q4-E').value,
            '-': document.getElementById('q4-minus').value,
            '*': document.getElementById('q4-asterisk').value,
            'digit': document.getElementById('q4-digit').value,
            'FDC': document.getElementById('q4-FDC').value
        },
        q5: {
            '+': document.getElementById('q5-plus').value,
            'E': document.getElementById('q5-E').value,
            '-': document.getElementById('q5-minus').value,
            '*': document.getElementById('q5-asterisk').value,
            'digit': document.getElementById('q5-digit').value,
            'FDC': document.getElementById('q5-FDC').value
        },
        q6: {
            '+': document.getElementById('q6-plus').value,
            'E': document.getElementById('q6-E').value,
            '-': document.getElementById('q6-minus').value,
            '*': document.getElementById('q6-asterisk').value,
            'digit': document.getElementById('q6-digit').value,
            'FDC': document.getElementById('q6-FDC').value
        }
    };

    return transitionTable[state][input];
}

function isFinalState(state) { // se verifica si el estadoactual es final 
    return document.getElementById(state + '-FDC').value === 'SI';
}

function validateString() {
    let currentState = 'q0';  // estado inicial
    const inputString = document.getElementById('inputString').value;
    let lastState = currentState;
    let stateSequence = [currentState];  // Array para almacenar la secuencia de estados
    
    for (let i = 0; i < inputString.length; i++) {
        let char = inputString[i];
        
        if (/[0-9]/.test(char)) {
            char = 'digit';  // Considera cualquier dígito como 'digit'
        }
    
        if (isFinalState(currentState) && char === inputString[i - 1]) {
            continue; // se mantiene el estado si el símbolo es igual al anterior
        }

        lastState = currentState;
        currentState = getTransition(currentState, char);

        if (!currentState) {
            document.getElementById('result').textContent = "Cadena inválida.";
            document.getElementById('result').classList.remove("valid");
            document.getElementById('result').classList.add("invalid");
            return;
        }

        stateSequence.push(currentState);  // Agrega el estado actual a la secuencia
    }

    // verificar si el estado final es de aceptación
    const isValid = isFinalState(currentState) || (isFinalState(lastState) && inputString[inputString.length - 1] === inputString[inputString.length - 2]);
    
    const resultElement = document.getElementById('result');
    if (isValid) {
        resultElement.textContent = `Cadena válida. Secuencia de estados: ${stateSequence.join('-')}`;
        resultElement.classList.remove("invalid");
        resultElement.classList.add("valid");
    } else {
        resultElement.textContent = `Cadena inválida. Secuencia de estados: ${stateSequence.join('-')}`;
        resultElement.classList.remove("valid");
        resultElement.classList.add("invalid");
    }
}


// Hacer que las columnas de la tabla sean redimensionables
document.querySelectorAll("th").forEach(function(th) {
    th.classList.add("resizable");

    th.addEventListener("mousedown", function(event) {
        if (event.offsetX > th.offsetWidth - 10) {  // Solo si se hace clic cerca del borde derecho
            let startX = event.pageX;
            let startWidth = th.offsetWidth;

            function onMouseMove(event) {
                th.style.width = startWidth + (event.pageX - startX) + "px";
            }

            function onMouseUp() {
                document.removeEventListener("mousemove", onMouseMove);
                document.removeEventListener("mouseup", onMouseUp);
            }

            document.addEventListener("mousemove", onMouseMove);
            document.addEventListener("mouseup", onMouseUp);
        }
    });
});
