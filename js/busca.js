import { displayProducts } from "./gerencia-produtos.js";

// obtener palabras clave de los parámetros de la URL 
const params = new URLSearchParams(document.location.search);
const keywords = params.get('busca');

displayProducts('search', keywords);

