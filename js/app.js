// ===== DOM ELEMENTS =====
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const backToTop = document.getElementById('back-to-top');
const loadingSpinner = document.getElementById('loading-spinner');
const googlePlayBtn = document.getElementById('google-play-btn');
const appStoreBtn = document.getElementById('app-store-btn');
const newsletterForm = document.getElementById('newsletter-form');
const contactForm = document.getElementById('contact-form');

// ===== STATE MANAGEMENT =====
let downloadClicks = JSON.parse(localStorage.getItem('downloadClicks')) || {
    googlePlay: 0,
    appStore: 0
};

// ===== UTILITY FUNCTIONS =====
const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

const showLoading = () => {
    loadingSpinner.classList.add('active');
};

const hideLoading = () => {
    loadingSpinner.classList.remove('active');
};

const showNotification = (message, type = 'success') => {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add notification styles if not already added
    if (!document.getElementById('notification-styles')) {
        const styles = document.createElement('style');
        styles.id = 'notification-styles';
        styles.textContent = `
            .notification {
                position: fixed;
                top: 90px;
                right: 20px;
                max-width: 400px;
                padding: 1rem 1.5rem;
                border-radius: 0.5rem;
                color: white;
                z-index: 1080;
                animation: slideInRight 0.3s ease-out;
                box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
            }
            .notification-success { background: #10b981; }
            .notification-error { background: #ef4444; }
            .notification-warning { background: #f59e0b; }
            .notification-content {
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 1rem;
            }
            .notification-close {
                background: none;
                border: none;
                color: white;
                cursor: pointer;
                padding: 0.25rem;
                border-radius: 0.25rem;
                transition: background 0.2s;
            }
            .notification-close:hover { background: rgba(255, 255, 255, 0.2); }
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
        `;
        document.head.appendChild(styles);
    }
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
};

// ===== SCROLL FUNCTIONS =====
const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
        const offsetTop = section.offsetTop - 80; // Account for fixed navbar
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
};

const handleScroll = () => {
    const scrollTop = window.pageYOffset;
    
    // Navbar scroll effect
    if (scrollTop > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Back to top button
    if (scrollTop > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
    
    // Active nav link highlighting
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollTop >= sectionTop && scrollTop < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
};

// ===== NAVIGATION FUNCTIONS =====
const toggleMobileMenu = () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
};

const closeMobileMenu = () => {
    navMenu.classList.remove('active');
    navToggle.classList.remove('active');
    document.body.style.overflow = '';
};

const toggleSearch = () => {
    isSearchOpen = !isSearchOpen;
    searchBar.classList.toggle('active', isSearchOpen);
    
    if (isSearchOpen) {
        searchInput.focus();
    }
};

const handleSearch = (e) => {
    e.preventDefault();
    const query = searchInput.value.trim();
    
    if (query) {
        showLoading();
        
        // Simulate search delay
        setTimeout(() => {
            hideLoading();
            showNotification(`Searching for "${query}"...`, 'success');
            // In a real application, you would perform the actual search here
            filterProducts(query);
        }, 1000);
    }
};

// ===== APP DOWNLOAD FUNCTIONS =====
const trackDownload = (platform) => {
    downloadClicks[platform]++;
    localStorage.setItem('downloadClicks', JSON.stringify(downloadClicks));
    
    // Send analytics event (in real app, this would go to Google Analytics or similar)
    console.log(`Download tracked: ${platform}, Total clicks: ${downloadClicks[platform]}`);
    
    // Show user feedback
    showNotification(`Redirecting to ${platform === 'googlePlay' ? 'Google Play Store' : 'App Store'}...`, 'success');
    
    // In production, these would be actual store URLs
    const storeUrls = {
        googlePlay: 'https://play.google.com/store/apps/details?id=com.hostnova.hostara',
        appStore: 'https://apps.apple.com/app/hostara/id123456789'
    };
    
    // For now, show coming soon message
    setTimeout(() => {
        showNotification('App stores are reviewing our submission. You\'ll be notified when available!', 'warning');
    }, 2000);
    
    // Uncomment when app is live:
    // window.open(storeUrls[platform], '_blank');
};

const updateDownloadStats = () => {
    // Update download counts in localStorage for analytics
    const totalDownloads = downloadClicks.googlePlay + downloadClicks.appStore;
    console.log(`Total download clicks: ${totalDownloads}`);
};

// ===== BUSINESS TIER FUNCTIONS =====
const showTierInfo = (tierName) => {
    const tierDetails = {
        student: {
            name: 'Student Tier',
            setup: 'KES 1,000',
            monthly: 'KES 0',
            clients: '100 max',
            features: ['Basic service creation', 'Mobile app access', 'M-Pesa integration', 'Student verification badge']
        },
        starter: {
            name: 'Starter Tier',
            setup: 'KES 1,500',
            monthly: 'KES 2,500',
            clients: '500 max',
            features: ['Everything in Student', 'Enhanced analytics', 'Priority support', 'Marketing guidance']
        },
        growth: {
            name: 'Growth Tier',
            setup: 'KES 3,000',
            monthly: 'KES 9,000',
            clients: '2,000 max',
            features: ['Everything in Starter', 'Multi-agent management', 'API integrations', 'Dedicated account manager']
        },
        enterprise: {
            name: 'Enterprise Tier',
            setup: 'KES 10,000',
            monthly: 'KES 39,000',
            clients: 'Unlimited',
            features: ['Everything in Growth', 'Custom integrations', 'Enterprise security', 'Multi-location management']
        }
    };
    
    const tier = tierDetails[tierName];
    if (tier) {
        const message = `${tier.name}: Setup ${tier.setup}, Monthly ${tier.monthly}, ${tier.clients} clients. Features: ${tier.features.join(', ')}`;
        showNotification(message, 'success');
    }
};

// ===== FORM FUNCTIONS =====
const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;
    
    showLoading();
    
    // Simulate form submission
    setTimeout(() => {
        hideLoading();
        showNotification('Successfully subscribed to newsletter!', 'success');
        e.target.reset();
    }, 1000);
};

const handleContactSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    showLoading();
    
    // Simulate form submission
    setTimeout(() => {
        hideLoading();
        showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
        e.target.reset();
    }, 1500);
};

// ===== ANIMATION FUNCTIONS =====
const observeElements = () => {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.feature-card, .product-card, .contact-item');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        observer.observe(el);
    });
};

// ===== EVENT LISTENERS =====
const addEventListeners = () => {
    // Scroll events
    window.addEventListener('scroll', debounce(handleScroll, 10));
    
    // Navigation events
    navToggle?.addEventListener('click', toggleMobileMenu);
    
    // Close mobile menu when clicking nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            closeMobileMenu();
            
            // Smooth scroll to section
            const href = link.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                scrollToSection(href.substring(1));
            }
        });
    });
    
    // App download events
    googlePlayBtn?.addEventListener('click', (e) => {
        e.preventDefault();
        trackDownload('googlePlay');
    });
    
    appStoreBtn?.addEventListener('click', (e) => {
        e.preventDefault();
        trackDownload('appStore');
    });
    
    // Business tier card events
    document.querySelectorAll('.tier-card').forEach(card => {
        card.addEventListener('click', () => {
            const tierClass = Array.from(card.classList).find(cls => 
                ['student', 'starter', 'growth', 'enterprise'].includes(cls)
            );
            if (tierClass) {
                showTierInfo(tierClass);
            }
        });
    });
    
    // Form events
    newsletterForm?.addEventListener('submit', handleNewsletterSubmit);
    contactForm?.addEventListener('submit', handleContactSubmit);
    
    // Back to top button
    backToTop?.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    // Keyboard events
    document.addEventListener('keydown', (e) => {
        // Close modals with Escape key
        if (e.key === 'Escape') {
            if (navMenu.classList.contains('active')) {
                closeMobileMenu();
            }
        }
    });
    
    // External link tracking
    document.querySelectorAll('a[href^="http"]').forEach(link => {
        link.addEventListener('click', (e) => {
            const url = link.href;
            console.log(`External link clicked: ${url}`);
            // In production, send to analytics
        });
    });
};

// ===== INITIALIZATION =====
const init = () => {
    // Initialize cart display
    updateCartDisplay();
    
    // Add event listeners
    addEventListeners();
    
    // Initialize animations
    observeElements();
    
    // Initialize scroll position
    handleScroll();
    
    // Add smooth scroll behavior to all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                scrollToSection(href.substring(1));
            }
        });
    });
    
    // Add loading state to buttons
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', function() {
            if (!this.classList.contains('loading')) {
                this.classList.add('loading');
                setTimeout(() => {
                    this.classList.remove('loading');
                }, 1000);
            }
        });
    });
    
    // Performance optimizations
    if ('requestIdleCallback' in window) {
        requestIdleCallback(() => {
            // Preload images
            const imageUrls = [
                'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800',
                'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800',
                'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800'
            ];
            
            imageUrls.forEach(url => {
                const img = new Image();
                img.src = url;
            });
        });
    }
    
    // Service worker registration for offline support
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('SW registered: ', registration);
                })
                .catch(registrationError => {
                    console.log('SW registration failed: ', registrationError);
                });
        });
    }
    
    console.log('EliteStore initialized successfully!');
};

// ===== GLOBAL FUNCTIONS =====
// Make functions available globally for inline event handlers
window.scrollToSection = scrollToSection;
window.updateQuantity = updateQuantity;
window.removeFromCart = removeFromCart;

// ===== START APPLICATION =====
// Initialize when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// ===== ADDITIONAL FEATURES =====

// Lazy loading for images
const lazyLoadImages = () => {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
};

// Theme toggle (if needed in future)
const initThemeToggle = () => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
};

// PWA install prompt
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    
    // Show install button or notification
    showNotification('Install our app for a better experience!', 'success');
});

// Error handling
window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
    showNotification('Something went wrong. Please refresh the page.', 'error');
});

// Online/offline status
window.addEventListener('online', () => {
    showNotification('You\'re back online!', 'success');
});

window.addEventListener('offline', () => {
    showNotification('You\'re offline. Some features may not work.', 'warning');
});

// Performance monitoring
const measurePerformance = () => {
    if ('performance' in window) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                const perfData = performance.timing;
                const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
                console.log(`Page load time: ${pageLoadTime}ms`);
                
                // Send to analytics if needed
                if (pageLoadTime > 3000) {
                    console.warn('Page load time is slow:', pageLoadTime);
                }
            }, 0);
        });
    }
};

measurePerformance();