// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Glitch effect for text elements with data-text attribute
function initGlitchEffect(element) {
    const text = element.getAttribute('data-text');
    let glitchInterval;

    function startGlitch() {
        const glitchChars = '!<>-_\\/[]{}—=+*^?#________';
        let iterations = 0;
        clearInterval(glitchInterval);
        
        glitchInterval = setInterval(() => {
            element.textContent = text
                .split('')
                .map((letter, index) => {
                    if (index < iterations) {
                        return text[index];
                    }
                    return glitchChars[Math.floor(Math.random() * glitchChars.length)];
                })
                .join('');
            
            if (iterations >= text.length) {
                clearInterval(glitchInterval);
            }
            
            iterations += 1/3;
        }, 30);
    }

    element.addEventListener('mouseover', startGlitch);
}

// Apply glitch effect to all elements with data-text attribute
document.querySelectorAll('[data-text]').forEach(initGlitchEffect);

// Form handling with pixel effect feedback
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Create pixel explosion effect
    const button = this.querySelector('button');
    const buttonRect = button.getBoundingClientRect();
    const pixels = 20;
    
    for (let i = 0; i < pixels; i++) {
        const pixel = document.createElement('div');
        pixel.className = 'pixel-dust';
        pixel.style.backgroundColor = getComputedStyle(document.documentElement)
            .getPropertyValue('--accent').trim();
        
        const angle = (i / pixels) * Math.PI * 2;
        const velocity = 2 + Math.random() * 2;
        const x = buttonRect.left + buttonRect.width / 2;
        const y = buttonRect.top + buttonRect.height / 2;
        
        pixel.style.left = x + 'px';
        pixel.style.top = y + 'px';
        
        document.body.appendChild(pixel);
        
        const animation = pixel.animate([
            { transform: 'translate(0, 0) scale(1)', opacity: 1 },
            {
                transform: `translate(${Math.cos(angle) * 100 * velocity}px, 
                           ${Math.sin(angle) * 100 * velocity}px) scale(0)`,
                opacity: 0
            }
        ], {
            duration: 1000,
            easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
        });
        
        animation.onfinish = () => pixel.remove();
    }
    
    // Show success message
    alert('Thanks for your message! This is a demo form.');
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections and their children
document.querySelectorAll('.pixel-section, .skill-item, .project-card').forEach(section => {
    section.classList.add('hidden');
    observer.observe(section);
});

// Pixel dust cursor effect
function createPixelDust(e) {
    const dust = document.createElement('div');
    dust.className = 'pixel-dust';
    
    // Random color from CSS variables
    const colors = ['--primary', '--secondary', '--accent'];
    const randomColor = getComputedStyle(document.documentElement)
        .getPropertyValue(colors[Math.floor(Math.random() * colors.length)])
        .trim();
    
    dust.style.backgroundColor = randomColor;
    dust.style.left = e.pageX + 'px';
    dust.style.top = e.pageY + 'px';
    
    document.body.appendChild(dust);
    
    // Random direction
    const angle = Math.random() * Math.PI * 2;
    const velocity = 1 + Math.random() * 2;
    const distance = 20 + Math.random() * 30;
    
    dust.animate([
        { transform: 'translate(0, 0) scale(1)', opacity: 1 },
        {
            transform: `translate(${Math.cos(angle) * distance}px, 
                       ${Math.sin(angle) * distance}px) scale(0)`,
            opacity: 0
        }
    ], {
        duration: 600,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
    }).onfinish = () => dust.remove();
}

// Create dust effect on mouse move (throttled)
let lastDustTime = 0;
document.addEventListener('mousemove', (e) => {
    const now = performance.now();
    if (now - lastDustTime > 50 && Math.random() < 0.1) { // Throttle to max 20fps and 10% chance
        lastDustTime = now;
        createPixelDust(e);
    }
});

// Add floating animation to decorative elements
function initFloatingAnimation(element, delay = 0) {
    element.animate([
        { transform: 'translateY(0)' },
        { transform: 'translateY(-10px)' },
        { transform: 'translateY(0)' }
    ], {
        duration: 3000,
        delay: delay,
        iterations: Infinity,
        easing: 'ease-in-out'
    });
}

// Apply floating animation to decorative elements
document.querySelectorAll('.pixel-star, .pixel-cube').forEach((element, index) => {
    initFloatingAnimation(element, index * 500);
}); 