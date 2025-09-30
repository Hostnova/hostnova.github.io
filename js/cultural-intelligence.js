/**
 * Cultural Intelligence System
 * AI-powered adaptation engine for global marketplace optimization
 * Based on Hostara logo branding and global expansion strategy
 */

class CulturalIntelligence {
    constructor() {
        this.currentTheme = 'auto';
        this.currentContext = 'kenya-global';
        this.userPreferences = this.loadUserPreferences();
        this.culturalData = this.initializeCulturalData();
        this.performanceMetrics = {};
        
        this.init();
    }

    /**
     * Initialize the cultural intelligence system
     */
    init() {
        this.detectUserContext();
        this.loadCulturalTheme();
        this.setupEventListeners();
        this.startAdaptationEngine();
        
        console.log('🌍 Cultural Intelligence System Initialized');
        console.log(`📍 Context: ${this.currentContext}`);
        console.log(`🎨 Theme: ${this.currentTheme}`);
    }

    /**
     * Detect user cultural context using various signals
     */
    detectUserContext() {
        const signals = {
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            language: navigator.language || navigator.userLanguage,
            location: this.getApproximateLocation(),
            currency: this.detectCurrency(),
            dateFormat: this.detectDateFormat()
        };

        // AI-powered context detection
        if (signals.timezone.includes('Africa/Nairobi') || 
            signals.language.startsWith('sw') || 
            signals.currency === 'KES') {
            this.currentContext = 'kenya-focused';
        } else if (this.isAfricanContext(signals)) {
            this.currentContext = 'africa-focused';
        } else {
            this.currentContext = 'global-focused';
        }

        // Store detection signals for learning
        this.storeContextSignals(signals);
    }

    /**
     * Load and apply cultural theme
     */
    loadCulturalTheme() {
        const body = document.body;
        const savedTheme = localStorage.getItem('hostara-cultural-theme');
        
        if (savedTheme && ['kenya', 'global', 'auto'].includes(savedTheme)) {
            this.currentTheme = savedTheme;
        }

        // Apply theme attributes
        body.setAttribute('data-cultural-theme', this.currentTheme);
        body.setAttribute('data-cultural-context', this.currentContext);

        // Apply theme-specific enhancements
        this.applyCulturalEnhancements();
        
        // Apply footer adaptations
        setTimeout(() => {
            this.adaptFooter();
        }, 100);
    }

    /**
     * Apply cultural enhancements based on context
     */
    applyCulturalEnhancements() {
        const root = document.documentElement;
        const culturalConfig = this.culturalData[this.currentContext];

        if (culturalConfig) {
            // Apply cultural color adjustments
            if (culturalConfig.colors) {
                Object.entries(culturalConfig.colors).forEach(([key, value]) => {
                    root.style.setProperty(`--cultural-${key}`, value);
                });
            }

            // Apply cultural spacing
            if (culturalConfig.spacing) {
                root.style.setProperty('--cultural-spacing', culturalConfig.spacing);
            }

            // Apply cultural timing
            if (culturalConfig.timing) {
                root.style.setProperty('--cultural-timing', culturalConfig.timing);
            }

            // Apply typography adjustments
            if (culturalConfig.typography) {
                this.applyCulturalTypography(culturalConfig.typography);
            }

            // Apply cultural content adaptations
            this.applyCulturalContent(culturalConfig);
        }
    }

