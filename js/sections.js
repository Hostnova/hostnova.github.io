/**
 * HostNova Sections - Business section functionality
 * Specific functionality for the business section
 */

/**
 * Initialize business section with animations and effects for corporate appearance
 */
function initializeBusinessSection() {
    // Immediately add visible class to all business cards and testimonials
    document.querySelectorAll('.business-card.animate-text-element, .testimonial-card').forEach((el, index) => {
        el.classList.add('visible');
        // Add staggered animation delays for smoother entry
        el.style.animationDelay = `${0.1 * index}s`;
    });
    
    // Animate business elements on scroll
    const animateBusinessElements = () => {
        // Animate business cards
        const elements = document.querySelectorAll('.animate-text-element');
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            const isVisible = elementTop < window.innerHeight - 100 && elementBottom > 0;
            
            if (isVisible) {
                element.classList.add('visible');
            }
        });
        
        // Animate testimonial cards
        const testimonials = document.querySelectorAll('.testimonial-card');
        testimonials.forEach(testimonial => {
            const testimonialTop = testimonial.getBoundingClientRect().top;
            const testimonialBottom = testimonial.getBoundingClientRect().bottom;
            const isVisible = testimonialTop < window.innerHeight - 100 && testimonialBottom > 0;
            
            if (isVisible) {
                testimonial.classList.add('visible');
            }
        });
          // Animate app mockups with staggered delays for a more professional appearance
        const appMockups = document.querySelectorAll('.app-mockup');
        appMockups.forEach((mockup, index) => {
            const mockupTop = mockup.getBoundingClientRect().top;
            const mockupBottom = mockup.getBoundingClientRect().bottom;
            const isVisible = mockupTop < window.innerHeight - 100 && mockupBottom > 0;
            
            if (isVisible) {
                mockup.style.opacity = '1';
                mockup.style.animationDelay = `${0.2 * index}s`;
                mockup.style.animationName = 'fadeInCorporate';
            }
        });
        // Animate metrics with corporate progressive reveal
        const metricItems = document.querySelectorAll('.metric-item');
        metricItems.forEach((metric, index) => {
            const metricTop = metric.getBoundingClientRect().top;
            const metricBottom = metric.getBoundingClientRect().bottom;
            const isVisible = metricTop < window.innerHeight - 100 && metricBottom > 0;
            
            if (isVisible) {
                metric.style.opacity = '1';
                metric.style.animationDelay = `${0.3 * index}s`;
                metric.style.animationName = 'fadeInCorporate';
                
                // Add count-up animation to metric values for dashboard effect
                setTimeout(() => {
                    const valueElem = metric.querySelector('.metric-value');
                    if (valueElem) {
                        valueElem.classList.add('counting-animation');
                    }
                }, 300 * index);
            }
        });
        // Animate app cards with staggered reveal
        const appCards = document.querySelectorAll('.app-card');
        appCards.forEach((card, index) => {
            const cardTop = card.getBoundingClientRect().top;
            const cardBottom = card.getBoundingClientRect().bottom;
            const isVisible = cardTop < window.innerHeight - 100 && cardBottom > 0;
            
            if (isVisible) {
                card.style.opacity = '1';
                card.style.animationDelay = `${0.15 * index}s`;
            }
        });
    };
    
    // Add scroll event for animation
    window.addEventListener('scroll', animateBusinessElements);
    
    // Make the Kenya map pulse with animation
    const kenyaMap = document.querySelector('.business-kenya-map');
    if (kenyaMap) {
        kenyaMap.style.animation = 'kenyanMapPulse 4s infinite ease-in-out';
    }
    
    // Trigger once for initial elements in view
    setTimeout(animateBusinessElements, 100);
}
