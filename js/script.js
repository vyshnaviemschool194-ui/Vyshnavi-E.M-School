/* =============================================
   VYSHNAVI E.M SCHOOL - JAVASCRIPT
   ============================================= */

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initializeNavigation();
    initializeScrollEffects();
    initializeGalleryFilter();
    initializeContactForm();
    initializeAnimations();
});

/* =============================================
   NAVIGATION FUNCTIONS
   ============================================= */

function initializeNavigation() {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    }
    
    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Active navigation highlighting on scroll
    window.addEventListener('scroll', highlightActiveSection);
}

function highlightActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a');
    const headerHeight = document.querySelector('.header').offsetHeight;
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - headerHeight - 100;
        const sectionHeight = section.offsetHeight;
        
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
}

/* =============================================
   SCROLL EFFECTS
   ============================================= */

function initializeScrollEffects() {
    // Header background on scroll
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    });
    
    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const heroImage = hero.querySelector('.hero-image img');
            if (heroImage) {
                heroImage.style.transform = `translateY(${scrolled * 0.5}px)`;
            }
        });
    }
}

/* =============================================
   GALLERY FILTER
   ============================================= */

function initializeGalleryFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (filterButtons.length > 0 && galleryItems.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                this.classList.add('active');
                
                const filterValue = this.getAttribute('data-filter');
                
                galleryItems.forEach(item => {
                    if (filterValue === 'all') {
                        item.style.display = 'block';
                    } else {
                        const category = item.getAttribute('data-category');
                        if (category === filterValue) {
                            item.style.display = 'block';
                        } else {
                            item.style.display = 'none';
                        }
                    }
                });
            });
        });
    }
}

/* =============================================
   CONTACT FORM
   ============================================= */

function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Basic validation
            if (!validateForm(data)) {
                return;
            }
            
            // Simulate form submission
            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                // Show success message
                showNotification('Message sent successfully! We will get back to you soon.', 'success');
                
                // Reset form
                this.reset();
                
                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }
}

function validateForm(data) {
    // Name validation
    if (data.name.trim().length < 2) {
        showNotification('Please enter a valid name (at least 2 characters)', 'error');
        return false;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        showNotification('Please enter a valid email address', 'error');
        return false;
    }
    
    // Phone validation
    const phoneRegex = /^[\d\s-\+()]+$/;
    if (!phoneRegex.test(data.phone) || data.phone.replace(/\D/g, '').length < 10) {
        showNotification('Please enter a valid phone number (at least 10 digits)', 'error');
        return false;
    }
    
    // Subject validation
    if (!data.subject) {
        showNotification('Please select a subject', 'error');
        return false;
    }
    
    // Message validation
    if (data.message.trim().length < 10) {
        showNotification('Please enter a message (at least 10 characters)', 'error');
        return false;
    }
    
    return true;
}

/* =============================================
   ANIMATIONS
   ============================================= */

function initializeAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe elements with fade-in class
    const fadeElements = document.querySelectorAll('.fade-in, .highlight-card, .facility-card, .mission-card, .class-card, .subject-card, .contact-card, .gallery-item, .video-item');
    fadeElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
    
    // Counter animation for statistics
    const counters = document.querySelectorAll('.counter');
    if (counters.length > 0) {
        const counterObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        });
        
        counters.forEach(counter => {
            counterObserver.observe(counter);
        });
    }
}

function animateCounter(counter) {
    const target = parseInt(counter.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        counter.textContent = Math.floor(current);
    }, 16);
}

