// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close menu when a link is clicked
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

const serviceDetails = [
    {
        id: 0,
        title: 'Urbanización de Terracerías',
        description: 'Movimiento de tierras, obras de drenaje, obras de agua potable, obras pluviales, pavimentación e imagen urbana.',
        images: ['icarsa1.png', 'icarsa2.png', 'icarsa3.png']
    },
    {
        id: 1,
        title: 'Edificación comercial y de servicios',
        description: 'Construcción de edificios comerciales como plazas, locales, oficinas, espacios deportivos y hoteles.',
        images: ['icarsa4.png', 'icarsa5.png', 'icarsa6.png']
    },
    {
        id: 2,
        title: 'Desarrollos residenciales',
        description: 'Proyecto y construcción de desarrollos residenciales desde urbanización hasta entrega de vivienda final, ya sea vivienda unifamiliar o edificios.',
        images: ['icarsa7.png', 'icarsa8.png', 'icarsa9.png']
    },
];

// Service card navigation to detail page
const serviceCards = document.querySelectorAll('.service-card[data-service-id]');
serviceCards.forEach(card => {
    const serviceId = card.dataset.serviceId;
    card.style.cursor = 'pointer';
    card.addEventListener('click', () => {
        window.location.href = `service-detail.html?service=${serviceId}`;
    });
    card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            window.location.href = `service-detail.html?service=${serviceId}`;
        }
    });
});

// Product card navigation to detail page
const productCards = document.querySelectorAll('.product-card[data-product-id]');
productCards.forEach(card => {
    const productId = card.dataset.productId;
    card.style.cursor = 'pointer';
    card.addEventListener('click', () => {
        window.location.href = `product-detail.html?product=${productId}`;
    });
    card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            window.location.href = `product-detail.html?product=${productId}`;
        }
    });
});

// Productos data
const products = [
    {
        id: 0,
        title: 'Renta de maquinaria',
        description: 'Maquinaria profesional de última generación para tus proyectos de obra civil.',
        features: [
            'Excavadoras de diferentes tamaños',
            'Cargadores frontales',
            'Motoniveladoras',
            'Compactadores',
            'Mantenimiento preventivo incluido'
        ],
        images: [
            'maquinaria1.png',
            'maquinaria2.png',
            'maquinaria3.png'
        ]
    },
    {
        id: 1,
        title: 'Renta de equipo y herramienta',
        description: 'Equipo y herramientas profesionales para obra y mantenimiento.',
        features: [
            'Herramientas eléctricas',
            'Equipos de medición',
            'Herramientas manuales',
            'Equipo de seguridad',
            'Disponibilidad inmediata'
        ],
        images: [
            'herramienta1.png',
            'herramienta2.png',
            'herramienta3.png'
        ]
    },
    {
        id: 2,
        title: 'Renta de pipas y transporte de agua',
        description: 'Servicio confiable de suministro y transporte de agua para obra, riego y contingencias.',
        features: [
            'Pipas de 5,000 a 10,000 litros',
            'Conductores profesionales',
            'Rutas flexibles',
            'Tanques sanitarios',
            'Entrega puntual'
        ],
        images: [
            'pipa1.png',
            'pipa2.png',
            'pipa3.png'
        ]
    }
];

let productCurrentIndex = 0;
let productAutoRotateInterval = null;

function initProductCarousel(images) {
    const track = document.getElementById('carouselTrack');
    const prevBtn = document.getElementById('prevProductImage');
    const nextBtn = document.getElementById('nextProductImage');

    if (!track) return;

    function updateCarousel() {
        track.style.transform = `translateX(-${productCurrentIndex * 100}%)`;
    }

    function nextImage() {
        productCurrentIndex = (productCurrentIndex + 1) % images.length;
        updateCarousel();
        restartProductAutoRotate();
    }

    function prevImage() {
        productCurrentIndex = (productCurrentIndex - 1 + images.length) % images.length;
        updateCarousel();
        restartProductAutoRotate();
    }

    function autoRotateProduct() {
        clearInterval(productAutoRotateInterval);
        productAutoRotateInterval = setInterval(() => {
            productCurrentIndex = (productCurrentIndex + 1) % images.length;
            updateCarousel();
        }, 4000);
    }

    function restartProductAutoRotate() {
        clearInterval(productAutoRotateInterval);
        autoRotateProduct();
    }

    if (prevBtn) prevBtn.addEventListener('click', prevImage);
    if (nextBtn) nextBtn.addEventListener('click', nextImage);

    productCurrentIndex = 0;
    updateCarousel();
    autoRotateProduct();
}

