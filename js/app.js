// ===== DOM ELEMENTS =====
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const searchBtn = document.getElementById('search-btn');
const searchBar = document.getElementById('search-bar');
const searchInput = document.getElementById('search-input');
const cartBtn = document.getElementById('cart-btn');
const cartSidebar = document.getElementById('cart-sidebar');
const cartOverlay = document.getElementById('cart-overlay');
const cartClose = document.getElementById('cart-close');
const cartContent = document.getElementById('cart-content');
const cartFooter = document.getElementById('cart-footer');
const cartCount = document.getElementById('cart-count');
const cartTotal = document.getElementById('cart-total');
const backToTop = document.getElementById('back-to-top');
const loadingSpinner = document.getElementById('loading-spinner');
const filterBtns = document.querySelectorAll('.filter-btn');
const productsGrid = document.getElementById('products-grid');
const loadMoreBtn = document.getElementById('load-more-btn');
const addToCartBtns = document.querySelectorAll('.add-to-cart-btn');
const newsletterForm = document.getElementById('newsletter-form');
const contactForm = document.getElementById('contact-form');

// ===== STATE MANAGEMENT =====
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let currentFilter = 'all';
let isSearchOpen = false;

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

// ===== CART FUNCTIONS =====
const updateCartDisplay = () => {
    cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
    
    if (cart.length === 0) {
        cartContent.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <p>Your cart is empty</p>
                <button class="btn btn-primary" onclick="scrollToSection('products')">
                    Start Shopping
                </button>
            </div>
        `;
        cartFooter.style.display = 'none';
    } else {
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartTotal.textContent = total.toFixed(2);
        
        cartContent.innerHTML = cart.map(item => `
            <div class="cart-item" data-id="${item.id}">
                <div class="cart-item-image">
                    <i class="fas fa-box"></i>
                </div>
                <div class="cart-item-details">
                    <div class="cart-item-title">${item.name}</div>
                    <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                    <div class="cart-item-controls">
                        <div class="quantity-controls">
                            <button class="quantity-btn" onclick="updateQuantity('${item.id}', ${item.quantity - 1})">
                                <i class="fas fa-minus"></i>
                            </button>
                            <span class="quantity">${item.quantity}</span>
                            <button class="quantity-btn" onclick="updateQuantity('${item.id}', ${item.quantity + 1})">
                                <i class="fas fa-plus"></i>
                            </button>
                        </div>
                        <button class="remove-item" onclick="removeFromCart('${item.id}')">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
        
        cartFooter.style.display = 'block';
    }
    
    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
};

const addToCart = (name, price) => {
    const id = name.toLowerCase().replace(/\s+/g, '-');
    const existingItem = cart.find(item => item.id === id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id,
            name,
            price: parseFloat(price),
            quantity: 1
        });
    }
    
    updateCartDisplay();
    showNotification(`${name} added to cart!`, 'success');
    
    // Animate cart button
    cartBtn.style.transform = 'scale(1.2)';
    setTimeout(() => {
        cartBtn.style.transform = 'scale(1)';
    }, 200);
};

const updateQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
        removeFromCart(id);
        return;
    }
    
    const item = cart.find(item => item.id === id);
    if (item) {
        item.quantity = newQuantity;
        updateCartDisplay();
    }
};

const removeFromCart = (id) => {
    const itemIndex = cart.findIndex(item => item.id === id);
    if (itemIndex !== -1) {
        const itemName = cart[itemIndex].name;
        cart.splice(itemIndex, 1);
        updateCartDisplay();
        showNotification(`${itemName} removed from cart`, 'warning');
    }
};

const toggleCart = () => {
    const isActive = cartSidebar.classList.contains('active');
    
    if (isActive) {
        cartSidebar.classList.remove('active');
        cartOverlay.classList.remove('active');
        document.body.style.overflow = '';
    } else {
        cartSidebar.classList.add('active');
        cartOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
};

const closeCart = () => {
    cartSidebar.classList.remove('active');
    cartOverlay.classList.remove('active');
    document.body.style.overflow = '';
};

// ===== PRODUCT FUNCTIONS =====
const filterProducts = (query = '') => {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        const category = card.dataset.category;
        const title = card.querySelector('.product-title').textContent.toLowerCase();
        const matchesFilter = currentFilter === 'all' || category === currentFilter;
        const matchesSearch = query === '' || title.includes(query.toLowerCase());
        
        if (matchesFilter && matchesSearch) {
            card.style.display = 'block';
            card.style.animation = 'fadeInUp 0.5s ease-out';
        } else {
            card.style.display = 'none';
        }
    });
};

