// Module toggle functionality
function toggleModule(index) {
    const moduleItems = document.querySelectorAll('.module-item');
    const moduleItem = moduleItems[index];
    const content = moduleItem.querySelector('.module-content');
    const toggle = moduleItem.querySelector('.module-toggle');
    
    // Close all other modules first
    moduleItems.forEach((item, i) => {
        if (i !== index) {
            const otherContent = item.querySelector('.module-content');
            const otherToggle = item.querySelector('.module-toggle');
            otherContent.classList.remove('active');
            otherToggle.textContent = '+';
            otherToggle.style.transform = 'rotate(0deg)';
        }
    });
    
    // Toggle current module
    if (content.classList.contains('active')) {
        content.classList.remove('active');
        toggle.textContent = '+';
        toggle.style.transform = 'rotate(0deg)';
    } else {
        content.classList.add('active');
        toggle.textContent = '−';
        toggle.style.transform = 'rotate(180deg)';
    }
}

// Smooth scroll to section
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Enhanced button hover effects
function addButtonEffects() {
    const buttons = document.querySelectorAll('.audience-btn, .benefit-btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.05)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Glitch effect for hero title
function addGlitchEffect() {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        
        setInterval(() => {
            if (Math.random() < 0.1) { // 10% chance every interval
                const glitchChars = '!@#$%^&*()_+{}|:"<>?[]\\;\'.,/~`';
                const textArray = originalText.split('');
                const randomIndex = Math.floor(Math.random() * textArray.length);
                const randomChar = glitchChars[Math.floor(Math.random() * glitchChars.length)];
                
                textArray[randomIndex] = randomChar;
                heroTitle.textContent = textArray.join('');
                
                setTimeout(() => {
                    heroTitle.textContent = originalText;
                }, 100);
            }
        }, 2000);
    }
}

// Typing effect for hero subtitle
function addTypingEffect() {
    const subtitle = document.querySelector('.hero-subtitle');
    if (subtitle) {
        const text = subtitle.textContent;
        subtitle.textContent = '';
        let i = 0;
        
        const typeWriter = () => {
            if (i < text.length) {
                subtitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 30);
            }
        };
        
        // Start typing after a short delay
        setTimeout(typeWriter, 1000);
    }
}

// Intersection Observer for animations
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
    
    // Observe all cards and items
    const elementsToAnimate = document.querySelectorAll(
        '.problem-card, .audience-btn, .benefit-btn, .module-item, .process-item, .result-item, .testimonial-card, .pricing-card, .investment-item'
    );
    
    elementsToAnimate.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// Cyber loading effect
function addCyberLoading() {
    const loadingOverlay = document.createElement('div');
    loadingOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: var(--cyber-darker);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        flex-direction: column;
    `;
    
    const loadingText = document.createElement('div');
    loadingText.textContent = 'ЗАГРУЗКА...';
    loadingText.style.cssText = `
        color: var(--cyber-blue);
        font-size: 2rem;
        font-weight: bold;
        text-shadow: 0 0 20px var(--cyber-glow);
        animation: pulse 1s ease-in-out infinite;
    `;
    
    const loadingBar = document.createElement('div');
    loadingBar.style.cssText = `
        width: 300px;
        height: 4px;
        background: rgba(0, 255, 255, 0.2);
        border-radius: 2px;
        margin-top: 20px;
        overflow: hidden;
    `;
    
    const loadingProgress = document.createElement('div');
    loadingProgress.style.cssText = `
        width: 0%;
        height: 100%;
        background: var(--cyber-blue);
        box-shadow: 0 0 10px var(--cyber-glow);
        transition: width 0.3s ease;
    `;
    
    loadingBar.appendChild(loadingProgress);
    loadingOverlay.appendChild(loadingText);
    loadingOverlay.appendChild(loadingBar);
    document.body.appendChild(loadingOverlay);
    
    // Simulate loading
    let progress = 0;
    const loadingInterval = setInterval(() => {
        progress += Math.random() * 20;
        if (progress >= 100) {
            progress = 100;
            clearInterval(loadingInterval);
            
            setTimeout(() => {
                loadingOverlay.style.opacity = '0';
                loadingOverlay.style.transition = 'opacity 0.5s ease';
                
                setTimeout(() => {
                    document.body.removeChild(loadingOverlay);
                    // Start other animations after loading is complete
                    addTypingEffect();
                    addScrollAnimations();
                }, 500);
            }, 500);
        }
        loadingProgress.style.width = `${progress}%`;
    }, 100);
}

// Matrix rain effect (lightweight)
function addMatrixEffect() {
    const canvas = document.createElement('canvas');
    canvas.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
        opacity: 0.1;
    `;
    
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const columns = Math.floor(canvas.width / 20);
    const drops = new Array(columns).fill(1);
    
    function draw() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#00ff00';
        ctx.font = '15px monospace';
        
        for (let i = 0; i < drops.length; i++) {
            const text = String.fromCharCode(Math.random() * 128);
            ctx.fillText(text, i * 20, drops[i] * 20);
            
            if (drops[i] * 20 > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    
    setInterval(draw, 33);
    
    // Resize handler
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Enhanced CTA button pulse effect
function addCTAPulse() {
    const ctaButtons = document.querySelectorAll('.cta-button');
    
    ctaButtons.forEach(button => {
        setInterval(() => {
            button.style.boxShadow = '0 0 30px rgba(0, 255, 255, 0.6)';
            setTimeout(() => {
                button.style.boxShadow = '0 10px 30px rgba(0, 255, 255, 0.4)';
            }, 500);
        }, 3000);
    });
}

// Mobile touch enhancements
function addMobileEnhancements() {
    if ('ontouchstart' in window) {
        const touchElements = document.querySelectorAll('.btn, .problem-card, .audience-btn, .benefit-btn, .module-header, .testimonial-card, .pricing-card');
        
        touchElements.forEach(element => {
            element.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.95)';
            });
            
            element.addEventListener('touchend', function() {
                this.style.transform = '';
            });
        });
    }
}

