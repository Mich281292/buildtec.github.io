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
        title: 'Modernización de Terracerías',
        description: 'Ampliación de terracerías, pavimentación, obras de drenaje y señalización vial.',
        images: ['icarsa1.png', 'icarsa2.png', 'icarsa3.png']
    },
    {
        id: 1,
        title: 'Sistema de control y disposición de agua pluvial',
        description: 'Excavaciones a cielo abierto, movimiento de grandes volumenes de material, estabilización de arcilla, concretos lanzados, pisos de concreto, obra de toma, obra de desfogue y obra de control.',
        images: ['icarsa4.png', 'icarsa5.png', 'icarsa6.png']
    },
    {
        id: 2,
        title: 'Vialidades y plataformas',
        description: 'Cortes de terreno, estabilización de suelo, rellenos, terraplanes y plataformas, línea de alcantarillado, descargas domiciliarias, línea de agua potable, vialidad en nivel base, banquetas y guarniciones.',
        images: ['icarsa7.png', 'icarsa8.png', 'icarsa9.png']
    },
    {
        id: 3,
        title: 'Construcción de edificio comercial y de servicios',
        description: 'Construcción de edificio de 3 pisos con acabados de calidad y estructuras resistentes.',
        images: ['icarsa10.png', 'icarsa11.png', 'icarsa12.png']
    },
    {
        id: 4,
        title: 'Red de agua potable',
        description: 'Red de agua potable, alcantarillado, base y sub-base, guarniciones y banquetas.',
        images: ['icarsa2.png', 'icarsa5.png', 'icarsa8.png']
    },
    {
        id: 5,
        title: 'Limpieza de colector sanitario',
        description: 'Limpieza total de colectores sanitarios para garantizar un sistema sanitario seguro y eficiente.',
        images: ['icarsa3.png', 'icarsa9.png', 'icarsa13.png']
    }
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

function initServiceDetailPage() {
    const detailRoot = document.getElementById('serviceDetailContent');
    if (!detailRoot) return;

    const params = new URLSearchParams(window.location.search);
    const serviceId = parseInt(params.get('service'), 10);
    const service = serviceDetails.find(item => item.id === serviceId);

    const titleElement = document.getElementById('detailTitle');
    const descriptionElement = document.getElementById('detailDescription');
    const imageElement = document.getElementById('carouselImage');
    const thumbnailsContainer = document.getElementById('carouselThumbnails');
    const prevButton = document.getElementById('carouselPrev');
    const nextButton = document.getElementById('carouselNext');
    const backLink = document.getElementById('backToServices');

    if (!service || !titleElement || !descriptionElement || !imageElement || !thumbnailsContainer) {
        detailRoot.innerHTML = `
            <div class="service-detail-not-found">
                <h2>Servicio no encontrado</h2>
                <p>Lo sentimos, la información del servicio solicitado no está disponible.</p>
                <a class="btn btn-secondary" href="index.html#servicios">Regresar a servicios</a>
            </div>
        `;
        return;
    }

    titleElement.textContent = service.title;
    descriptionElement.textContent = service.description;

    let currentSlide = 0;

    const renderCarousel = () => {
        const imageSrc = service.images[currentSlide];
        imageElement.src = imageSrc;
        imageElement.alt = `${service.title} imagen ${currentSlide + 1}`;

        thumbnailsContainer.innerHTML = '';
        service.images.forEach((src, index) => {
            const thumb = document.createElement('button');
            thumb.type = 'button';
            thumb.className = 'carousel-thumb';
            if (index === currentSlide) thumb.classList.add('active');
            thumb.innerHTML = `<img src="${src}" alt="${service.title} miniatura ${index + 1}" />`;
            thumb.addEventListener('click', () => {
                currentSlide = index;
                renderCarousel();
            });
            thumbnailsContainer.appendChild(thumb);
        });
    };

    if (prevButton) {
        prevButton.addEventListener('click', () => {
            currentSlide = (currentSlide - 1 + service.images.length) % service.images.length;
            renderCarousel();
        });
    }

    if (nextButton) {
        nextButton.addEventListener('click', () => {
            currentSlide = (currentSlide + 1) % service.images.length;
            renderCarousel();
        });
    }

    if (backLink) {
        backLink.addEventListener('click', () => {
            window.location.href = 'index.html#servicios';
        });
    }

    renderCarousel();
}

initServiceDetailPage();

// Diamond Image Rotation
const heroDiamond = document.querySelector('.hero-diamond');
const images = [
    'icarsa1.png',
    'icarsa2.png',
    'icarsa3.png',
    'icarsa4.png',
    'icarsa5.png',
    'icarsa6.png',
    'icarsa7.png',
    'icarsa8.png',
    'icarsa9.png',
    'icarsa10.png',
    'icarsa11.png',
    'icarsa12.png',
    'icarsa13.png'
];

let currentImageIndex = 0;

// Preload all images
function preloadImages() {
    images.forEach(imageSrc => {
        const img = new Image();
        img.src = imageSrc;
    });
}

// Initialize preload on page load
window.addEventListener('load', preloadImages);

