# Minimal Mistakes Theme Migration Plan

## Project Overview
**Objective**: Full migration from custom Jekyll blog implementation to Minimal Mistakes theme
**Scope**: Complete replacement with built-in features, new design language, and feature equivalence
**Timeline**: Single migration phase with no rollback requirements

## Current State Analysis

### Existing Assets to Migrate
- **Content**: 2 published posts (`2025-04-05-remapping-windows-and-mac-keyborads.md`, `2025-01-20-code-block-horizontal-scroll-test.md`)
- **Configuration**: Comprehensive SEO setup, Google Analytics (G-780EJPX0MS), custom permalinks
- **Assets**: Favicon, logo, custom fonts (Fira Code), Font Awesome icons
- **Features**: Social sharing, structured data, site navigation, responsive design

### Custom Implementation to Replace
- **Layouts**: Custom `default.html`, `post.html`, `page.html`
- **Styling**: Custom Sass files (`_base.scss`, `_layout.scss`, `_syntax-highlighting.scss`, `_variables.scss`)
- **SEO**: Custom SEO metadata implementation
- **Analytics**: Custom Google Analytics integration

## Migration Strategy

### Phase 1: Environment Preparation

#### 1.1 Backup Current Implementation
```bash
# Create backup branch
git checkout -b backup-custom-implementation
git push origin backup-custom-implementation

# Return to main branch for migration
git checkout main
```

#### 1.2 Document Current Configuration
- Save current `_config.yml` settings for reference
- Document current URL structure and permalink configuration
- List all current front matter patterns used in posts

### Phase 2: Minimal Mistakes Installation

#### 2.1 Update Gemfile
**Action**: Replace current Gemfile with Minimal Mistakes compatible version
```ruby
source "https://rubygems.org"

# GitHub Pages with Minimal Mistakes
gem "github-pages", group: :jekyll_plugins
gem "jekyll-include-cache", group: :jekyll_plugins

# Additional useful plugins for GitHub Pages
group :jekyll_plugins do
  gem "jekyll-feed"
  gem "jekyll-seo-tag"
  gem "jekyll-sitemap"
  gem "jekyll-gist"
  gem "jekyll-paginate"
  gem "jemoji"
end

# Platform-specific gems (keep existing)
platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem "tzinfo", "~> 1.2"
  gem "tzinfo-data"
end

gem "wdm", "~> 0.1.1", :platforms => [:mingw, :x64_mingw, :mswin]
```

#### 2.2 Install Dependencies
```bash
bundle update
bundle install
```

### Phase 3: Theme Configuration

#### 3.1 Create New _config.yml
**Action**: Replace existing configuration with Minimal Mistakes setup

```yaml
# Minimal Mistakes Theme Configuration
remote_theme: "mmistakes/minimal-mistakes@4.27.3"
minimal_mistakes_skin: "default" # Options: default, air, aqua, contrast, dark, dirt, neon, mint, plum, sunrise

# Site Settings
locale: "en-US"
title: "pure++ | Igor Peschinskiy's Blog"
title_separator: "|"
subtitle: "Personal technical blog about IT-relevant topics"
name: "Igor Peschinskiy"
description: >-
  Personal technical blog about IT-relevant topics by Igor Peschinskiy. 
  Sharing expertise in backend development, C++, system architecture, and software engineering.
url: "https://peschinskiy.github.io"
baseurl: ""
repository: "peschinskiy/peschinskiy.github.io"
teaser: "/assets/images/default-teaser.jpg"
logo: "/assets/images/logo.png"
masthead_title: "pure++"

# SEO & Social
author:
  name: "Igor Peschinskiy"
  avatar: "/assets/images/author-photo.jpg"
  bio: "Backend Developer & Software Architect"
  location: "Europe"
  email: "igor.peschinskiy@gmail.com"
  links:
    - label: "GitHub"
      icon: "fab fa-fw fa-github"
      url: "https://github.com/peschinskiy"
    - label: "LinkedIn"
      icon: "fab fa-fw fa-linkedin"
      url: "https://linkedin.com/in/peschinskiy"

# Site Footer
footer:
  links:
    - label: "GitHub"
      icon: "fab fa-fw fa-github"
      url: "https://github.com/peschinskiy"
    - label: "LinkedIn"
      icon: "fab fa-fw fa-linkedin"
      url: "https://linkedin.com/in/peschinskiy"

# Reading Files
include:
  - .htaccess
  - _pages
exclude:
  - "*.sublime-project"
  - "*.sublime-workspace"
  - vendor
  - .asset-cache
  - .bundle
  - .jekyll-assets-cache
  - .sass-cache
  - assets/js/plugins
  - assets/js/_main.js
  - assets/js/vendor
  - Capfile
  - CHANGELOG
  - config
  - Gemfile
  - Gruntfile.js
  - gulpfile.js
  - LICENSE
  - log
  - node_modules
  - package.json
  - package-lock.json
  - Rakefile
  - README
  - tmp

# Plugins
plugins:
  - jekyll-paginate
  - jekyll-sitemap
  - jekyll-gist
  - jekyll-feed
  - jekyll-include-cache
  - jekyll-seo-tag

# Archives
category_archive:
  type: liquid
  path: /categories/
tag_archive:
  type: liquid
  path: /tags/

# HTML Compression
compress_html:
  clippings: all
  ignore:
    envs: development

# Analytics
analytics:
  provider: "google-gtag"
  google:
    tracking_id: "G-780EJPX0MS"

# Site Search
search: true

# SEO
social:
  type: Person
  name: Igor Peschinskiy
  links:
    - "https://github.com/peschinskiy"
    - "https://linkedin.com/in/peschinskiy"

# Post/Page Defaults
defaults:
  # _posts
  - scope:
      path: ""
      type: posts
    values:
      layout: single
      author_profile: true
      read_time: true
      comments: false
      share: true
      related: true
      show_date: true
  # _pages
  - scope:
      path: "_pages"
      type: pages
    values:
      layout: single
      author_profile: true

# Sass/SCSS
sass:
  sass_dir: _sass
  style: compressed

# Outputting
permalink: /:categories/:title/
paginate: 10 # amount of posts to show
paginate_path: /page:num/
timezone: Europe/Berlin
```

