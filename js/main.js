document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    const preloader = document.querySelector('.preloader');
    window.addEventListener('load', function() {
        setTimeout(() => {
            preloader.classList.add('fade-out');
        }, 1000);
    });

    // Custom Cursor
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-dot-outline');

    window.addEventListener('mousemove', function(e) {
        const posX = e.clientX;
        const posY = e.clientY;

        cursorDot.style.opacity = '1';
        cursorOutline.style.opacity = '1';
        
        cursorDot.style.transform = `translate3d(${posX}px, ${posY}px, 0)`;
        cursorOutline.style.transform = `translate3d(${posX}px, ${posY}px, 0)`;
    });

    // Add hover effect to links and buttons
    const hoverElements = document.querySelectorAll('a, button, .menu-tab, .gallery-item, .menu-item, .social-icon');
    
    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            cursorDot.style.transform = 'translate(-50%, -50%) scale(0.5)';
            cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursorOutline.style.backgroundColor = 'rgba(255, 107, 107, 0.3)';
        });
        
        element.addEventListener('mouseleave', function() {
            cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorOutline.style.backgroundColor = 'rgba(255, 107, 107, 0.2)';
        });
    });

    // Hide cursor when leaving window
    document.addEventListener('mouseleave', function() {
        cursorDot.style.opacity = '0';
        cursorOutline.style.opacity = '0';
    });

    document.addEventListener('mouseenter', function() {
        cursorDot.style.opacity = '1';
        cursorOutline.style.opacity = '1';
    });

    // Cookie Consent
    const cookieConsent = document.getElementById('cookieConsent');
    const acceptCookies = document.getElementById('acceptCookies');
    const declineCookies = document.getElementById('declineCookies');
    const closeCookies = document.getElementById('closeCookies');

    // Check if user has already made a choice
    if (!localStorage.getItem('cookiesAccepted')) {
        setTimeout(() => {
            cookieConsent.classList.add('show');
        }, 2000);
    }

    acceptCookies.addEventListener('click', function() {
        localStorage.setItem('cookiesAccepted', 'true');
        cookieConsent.classList.remove('show');
    });

    declineCookies.addEventListener('click', function() {
        localStorage.setItem('cookiesAccepted', 'false');
        cookieConsent.classList.remove('show');
    });

    closeCookies.addEventListener('click', function() {
        cookieConsent.classList.remove('show');
    });

    // Navigation Toggle
    const navToggle = document.getElementById('navToggle');
    const fullscreenMenu = document.getElementById('fullscreenMenu');
    
    navToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        fullscreenMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });

    // Add animation delay to menu links
    const menuLinks = document.querySelectorAll('.menu-link');
    menuLinks.forEach((link, index) => {
        link.style.setProperty('--i', index + 1);
        
        link.addEventListener('click', function() {
            navToggle.classList.remove('active');
            fullscreenMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });

    // Parallax Effect
    const parallaxElements = document.querySelectorAll('[data-speed]');
    
    window.addEventListener('scroll', function() {
        parallaxElements.forEach(element => {
            const speed = element.getAttribute('data-speed');
            const yPos = -(window.scrollY * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });

    // Header Scroll Effect
    const header = document.querySelector('.main-nav');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Menu Tabs
    const menuTabs = document.querySelectorAll('.menu-tab');
    const menuCategories = document.querySelectorAll('.menu-category');
    
    menuTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            menuTabs.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Hide all categories
            menuCategories.forEach(category => {
                category.classList.remove('active');
            });
            
            // Show selected category
            const categoryId = this.getAttribute('data-category');
            document.getElementById(categoryId).classList.add('active');
        });
    });

    // Testimonials Slider
    const testimonialsTrack = document.querySelector('.testimonials-track');
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const prevButton = document.getElementById('prevTestimonial');
    const nextButton = document.getElementById('nextTestimonial');
    const dots = document.querySelectorAll('.dot');
    
    let currentIndex = 0;
    const slideWidth = 100; // 100%
    
    function goToSlide(index) {
        if (index < 0) {
            index = testimonialSlides.length - 1;
        } else if (index >= testimonialSlides.length) {
            index = 0;
        }
        
        currentIndex = index;
        testimonialsTrack.style.transform = `translateX(-${slideWidth * currentIndex}%)`;
        
        // Update dots
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
    }
    
    prevButton.addEventListener('click', () => {
        goToSlide(currentIndex - 1);
    });
    
    nextButton.addEventListener('click', () => {
        goToSlide(currentIndex + 1);
    });
    
    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            goToSlide(i);
        });
    });
    
    // Auto slide
    let slideInterval = setInterval(() => {
        goToSlide(currentIndex + 1);
    }, 5000);
    
    // Pause auto slide on hover
    const testimonialSlider = document.getElementById('testimonialsSlider');
    
    testimonialSlider.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });
    
    testimonialSlider.addEventListener('mouseleave', () => {
        slideInterval = setInterval(() => {
            goToSlide(currentIndex + 1);
        }, 5000);
    });

    // Reservation Form
    const reservationForm = document.getElementById('reservationForm');
    
    if (reservationForm) {
        reservationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formDataObj = {};
            formData.forEach((value, key) => {
                formDataObj[key] = value;
            });
            
            // Here you would typically send the data to a server
            // For demo purposes, we'll just show an alert
            alert('Grazie per la tua prenotazione! Ti contatteremo presto per confermare.');
            this.reset();
        });
    }

    // Newsletter Form
    const newsletterForm = document.getElementById('newsletterForm');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Here you would typically send the data to a server
            // For demo purposes, we'll just show an alert
            alert('Grazie per esserti iscritto alla nostra newsletter!');
            this.reset();
        });
    }

    // Back to Top Button
    const backToTop = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTop.classList.add('active');
        } else {
            backToTop.classList.remove('active');
        }
    });
    
    backToTop.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Animate elements on scroll
    const animateElements = document.querySelectorAll('.menu-item, .specialty-card, .gallery-item');
    
    function checkScroll() {
        animateElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight * 0.8) {
                element.classList.add('animate');
            }
        });
    }
    
    window.addEventListener('scroll', checkScroll);
    checkScroll(); // Check on load

    // Particles animation for hero section
    const heroParticles = document.querySelector('.hero-particles');
    
    function createParticles() {
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('span');
            particle.classList.add('particle');
            
            // Random position, size and animation duration
            const size = Math.random() * 5 + 1;
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            const duration = Math.random() * 20 + 10;
            const delay = Math.random() * 5;
            
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${posX}%`;
            particle.style.top = `${posY}%`;
            particle.style.animationDuration = `${duration}s`;
            particle.style.animationDelay = `${delay}s`;
            
            heroParticles.appendChild(particle);
        }
    }
    
    createParticles();

    // Set minimum date for reservation to today
    const dateInput = document.getElementById('date');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
    }

    // Add CSS for particles that was missing
    const style = document.createElement('style');
    style.textContent = `
        .particle {
            position: absolute;
            background-color: rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            pointer-events: none;
            animation: float infinite linear;
        }
        
        @keyframes float {
            0% {
                transform: translateY(0) translateX(0);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100vh) translateX(100px);
                opacity: 0;
            }
        }
        
        .menu-item, .specialty-card, .gallery-item {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .menu-item.animate, .specialty-card.animate, .gallery-item.animate {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
});