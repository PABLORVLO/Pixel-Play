import { displayProducts } from "./gerencia-produtos.js";

// obtener la categoría de los parámetros de la URL 
const params = new URLSearchParams(document.location.search);
const categoryId = params.get('cat');

displayProducts('category', categoryId);
