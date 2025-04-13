# Roo-Code Rules for peschinskiy.github.io

## Project Structure
- Follow Jekyll's standard directory structure conventions
- Keep post content in the `_posts` directory with date-prefixed filenames (YYYY-MM-DD-title-slug.md)
- Place reusable components in the `_includes` directory
- Store layout templates in the `_layouts` directory
- Organize assets in appropriate subdirectories (`/images`, `/css`, `/js`)

## Code Style
- Use 4-space indentation for all files
- Follow semantic HTML5 conventions
- Prefer CSS custom properties for theming variables
- Minimize JavaScript usage, favoring static content where possible

## Content Guidelines
- Technical posts may include code snippets with proper syntax highlighting
- Use Markdown for content formatting
- Include an introductory paragraph that stands alone as a good summary
- Use headings hierarchically (H1 for title only, H2 for major sections, etc.)
- Include relevant tags for each post to improve discoverability

## Workflow Patterns
- Test changes locally before pushing to GitHub
- Always check responsive layouts across device sizes
- Optimize images before adding to the repository
- Follow front matter standards for all content files

## Documentation guidelines
- Maintain README.md with a list of main features and technologies used

## Testing guidelines
- Write unit tests for core functionality

## Design Principles
- Maintain minimalist aesthetic while preserving usability
- Ensure high contrast for text readability
- Prioritize content over decoration
- Ensure touch targets are appropriately sized on mobile
- Maintain consistent spacing rhythm throughout the site

## Technical Decisions
- Prefer native CSS solutions over frameworks where practical
- Use system font stack for optimal performance
- Implement responsive images using srcset where appropriate
- Keep external dependencies to a minimum

## Future Considerations
- Track website performance metrics
- Consider adding dark mode support
- Evaluate need for search functionality as content grows
- Plan for internationalization if audience requires it
