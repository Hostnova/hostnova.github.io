/**
 * HostNova Core - Essential functionality
 * Core functions for loading, preloading, and section management
 */

/**
 * Handle preloader with better reliability
 */
function handlePreloader() {
    const preloader = document.querySelector('.preloader');
    
    if (!preloader) return;
    
    // Force dismiss preloader after a safety timeout (5s) in case something goes wrong
    const safetyTimeout = setTimeout(() => {
        console.log('Safety timeout triggered for preloader');
        forceHidePreloader();
    }, 5000);
    
    // Normal preloader dismissal
    window.addEventListener('load', () => {
        clearTimeout(safetyTimeout);
        hidePreloader();
        
        // Initialize section loading handlers after main preloader
        handleSectionLoading();
    });
    
    // Additional safety check - if window already loaded, hide immediately
    if (document.readyState === 'complete') {
        clearTimeout(safetyTimeout);
        hidePreloader();
        handleSectionLoading();
    }
    
    function hidePreloader() {
        setTimeout(() => {
            preloader.classList.add('preloader-hidden');
            setTimeout(() => {
                preloader.style.display = 'none';
                document.body.classList.add('loaded');
            }, 600); // Match this with the CSS transition duration
        }, 500); // Short delay to ensure content is ready
    }
    
    function forceHidePreloader() {
        preloader.classList.add('preloader-hidden');
        setTimeout(() => {
            preloader.style.display = 'none';
            document.body.classList.add('loaded');
        }, 100);
    }
}

/**
 * Mark sections as loaded to hide their loading indicators
 */
function handleSectionLoading() {
    // Mark hero section as loaded after a short delay
    setTimeout(() => {
        const heroSection = document.getElementById('hero');
        if (heroSection) {
            heroSection.classList.add('loaded');
        }
    }, 1000);
    
    // Handle other sections based on visibility
    const sections = document.querySelectorAll('section');
    const markSectionAsLoaded = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('loaded');
            }
        });
    };
    
    const observer = new IntersectionObserver(markSectionAsLoaded, {
        root: null,
        threshold: 0.1 // 10% of the section visible
    });
    
    sections.forEach(section => {
        observer.observe(section);
    });
}