    /**
     * Apply cultural content adaptations
     */
    applyCulturalContent(culturalConfig) {
        const contentMap = {
            'kenya-focused': {
                'market-focus': 'on Kenya\'s Premier Platform',
                'platform-description': 'Hostara connects businesses with customers across Kenya. Our comprehensive marketplace features multi-vendor e-commerce, digital services, logistics management, and business analytics - all powered by M-Pesa integration and designed for the Kenyan market.',
                'primary-cta': 'Host Your Hustle',
                'secondary-cta': 'See How It Works',
                'stat-services': 'Service Categories',
                'stat-markets': 'Kenyan Counties',
                'stat-heritage': 'Made in Kenya',
                'launch-date': 'Launching October 1, 2025',
                'scroll-hint': 'Discover Features',
                'features-badge': 'Platform Features',
                'features-title': 'Everything You Need to',
                'features-description': 'Hostara provides powerful tools and features that showcase the core elements from our logo - marketplace capabilities, digital platform infrastructure, smart logistics, and business analytics - designed specifically for the Kenyan market with M-Pesa integration.',
                'payment-integration': 'M-Pesa Integration',
                'campus-focus': 'Campus Integration',
                'features-cta-title': 'Ready to Transform Your Kenyan Business?',
                'features-cta-description': 'Join thousands of Kenyan businesses already hosting their hustle on our comprehensive platform.',
                'services-badge': 'Host Your Hustle Today',
                'services-title': 'Choose Your',
                'services-description': 'Select the perfect tier for your Kenyan business journey. From student entrepreneurs to enterprise operations, our pricing tiers are designed with M-Pesa integration and campus-focused features.',
                'currency': 'KES',
                'monthly-free': 'FREE monthly',
                'mobile-payment': 'M-Pesa integration',
                'campus-features': 'Campus-focused features',
                'student-tagline': 'Perfect for campus entrepreneurs',
                'pricing-title': 'Kenyan Business Tiers',
                'pricing-subtitle': 'Choose the orbit that fits your business scale',
                'app-title': 'Mobile App Coming Soon',
                'app-description': 'Experience the full power of Hostara on your mobile device with M-Pesa integration and campus-focused features.',
                'app-cta': 'Host Your Hustle',
                'app-status': 'Currently in development. Apps will be available after October 1, 2025 launch in Kenya.'
            },
            'africa-focused': {
                'market-focus': 'across African Markets',
                'platform-description': 'Hostara is expanding across Africa as a comprehensive marketplace platform featuring multi-vendor e-commerce, digital services, logistics management, and business analytics - designed for African entrepreneurs and businesses.',
                'primary-cta': 'Host Your Hustle',
                'secondary-cta': 'See How It Works',
                'stat-services': 'Service Categories',
                'stat-markets': 'African Markets',
                'stat-heritage': 'African Innovation',
                'launch-date': 'Launching October 1, 2025',
                'scroll-hint': 'Discover Features',
                'features-badge': 'Platform Features',
                'features-title': 'Everything You Need to',
                'features-description': 'Hostara provides powerful tools and features that showcase the core elements from our logo - marketplace capabilities, digital platform infrastructure, smart logistics, and business analytics - designed for African entrepreneurs with mobile-first approach.',
                'payment-integration': 'Mobile Payment Integration',
                'campus-focus': 'University Integration',
                'features-cta-title': 'Ready to Transform Your African Business?',
                'features-cta-description': 'Join thousands of African businesses already hosting their hustle on our comprehensive platform.',
                'services-badge': 'Host Your Hustle Today',
                'services-title': 'Choose Your',
                'services-description': 'Select the perfect tier for your African business journey. From student entrepreneurs to enterprise operations, our pricing tiers are designed with mobile-first approach and university integration.',
                'currency': 'USD',
                'monthly-free': 'FREE monthly',
                'mobile-payment': 'Mobile payment integration',
                'campus-features': 'University integration',
                'student-tagline': 'Perfect for university entrepreneurs',
                'pricing-title': 'African Business Tiers',
                'pricing-subtitle': 'Choose the orbit that fits your business scale',
                'app-title': 'Mobile App Coming Soon',
                'app-description': 'Experience the full power of Hostara on your mobile device with mobile payment integration and university-focused features.',
                'app-cta': 'Host Your Hustle',
                'app-status': 'Currently in development. Apps will be available after October 1, 2025 launch across Africa.'
            },
            'global-focused': {
                'market-focus': 'on the Global Marketplace',
                'platform-description': 'Hostara is your comprehensive marketplace platform featuring multi-vendor e-commerce, digital services, logistics management, and business analytics - all powered by cloud infrastructure designed to help you orbit beyond ordinary.',
                'primary-cta': 'Host Your Hustle',
                'secondary-cta': 'Explore Platform',
                'stat-services': 'Service Categories',
                'stat-markets': 'Global Markets',
                'stat-heritage': 'Kenyan Innovation',
                'launch-date': 'Launching October 1, 2025',
                'scroll-hint': 'Discover Features',
                'features-badge': 'Platform Capabilities',
                'features-title': 'Everything You Need to',
                'features-description': 'Hostara provides enterprise-grade tools and features that showcase the core elements from our logo - marketplace capabilities, digital platform infrastructure, smart logistics, and business analytics - designed to help global businesses orbit beyond ordinary.',
                'payment-integration': 'Global Payment Processing',
                'campus-focus': 'Enterprise Integration',
                'features-cta-title': 'Ready to Transform Your Global Business?',
                'features-cta-description': 'Join thousands of global businesses already hosting their hustle on our comprehensive platform.',
                'services-badge': 'Host Your Hustle Today',
                'services-title': 'Choose Your',
                'services-description': 'Select the perfect tier for your global business journey. From startup entrepreneurs to enterprise operations, our pricing tiers are designed with global payment processing and enterprise integration.',
                'currency': 'USD',
                'monthly-free': 'FREE monthly',
                'mobile-payment': 'Global payment processing',
                'campus-features': 'Enterprise integration',
                'student-tagline': 'Perfect for startup entrepreneurs',
                'pricing-title': 'Global Business Tiers',
                'pricing-subtitle': 'Choose the orbit that fits your enterprise scale',
                'app-title': 'Enterprise Mobile App',
                'app-description': 'Experience the full power of Hostara on your mobile device with global payment processing and enterprise-grade security.',
                'app-cta': 'Host Your Hustle',
                'app-status': 'Currently in development. Apps will be available after October 1, 2025 global launch.'
            }
        };

        const content = contentMap[this.currentContext];
        if (content) {
            Object.entries(content).forEach(([key, value]) => {
                const elements = document.querySelectorAll(`[data-cultural-text="${key}"]`);
                elements.forEach(element => {
                    element.textContent = value;
                });
            });
        }
    }