#### 3.2 Create Navigation Configuration
**File**: `_data/navigation.yml`
```yaml
main:
  - title: "Posts"
    url: /
  - title: "Categories"
    url: /categories/
  - title: "Tags"
    url: /tags/
  - title: "About"
    url: /about/
```

### Phase 4: Content Migration

#### 4.1 Update Post Front Matter
**Action**: Modify existing posts to use Minimal Mistakes layouts

**Before** (current format):
```yaml
---
layout: post
title: "Making Mac and Windows Keyboard Layouts Compatible"
date: 2025-04-05 10:12:00 +0200
categories: [Tutorial]
tags: [keyboard, os, scripting]
---
```

**After** (Minimal Mistakes format):
```yaml
---
layout: single
title: "Making Mac and Windows Keyboard Layouts Compatible"
date: 2025-04-05 10:12:00 +0200
categories: 
  - Tutorial
tags: 
  - keyboard
  - os
  - scripting
excerpt: "Solving keyboard layout inconsistencies between Mac and Windows machines for better productivity."
header:
  teaser: /assets/images/keyboard-layouts-teaser.jpg
---
```

#### 4.2 Create About Page
**File**: `_pages/about.md`
```yaml
---
layout: single
title: "About"
permalink: /about/
author_profile: true
---

# About Igor Peschinskiy

Backend developer and software architect with expertise in C++, system design, and performance optimization. 

This blog shares technical insights, tutorials, and experiences from working with complex software systems.

## Contact

- **Email**: igor.peschinskiy@gmail.com
- **GitHub**: [@peschinskiy](https://github.com/peschinskiy)
- **LinkedIn**: [peschinskiy](https://linkedin.com/in/peschinskiy)
```

#### 4.3 Create Archive Pages
**File**: `_pages/category-archive.md`
```yaml
---
title: "Posts by Category"
layout: categories
permalink: /categories/
author_profile: true
---
```

**File**: `_pages/tag-archive.md`
```yaml
---
title: "Posts by Tag"
layout: tags
permalink: /tags/
author_profile: true
---
```

### Phase 5: Asset Migration

#### 5.1 Organize Assets
```bash
# Create proper asset structure
mkdir -p assets/images
mkdir -p assets/css
mkdir -p assets/js

# Move existing assets
mv assets/images/favicon.ico assets/images/
mv assets/images/logo.png assets/images/

# Add placeholder for author photo and teaser images
# Note: Will need to add actual author photo
```

#### 5.2 Custom Styling (if needed)
**File**: `_sass/minimal-mistakes/skins/_custom.scss`
```scss
/* Custom overrides for code blocks to maintain horizontal scroll fix */
.highlight pre {
  white-space: pre-wrap;
  overflow-wrap: break-word;
  font-size: 14px;
  
  @media (max-width: 600px) {
    font-size: 13px;
    padding: 0.5rem;
  }
}

/* Maintain Fira Code font for code */
.highlight,
code {
  font-family: 'Fira Code', 'Monaco', 'Menlo', monospace;
}
```

### Phase 6: Remove Custom Implementation

#### 6.1 Delete Custom Files
```bash
# Remove custom layouts, includes, and sass
rm -rf _layouts/
rm -rf _includes/
rm -rf _sass/
rm -f assets/css/styles.css
rm -f assets/js/seo-optimization.js
```