function loadProductDetail() {
    const params = new URLSearchParams(window.location.search);
    const productId = parseInt(params.get('product'), 10);
    const product = products.find(item => item.id === productId) || products[0];

    const titleEl = document.getElementById('productTitle');
    const descriptionEl = document.getElementById('productDescription');
    const featuresEl = document.getElementById('productFeatures');
    const carouselTrack = document.getElementById('carouselTrack');
    const samplesGrid = document.getElementById('samplesGrid');

    if (titleEl) titleEl.textContent = product.title;
    if (descriptionEl) descriptionEl.textContent = product.description;

    if (featuresEl) {
        featuresEl.innerHTML = '';
        product.features.forEach(feature => {
            const li = document.createElement('li');
            li.innerHTML = `<i class="fas fa-check"></i> ${feature}`;
            featuresEl.appendChild(li);
        });
    }

    if (carouselTrack) {
        carouselTrack.innerHTML = '';
        product.images.forEach(image => {
            const slide = document.createElement('div');
            slide.className = 'carousel-slide';
            slide.style.backgroundImage = `url('${image}')`;
            carouselTrack.appendChild(slide);
        });
        initProductCarousel(product.images);
    }

    if (samplesGrid) {
        samplesGrid.innerHTML = '';
        product.images.forEach((image, index) => {
            const card = document.createElement('div');
            card.className = 'sample-card';
            card.innerHTML = `
                <img src="${image}" alt="Muestra ${index + 1} de ${product.title}">
                <p>Muestra ${index + 1}</p>
            `;
            samplesGrid.appendChild(card);
        });
    }
}

if (window.location.pathname.includes('product-detail.html')) {
    loadProductDetail();
}

let currentServiceIndex = 0;
let serviceAutoRotateInterval = null;

function initServiceCarousel(images) {
    const track = document.getElementById('serviceCarouselTrack');
    const prevBtn = document.getElementById('prevImage');
    const nextBtn = document.getElementById('nextImage');

    if (!track) return;

    function updateCarousel() {
        track.style.transform = `translateX(-${currentServiceIndex * 100}%)`;
    }

    function nextImage() {
        currentServiceIndex = (currentServiceIndex + 1) % images.length;
        updateCarousel();
        restartServiceAutoRotate();
    }

    function prevImage() {
        currentServiceIndex = (currentServiceIndex - 1 + images.length) % images.length;
        updateCarousel();
        restartServiceAutoRotate();
    }

    function autoRotateService() {
        clearInterval(serviceAutoRotateInterval);
        serviceAutoRotateInterval = setInterval(() => {
            currentServiceIndex = (currentServiceIndex + 1) % images.length;
            updateCarousel();
        }, 4000);
    }

    function restartServiceAutoRotate() {
        clearInterval(serviceAutoRotateInterval);
        autoRotateService();
    }

    if (prevBtn) prevBtn.addEventListener('click', prevImage);
    if (nextBtn) nextBtn.addEventListener('click', nextImage);

    currentServiceIndex = 0;
    updateCarousel();
    autoRotateService();
}

function initServiceDetailPage() {
    const params = new URLSearchParams(window.location.search);
    const serviceId = parseInt(params.get('service'), 10);
    const service = serviceDetails.find(item => item.id === serviceId) || serviceDetails[0];

    const titleEl = document.getElementById('serviceTitle');
    const descriptionEl = document.getElementById('serviceDescription');
    const carouselTrack = document.getElementById('serviceCarouselTrack');

    if (titleEl) titleEl.textContent = service.title;
    if (descriptionEl) descriptionEl.textContent = service.description;

    if (carouselTrack) {
        carouselTrack.innerHTML = '';
        service.images.forEach(image => {
            const slide = document.createElement('div');
            slide.className = 'carousel-slide';
            slide.style.backgroundImage = `url('${image}')`;
            carouselTrack.appendChild(slide);
        });
        initServiceCarousel(service.images);
    }
}

if (window.location.pathname.includes('service-detail.html')) {
    initServiceDetailPage();
}
