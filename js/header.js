const searchIcon = document.querySelector('.header__search-icon');
const searchBox = document.querySelector('.header__searchbox');
const currentWindowWidth = window.innerWidth;

// Redireccionar a la página de resultados cuando se presiona Enter
searchBox.addEventListener('keydown', e => {
    if(e.keyCode === 13) {
        window.location.href = `resultado.html?busca=${e.target.value}`;
    }
})

// Ocultar el icono y mostrar el cuadro de búsqueda
searchIcon.addEventListener('click', () => {
    searchBox.classList.add('header__searchbox--mobile');
    searchBox.focus();
    searchIcon.style.display = 'none';
})

/**
 * Si se cambia el tamaño de la ventana, asegurarse de que la visibilidad de los iconos
 * respete el diseño original. Esto solo se aplicará si hubo un cambio en el ancho.
 * Este paso es necesario porque cuando un teclado está abierto en móvil, esto 
 * desencadena el evento onresize debido a un cambio en la altura (los cambios en la 
 * altura no afectan el diseño).
 */
onresize = () => {
    // Los cambios se aplicarán solo si el ancho de la ventana cambió
    if(currentWindowWidth !== window.innerWidth){
        searchBox.classList.remove('header__searchbox--mobile');
        if(window.innerWidth < 768){
            searchIcon.style.display = 'block';
        }
        else {
            searchIcon.style.display = 'none';
        }
    }
}
