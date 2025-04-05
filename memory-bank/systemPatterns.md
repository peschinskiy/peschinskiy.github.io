# System Patterns

## Architecture Overview
The blog is structured as a static site built with Jekyll and hosted on GitHub Pages, following a content-first architecture pattern that prioritizes simplicity, performance, and maintainability.

```mermaid
flowchart TD
    A[GitHub Repository] --> B[Jekyll Build]
    B --> C[Static Site Generation]
    C --> D[GitHub Pages Hosting]
    E[Markdown Content] --> B
    F[Templates/Layouts] --> B
    G[CSS Styling] --> B
```

## Key Design Patterns

### Content Organization
- **Post Collection**: Blog posts are organized as Jekyll collections, with each post as a separate markdown file
- **Front Matter**: Each post uses YAML front matter for metadata such as title, date, categories, and tags
- **Excerpt Pattern**: First paragraph of each post serves as an automatic excerpt on the main page

### Site Structure
- **Header-Content-Footer**: Consistent layout structure across pages
- **Navigation Bar**: Persistent header navigation with Posts and About links
- **List-Detail Pattern**: Posts page shows list view, with individual post pages as detail views

## Component Relationships

### Template Inheritance
```mermaid
flowchart TD
    A[default.html Layout] --> B[post.html Layout]
    A --> C[page.html Layout]
    B --> D[Individual Post Pages]
    C --> E[About Page]
    C --> F[Posts Index Page]
```

### Content Flow
- Markdown files → Jekyll processing → HTML generation
- Post metadata → Index generation → List display
- Post content → Individual page rendering

## Technical Decision Points

### Static Site Generation
- Pre-build all pages rather than server-side rendering
- No database dependencies, all content stored in repository
- Minimize client-side JavaScript to focus on content delivery

### Responsive Design
- Mobile-first approach to CSS
- Fluid typography that scales with viewport
- FiraCode font
- Breakpoints for major device categories (mobile, tablet, desktop)

### Performance Optimization
- Lightweight design with minimal assets
- Image optimization for faster load times
- Efficient caching through GitHub Pages
