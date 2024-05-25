const MAX_ITEMS = 6;
const MAX_ITEMS_MOBILE = 4;
const productsCatalog = document.querySelector('.products__catalog');

export async function displayProducts(type, key) {
    const productsResponse = await getProducts();

    if (type === 'all') {
        const gallery = createGallery();
        addTitleToGallery(gallery, 'Todos los produtos');
        addButtonToGallery(gallery, 'adicionar-produto.html', 'Adicionar producto');
        addAllProductsToGallery(productsResponse, gallery);
        addButtonsToProducts(gallery);
    } else if (type === 'split') {
        productsResponse.forEach(category => {
            const gallery = createGallery();
            const products = category['products'];
            const quantity = products.length;
            const maxItems = quantity < MAX_ITEMS ? quantity : MAX_ITEMS;
            const maxItemsMobile = quantity < MAX_ITEMS_MOBILE ? quantity : MAX_ITEMS_MOBILE;

            addTitleToGallery(gallery, category['categoryName']);
            addLinkToGallery(gallery, `categoria.html?cat=${category['categoryId']}`, 'Ver todo &#10132;');
            addProductsToGallery(gallery, products, maxItems, maxItemsMobile);
        });
    } else if (type === 'category') {
        const category = await getProducstByCategory(key);
        const gallery = createGallery();

        if (category != null) {
            const products = category['products'];
            addTitleToGallery(gallery, category['categoryName']);
            addProductsToGallery(gallery, products, products.length, products.length);
        } else {
            addTitleToGallery(gallery, '¡La categoría informada no existe!');
        }
    } else if (type === 'search') {
        const products = await getProductsByKeywords(key);
        const gallery = createGallery();

        if (products.length > 0) {
            addTitleToGallery(gallery, "Resultado de la Búsqueda");
            addProductsToGallery(gallery, products, products.length, products.length);
        } else {
            addTitleToGallery(gallery, "¡La búsqueda no retornó ningún resultado!");
        }
    } else if (type == 'related') {
        const products = await getRelatedProducts(key);

        if (products) {
            const gallery = createGallery();
            const quantity = products.length;
            const maxItems = quantity < MAX_ITEMS ? quantity : MAX_ITEMS;
            const maxItemsMobile = quantity < MAX_ITEMS_MOBILE ? quantity : MAX_ITEMS_MOBILE;

            addTitleToGallery(gallery, 'Productos similares');
            addProductsToGallery(gallery, products, maxItems, maxItemsMobile);
        }
    }
}

export async function displayProductDetails(productId) {
    const product = await getProductById(productId);

    if (product) {
        createProductDetailsSection(product);
        displayProducts('related', productId);
    } else {
        const gallery = createGallery();
        addTitleToGallery(gallery, "Error, el producto ingresado no ha sido encontrado.");
    }
}

async function getProducts() {  
    try {
        const url = 'https://gist.githubusercontent.com/PABLORVLO/298495ce16651698570317500395a844/raw/b45ecfa3720857bbaa1e002f805cf779381e4608/productos.json';
        const response = await fetch(url);
        const productsList = await response.json();
        return productsList;
    } catch (err) {
        console.log('Error al obtener datos de la API\n' + err);
    }
}

async function getProductsByKeywords(keywords) {
    const productsList = [];
    try {
        const products = await getProducts();
        products.forEach(category => {
            productsList.push(...category['products'].filter(({ name }) => {
                let itemFound = false;
                keywords.split(' ').forEach(key => {
                    if (name.toLowerCase().includes(key.toLowerCase())) {
                        itemFound = true;
                    }
                })
                return itemFound;
            }))
        })
    } catch (err) {
        console.log('Error al recibir datos de API\n' + err);
    }
    return productsList;
}

async function getProducstByCategory(categoryId) {
    try {
        const products = await getProducts();
        for (const category of products) {
            if (category['categoryId'] === categoryId) {
                return category;
            }
        }
    } catch (err) {
        console.log('Error al recibir productos de la API\n' + err);
    }
    return null;
}

async function getProductById(productId) {
    try {
        const products = await getProducts();
        for (const category of products) {
            const product = (category['products'].filter(({ id }) => id === productId));
            if (product.length > 0) return product[0];
        }
    } catch (err) {
        console.log('Error al recibir productos de la API\n' + err);
    }
    return null;
}

