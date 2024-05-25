// Validación de entrada está en otro archivo JS
import { validateField } from "./valida-input.js";

const loginForm = document.querySelector('.login');
const loginInputs = document.querySelectorAll('.login__input');

// ----- Eventos

// Agregar función de validación cuando el input pierde el foco
loginInputs.forEach(input => input.addEventListener('blur', e => validateField(e.target)));

// Autenticar al usuario y redirigir a la página de lista de productos si está autenticado (mostrar error de lo contrario)
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Validar credenciales
    const isUserAuthenticated = authenticateUser();
    if(isUserAuthenticated) window.location = 'produtos.html';
    else showLoginError();
})


// ----- Funciones

/*
    Verificar si el correo electrónico/contraseña existe.
    Autenticación codificada. La autenticación real debería hacerse en el backend. 
*/
function authenticateUser() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Codificado para pruebas en el front-end
    if (email === 'pablo@gmail.com' && password === '1234') {
        // TODO: crear sesión para mantener al usuario conectado
        return true;
    } else return false;
}

// Mostrar error en pantalla si la autenticación falla
function showLoginError() {
    const loginErrorElement = document.querySelector('.login__error');

    loginErrorElement.innerText = 'E-mail o contraseña inválidos.'
    loginErrorElement.classList.add('login__error--visible');
}
