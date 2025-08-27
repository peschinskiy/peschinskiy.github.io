/**
 * SEO Optimization JavaScript
 * Enhances the site with SEO-friendly features
 */

// Lazy Loading for Images
document.addEventListener('DOMContentLoaded', function() {
    // Find all images with data-src attribute
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if (lazyImages.length > 0) {
        // Set up IntersectionObserver if the browser supports it
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver(function(entries) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        const image = entry.target;
                        image.src = image.dataset.src;
                        image.classList.add('loaded');
                        imageObserver.unobserve(image);
                    }
                });
            });
            
            lazyImages.forEach(function(image) {
                imageObserver.observe(image);
            });
        } else {
            // Fallback for browsers that don't support IntersectionObserver
            // Load all images immediately
            lazyImages.forEach(function(image) {
                image.src = image.dataset.src;
                image.classList.add('loaded');
            });
        }
    }
});

// External Links Handling for SEO
document.addEventListener('DOMContentLoaded', function() {
    // Find all external links
    const externalLinks = document.querySelectorAll('a[href^="http"]:not([href*="' + window.location.hostname + '"])');
    
    // Add rel attributes for better SEO and security
    externalLinks.forEach(function(link) {
        // Don't overwrite existing rel attributes
        const rel = link.getAttribute('rel');
        if (!rel) {
            link.setAttribute('rel', 'noopener noreferrer');
        } else if (!rel.includes('noopener')) {
            link.setAttribute('rel', rel + ' noopener noreferrer');
        }
        
        // Optionally add target="_blank" to open in new tab
        if (!link.getAttribute('target')) {
            link.setAttribute('target', '_blank');
        }
    });
});

// Add schema.org metadata for breadcrumbs
document.addEventListener('DOMContentLoaded', function() {
    const breadcrumbs = document.querySelector('.breadcrumbs');
    if (breadcrumbs) {
        const items = breadcrumbs.querySelectorAll('li');
        
        items.forEach(function(item, index) {
            // Set position attribute
            const position = index + 1;
            item.querySelector('[itemprop="position"]').setAttribute('content', position.toString());
        });
    }
});