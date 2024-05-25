// Validar el contenido de entrada, utilizando la API de validación de restricciones
export function validateField(input) {

    // Elemento que mostrará el mensaje de validación
    const errorMessageElement = input.parentElement.querySelector('.input__validation-message');

    // Comprobar qué tipo de validación falló
    if (input.validity.typeMismatch) { // correo electrónico inválido
        // Agregar texto personalizado para mostrar si el usuario hace clic en el botón de enviar
        input.setCustomValidity('Por favor, verifique si el correo electrónico fue ingresado correctamente');

        // Agregar texto personalizado para mostrar debajo del campo de entrada
        errorMessageElement.innerText = 'Por favor, verifique si el correo electrónico fue ingresado correctamente';

        // Cambiar el estilo de entrada
        input.classList.add('input--invalid');
    } else if (input.validity.tooLong) { // entrada excede maxLength
        const maxLength = input.getAttribute('maxLength');
        input.setCustomValidity(`Has excedido el número máximo de ${maxLength} caracteres`);
        errorMessageElement.innerText = `Has excedido el número máximo de ${maxLength} caracteres`;
        input.classList.add('input--invalid');
    } else if (input.validity.rangeUnderflow) { // precio negativo
        input.setCustomValidity('Por favor, ingresa un valor superior a 1 centavo.');
        errorMessageElement.innerText = 'Por favor, ingresa un valor superior a 1 centavo.';
        input.classList.add('input--invalid');
    } else if (input.validity.stepMismatch || input.validity.badInput) { // precio mal formado
        input.setCustomValidity('Por favor, utiliza dos decimales');
        errorMessageElement.innerText = 'Por favor, utiliza dos decimales';
        input.classList.add('input--invalid');
    } else if (input.validity.valueMissing) { // entrada en blanco        
        input.setCustomValidity('Este campo no puede estar en blanco');        
        errorMessageElement.innerText = 'Este campo no puede estar en blanco';        
        input.classList.add('input--invalid');
    } else { // es una entrada válida
        // Restablecer los textos y estilos de validación
        errorMessageElement.innerText = '';
        input.classList.remove('input--invalid');
        input.setCustomValidity('');
    }           
}

// Comprobar la longitud de la entrada y mostrar un mensaje cuando esté cerca del límite máximo de caracteres
export function checkMaxLength(input) {
    const currentLength = input.value.length;
    const maxLength = input.getAttribute('maxLength');
    const charactersAvailable = maxLength - currentLength;
    const errorMessageElement = input.parentElement.querySelector('.input__validation-message');

    if (charactersAvailable <= 10) {
        // Advertir al usuario cuántos caracteres quedan
        errorMessageElement.innerText = `${charactersAvailable} caracteres disponibles.`
    } else {
        errorMessageElement.innerText = '';
    }
}

// Mostrar un mensaje cuando el usuario intenta escribir una letra en una entrada donde solo se permiten números
export function checkIfKeyIsANumber(event) {
    const errorMessageElement = event.target.parentElement.querySelector('.input__validation-message');
    if (event.key.match(/^[a-zA-Z]$/g)) {
        errorMessageElement.innerText = 'Por favor, ingresa solo números y una coma para separar los centavos.';
    } else {
        errorMessageElement.innerText = '';
    }
}