function rotateHeroDiamondImage() {
    // Crear una imagen temporal para el fade
    const tempImg = document.createElement('div');
    tempImg.style.backgroundImage = `url('${images[(currentImageIndex + 1) % images.length]}')`;
    tempImg.style.backgroundSize = 'cover';
    tempImg.style.backgroundPosition = 'center';
    tempImg.style.position = 'absolute';
    tempImg.style.top = '0';
    tempImg.style.left = '0';
    tempImg.style.width = '100%';
    tempImg.style.height = '100%';
    tempImg.style.opacity = '0';
    tempImg.style.transition = 'opacity 0.8s ease';
    tempImg.style.zIndex = '10';
    heroDiamond.appendChild(tempImg);
    setTimeout(() => {
        tempImg.style.opacity = '1';
        setTimeout(() => {
            currentImageIndex = (currentImageIndex + 1) % images.length;
            heroDiamond.style.backgroundImage = `url('${images[currentImageIndex]}')`;
            heroDiamond.removeChild(tempImg);
        }, 800);
    }, 10);
}

// Auto-rotate interval reference
let autoRotateInterval = setInterval(rotateHeroDiamondImage, 6000);

// Function to restart the auto-rotate timer
function restartAutoRotate() {
    clearInterval(autoRotateInterval);
    autoRotateInterval = setInterval(rotateHeroDiamondImage, 6000);
}

// Arrow navigation
const prevBtn = document.getElementById('prevImage');
const nextBtn = document.getElementById('nextImage');

prevBtn.addEventListener('click', () => {
    const nextIndex = (currentImageIndex - 1 + images.length) % images.length;
    const tempImg = document.createElement('div');
    tempImg.style.backgroundImage = `url('${images[nextIndex]}')`;
    tempImg.style.backgroundSize = 'cover';
    tempImg.style.backgroundPosition = 'center';
    tempImg.style.position = 'absolute';
    tempImg.style.top = '0';
    tempImg.style.left = '0';
    tempImg.style.width = '100%';
    tempImg.style.height = '100%';
    tempImg.style.opacity = '0';
    tempImg.style.transition = 'opacity 0.8s ease';
    tempImg.style.zIndex = '10';
    heroDiamond.appendChild(tempImg);
    setTimeout(() => {
        tempImg.style.opacity = '1';
        setTimeout(() => {
            currentImageIndex = nextIndex;
            heroDiamond.style.backgroundImage = `url('${images[currentImageIndex]}')`;
            heroDiamond.removeChild(tempImg);
        }, 800);
    }, 10);
    restartAutoRotate();
});

nextBtn.addEventListener('click', () => {
    rotateHeroDiamondImage();
    
    // Restart the 6-second counter
    restartAutoRotate();
});

// Form Submission
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const subject = contactForm.querySelectorAll('input[type="text"]')[1].value;
        const message = contactForm.querySelector('textarea').value;
        
        // Create mailto link
        const mailtoLink = `mailto:info@icarsa.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Nombre: ${name}\nEmail: ${email}\n\n${message}`)}`;
        
        // Show success message
        showNotification('¡Mensaje enviado! Nos pondremos en contacto pronto.', 'success');
        
        // Reset form
        contactForm.reset();
        
        // Optional: Uncomment to actually send email
        // window.location.href = mailtoLink;
    });
}

// Notification Function
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Add styles for notification
    const style = document.createElement('style');
    if (!document.querySelector('style[data-notification]')) {
        style.setAttribute('data-notification', 'true');
        style.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 15px 25px;
                border-radius: 5px;
                color: white;
                font-weight: 500;
                z-index: 2000;
                animation: slideIn 0.3s ease-out;
            }
            
            .notification.success {
                background: #10b981;
            }
            
            .notification.error {
                background: #ef4444;
            }
            
            @keyframes slideIn {
                from {
                    transform: translateX(400px);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        notification.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Hero button functionality
document.querySelector('.btn-primary').addEventListener('click', () => {
    document.getElementById('servicios').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all service and product cards
document.querySelectorAll('.service-card, .product-card, .stat').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
});

// Scroll-based navbar shadow
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 10) {
        navbar.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    }
});

// Contact bar behavior: close/hide and call action
document.addEventListener('DOMContentLoaded', () => {
    const contactBar = document.getElementById('contactBar');
    const contactTab = document.getElementById('contactTab');
    const closeContact = document.getElementById('closeContact');
    const callBtn = document.getElementById('callBtn');

    // Add body class to push content below the top bar
    document.body.classList.add('has-top-contact');

    // Hide bar if user closed it earlier in this session
    try {
        if (sessionStorage.getItem('contactBarClosed') === '1') {
            if (contactBar) contactBar.style.display = 'none';
            if (contactTab) contactTab.classList.add('show');
            document.body.classList.remove('has-top-contact');
        }
    } catch (e) { /* ignore */ }

    if (closeContact) {
        closeContact.addEventListener('click', () => {
            if (contactBar) contactBar.style.display = 'none';
            if (contactTab) contactTab.classList.add('show');
            document.body.classList.remove('has-top-contact');
            try { sessionStorage.setItem('contactBarClosed', '1'); } catch (e) {}
        });
    }

    // Show bar when tab is clicked
    if (contactTab) {
        contactTab.addEventListener('click', () => {
            if (contactBar) contactBar.style.display = 'flex';
            if (contactTab) contactTab.classList.remove('show');
            document.body.classList.add('has-top-contact');
            try { sessionStorage.removeItem('contactBarClosed'); } catch (e) {}
        });

        // Also handle keyboard Enter/Space
        contactTab.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                contactTab.click();
            }
        });
    }

    const callBtnRight = document.getElementById('callBtnRight');
    if (callBtnRight) {
        callBtnRight.addEventListener('click', () => {
            // Open dialer on supported devices; fallback to tel link
            window.location.href = 'tel:+525512345678';
        });
    }
});
