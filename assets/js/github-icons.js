/**
 * Adds GitHub icons to all GitHub links in article content
 * Uses Font Awesome icons that are already loaded by the theme
 */
document.addEventListener('DOMContentLoaded', function() {
    // Find all links in the main content area that point to GitHub
    const contentArea = document.querySelector('.page__content, .post__content, article');
    if (!contentArea) return;
    
    const githubLinks = contentArea.querySelectorAll('a[href*="github.com"]');
    
    githubLinks.forEach(function(link) {
        // Skip if icon already exists
        if (link.querySelector('.fa-github')) return;
        
        // Create GitHub icon element
        const icon = document.createElement('i');
        icon.className = 'fab fa-github';
        icon.style.marginRight = '0.3em';
        icon.style.fontSize = '0.9em';
        icon.setAttribute('aria-hidden', 'true');
        
        // Insert icon at the beginning of the link
        link.insertBefore(icon, link.firstChild);
        
        // Add a class to mark this link as processed
        link.classList.add('github-link-with-icon');
    });
});
