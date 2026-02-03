// DOM Elements
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const contactForm = document.getElementById('contact-form');
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.querySelector('.theme-icon');
const searchToggle = document.getElementById('search-toggle');
const searchBox = document.getElementById('search-box');
const searchInput = document.getElementById('search-input');
const searchClose = document.getElementById('search-close');
const whatsappFloat = document.getElementById('whatsapp-float');
const cvDownload = document.getElementById('cv-download');

// Theme Management
const getSystemTheme = () => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

const getSavedTheme = () => {
    return localStorage.getItem('theme') || getSystemTheme();
};

const setTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    
    if (theme === 'dark') {
        themeIcon.className = 'theme-icon fas fa-moon';
    } else {
        themeIcon.className = 'theme-icon fas fa-sun';
    }
};

// Initialize theme
setTheme(getSavedTheme());

// Set current year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Fixed stats - no auto increment to prevent reload issues
const updateStats = () => {
    // Keep stats fixed to prevent reload multiplication
    const experienceElement = document.querySelector('.stat-number[data-target="2"]');
    const projectsElement = document.querySelector('.stat-number[data-target="50"]');
    const clientsElement = document.querySelector('.stat-number[data-target="30"]');
    
    // Set reasonable fixed values
    if (experienceElement) experienceElement.setAttribute('data-target', '2');
    if (projectsElement) projectsElement.setAttribute('data-target', '55');
    if (clientsElement) clientsElement.setAttribute('data-target', '35');
};

// Initialize stats
updateStats();

// WhatsApp Integration
whatsappFloat.addEventListener('click', () => {
    const phoneNumber = '923136874679'; // Your WhatsApp number (without +)
    const message = encodeURIComponent(
        'Hi Hussain! I visited your portfolio website and would like to discuss a project with you.'
    );
    
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappURL, '_blank');
});

// Hide WhatsApp button during preloader
const hideWhatsAppDuringPreloader = () => {
    whatsappFloat.style.display = 'none';
    
    // Show after preloader completes
    setTimeout(() => {
        whatsappFloat.style.display = 'flex';
        
        // Add entrance animation
        setTimeout(() => {
            whatsappFloat.style.opacity = '1';
            whatsappFloat.style.transform = 'scale(1)';
        }, 100);
    }, 3000);
};

// Initialize WhatsApp button state
whatsappFloat.style.opacity = '0';
whatsappFloat.style.transform = 'scale(0.8)';
whatsappFloat.style.transition = 'all 0.3s ease';
hideWhatsAppDuringPreloader();

// CV Download Handler
cvDownload.addEventListener('click', (e) => {
    e.preventDefault();
    
    // Create a temporary link element
    const link = document.createElement('a');
    link.href = 'images/Hussain_Ahmed_Madni_CV.pdf';
    link.download = 'Hussain_Ahmed_Madni_CV.pdf';
    link.target = '_blank';
    
    // Append to body, click, and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Show notification
    showNotification('CV download started!', 'success');
});

// Preloader functionality
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    
    // Hide preloader after 2.5 seconds
    setTimeout(() => {
        preloader.classList.add('hidden');
        
        // Start hero animations after preloader starts hiding
        startHeroAnimations();
        
        // Remove preloader from DOM after transition
        setTimeout(() => {
            preloader.remove();
        }, 500);
    }, 2500);
});

// Hero animations function
const startHeroAnimations = () => {
    const titleLine = document.querySelector('.title-line');
    const titleName = document.querySelector('.title-name');
    const titleRole = document.querySelector('.title-role');
    const heroDescription = document.querySelector('.hero-description');
    const heroButtons = document.querySelector('.hero-buttons');
    
    // Animate Hi I'm
    setTimeout(() => {
        titleLine.style.opacity = '1';
        titleLine.style.visibility = 'visible';
        titleLine.style.transform = 'translateY(0)';
    }, 200);
    
    // Animate name with typing effect
    setTimeout(() => {
        titleName.style.opacity = '1';
        titleName.style.transform = 'perspective(800px) rotateY(-5deg) rotateX(5deg) translateY(0)';
        
        // Start typing animation
        const line1 = titleName.querySelector('.name-line-1');
        const line2 = titleName.querySelector('.name-line-2');
        
        if (line1 && line2) {
            line1.textContent = '';
            line2.textContent = '';
            
            setTimeout(() => {
                typeWriter(line1, 'Hussain', 100);
                setTimeout(() => {
                    typeWriter(line2, 'Ahmed Madni', 80);
                }, 800);
            }, 300);
        }
    }, 600);
    
    // Animate role
    setTimeout(() => {
        titleRole.style.opacity = '1';
        titleRole.style.transform = 'perspective(600px) rotateX(-5deg) rotateY(3deg) translateY(0)';
    }, 1200);
    
    // Animate description
    setTimeout(() => {
        heroDescription.style.opacity = '1';
        heroDescription.style.transform = 'translateY(0)';
    }, 1600);
    
    // Animate buttons
    setTimeout(() => {
        heroButtons.style.opacity = '1';
        heroButtons.style.transform = 'translateY(0)';
    }, 2000);
};

// Theme toggle event
themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
});

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
        setTheme(e.matches ? 'dark' : 'light');
    }
});