    /**
     * Apply cultural typography settings
     */
    applyCulturalTypography(typoConfig) {
        const root = document.documentElement;
        
        if (typoConfig.tracking) {
            root.style.setProperty('--tracking-adaptive', typoConfig.tracking);
        }
        
        if (typoConfig.leading) {
            root.style.setProperty('--leading-adaptive', typoConfig.leading);
        }
        
        if (typoConfig.scale) {
            root.style.setProperty('--scale-adaptive', typoConfig.scale);
        }
    }

    /**
     * Initialize cultural data configurations
     */
    initializeCulturalData() {
        return {
            'kenya-focused': {
                colors: {
                    primary: '#4A4A6A',      // Hostara logo purple
                    secondary: '#00D4FF',    // Hostara logo cyan
                    accent: '#6B73FF',       // Hostara logo blue
                    background: '#F8F6FF',   // Light lavender
                    text: '#2D2D3D'          // Dark navy
                },
                spacing: '1.2rem',
                timing: '0.4s cubic-bezier(0.4, 0.0, 0.2, 1)',
                typography: {
                    tracking: '0.01em',
                    leading: '1.7',
                    scale: '1.05'
                },
                features: ['mobile-first', 'offline-support', 'sms-integration']
            },
            'africa-focused': {
                colors: {
                    primary: '#4A4A6A',
                    secondary: '#00D4FF',
                    accent: '#6B73FF',
                    background: '#F6F8FF',
                    text: '#2D2D3D'
                },
                spacing: '1.1rem',
                timing: '0.35s cubic-bezier(0.4, 0.0, 0.2, 1)',
                typography: {
                    tracking: '0.005em',
                    leading: '1.65',
                    scale: '1.03'
                },
                features: ['mobile-optimized', 'low-bandwidth', 'multi-language']
            },
            'global-focused': {
                colors: {
                    primary: '#4A4A6A',
                    secondary: '#00D4FF',
                    accent: '#6B73FF',
                    background: '#FFFFFF',
                    text: '#1A1A1A'
                },
                spacing: '1rem',
                timing: '0.3s cubic-bezier(0.4, 0.0, 0.2, 1)',
                typography: {
                    tracking: '0em',
                    leading: '1.6',
                    scale: '1'
                },
                features: ['desktop-optimized', 'high-bandwidth', 'advanced-features']
            }
        };
    }

