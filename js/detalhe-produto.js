import { displayProductDetails } from './gerencia-produtos.js';

// obtener el ID del producto de los parámetros de la URL 
const params = new URLSearchParams(document.location.search);
const productId = params.get('id');

// mostrar producto
displayProductDetails(productId);

// mostrar productos relacionados
