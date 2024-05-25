import { validateField, checkMaxLength, checkIfKeyIsANumber } from "./valida-input.js";

const adminButton = document.querySelector('.header__admin');

// Verifica si el botón de administrador está presente
if (adminButton) {
    adminButton.addEventListener('click', () => {
        console.log('Redirigiendo a adicionar-produto.html');
        window.location.href = 'produtos.html';
    });
} else {
    console.error('Elemento .header__admin no encontrado');
}

// Elementos del formulario e inputs
const form = document.querySelector('.product');
const inputs = document.querySelectorAll('.product input, .product select, .product textarea');

// Verifica si el formulario está presente
if (form) {
    // Validación de inputs
    inputs.forEach(input => {
        input.addEventListener('blur', e => validateField(e.target));
        // Verifica la longitud máxima para inputs que tienen este atributo
        if (input.getAttribute('maxLength')) {
            input.addEventListener('input', e => checkMaxLength(e.target));
        }
        // Verifica si el usuario está escribiendo un número para inputs de tipo 'number'
        if (input.type === 'number') {
            input.addEventListener('keyup', e => checkIfKeyIsANumber(e));
        }
    });

    // Agregar un producto
    form.addEventListener('submit', e => {
        e.preventDefault();
        console.log('Formulario enviado');

        // Elemento que mostrará un mensaje de éxito/fallo
        const text = e.target.querySelector('.form__message');

        // Enviar el mensaje al back-end
        const success = addProduct();

        if (success) {
            text.innerText = '¡Producto añadido con éxito!';
            text.classList.add('form__message--success');

            setTimeout(() => {
                text.classList.remove('form__message--success');
                text.innerText = '';
            }, 5000);
        } else {
            text.innerText = 'Error al guardar el producto. Por favor, verifique si los campos fueron llenados correctamente.';
            text.classList.add('form__message--error');

            setTimeout(() => {
                text.classList.remove('form__message--error');
                text.innerText = '';
            }, 5000);
        }

        // Limpiar inputs
        form.reset();
    });
} else {
    console.error('Elemento .product no encontrado');
}

// Enviar datos del producto para ser manejados por el back-end
function addProduct() {
    let invalidInput = 0;

    // Verifica si hay algún input inválido
    inputs.forEach(input => {
        if (!input.validity.valid) {
            invalidInput++;
        }
    });

    // Por ahora, solo estamos validando campos de entrada. Próximo paso: simular una respuesta de API y guardar el producto usando localStorage
    if (invalidInput > 0) {
        console.warn('Hay entradas inválidas en el formulario');
        return false;
    } else {
        console.log('Todos los campos son válidos');
        return true;
    }
}