    /**
     * Setup event listeners for cultural adaptation
     */
    setupEventListeners() {
        // Theme switching
        document.addEventListener('click', (e) => {
            if (e.target.matches('[data-cultural-switch]')) {
                const newTheme = e.target.dataset.culturalSwitch;
                this.switchTheme(newTheme);
            }
        });

        // Logo feature interactions
        document.addEventListener('click', (e) => {
            if (e.target.closest('[data-logo-feature]')) {
                const feature = e.target.closest('[data-logo-feature]').dataset.logoFeature;
                this.highlightLogoFeature(feature);
            }
        });

        // Service icon interactions
        document.addEventListener('mouseenter', (e) => {
            if (e.target.closest('[data-service]')) {
                const service = e.target.closest('[data-service]').dataset.service;
                this.highlightService(service);
            }
        });

        // Performance monitoring
        if ('PerformanceObserver' in window) {
            this.setupPerformanceMonitoring();
        }

        // Connectivity adaptation
        if ('connection' in navigator) {
            this.setupConnectivityAdaptation();
        }

        // Language change detection
        window.addEventListener('languagechange', () => {
            this.detectUserContext();
            this.loadCulturalTheme();
        });

        // Scroll-based hero animations
        this.setupScrollAnimations();
    }

    /**
     * Switch cultural theme
     */
    switchTheme(newTheme) {
        if (!['kenya', 'global', 'auto'].includes(newTheme)) return;
        
        this.currentTheme = newTheme;
        localStorage.setItem('hostara-cultural-theme', newTheme);
        
        // Re-detect context if switching to auto
        if (newTheme === 'auto') {
            this.detectUserContext();
        }
        
        this.loadCulturalTheme();
        
        // Emit theme change event
        window.dispatchEvent(new CustomEvent('culturalThemeChange', {
            detail: { theme: newTheme, context: this.currentContext }
        }));
        
        console.log(`🎨 Theme switched to: ${newTheme}`);
    }

    /**
     * Start the adaptive learning engine
     */
    startAdaptationEngine() {
        // Continuous learning and adaptation
        setInterval(() => {
            this.analyzeUserBehavior();
            this.optimizePerformance();
            this.adaptToNetworkConditions();
        }, 30000); // Every 30 seconds

        // Cultural A/B testing
        this.initializeCulturalTesting();
    }

    /**
     * Analyze user behavior for cultural adaptation
     */
    analyzeUserBehavior() {
        const behaviors = {
            scrollSpeed: this.measureScrollSpeed(),
            interactionPatterns: this.analyzeInteractionPatterns(),
            timeSpent: this.measureTimeSpent(),
            preferredContent: this.analyzeContentPreferences()
        };

        // Machine learning adaptation based on behaviors
        this.adaptBasedOnBehavior(behaviors);
    }

    /**
     * Setup performance monitoring for cultural optimization
     */
    setupPerformanceMonitoring() {
        const observer = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                this.performanceMetrics[entry.name] = entry.duration;
            }
            