/* =============================================
   UTILITY FUNCTIONS
   ============================================= */

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        <span>${message}</span>
        <button class="notification-close">&times;</button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background-color: ${type === 'success' ? 'var(--success-color)' : 'var(--error-color)'};
        color: white;
        border-radius: 5px;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
        z-index: 9999;
        display: flex;
        align-items: center;
        gap: 10px;
        min-width: 300px;
        font-weight: 500;
    `;
    
    // Add to body
    document.body.appendChild(notification);
    
    // Add close functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        margin-left: auto;
    `;
    closeBtn.addEventListener('click', () => {
        notification.remove();
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

function openDirections() {
    // Open Google Maps with school location
    const schoolLocation = 'Ramachandrapuram';
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(schoolLocation)}`;
    window.open(url, '_blank');
}

/* =============================================
   LIGHTBOX FOR GALLERY
   ============================================= */

function initializeLightbox() {
    // Create lightbox container
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <img src="" alt="">
            <button class="lightbox-close">&times;</button>
            <button class="lightbox-nav lightbox-prev">&lt;</button>
            <button class="lightbox-nav lightbox-next">&gt;</button>
        </div>
    `;
    
    // Add styles
    lightbox.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.9);
        display: none;
        align-items: center;
        justify-content: center;
        z-index: 10000;
    `;
    
    const lightboxContent = lightbox.querySelector('.lightbox-content');
    lightboxContent.style.cssText = `
        position: relative;
        max-width: 90%;
        max-height: 90%;
    `;
    
    const lightboxImg = lightbox.querySelector('img');
    lightboxImg.style.cssText = `
        max-width: 100%;
        max-height: 80vh;
        object-fit: contain;
        border-radius: 10px;
    `;
    
    const closeBtn = lightbox.querySelector('.lightbox-close');
    closeBtn.style.cssText = `
        position: absolute;
        top: -40px;
        right: 0;
        background: none;
        border: none;
        color: white;
        font-size: 2rem;
        cursor: pointer;
    `;
    
    const navBtns = lightbox.querySelectorAll('.lightbox-nav');
    navBtns.forEach(btn => {
        btn.style.cssText = `
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            background: rgba(255, 255, 255, 0.2);
            border: none;
            color: white;
            font-size: 2rem;
            padding: 10px 15px;
            cursor: pointer;
            border-radius: 5px;
        `;
    });
    
    lightbox.querySelector('.lightbox-prev').style.left = '-50px';
    lightbox.querySelector('.lightbox-next').style.right = '-50px';
    
    // Add to body
    document.body.appendChild(lightbox);
    
    // Gallery functionality
    const galleryLinks = document.querySelectorAll('.gallery-link');
    let currentIndex = 0;
    let images = [];
    
    galleryLinks.forEach((link, index) => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get all gallery images
            images = Array.from(document.querySelectorAll('.gallery-item img')).map(img => ({
                src: img.src,
                alt: img.alt
            }));
            
            currentIndex = index;
            showLightbox();
        });
    });
    
    function showLightbox() {
        lightboxImg.src = images[currentIndex].src;
        lightboxImg.alt = images[currentIndex].alt;
        lightbox.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
    
    function hideLightbox() {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    function showPrev() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        showLightbox();
    }
    
    function showNext() {
        currentIndex = (currentIndex + 1) % images.length;
        showLightbox();
    }
    
    // Event listeners
    closeBtn.addEventListener('click', hideLightbox);
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            hideLightbox();
        }
    });
    
    lightbox.querySelector('.lightbox-prev').addEventListener('click', showPrev);
    lightbox.querySelector('.lightbox-next').addEventListener('click', showNext);
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (lightbox.style.display === 'flex') {
            if (e.key === 'Escape') {
                hideLightbox();
            } else if (e.key === 'ArrowLeft') {
                showPrev();
            } else if (e.key === 'ArrowRight') {
                showNext();
            }
        }
    });
}

// Initialize lightbox after DOM is loaded
document.addEventListener('DOMContentLoaded', initializeLightbox);

/* =============================================
   EXTERNAL API INTEGRATIONS
   ============================================= */

// Google Maps initialization (if needed)
function initGoogleMap() {
    // This function can be used to initialize custom Google Maps
    // For now, we're using embedded iframe which doesn't require JS
}

// YouTube API integration (if needed)
function loadYouTubeAPI() {
    // This function can be used to load YouTube API for custom video controls
    // For now, we're using embedded iframes
}

/* =============================================
   SERVICE WORKER FOR PWA (Optional)
   ============================================= */

// Uncomment the following code to make the website a Progressive Web App

/*
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(err) {
                console.log('ServiceWorker registration failed: ', err);
            });
    });
}
*/

/* =============================================
   DEBUG AND DEVELOPMENT HELPERS
   ============================================= */

// Console welcome message
console.log(`
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║   Vyshnavi E.M School Website                             ║
║   Empowering Young Minds With Quality Education          ║
║   Website loaded successfully!                           ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
`);

// Performance monitoring
if ('performance' in window) {
    window.addEventListener('load', function() {
        setTimeout(function() {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log('Page load time:', Math.round(perfData.loadEventEnd - perfData.loadEventStart), 'ms');
        }, 0);
    });
}
window.onload = function () {
  setTimeout(() => {
    document.getElementById("admissionPopup").style.display = "flex";
  }, 1500);
};

function closePopup() {
  document.getElementById("admissionPopup").style.display = "none";
}
