# Technical Context: Technologies & Development Setup

## Core Technology Stack

### Primary Technologies
- **Jekyll 3.9+**: Static site generator
- **Ruby 2.7+**: Required for Jekyll and plugins
- **Liquid**: Templating language for Jekyll
- **Kramdown**: Markdown processor
- **Sass**: CSS preprocessing
- **HTML5**: Semantic markup
- **Git**: Version control

### Jekyll Plugins
```ruby
group :jekyll_plugins do
  gem "jekyll-feed"      # RSS/Atom feeds
  gem "jekyll-seo-tag"   # SEO meta tags
  gem "jekyll-sitemap"   # XML sitemap generation
end
```

### Dependencies & Constraints

#### GitHub Pages Limitations
- **Allowed Plugins**: Only GitHub Pages-approved plugins
- **Ruby Version**: Controlled by GitHub Pages
- **Build Time**: Limited build time and file size
- **No Server-Side**: Static files only

#### Development Dependencies
```ruby
# Platform-specific gems
platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem "tzinfo", "~> 1.2"
  gem "tzinfo-data"
end

# Windows performance
gem "wdm", "~> 0.1.1", :platforms => [:mingw, :x64_mingw, :mswin]
```

## Development Environment

### Local Setup Requirements
1. **Ruby Installation**: Version 2.7 or higher
2. **Bundler**: For dependency management
3. **Git**: For version control
4. **Text Editor**: Any markdown-capable editor

### Development Workflow
```bash
# Initial setup
git clone https://github.com/peschinskiy/peschinskiy.github.io.git
cd peschinskiy.github.io
bundle install

# Local development
bundle exec jekyll serve --livereload
# Site available at http://localhost:4000

# Build for production
bundle exec jekyll build
```

### File Structure
```
peschinskiy.github.io/
├── _config.yml              # Site configuration
├── _layouts/                # Page templates
├── _includes/               # Reusable components
├── _posts/                  # Blog posts
├── _sass/                   # Sass stylesheets
├── assets/                  # Images, CSS, JS
├── memory-bank/             # Documentation (this system)
├── Gemfile                  # Ruby dependencies
├── .gitignore              # Git exclusions
└── index.html              # Homepage
```

## SEO & Analytics Setup

### Google Analytics
- **Tracking ID**: G-780EJPX0MS
- **Implementation**: Global site tag in `_includes/head.html`
- **Privacy**: Minimal data collection, GDPR-compliant

### Search Console Integration
- **Verification Files**: 
  - `googlebf9ae941ef8a3ce6.html`
  - `yandex_0c84be9b0300faae.html`
- **Sitemap**: Automatically generated at `/sitemap.xml`
- **Robots.txt**: Custom rules for crawling

### SEO Configuration
```yaml
# _config.yml
title: pure++ | Igor Peschinskiy's Blog
description: Personal technical blog about IT-relevant topics...
url: https://peschinskiy.github.io
author:
  name: Igor Peschinskiy
  email: igor.peschinskiy@gmail.com
social:
  name: Igor Peschinskiy
  links:
    - https://github.com/peschinskiy
    - https://linkedin.com/in/peschinskiy
```

## Content Management

### Markdown Configuration
- **Processor**: Kramdown
- **Syntax Highlighting**: Rouge
- **Math Support**: MathJax (if needed)
- **Extensions**: Footnotes, tables, code blocks

### Front Matter Standards
```yaml
---
layout: post
title: "Post Title"
description: "SEO description (max 160 chars)"
date: YYYY-MM-DD HH:MM:SS +0200
image: /assets/images/post-image.jpg
tags: [backend, cpp, performance]
last_modified_at: YYYY-MM-DD HH:MM:SS +0200
---
```

### Asset Management
- **Images**: `/assets/images/`
- **CSS**: Compiled from `_sass/`
- **Fonts**: External (Google Fonts) or local
- **Icons**: Font Awesome or SVG icons

## Performance Optimization

### Build Optimization
```yaml
# _config.yml
sass:
  style: compressed          # Minified CSS
markdown: kramdown
highlighter: rouge
permalink: /:title/          # Clean URLs
```

### Content Optimization
- **Image Compression**: Manual optimization before upload
- **CSS**: Sass compilation with compression
- **HTML**: Minified by Jekyll
- **External Resources**: Minimal third-party dependencies

## Security Considerations

### Static Site Security
- **No Database**: Eliminates SQL injection risks
- **No Server Code**: No server-side vulnerabilities
- **HTTPS**: Enforced by GitHub Pages
- **Content Security**: Git-based content management

### Privacy & Compliance
- **Analytics**: Minimal Google Analytics tracking
- **Cookies**: Only essential cookies
- **External Links**: `rel="noopener noreferrer"`
- **Contact Info**: Public but professional

## Deployment Process

### GitHub Pages Deployment
1. **Automatic**: Push to `main` branch triggers build
2. **Build Process**: GitHub Pages runs Jekyll build
3. **Deployment**: Static files served from GitHub CDN
4. **SSL**: Automatic HTTPS certificate

### Development vs Production
- **Development**: Local Jekyll server with livereload
- **Staging**: Can use GitHub Pages preview features
- **Production**: Main branch on GitHub Pages

## Monitoring & Maintenance

### Performance Monitoring
- **Google PageSpeed Insights**: Regular performance checks
- **Lighthouse**: Automated audits for performance, SEO, accessibility
- **Google Analytics**: Traffic and engagement metrics

### Dependency Updates
- **Gemfile.lock**: Tracks exact versions
- **Security Updates**: Monitor for Ruby/Jekyll security updates
- **Plugin Updates**: Stay within GitHub Pages compatibility

### Content Backup
- **Git Repository**: Complete history and backup
- **Local Copies**: Development environment serves as backup
- **Export Options**: Markdown files are portable

## Future Technology Considerations

### Potential Enhancements
- **Client-side Search**: Lunr.js or Algolia
- **Progressive Web App**: Service worker for offline reading
- **Image Optimization**: Automated responsive images
- **Comment System**: Disqus, utterances, or static comments

### Migration Paths
- **Hugo**: Alternative static site generator
- **Gatsby**: React-based SSG
- **Next.js**: If dynamic features needed
- **Custom Solution**: If requirements exceed Jekyll capabilities