// Fix contact buttons functionality
function fixContactButtons() {
    const contactButtons = document.querySelectorAll('.contact-btn');
    
    contactButtons.forEach(button => {
        // Remove any existing event listeners
        button.removeEventListener('click', handleContactClick);
        
        // Add proper click handling
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get the href attribute
            const href = this.getAttribute('href');
            
            if (href) {
                // Open in new tab
                window.open(href, '_blank');
            }
        });
    });
}

// Handle contact button clicks
function handleContactClick(e) {
    e.preventDefault();
    const href = this.getAttribute('href');
    if (href) {
        window.open(href, '_blank');
    }
}

// Ensure all external links open in new tab
function setupExternalLinks() {
    const externalLinks = document.querySelectorAll('a[href^="http"], a[href^="https://"], a[href^="t.me"], a[href^="vk.com"], a[href^="wa.me"]');
    
    externalLinks.forEach(link => {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
    });
}

// Initialize all effects when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add cyber loading effect
    addCyberLoading();
    
    // Add other effects
    addButtonEffects();
    addGlitchEffect();
    addCTAPulse();
    addMobileEnhancements();
    
    // Fix contact buttons
    fixContactButtons();
    
    // Setup external links
    setupExternalLinks();
    
    // Add matrix effect only on desktop for performance
    if (window.innerWidth > 768) {
        addMatrixEffect();
    }
    
    // Smooth scroll for all anchor links
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
});

// Performance optimization: throttle scroll events
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add scroll effects with throttling
window.addEventListener('scroll', throttle(() => {
    const scrolled = window.pageYOffset;
    const heroGlow = document.querySelector('.hero-glow');
    
    if (heroGlow) {
        heroGlow.style.transform = `translate(-50%, -50%) scale(${1 + scrolled * 0.001})`;
        heroGlow.style.opacity = Math.max(0.3, 1 - scrolled * 0.001);
    }
}, 16));

// Error handling for missing elements
window.addEventListener('error', function(e) {
    console.warn('Non-critical error:', e.message);
});

// Preload images for better performance
function preloadImages() {
    const imageUrls = [
        'https://user-gen-media-assets.s3.amazonaws.com/gpt4o_images/9c9b30e2-6f39-41bf-a53c-4faff580cb6d.png',
        'https://user-gen-media-assets.s3.amazonaws.com/gpt4o_images/35910249-ef99-4fd1-b409-9e76f7474cca.png',
        'https://user-gen-media-assets.s3.amazonaws.com/gpt4o_images/370a487b-c73b-443e-8a79-1553a4f966b9.png',
        'https://user-gen-media-assets.s3.amazonaws.com/gpt4o_images/efa97678-7e9f-4506-9eaf-a68510567f3b.png',
        'https://user-gen-media-assets.s3.amazonaws.com/gpt4o_images/852eeda7-e068-42d9-ad47-d70979b973a4.png',
        'https://user-gen-media-assets.s3.amazonaws.com/gpt4o_images/268fe555-4e7d-4eb3-81e5-2f4219a63dee.png'
    ];
    
    imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
    });
}

// Enhanced mobile experience
function enhanceMobileExperience() {
    // Add mobile-specific optimizations
    if (window.innerWidth <= 768) {
        // Disable matrix effect on mobile
        const canvas = document.querySelector('canvas');
        if (canvas) {
            canvas.style.display = 'none';
        }
        
        // Add touch feedback
        const touchElements = document.querySelectorAll('.btn, .audience-btn, .benefit-btn, .contact-btn');
        touchElements.forEach(element => {
            element.addEventListener('touchstart', function() {
                this.style.background = 'rgba(0, 255, 255, 0.3)';
            });
            
            element.addEventListener('touchend', function() {
                setTimeout(() => {
                    this.style.background = '';
                }, 150);
            });
        });
    }
}

// Start preloading images and mobile enhancements
preloadImages();

// Window load event for final optimizations
window.addEventListener('load', function() {
    enhanceMobileExperience();
    
    // Optimize images loading
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        if (img.complete) {
            img.style.opacity = '1';
        } else {
            img.addEventListener('load', function() {
                this.style.opacity = '1';
            });
        }
    });
});

// Ensure contact buttons work after page load
window.addEventListener('load', function() {
    setTimeout(() => {
        fixContactButtons();
    }, 1000);
});