# Technical Context: Jekyll Blog Setup

## Core Technologies

### Frontend Stack
- **Jekyll**: Static site generator (latest version supported by GitHub Pages)
- **Liquid**: Templating language for dynamic content
- **Sass/SCSS**: CSS preprocessing
- **JavaScript**: Minimal, mostly from theme
- **HTML5**: Semantic markup structure

### Theme and Styling
- **Minimal Mistakes**: Professional Jekyll theme (v4.27.3)
- **Remote Theme**: Easier updates and maintenance
- **Font Awesome**: Icons for social links and UI elements
- **Fira Code**: Monospace font for code blocks
- **Responsive Design**: Mobile-first approach

### Build and Deployment
- **GitHub Pages**: Free hosting and automatic deployment
- **GitHub Actions**: Automatic Jekyll builds on push
- **Git**: Version control and deployment trigger
- **Ruby Gems**: Dependency management via Gemfile

## Development Setup

### Local Development
```bash
# Dependencies
bundle install

# Local server
bundle exec jekyll serve --drafts --unpublished

# Build for production
bundle exec jekyll build
```

### Required Tools
- **Ruby**: For Jekyll and gem management
- **Bundler**: For dependency management
- **Git**: For version control
- **Text Editor**: For Markdown and code editing

### Environment Variables
- **JEKYLL_ENV**: `production` for GitHub Pages
- **Google Analytics**: Tracking ID configured in `_config.yml`

## Technical Constraints

### GitHub Pages Limitations
- **Plugins**: Only specific Jekyll plugins allowed
- **Ruby Gems**: Limited to GitHub Pages gem allowlist
- **Build Time**: ~10 second limit for site generation
- **File Size**: Reasonable limits on individual file sizes
- **Repository Size**: 1GB soft limit

### Performance Requirements
- **Page Load**: Fast loading times required
- **Mobile Performance**: Must work well on mobile devices
- **Code Blocks**: No horizontal scrolling
- **SEO**: Proper meta tags and structure

### Browser Support
- **Modern Browsers**: Chrome, Firefox, Safari, Edge
- **Mobile Browsers**: iOS Safari, Chrome Mobile
- **Accessibility**: WCAG 2.1 AA compliance where possible

## Dependencies

### Jekyll Plugins (via Gemfile)
```ruby
gem "github-pages"           # GitHub Pages compatibility
gem "jekyll-include-cache"   # Performance optimization
gem "jekyll-feed"           # RSS feed generation
gem "jekyll-seo-tag"        # SEO meta tags
gem "jekyll-sitemap"        # XML sitemap
gem "jekyll-gist"           # GitHub Gist embedding
gem "jekyll-paginate"       # Post pagination
gem "jemoji"                # Emoji support
```

### Theme Dependencies
- Minimal Mistakes handles most JavaScript dependencies
- Font Awesome for icons
- jQuery for interactive elements
- Lunr.js for search functionality

## Tool Usage Patterns

### Content Creation
1. **Markdown**: Primary content format
2. **Front Matter**: YAML configuration per post
3. **Image Optimization**: Manual optimization before upload
4. **Code Formatting**: Syntax highlighting via Rouge

### Development Workflow
1. **Local Testing**: Always test locally before pushing
2. **Draft Posts**: Use `published: false` for drafts
3. **Version Control**: Git workflow for all changes
4. **Deployment**: Automatic via GitHub Pages

### Monitoring and Analytics
- **Google Analytics**: Traffic and behavior tracking
- **Search Console**: SEO performance monitoring
- **GitHub Insights**: Repository activity tracking
- **Manual Testing**: Regular cross-device testing
