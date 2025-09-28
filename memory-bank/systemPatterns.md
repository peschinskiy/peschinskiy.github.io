# System Patterns: Jekyll Blog Architecture

## Core Architecture

### Jekyll Static Site Generator
- **Base**: Jekyll with GitHub Pages integration
- **Theme**: Minimal Mistakes remote theme (v4.27.3)
- **Deployment**: Automatic via GitHub Pages on push to main branch
- **Build Process**: GitHub Actions handles Jekyll compilation

### File Structure Patterns
```
/
├── _config.yml          # Main Jekyll configuration
├── _posts/              # Blog post content (Markdown)
├── _pages/              # Static pages (About, etc.)
├── _data/               # Data files (navigation, etc.)
├── assets/
│   ├── css/main.scss    # Custom styling overrides
│   ├── images/          # Site images and assets
│   └── js/              # Custom JavaScript (if needed)
├── _site/               # Generated site (ignored in git)
└── memory-bank/         # Project documentation (excluded from build)
```

## Key Technical Decisions

### Theme Implementation
- **Remote Theme**: Uses `mmistakes/minimal-mistakes` as remote theme
- **Skin**: Default skin with custom overrides
- **Customization**: Custom CSS in `assets/css/main.scss` for specific overrides
- **Benefits**: Easy updates, maintainability, professional appearance

### Code Block Handling
- **Font**: Fira Code for all code elements
- **Responsive Design**: `white-space: pre-wrap` and `overflow-wrap: break-word`
- **No Horizontal Scroll**: Critical UX requirement successfully implemented
- **Font Sizing**: 14px default, 13px on mobile for better readability

### Performance Patterns
- **Compression**: HTML compression enabled for production
- **Caching**: Jekyll's built-in asset pipeline
- **Analytics**: Google Analytics (G-780EJPX0MS) for tracking
- **SEO**: Jekyll SEO tag plugin for proper meta tags

## Component Relationships

### Content Flow
```
Markdown Posts → Jekyll Processing → Theme Layout → Generated HTML → GitHub Pages
```

### Styling Hierarchy
```
Minimal Mistakes Base → Skin Selection → Custom Overrides (main.scss)
```

### Plugin Integration
- `jekyll-feed`: RSS feed generation
- `jekyll-sitemap`: XML sitemap for SEO
- `jekyll-seo-tag`: Meta tags and structured data
- `jekyll-paginate`: Post pagination
- `jekyll-include-cache`: Performance optimization

## Critical Implementation Paths

### Code Block Styling Pipeline
1. Markdown code blocks parsed by Jekyll
2. Syntax highlighting via Rouge
3. Minimal Mistakes theme applies base styling
4. Custom overrides in `main.scss` ensure responsive behavior
5. Final CSS prevents horizontal scroll while maintaining readability

### Content Publishing Workflow
1. Write post in Markdown in `_posts/` directory
2. Set proper front matter (title, date, categories, tags)
3. Commit and push to GitHub
4. GitHub Pages automatically builds and deploys
5. Site updates are live within minutes

### SEO and Discovery
1. Jekyll SEO plugin generates meta tags
2. Sitemap automatically updated
3. RSS feed includes new content
4. Google Analytics tracks visitor behavior
5. Structured data helps search engines understand content