const setActiveFilter = (filter) => {
    currentFilter = filter;
    
    // Update filter button states
    filterBtns.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.filter === filter) {
            btn.classList.add('active');
        }
    });
    
    // Filter products with animation
    showLoading();
    setTimeout(() => {
        filterProducts();
        hideLoading();
    }, 300);
};

const loadMoreProducts = () => {
    showLoading();
    
    // Simulate loading more products
    setTimeout(() => {
        const moreProducts = [
            { name: 'Smart Watch', price: 249.99, category: 'electronics', icon: 'fas fa-watch' },
            { name: 'Yoga Mat', price: 39.99, category: 'sports', icon: 'fas fa-dumbbell' },
            { name: 'Coffee Maker', price: 129.99, category: 'home', icon: 'fas fa-coffee' },
            { name: 'Wireless Earbuds', price: 79.99, category: 'electronics', icon: 'fas fa-headphones' }
        ];
        
        moreProducts.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.dataset.category = product.category;
            productCard.innerHTML = `
                <div class="product-image">
                    <div class="product-image-placeholder">
                        <i class="${product.icon}"></i>
                    </div>
                    <div class="product-overlay">
                        <button class="quick-view-btn">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="wishlist-btn">
                            <i class="far fa-heart"></i>
                        </button>
                    </div>
                </div>
                <div class="product-info">
                    <h3 class="product-title">${product.name}</h3>
                    <div class="product-rating">
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="far fa-star"></i>
                        <span class="rating-count">(45)</span>
                    </div>
                    <div class="product-price">
                        <span class="current-price">$${product.price}</span>
                    </div>
                    <button class="add-to-cart-btn" data-product="${product.name}" data-price="${product.price}">
                        <i class="fas fa-shopping-cart"></i>
                        Add to Cart
                    </button>
                </div>
            `;
            
            productsGrid.appendChild(productCard);
            
            // Add event listener to new add to cart button
            const newAddToCartBtn = productCard.querySelector('.add-to-cart-btn');
            newAddToCartBtn.addEventListener('click', (e) => {
                const name = e.target.dataset.product;
                const price = e.target.dataset.price;
                addToCart(name, price);
            });
        });
        
        hideLoading();
        showNotification('More products loaded!', 'success');
        
        // Hide load more button after loading
        loadMoreBtn.style.display = 'none';
    }, 1500);
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
    
    // Search events
    searchBtn?.addEventListener('click', toggleSearch);
    searchBar?.querySelector('form')?.addEventListener('submit', handleSearch);
    
    // Close search when clicking outside
    document.addEventListener('click', (e) => {
        if (isSearchOpen && !searchBar.contains(e.target) && !searchBtn.contains(e.target)) {
            toggleSearch();
        }
    });
    
    // Cart events
    cartBtn?.addEventListener('click', toggleCart);
    cartClose?.addEventListener('click', closeCart);
    cartOverlay?.addEventListener('click', closeCart);
    
    // Product filter events
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            setActiveFilter(btn.dataset.filter);
        });
    });
    
    // Add to cart events
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const name = e.target.dataset.product;
            const price = e.target.dataset.price;
            addToCart(name, price);
        });
    });
    
    // Load more button
    loadMoreBtn?.addEventListener('click', loadMoreProducts);
    
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
            if (cartSidebar.classList.contains('active')) {
                closeCart();
            }
            if (isSearchOpen) {
                toggleSearch();
            }
            if (navMenu.classList.contains('active')) {
                closeMobileMenu();
            }
        }
    });
    
    // Wishlist button events
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('wishlist-btn') || e.target.parentElement.classList.contains('wishlist-btn')) {
            const btn = e.target.classList.contains('wishlist-btn') ? e.target : e.target.parentElement;
            const icon = btn.querySelector('i');
            
            if (icon.classList.contains('far')) {
                icon.classList.remove('far');
                icon.classList.add('fas');
                btn.style.color = '#ef4444';
                showNotification('Added to wishlist!', 'success');
            } else {
                icon.classList.remove('fas');
                icon.classList.add('far');
                btn.style.color = '';
                showNotification('Removed from wishlist!', 'warning');
            }
        }
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