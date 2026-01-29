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

// Diamond Image Rotation
const heroDiamond = document.querySelector('.hero-diamond');
const images = [
    'icarsa1.jpeg',
    'icarsa2.jpeg',
    'icarsa3.jpeg',
    'icarsa4.jpeg',
    'icarsa5.jpeg',
    'icarsa6.jpeg',
    'icarsa7.jpeg',
    'icarsa8.jpeg',
    'icarsa9.jpeg',
    'icarsa10.jpeg',
    'icarsa11.jpeg',
    'icarsa12.jpeg',
    'icarsa13.jpeg'
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
    // Add fade-out animation
    heroDiamond.classList.add('fade-transition');
    
    // Change image during fade
    setTimeout(() => {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        heroDiamond.style.backgroundImage = `url('${images[currentImageIndex]}')`;
        
        // Remove animation class for next iteration
        heroDiamond.classList.remove('fade-transition');
    }, 50); // Reduced animation duration for imperceptible transition
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
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    heroDiamond.classList.add('fade-transition');
    
    setTimeout(() => {
        heroDiamond.style.backgroundImage = `url('${images[currentImageIndex]}')`;
        heroDiamond.classList.remove('fade-transition');
    }, 50);
    
    // Restart the 6-second counter
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