async function getRelatedProducts(productId) {
    try {
        const categoryId = await getCategory(productId);
        const products = await getRandomProducts(categoryId, productId);
        if (products) return products;
    } catch (err) {
        console.log('Error al recibir productos de la API\n' + err);
    }
    return null;
}

async function getRandomProducts(categoryId, productId) {
    try {
        const category = await getProducstByCategory(categoryId);

        if (category) {
            const products = category['products'].filter(({ id }) => id !== productId);
            const productsShuffled = shuffleArray(products);
            const quantity = productsShuffled.length;
            const maxItems = quantity < MAX_ITEMS ? quantity : MAX_ITEMS;

            if (maxItems > 0) return productsShuffled.slice(0, maxItems);
        }
    } catch (err) {
        console.log('Error al recibir productos de la API\n' + err);
    }
    return null;
}

function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

async function getCategory(productId) {
    try {
        const products = await getProducts();
        for (const category of products) {
            const product = (category['products'].filter(({ id }) => id === productId));
            if (product.length > 0) return category.categoryId;
        }
    } catch (err) {
        console.log('Error al recibir productos de la API\n' + err);
    }
    return null;
}

function createGallery() {
    const gallery = document.createElement('section');
    gallery.classList.add('gallery');
    gallery.innerHTML = `
        <div class="gallery__header">
            <h2 class="gallery__title">OEE</h2>
        </div>
    `;
    productsCatalog.appendChild(gallery);
    return gallery;
}

function createProductCard(product) {
    const productCard = document.createElement('div');
    productCard.classList.add('item__card');
    productCard.innerHTML = `
        <img src="${product.picture}" onclick="location.href='detalhe-produto.html?id=${product.id}'" alt="Foto del producto" class="item__image">
        <p class="item__name">${product.name}</p>
        <p class="item__price">COP$ ${product.price}</p>
        <a href="detalhe-produto.html?id=${product.id}" class="item__anchor">Ver produto</a>
    `;
    return productCard;
}

function createProductDetailsSection(product) {
    const productSection = document.createElement('section');
    productSection.classList.add('item');
    productSection.innerHTML = `
        <div class="item__banner" aria-label="Imagen del producto ${product.name}"></div>
        <div class="item__content">
            <h1 class="item__title">${product.name}</h1>
            <p class="item__price">COP$ ${product.price}</p>
            <p class="item__description">${product.description}</p>
        </div>
    `;
    productsCatalog.appendChild(productSection);
    changeProductBanner(product.picture);
}

function changeProductBanner(image) {
    const itemBanner = document.querySelector('.item__banner');
    itemBanner.style.backgroundImage = `url(${image})`;
}

function addTitleToGallery(gallery, name) {
    const galleryTitle = gallery.querySelector('.gallery__title');
    galleryTitle.innerText = name;
}

function addLinkToGallery(gallery, url, title) {
    const galleryHeader = gallery.querySelector('.gallery__header');
    const link = document.createElement('a');
    link.classList.add('gallery__anchor');
    link.href = url;
    link.innerHTML = title;
    galleryHeader.appendChild(link);
}

function addButtonToGallery(gallery, url, title) {
    const galleryHeader = gallery.querySelector('.gallery__header');
    const link = document.createElement('a');
    link.classList.add('button--primary');
    link.href = url;
    link.innerHTML = title;
    galleryHeader.appendChild(link);
}

function addButtonsToProducts(gallery) {
    const items = gallery.querySelectorAll('.item__card');
    items.forEach(item => {
        const buttons = document.createElement('div');
        buttons.classList.add('item__management');
        buttons.innerHTML = `
            <button class="item__management-button item__management-button--delete" aria-label="Eliminar item"></button>
            <button class="item__management-button item__management-button--edit" aria-label="Editar item"></button>
        `;
        item.appendChild(buttons);        
    });
}

function addProductsToGallery(gallery, products, maxItems, maxItemsMobile) {
    const listOfProducts = document.createElement('div');
    listOfProducts.classList.add('gallery__items');
    for (let i = 0; i < maxItems; i++) {
        const product = createProductCard(products[i]);
        if (i >= maxItemsMobile) {
            product.classList.add('item__card--visibility');
        }
        listOfProducts.appendChild(product);
    }
    gallery.appendChild(listOfProducts);
}

function addAllProductsToGallery(productsList, gallery) {
    const products = [];
    productsList.forEach(category => {
        category['products'].forEach(item => {
            products.push(item);
        });
    });
    addProductsToGallery(gallery, products, products.length, products.length);
}