// Search functionality
searchToggle.addEventListener('click', () => {
    searchBox.classList.toggle('active');
    if (searchBox.classList.contains('active')) {
        searchInput.focus();
    }
});

searchClose.addEventListener('click', () => {
    searchBox.classList.remove('active');
    searchInput.value = '';
});

// Close search when clicking outside
document.addEventListener('click', (e) => {
    if (!searchToggle.contains(e.target) && !searchBox.contains(e.target)) {
        searchBox.classList.remove('active');
    }
});



// Search only on Enter key
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const query = e.target.value.toLowerCase().trim();
        
        if (query.length > 0) {
            const sections = {
                'home': 'home',
                'about': 'about', 
                'skills': 'skills',
                'projects': 'projects',
                'contact': 'contact',
                'portfolio': 'projects',
                'work': 'projects',
                'experience': 'about',
                'resume': 'about',
                'cv': 'about'
            };
            
            // Direct match or partial match
            let targetSection = sections[query];
            
            if (!targetSection) {
                // Find partial match
                for (let key in sections) {
                    if (key.includes(query) || query.includes(key)) {
                        targetSection = sections[key];
                        break;
                    }
                }
            }
            
            if (targetSection) {
                document.getElementById(targetSection).scrollIntoView({ behavior: 'smooth' });
                searchBox.classList.remove('active');
                searchInput.value = '';
            } else {
                // Show no results feedback
                searchInput.placeholder = 'No results found...';
                setTimeout(() => {
                    searchInput.placeholder = 'Search portfolio...';
                }, 2000);
            }
        }
    }
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on links
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Active navigation link highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// Animated counter for statistics
const animateCounters = () => {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const increment = Math.max(1, target / 100);
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current);
                setTimeout(updateCounter, Math.max(10, 2000 / target));
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    });
};

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            
            // Trigger counter animation for about section
            if (entry.target.classList.contains('about')) {
                animateCounters();
            }
        }
    });
}, observerOptions);

// Observe sections for animations
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Skill cards hover effect
const skillCards = document.querySelectorAll('.skill-category');
skillCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) rotateX(5deg)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) rotateX(0)';
    });
});

// Project cards 3D tilt effect
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
    });
});

// Contact form handling with n8n webhook
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    // Simple form validation
    if (!name || !email || !message) {
        showNotification('Please fill in all fields', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }
    
    // Show sending message
    const submitBtn = contactForm.querySelector('.btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // Send data to n8n webhook
    const webhookData = {
        name: name,
        email: email,
        message: message,
        timestamp: new Date().toISOString(),
        source: 'Portfolio Website'
    };
    
    fetch('https://mcrux.app.n8n.cloud/webhook/7b71d454-dd9e-4267-997c-1bbf805132b2', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(webhookData)
    })
    .then(response => {
        if (response.ok) {
            showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
            contactForm.reset();
        } else {
            throw new Error('Network response was not ok');
        }
    })
    .catch(error => {
        showNotification('Failed to send message. Please try again.', 'error');
        console.error('Webhook Error:', error);
    })
    .finally(() => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    });
});

// Email validation
const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// Notification system
const showNotification = (message, type) => {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Notification styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 2rem;
        border-radius: 10px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        ${type === 'success' ? 'background: #10b981;' : 'background: #ef4444;'}
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
};

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.floating-card');
    
    parallaxElements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.1);
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Typing animation for hero title
const typeWriter = (element, text, speed = 100) => {
    let i = 0;
    element.textContent = '';
    
    const type = () => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    };
    
    type();
};



// Smooth reveal animations for sections
const revealElements = document.querySelectorAll('.skill-category, .project-card, .contact-item');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    revealObserver.observe(element);
});

// Dynamic background particles
const createParticles = () => {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    particlesContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
    `;
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(99, 102, 241, 0.3);
            border-radius: 50%;
            animation: float ${5 + Math.random() * 10}s linear infinite;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 5}s;
        `;
        particlesContainer.appendChild(particle);
    }
    
    document.body.appendChild(particlesContainer);
};

// Initialize particles
createParticles();

// Cursor trail effect
const createCursorTrail = () => {
    const trail = [];
    const trailLength = 10;
    
    for (let i = 0; i < trailLength; i++) {
        const dot = document.createElement('div');
        dot.className = 'cursor-dot';
        dot.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: rgba(99, 102, 241, ${1 - i / trailLength});
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transition: opacity 0.3s ease;
        `;
        document.body.appendChild(dot);
        trail.push(dot);
    }
    
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    const animateTrail = () => {
        let x = mouseX;
        let y = mouseY;
        
        trail.forEach((dot, index) => {
            const nextDot = trail[index + 1] || trail[0];
            
            dot.style.left = x + 'px';
            dot.style.top = y + 'px';
            
            if (nextDot) {
                x += (parseInt(nextDot.style.left) - x) * 0.3;
                y += (parseInt(nextDot.style.top) - y) * 0.3;
            }
        });
        
        requestAnimationFrame(animateTrail);
    };
    
    animateTrail();
};

// Initialize cursor trail on desktop
if (window.innerWidth > 768) {
    createCursorTrail();
}

// Performance optimization: Throttle scroll events
const throttle = (func, limit) => {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
};

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(() => {
    // Scroll-based animations and effects
}, 16)); // ~60fps