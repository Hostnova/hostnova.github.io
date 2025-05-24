// Performance Monitoring and Core Web Vitals
// Advanced optimization features for HostNova

class HostNovaPerformanceMonitor {
    constructor() {
        this.metrics = {};
        this.observers = [];
        this.init();
    }

    init() {
        // Initialize performance monitoring
        this.setupCoreWebVitals();
        this.setupIntersectionObserver();
        this.setupResourceTiming();
        this.setupLazyLoading();
        
        // Report metrics after page load
        window.addEventListener('load', () => {
            setTimeout(() => this.reportMetrics(), 2000);
        });
    }

    // Core Web Vitals monitoring
    setupCoreWebVitals() {
        // Largest Contentful Paint (LCP)
        this.observeLCP();
        
        // First Input Delay (FID)
        this.observeFID();
        
        // Cumulative Layout Shift (CLS)
        this.observeCLS();
        
        // First Contentful Paint (FCP)
        this.observeFCP();
    }

    observeLCP() {
        if ('PerformanceObserver' in window) {
            const observer = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                const lastEntry = entries[entries.length - 1];
                this.metrics.lcp = lastEntry.startTime;
                console.log('LCP:', this.metrics.lcp);
            });
            
            observer.observe({ entryTypes: ['largest-contentful-paint'] });
            this.observers.push(observer);
        }
    }

    observeFID() {
        if ('PerformanceObserver' in window) {
            const observer = new PerformanceObserver((list) => {
                const firstInput = list.getEntries()[0];
                this.metrics.fid = firstInput.processingStart - firstInput.startTime;
                console.log('FID:', this.metrics.fid);
            });
            
            observer.observe({ entryTypes: ['first-input'] });
            this.observers.push(observer);
        }
    }

    observeCLS() {
        if ('PerformanceObserver' in window) {
            let clsScore = 0;
            const observer = new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                    if (!entry.hadRecentInput) {
                        clsScore += entry.value;
                    }
                }
                this.metrics.cls = clsScore;
                console.log('CLS:', this.metrics.cls);
            });
            
            observer.observe({ entryTypes: ['layout-shift'] });
            this.observers.push(observer);
        }
    }

    observeFCP() {
        if ('PerformanceObserver' in window) {
            const observer = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                const fcpEntry = entries.find(entry => entry.name === 'first-contentful-paint');
                if (fcpEntry) {
                    this.metrics.fcp = fcpEntry.startTime;
                    console.log('FCP:', this.metrics.fcp);
                }
            });
            
            observer.observe({ entryTypes: ['paint'] });
            this.observers.push(observer);
        }
    }

    // Enhanced Intersection Observer for animations and lazy loading
    setupIntersectionObserver() {
        if ('IntersectionObserver' in window) {
            // Animation observer
            const animationObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-in');
                        entry.target.classList.remove('animate-out');
                    } else {
                        entry.target.classList.add('animate-out');
                        entry.target.classList.remove('animate-in');
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '50px'
            });

            // Observe elements with animation classes
            document.querySelectorAll('.hero-content, .hostara-content, .business-features, .consumer-benefits').forEach(el => {
                animationObserver.observe(el);
            });
            
            this.observers.push(animationObserver);
        }
    }

    // Enhanced lazy loading with progressive enhancement
    setupLazyLoading() {
        if ('IntersectionObserver' in window) {
            const lazyImageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        
                        // Progressive loading with shimmer effect
                        img.classList.add('loading');
                        
                        // Load high-quality image
                        const highQualitySrc = img.dataset.src || img.src;
                        
                        // Create temporary image to preload
                        const tempImg = new Image();
                        tempImg.onload = () => {
                            img.src = highQualitySrc;
                            img.classList.remove('loading');
                            img.classList.add('loaded');
                        };
                        
                        tempImg.onerror = () => {
                            img.classList.add('error');
                            console.warn('Failed to load image:', highQualitySrc);
                        };
                        
                        tempImg.src = highQualitySrc;
                        lazyImageObserver.unobserve(img);
                    }
                });
            }, {
                rootMargin: '100px'
            });

            // Observe all responsive images
            document.querySelectorAll('.responsive-image').forEach(img => {
                // Add shimmer effect class
                img.classList.add('shimmer-placeholder');
                lazyImageObserver.observe(img);
            });
            
            this.observers.push(lazyImageObserver);
        }
    }

    // Resource timing monitoring
    setupResourceTiming() {
        if ('PerformanceObserver' in window) {
            const resourceObserver = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                entries.forEach(entry => {
                    // Track slow resources
                    if (entry.duration > 1000) {
                        console.warn('Slow resource detected:', entry.name, entry.duration + 'ms');
                    }
                    
                    // Track failed resources
                    if (entry.transferSize === 0 && entry.encodedBodySize > 0) {
                        console.warn('Resource from cache:', entry.name);
                    }
                });
            });
            
            resourceObserver.observe({ entryTypes: ['resource'] });
            this.observers.push(resourceObserver);
        }
    }

    // Memory monitoring
    monitorMemory() {
        if ('memory' in performance) {
            const memory = performance.memory;
            this.metrics.memory = {
                used: memory.usedJSHeapSize,
                total: memory.totalJSHeapSize,
                limit: memory.jsHeapSizeLimit
            };
            
            // Warn if memory usage is high
            const memoryUsagePercent = (memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100;
            if (memoryUsagePercent > 80) {
                console.warn('High memory usage detected:', memoryUsagePercent.toFixed(2) + '%');
            }
        }
    }

    // Network quality detection
    detectNetworkQuality() {
        if ('connection' in navigator) {
            const connection = navigator.connection;
            this.metrics.network = {
                effectiveType: connection.effectiveType,
                downlink: connection.downlink,
                rtt: connection.rtt,
                saveData: connection.saveData
            };
            
            // Adjust performance based on network quality
            if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
                document.body.classList.add('low-bandwidth');
                this.enableDataSaverMode();
            }
        }
    }

    // Data saver mode for low bandwidth
    enableDataSaverMode() {
        // Reduce animation complexity
        document.documentElement.style.setProperty('--animation-duration', '0.1s');
        
        // Disable video autoplay
        document.querySelectorAll('video[autoplay]').forEach(video => {
            video.removeAttribute('autoplay');
            video.pause();
        });
        
        // Show data saver notification
        this.showDataSaverNotification();
    }

    showDataSaverNotification() {
        const notification = document.createElement('div');
        notification.className = 'data-saver-notification';
        notification.innerHTML = `
            <div class="data-saver-content">
                <span class="data-saver-icon">📊</span>
                <span class="data-saver-text">Data saver mode enabled for better performance</span>
                <button class="data-saver-dismiss">×</button>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        notification.querySelector('.data-saver-dismiss').addEventListener('click', () => {
            notification.remove();
        });
        
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 5000);
    }

    // Performance budget monitoring
    checkPerformanceBudget() {
        const budgets = {
            lcp: 2500, // 2.5 seconds
            fid: 100,  // 100 milliseconds
            cls: 0.1,  // 0.1 score
            fcp: 1800  // 1.8 seconds
        };
        
        const violations = [];
        
        Object.keys(budgets).forEach(metric => {
            if (this.metrics[metric] && this.metrics[metric] > budgets[metric]) {
                violations.push({
                    metric,
                    value: this.metrics[metric],
                    budget: budgets[metric]
                });
            }
        });
        
        if (violations.length > 0) {
            console.warn('Performance budget violations:', violations);
        }
        
        return violations;
    }

    // Report all metrics
    reportMetrics() {
        this.monitorMemory();
        this.detectNetworkQuality();
        
        console.log('HostNova Performance Metrics:', this.metrics);
        
        // Check performance budget
        const violations = this.checkPerformanceBudget();
        
        // Send metrics to analytics (if configured)
        this.sendAnalytics();
        
        return this.metrics;
    }

    // Send analytics (placeholder for real analytics)
    sendAnalytics() {
        // In a real application, you would send this data to your analytics service
        // Example: Google Analytics, Mixpanel, etc.
        
        if (window.gtag) {
            // Google Analytics 4 example
            Object.keys(this.metrics).forEach(metric => {
                if (typeof this.metrics[metric] === 'number') {
                    window.gtag('event', 'performance_metric', {
                        metric_name: metric,
                        metric_value: this.metrics[metric]
                    });
                }
            });
        }
    }

    // Cleanup observers
    cleanup() {
        this.observers.forEach(observer => {
            observer.disconnect();
        });
        this.observers = [];
    }
}

// Image optimization utilities
class ImageOptimizer {
    static init() {
        this.setupWebPSupport();
        this.setupResponsiveImages();
        this.setupImageErrorHandling();
    }

    static setupWebPSupport() {
        // Check WebP support
        const webpSupported = this.supportsWebP();
        
        if (webpSupported) {
            document.documentElement.classList.add('webp');
        } else {
            document.documentElement.classList.add('no-webp');
        }
    }

    static supportsWebP() {
        const canvas = document.createElement('canvas');
        canvas.width = 1;
        canvas.height = 1;
        return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
    }

    static setupResponsiveImages() {
        // Add responsive image attributes if not present
        document.querySelectorAll('img').forEach(img => {
            if (!img.hasAttribute('loading') && !img.classList.contains('logo-image')) {
                img.setAttribute('loading', 'lazy');
            }
            
            // Add aspect ratio data attribute for CLS prevention
            if (!img.hasAttribute('width') || !img.hasAttribute('height')) {
                img.onload = () => {
                    const aspectRatio = img.naturalWidth / img.naturalHeight;
                    img.dataset.aspectRatio = aspectRatio.toFixed(2);
                };
            }
        });
    }

    static setupImageErrorHandling() {
        document.querySelectorAll('img').forEach(img => {
            img.addEventListener('error', (e) => {
                console.warn('Image failed to load:', e.target.src);
                
                // Add error class for styling
                e.target.classList.add('image-error');
                
                // Optionally, provide fallback image
                if (!e.target.dataset.fallbackAttempted) {
                    e.target.dataset.fallbackAttempted = 'true';
                    // You could set a fallback image here
                    // e.target.src = '/images/fallback.png';
                }
            });
        });
    }
}

// Initialize performance monitoring and image optimization
document.addEventListener('DOMContentLoaded', () => {
    // Initialize performance monitor
    window.hostnovaPerformance = new HostNovaPerformanceMonitor();
    
    // Initialize image optimizer
    ImageOptimizer.init();
    
    // Cleanup on page unload
    window.addEventListener('beforeunload', () => {
        if (window.hostnovaPerformance) {
            window.hostnovaPerformance.cleanup();
        }
    });
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { HostNovaPerformanceMonitor, ImageOptimizer };
}
