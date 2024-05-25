import { checkMaxLength, validateField } from "./valida-input.js";

// elementos del formulario e inputs
const contactForm = document.querySelector('.contact__form'); 
const nameInput = document.getElementById('name');
const messageTxt = document.getElementById('message');

// validación de inputs
nameInput.addEventListener('blur', e => validateField(e.target));
messageTxt.addEventListener('blur', e => validateField(e.target));
nameInput.addEventListener('input', e => checkMaxLength(e.target));
messageTxt.addEventListener('input', e => checkMaxLength(e.target));

// enviar un mensaje
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // elemento que mostrará un mensaje de éxito/fallo
    const text = e.target.querySelector('.form__message');

    // enviar el mensaje al back-end
    const success = sendMessage();

    if(success) {        
        text.innerText = '¡Mensaje enviado con éxito!';
        text.classList.add('form__message--success')

        setTimeout(() => {
            text.classList.remove('form__message--success')
            text.innerText = '';
        }, 5000);
    } 
    else {
        text.innerText = 'Se produjo un error al enviar el mensaje. Por favor, verifique si los campos fueron completados correctamente.';
        text.classList.add('form__message--error')

        setTimeout(() => {
            text.classList.remove('form__message--error')
            text.innerText = '';
        }, 5000);
    }

    // limpiar inputs
    contactForm.reset(); 
})

/* 
    El mensaje debería ser manejado en el back-end y luego recibir un resultado de éxito/error.
    Por ahora, pretendemos que el mensaje se envió con éxito.
*/
function sendMessage() {
    if(nameInput.validity.valid && messageTxt.validity.valid)
        return true;
    else
        return false;
}