            // Optimize based on performance
            this.optimizeBasedOnPerformance();
        });

        observer.observe({ entryTypes: ['measure', 'navigation'] });
    }

    /**
     * Setup connectivity-based adaptation
     */
    setupConnectivityAdaptation() {
        const connection = navigator.connection;
        
        const adaptToConnection = () => {
            const effectiveType = connection.effectiveType;
            const saveData = connection.saveData;
            
            if (effectiveType === '2g' || saveData) {
                this.enableLowBandwidthMode();
            } else if (effectiveType === '4g') {
                this.enableHighBandwidthMode();
            }
        };

        connection.addEventListener('change', adaptToConnection);
        adaptToConnection(); // Initial check
    }

    /**
     * Enable low bandwidth optimizations
     */
    enableLowBandwidthMode() {
        const root = document.documentElement;
        root.classList.add('low-bandwidth');
        
        // Reduce animations
        root.style.setProperty('--cultural-timing', '0.1s ease-out');
        
        // Optimize images
        this.optimizeImagesForBandwidth();
        
        console.log('📶 Low bandwidth mode enabled');
    }

    /**
     * Enable high bandwidth features
     */
    enableHighBandwidthMode() {
        const root = document.documentElement;
        root.classList.remove('low-bandwidth');
        root.classList.add('high-bandwidth');
        
        // Enhanced animations
        root.style.setProperty('--cultural-timing', '0.4s cubic-bezier(0.4, 0.0, 0.2, 1)');
        
        console.log('📶 High bandwidth mode enabled');
    }

    /**
     * Utility methods for cultural detection
     */
    isAfricanContext(signals) {
        const africanTimezones = [
            'Africa/Cairo', 'Africa/Lagos', 'Africa/Johannesburg',
            'Africa/Nairobi', 'Africa/Casablanca', 'Africa/Addis_Ababa'
        ];
        
        const africanLanguageCodes = ['sw', 'yo', 'ig', 'ha', 'am', 'ar'];
        
        return africanTimezones.includes(signals.timezone) ||
               africanLanguageCodes.some(code => signals.language.startsWith(code));
    }

    getApproximateLocation() {
        // Privacy-respecting location detection
        return Intl.DateTimeFormat().resolvedOptions().timeZone.split('/')[1] || 'unknown';
    }

    detectCurrency() {
        // Detect likely currency based on locale
        try {
            const formatter = new Intl.NumberFormat();
            return formatter.resolvedOptions().currency || 'USD';
        } catch {
            return 'USD';
        }
    }

    detectDateFormat() {
        // Detect cultural date format preferences
        const testDate = new Date('2024-01-15');
        const formatted = testDate.toLocaleDateString();
        
        if (formatted.startsWith('15')) return 'dd/mm/yyyy';
        if (formatted.startsWith('1/15')) return 'mm/dd/yyyy';
        return 'yyyy-mm-dd';
    }

    loadUserPreferences() {
        const stored = localStorage.getItem('hostara-user-preferences');
        return stored ? JSON.parse(stored) : {};
    }

    storeContextSignals(signals) {
        const stored = JSON.parse(localStorage.getItem('hostara-context-signals') || '[]');
        stored.push({ ...signals, timestamp: Date.now() });
        
        // Keep only last 10 signals
        if (stored.length > 10) stored.shift();
        
        localStorage.setItem('hostara-context-signals', JSON.stringify(stored));
    }

    /**
     * Highlight logo feature on interaction
     */
    highlightLogoFeature(feature) {
        // Remove previous highlights
        document.querySelectorAll('.feature-highlighted').forEach(el => {
            el.classList.remove('feature-highlighted');
        });

        // Highlight current feature
        const featureElement = document.querySelector(`[data-logo-feature="${feature}"]`);
        const serviceElement = document.querySelector(`[data-service="${feature}"]`);
        
        if (featureElement) {
            featureElement.classList.add('feature-highlighted');
        }
        
        if (serviceElement) {
            serviceElement.classList.add('service-highlighted');
        }

        // Track user interaction
        this.trackFeatureInteraction(feature);
    }

    /**
     * Highlight service on hover
     */
    highlightService(service) {
        const connectionLines = document.querySelectorAll('.connection-line');
        connectionLines.forEach(line => {
            line.style.opacity = '0.2';
        });

        const serviceElement = document.querySelector(`[data-service="${service}"]`);
        if (serviceElement) {
            const connectionLine = serviceElement.querySelector('.connection-line');
            if (connectionLine) {
                connectionLine.style.opacity = '1';
                connectionLine.style.background = 'linear-gradient(to bottom, var(--hostara-secondary), var(--hostara-accent))';
            }
        }

        // Reset after delay
        setTimeout(() => {
            connectionLines.forEach(line => {
                line.style.opacity = '0.5';
                line.style.background = 'linear-gradient(to bottom, var(--hostara-secondary-30), transparent)';
            });
        }, 2000);
    }

    /**
     * Setup scroll-based animations
     */
    setupScrollAnimations() {
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-in');
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });

            // Observe hero elements
            const heroElements = document.querySelectorAll('[data-cultural-element]');
            heroElements.forEach(el => observer.observe(el));
        }

        // Parallax scrolling for hero background
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            const heroBackground = document.querySelector('.hero-cosmic-background');
            if (heroBackground) {
                heroBackground.style.transform = `translateY(${rate}px)`;
            }

            const orbitalRings = document.querySelectorAll('.orbital-ring');
            orbitalRings.forEach((ring, index) => {
                const rateMultiplier = (index + 1) * 0.1;
                ring.style.transform = `rotate(${scrolled * rateMultiplier}deg)`;
            });
        });
    }

    /**
     * Track feature interactions for learning
     */
    trackFeatureInteraction(feature) {
        const interactions = JSON.parse(localStorage.getItem('hostara-feature-interactions') || '{}');
        interactions[feature] = (interactions[feature] || 0) + 1;
        interactions.lastInteraction = Date.now();
        
        localStorage.setItem('hostara-feature-interactions', JSON.stringify(interactions));
        
        // Adapt based on popular features
        this.adaptBasedOnFeatureInteractions(interactions);
    }

    /**
     * Adapt interface based on feature interactions
     */
    adaptBasedOnFeatureInteractions(interactions) {
        const mostPopular = Object.entries(interactions)
            .filter(([key]) => key !== 'lastInteraction')
            .sort(([,a], [,b]) => b - a)[0];

        if (mostPopular) {
            const [feature, count] = mostPopular;
            if (count > 3) {
                // Highlight popular features more prominently
                const featureElements = document.querySelectorAll(`[data-logo-feature="${feature}"]`);
                featureElements.forEach(el => {
                    el.style.order = '-1'; // Move to front
                    el.classList.add('popular-feature');
                });
            }
        }
    }

    // Enhanced placeholder methods for advanced features
    measureScrollSpeed() { 
        let lastScrollTop = 0;
        let scrollSpeed = 0;
        
        window.addEventListener('scroll', () => {
            const currentScrollTop = window.pageYOffset;
            scrollSpeed = Math.abs(currentScrollTop - lastScrollTop);
            lastScrollTop = currentScrollTop;
        });
        
        return scrollSpeed;
    }

    analyzeInteractionPatterns() { 
        const interactions = JSON.parse(localStorage.getItem('hostara-feature-interactions') || '{}');
        return {
            totalInteractions: Object.values(interactions).reduce((a, b) => a + b, 0),
            favoriteFeature: Object.entries(interactions).sort(([,a], [,b]) => b - a)[0]?.[0],
            sessionLength: Date.now() - (performance.timing?.navigationStart || Date.now())
        };
    }

    measureTimeSpent() { 
        return Date.now() - (performance.timing?.navigationStart || Date.now());
    }

    analyzeContentPreferences() { 
        return {
            preferredTheme: this.currentTheme,
            preferredContext: this.currentContext,
            interactionHistory: JSON.parse(localStorage.getItem('hostara-feature-interactions') || '{}')
        };
    }

    adaptBasedOnBehavior(behaviors) {
        // Adapt scroll speed for animations
        if (behaviors.scrollSpeed > 50) {
            document.documentElement.style.setProperty('--cultural-timing', '0.1s ease-out');
        } else {
            document.documentElement.style.setProperty('--cultural-timing', '0.4s cubic-bezier(0.4, 0.0, 0.2, 1)');
        }
    }

    optimizeBasedOnPerformance() {
        // Reduce animations if performance is poor
        if (this.performanceMetrics.navigationTime > 3000) {
            document.body.classList.add('reduced-animations');
        }
    }

    optimizeImagesForBandwidth() {
        const images = document.querySelectorAll('img[data-src]');
        images.forEach(img => {
            if (navigator.connection?.effectiveType === '2g') {
                img.src = img.dataset.srcLow || img.dataset.src;
            } else {
                img.src = img.dataset.src;
            }
        });
    }

    initializeCulturalTesting() {
        // A/B test different cultural adaptations
        const testGroup = Math.random() > 0.5 ? 'A' : 'B';
        localStorage.setItem('hostara-test-group', testGroup);
        
        if (testGroup === 'B') {
            // Test alternative hero layout
            document.body.classList.add('hero-variant-b');
        }
    }

    /**
     * Adapt footer content based on cultural context
     */
    adaptFooter() {
        const footerElements = document.querySelectorAll('.footer [data-cultural-content]');
        
        const footerContent = {
            'kenya-focused': {
                'tagline': 'Host Your Hustle on Kenya\'s premier multi-service marketplace platform. Orbit beyond ordinary with Hostnova.',
                'nav-title': 'Quick Links',
                'services-title': 'Platform Services',
                'support-title': 'Support & Legal',
                'service-marketplace': 'Digital Marketplace',
                'service-logistics': 'M-Pesa Integration',
                'service-analytics': 'Business Analytics',
                'service-campus': 'Campus Program',
                'support-help': 'Help Center (24/7)',
                'support-business': 'Business Support',
                'support-community': 'Kenya Community',
                'legal-compliance': 'Kenya Compliance',
                'copyright': '© 2025 Hostnova Limited. All rights reserved. Hostara™ is a registered trademark of Hostnova.'
            },
            'africa-focused': {
                'tagline': 'Host Your Hustle across Africa\'s growing digital marketplace ecosystem. Orbit beyond ordinary with Hostnova.',
                'nav-title': 'Navigation',
                'services-title': 'Platform Services',
                'support-title': 'Support & Legal',
                'service-marketplace': 'Pan-African Marketplace',
                'service-logistics': 'Cross-Border Logistics',
                'service-analytics': 'Market Analytics',
                'service-campus': 'University Program',
                'support-help': 'Help Center',
                'support-business': 'Business Support',
                'support-community': 'Africa Community',
                'legal-compliance': 'Regional Compliance',
                'copyright': '© 2025 Hostnova Limited. All rights reserved. Serving Africa\'s digital future.'
            },
            'global': {
                'tagline': 'Host Your Hustle on the global multi-service marketplace platform. Orbit beyond ordinary with Hostnova.',
                'nav-title': 'Quick Links',
                'services-title': 'Platform Services',
                'support-title': 'Support & Legal',
                'service-marketplace': 'Global Marketplace',
                'service-logistics': 'International Logistics',
                'service-analytics': 'Advanced Analytics',
                'service-campus': 'Campus Program',
                'support-help': 'Global Help Center',
                'support-business': 'Enterprise Support',
                'support-community': 'Global Community',
                'legal-compliance': 'Global Compliance',
                'copyright': '© 2025 Hostnova Limited. All rights reserved. Hostara™ is a registered trademark of Hostnova.'
            }
        };

        footerElements.forEach(element => {
            const contentKey = element.getAttribute('data-cultural-content');
            const content = footerContent[this.currentContext]?.[contentKey] || 
                           footerContent['global'][contentKey];
            
            if (content) {
                if (element.tagName === 'A' || element.tagName === 'H3') {
                    element.textContent = content;
                } else {
                    element.innerHTML = content;
                }
            }
        });

        // Update social links based on regional preferences
        this.adaptSocialLinks();
    }

    /**
     * Adapt social media links based on regional preferences
     */
    adaptSocialLinks() {
        if (this.currentContext === 'kenya-focused') {
            // Add WhatsApp for Kenya
            const whatsappLink = document.createElement('a');
            whatsappLink.href = '#';
            whatsappLink.className = 'social-link';
            whatsappLink.setAttribute('data-platform', 'whatsapp');
            whatsappLink.setAttribute('aria-label', 'Chat with us on WhatsApp');
            whatsappLink.innerHTML = '<i class="fab fa-whatsapp"></i>';
            
            const socialContainer = document.querySelector('.social-links');
            if (socialContainer && !socialContainer.querySelector('[data-platform="whatsapp"]')) {
                socialContainer.appendChild(whatsappLink);
            }
        }

        if (this.currentContext === 'africa-focused') {
            // Prioritize platforms popular in Africa
            const platformPriority = ['whatsapp', 'facebook', 'twitter', 'instagram', 'linkedin', 'tiktok'];
            const socialContainer = document.querySelector('.social-links');
            
            if (socialContainer) {
                const existingLinks = Array.from(socialContainer.children);
                existingLinks.sort((a, b) => {
                    const aPlatform = a.getAttribute('data-platform');
                    const bPlatform = b.getAttribute('data-platform');
                    return platformPriority.indexOf(aPlatform) - platformPriority.indexOf(bPlatform);
                });
                
                existingLinks.forEach(link => socialContainer.appendChild(link));
            }
        }
    }
}

// Initialize Cultural Intelligence System
document.addEventListener('DOMContentLoaded', () => {
    window.CulturalIntelligence = new CulturalIntelligence();
});

// Export for module environments
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CulturalIntelligence;
}