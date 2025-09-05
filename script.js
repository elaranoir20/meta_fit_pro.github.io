// Smooth scrolling function
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Add scroll animations
function addScrollAnimations() {
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

    // Observe all animated elements
    const animatedElements = document.querySelectorAll('.benefit-item, .problem-item, .testimonial-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Add hover effects to buttons
function addButtonEffects() {
    const buttons = document.querySelectorAll('.cta-button');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        button.addEventListener('click', function() {
            // Add click animation
            this.style.transform = 'translateY(-1px) scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'translateY(-3px) scale(1.05)';
            }, 150);
        });
    });
}

// Add floating animation to hero image
function addHeroImageAnimation() {
    const heroImage = document.querySelector('.hero-image img');
    if (heroImage) {
        let start = null;
        
        function animate(timestamp) {
            if (!start) start = timestamp;
            const progress = timestamp - start;
            
            const offset = Math.sin(progress * 0.002) * 10;
            heroImage.style.transform = `translateY(${offset}px)`;
            
            requestAnimationFrame(animate);
        }
        
        requestAnimationFrame(animate);
    }
}

// Add parallax effect to sections
function addParallaxEffect() {
    const hero = document.querySelector('.hero');
    const heroHeight = hero.offsetHeight;

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;

        if (scrolled < heroHeight) {
            const speed = 0.5;
            hero.style.transform = `translateY(${scrolled * speed}px)`;
        } else {
            hero.style.transform = 'none';
            hero.classList.add('hero-scrolled');
        }

        if (scrolled === 0) {
            hero.classList.remove('hero-scrolled');
        }
    });
}

// Add loading animation
function addLoadingAnimation() {
    const elements = document.querySelectorAll('.hero-title, .hero-subtitle, .hero-description');
    
    elements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 200 + 500);
    });
}

// Add mobile menu functionality (if needed in future)
function toggleMobileMenu() {
    const menu = document.querySelector('.mobile-menu');
    if (menu) {
        menu.classList.toggle('active');
    }
}

// Add form validation (if forms are added later)
function validateForm(formElement) {
    const inputs = formElement.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.classList.add('error');
            isValid = false;
        } else {
            input.classList.remove('error');
        }
    });
    
    return isValid;
}

// Add countdown timer functionality (for urgency)
function addCountdownTimer(targetDate) {
    const timerElement = document.getElementById('countdown-timer');
    if (!timerElement) return;
    
    function updateTimer() {
        const now = new Date().getTime();
        const distance = targetDate - now;
        
        if (distance < 0) {
            timerElement.innerHTML = "OFERTA EXPIRADA";
            return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        timerElement.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }
    
    updateTimer();
    setInterval(updateTimer, 1000);
}

// Initialize all animations when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    addScrollAnimations();
    addButtonEffects();
    addHeroImageAnimation();
    addParallaxEffect();
    addLoadingAnimation();
    
    // Add click tracking for analytics (placeholder)
    const ctaButtons = document.querySelectorAll('.cta-button');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            console.log('CTA button clicked');
            // Removido o alerta, pois o redirecionamento é feito pelo HTML
        });
    });

    // Add countdown timer for urgency
    addCountdownTimer(new Date('2025-09-08').getTime());
});