#### 6.2 Clean Up Root Directory
```bash
# Remove custom verification files (MM handles SEO differently)
# Keep these for now, can remove after testing
# rm googlebf9ae941ef8a3ce6.html
# rm yandex_0c84be9b0300faae.html
```

### Phase 7: Testing & Validation

#### 7.1 Local Testing
```bash
# Install new dependencies
bundle install

# Test local build
bundle exec jekyll serve --livereload

# Verify at http://localhost:4000:
# - All posts display correctly
# - Navigation works
# - Author profile appears
# - Social sharing functions
# - SEO metadata present
# - Analytics tracking active
```

#### 7.2 SEO Validation
- **Google Search Console**: Verify sitemap updates
- **Structured Data**: Test with Google's Rich Results Test
- **Meta Tags**: Verify Open Graph and Twitter Card data
- **Performance**: Run Lighthouse audit

#### 7.3 Content Validation
- **Post Rendering**: Verify all posts display correctly
- **Code Blocks**: Ensure horizontal scroll fix is maintained
- **Links**: Check all internal and external links
- **Images**: Verify all images load properly

### Phase 8: Deployment

#### 8.1 GitHub Pages Deployment
```bash
# Commit all changes
git add .
git commit -m "Migrate to Minimal Mistakes theme"

# Push to GitHub
git push origin main

# GitHub Pages will automatically build and deploy
```

#### 8.2 Post-Deployment Verification
- **Live Site**: Verify site loads at peschinskiy.github.io
- **Functionality**: Test all features on live site
- **Analytics**: Confirm Google Analytics is tracking
- **SEO**: Re-submit sitemap to search engines

### Phase 9: Post-Migration Optimization

#### 9.1 Content Enhancement
- **Author Photo**: Add professional author photo
- **Teaser Images**: Create teaser images for posts
- **About Page**: Enhance with more detailed bio and project highlights

#### 9.2 SEO Optimization
- **Meta Descriptions**: Ensure all posts have compelling excerpts
- **Image Alt Text**: Add descriptive alt text to all images
- **Internal Linking**: Add related post connections

#### 9.3 Performance Optimization
- **Image Optimization**: Compress all images
- **Font Loading**: Optimize web font loading
- **Caching**: Verify proper browser caching headers

## Risk Mitigation

### Backup Strategy
- **Git Branches**: Maintain backup branch with original implementation
- **Asset Backup**: Keep local copies of all original assets
- **Configuration Backup**: Save original `_config.yml` and custom code

### Rollback Plan
If critical issues arise:
1. **Quick Rollback**: `git revert` to previous commit
2. **Full Rollback**: Merge backup branch back to main
3. **Partial Rollback**: Cherry-pick specific files from backup

### URL Preservation
- **Redirect Setup**: If URL structure changes significantly, set up redirects
- **Search Console**: Monitor for 404 errors and update internal links
- **Analytics**: Track impact on organic traffic

## Success Metrics

### Technical Metrics
- **Build Time**: Jekyll build completes successfully
- **Performance**: Lighthouse score ≥90 for performance
- **SEO**: All SEO metadata properly rendered
- **Accessibility**: WCAG compliance maintained

### Content Metrics
- **Post Migration**: All posts render correctly with proper formatting
- **Navigation**: All site navigation functions properly
- **Mobile**: Responsive design works across devices
- **Analytics**: Google Analytics tracking confirmed

### User Experience Metrics
- **Page Load Speed**: Faster than current implementation
- **Mobile Experience**: Improved mobile navigation and readability
- **Social Sharing**: Enhanced social media integration
- **Search**: Built-in search functionality working

## Timeline Estimate

- **Phase 1-2**: 2-3 hours (Preparation and installation)
- **Phase 3-4**: 3-4 hours (Configuration and content migration)
- **Phase 5-6**: 1-2 hours (Asset migration and cleanup)
- **Phase 7**: 2-3 hours (Testing and validation)
- **Phase 8**: 1 hour (Deployment)
- **Phase 9**: 2-3 hours (Post-migration optimization)

**Total Estimated Time**: 11-16 hours

## Next Steps

1. **Review Plan**: Confirm all requirements are addressed
2. **Schedule Migration**: Plan migration during low-traffic period
3. **Prepare Assets**: Create author photo and teaser images
4. **Begin Phase 1**: Start with environment preparation

## Notes

- **Feature Equivalence**: Minimal Mistakes provides superior built-in features compared to current custom implementation
- **SEO Preservation**: MM's SEO features will maintain or improve current search engine visibility
- **Maintenance**: Reduced maintenance burden with actively maintained theme
- **Future Enhancements**: Easy to add new features like comments, search, and social features
