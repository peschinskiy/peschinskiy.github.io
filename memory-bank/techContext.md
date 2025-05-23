# Tech Context

## Core Technologies

### Jekyll
Jekyll is the static site generator that powers this blog, converting Markdown content into a complete static website.

- **Version**: Latest stable version available on GitHub Pages
- **Purpose**: Transforms Markdown files into a fully functioning website
- **Key Features**:
  - Markdown processing
  - Liquid templating language
  - YAML front matter support
  - Automatic blog pagination
  - Category and tag support

### GitHub Pages
GitHub Pages provides free hosting for the blog, directly from the GitHub repository.

- **Deployment**: Automatic deployment from main/master branch
- **URL Structure**: `username.github.io` format
- **HTTPS**: Automatic SSL/TLS certificate management
- **CDN**: Global content delivery network included

### HTML/CSS
The site uses modern HTML5 and CSS3 with a focus on minimalism and readability.

- **HTML5**: Semantic markup for better accessibility and SEO
- **CSS3**: Modern styling with flexbox/grid for layout
- **Responsive Design**: Media queries for device adaptability
- **Approach**: Mobile-first design methodology

### SEO Structure
The site implements comprehensive SEO best practices to improve search visibility.

- **Structured Data**: Schema.org markup using JSON-LD format
- **Meta Tags**: Optimized title, description, and keyword tags
- **Open Graph**: Social media sharing metadata
- **Twitter Cards**: Twitter-specific sharing optimization
- **Sitemap**: Both XML and HTML formats

## Development Setup

### Local Development
- Jekyll local server using `bundle exec jekyll serve`
- Browser preview at `localhost:4000`
- File watching with auto-regeneration

### Version Control
- Git for source control
- GitHub repository hosts both source code and generated site
- Branch protection for production (main/master) branch

## Technical Constraints

### GitHub Pages Limitations
- Only specific Jekyll plugins are supported by GitHub Pages
- Build process must complete within GitHub Pages timeout limits
- Limited server-side functionality (static content only)

### Jekyll Constraints
- Content must be authored in Markdown or HTML
- Dynamic content requires pre-generation at build time
- No server-side processing after deployment

## Dependencies

### Direct Dependencies
- Ruby (Jekyll requirement)
- Bundler (dependency management)
- Jekyll (static site generator)
- GitHub Pages gem (to match GitHub Pages environment locally)

### External Resources
- Font Awesome (for icons)
- FiraCode (monospace font for code blocks)
- CDN-delivered resources for performance

### Jekyll Plugins
- jekyll-feed for RSS generation
- jekyll-seo-tag for improved SEO
- jekyll-sitemap for sitemap generation
- jekyll-paginate for post pagination

## Asset Management
- Images stored directly in repository
- Optimized before inclusion for performance
- CSS maintained through SCSS with variables
- Minimal JavaScript usage, primarily for SEO optimization
- Favicon and logo assets implementation

## Monitoring & Analytics
- GitHub Pages traffic analytics
- Google Analytics integration
- GitHub repository insights
- Search Console verification
