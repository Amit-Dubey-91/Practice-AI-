# Shopify Theme Development Guidelines

## 1. Project Objective

Build the Shopify storefront from the supplied Figma design using the
**existing Shopify theme**.

-   Figma design: [E-commerce Website
    Template](https://www.figma.com/design/yc0whZoQibxwaM6lUk2deY/E-commerce-Website-Template--Freebie---Community-?node-id=0-1&p=f&t=0mYTTrKzpS52zob8-0)
-   Implement the design section by section.
-   Match the supplied desktop and mobile designs as closely as
    possible.
-   Use Shopify Liquid, HTML, CSS, and vanilla JavaScript.
-   Do not use React, Next.js, Vue, or another frontend framework.
-   Do not build the entire storefront in one pass. Only work on the
    section explicitly requested by the user.

The Figma file contains desktop and mobile designs for the storefront,
including the homepage, product detail page, category/collection page,
cart, and filters. Before implementing a page or section, inspect the
relevant Figma frame and its desktop/mobile variants where available.

## 2. Mandatory Workflow: One Section at a Time

For every section, follow this workflow:

1.  **Inspect the existing theme**
    -   Identify the theme structure, current templates, sections,
        snippets, assets, and existing conventions.
    -   Reuse existing functionality when it is suitable.
    -   Do not replace or refactor unrelated theme code.
2.  **Inspect the relevant Figma frame**
    -   Review layout, dimensions, spacing, typography, colors, borders,
        shadows, imagery, and interactions.
    -   Check desktop and mobile variants.
    -   Identify responsive changes rather than simply shrinking the
        desktop layout.
3.  **Share a short implementation plan**
    -   List the Liquid section, CSS file, JavaScript file (if needed),
        and reusable snippets involved.
    -   Mention any theme settings or Shopify data required.
    -   Identify unclear or missing design details instead of inventing
        them.
4.  **Implement only the requested section**
    -   Create or update its Liquid, CSS, and JavaScript files.
    -   Use reusable snippets and global design tokens.
    -   Keep the implementation compatible with Shopify's theme editor.
5.  **Verify the implementation**
    -   Check desktop and mobile layouts.
    -   Check interactions, console errors, network errors, and
        Liquid/schema validity.
    -   Make focused fixes without changing unrelated sections.
6.  **Summarize the result**
    -   List files created or modified.
    -   Explain what was implemented and what remains.
    -   Do not claim visual verification unless it was actually
        performed.

Wait for the user's next instruction before moving to another section or
page.

## 3. Technology and Implementation Rules

-   Use Shopify Liquid for sections, templates, snippets, settings, and
    Shopify data.
-   Use semantic HTML5.
-   Use plain CSS; do not introduce a CSS framework unless the user
    explicitly requests it.
-   Favor modern layout primitives (CSS flexbox, grid, and gap) to
    control spacing between elements. Keep margins and paddings minimal,
    reserving padding for structural container gutters and interactive
    touch targets. Avoid stacking margins between sibling elements.
-   Use vanilla JavaScript. Do not add jQuery or other dependencies
    unless the existing theme already requires them and there is a clear
    reason.
-   Use Shopify objects and storefront data dynamically. Do not hardcode
    product names, prices, variants, images, availability, cart values,
    or collection content when Shopify data is available.
-   Use section schema settings and blocks for content that should be
    editable in the Shopify theme editor.
-   Ensure sections can be added, removed, reordered, and configured in
    the theme editor where appropriate.
-   Use unique, namespaced class names to avoid conflicts with existing
    theme styles.
-   Follow the existing theme's conventions after inspecting them. Do
    not assume the theme is Dawn or replace the current theme
    architecture.
-   Do not use inline CSS or inline JavaScript for normal component
    styling or behavior. Keep styles and scripts in their designated
    assets.
-   Avoid unnecessary dependencies, duplicated code, excessive DOM
    manipulation, and broad CSS selectors.
-   Do not edit generated, vendor, or app-managed code unless explicitly
    required.

## 4. File and Naming Structure

Each independently implemented section must have its own Liquid, CSS,
and JavaScript files, using the **same section handle**.

Example for a hero section:

``` text
sections/
  hero.liquid

assets/
  hero.css
  hero.js
```

Example for a testimonials section:

``` text
sections/
  testimonials.liquid

assets/
  testimonials.css
  testimonials.js
```

Rules:

-   Use a consistent project prefix such as \`\` for newly created files
    and classes, unless the existing theme uses another established
    convention.
-   The Liquid section filename, CSS filename, and JS filename must
    share the same handle.
-   Create the JavaScript file only when the section needs JavaScript
    behavior. If no JavaScript is needed, do not create an empty file.
-   Load each section's CSS and JavaScript without causing duplicate
    asset requests when multiple instances of that section are present.
-   Prefer loading section-specific assets from the relevant section
    Liquid file using Shopify asset filters, with JavaScript deferred.
    Follow the theme's existing asset-loading conventions if they
    provide a reliable equivalent.
-   Do not load every section's JavaScript globally when it is not
    needed.
-   Keep global assets separate from section-specific assets.

## 5. Reusable Snippets and Components

Create reusable snippets for components that appear in multiple places.
Do not duplicate the same markup and logic across sections.

Examples:

``` text
snippets/
  product-card.liquid
  product-grid.liquid
  price.liquid
  rating.liquid
  fonts.liquid
  colors.liquid
  sizes.liquid
```

The exact filenames may be adjusted to match existing theme naming
conventions, but keep names consistent.

### Product card

-   Build a reusable product-card snippet and use it wherever product
    cards are needed, such as new arrivals, best sellers, collection
    grids, and related products.
-   Accept the product object and any required options through snippet
    parameters.
-   Use Shopify product data for title, image, price, compare-at price,
    URL, and availability.
-   Handle missing product images and optional data gracefully.
-   Keep card-specific presentation configurable where necessary without
    duplicating the component.

### Product grid

-   Build a reusable product-grid snippet when the same grid structure
    is required in multiple contexts.
-   Allow the caller to pass the product collection/list and relevant
    layout options.
-   Keep collection-specific filtering, sorting, and pagination behavior
    in the appropriate page/section logic, not hidden inside a generic
    card.

### Other reusable UI

Create snippets for repeated elements when useful, such as price
display, rating display, icons, badges, and other repeated components.
Avoid creating a snippet for markup that is used only once unless it
materially improves clarity.

## 6. Global Design System

Create a small global design system before building page sections. Keep
design values centralized so they can be updated consistently.

Create separate snippets for:

-   `fonts.liquid` --- font loading and font-face declarations/preloads
    where appropriate.
-   `colors.liquid` --- global color custom properties.
-   `sizes.liquid` --- typography sizes, spacing scale, radii, and other
    shared size tokens.

Include these global snippets in `layout/theme.liquid` in a clear,
organized location. Ensure they are included only once.

Use CSS custom properties for shared values. Example naming approach:

``` css
:root {
  --color-text: #111111;
  --color-background: #ffffff;
  --color-muted: #f2f0f0;
  --color-border: #e8e8e8;

  --font-body: sans-serif;
  --font-heading: sans-serif;

  --container-max: 1440px;
  --page-gutter-desktop: 100px;
  --page-gutter-mobile: 16px;
}
```

These are naming examples, not final design values. Extract actual font
families, font weights, colors, font sizes, line heights, and spacing
from Figma. Do not assume the example values are the final design
tokens.

### Global CSS

Create or reuse a global stylesheet for:

-   Base/reset styles, only where needed and without breaking existing
    theme styles.
-   Typography defaults.
-   Shared container behavior.
-   Shared utility classes.
-   Common layout primitives.

Load the global design-system snippets and shared styles from
`layout/theme.liquid`. Avoid repeating global declarations inside
individual sections.

## 7. Container and Responsive Layout

### Desktop reference

The desktop Figma frame is **1440px** wide.

-   Use a centered page container with `max-width: 1440px`.
-   Apply `100px` left and right internal padding at the 1440px desktop
    reference width.
-   Use `box-sizing: border-box` consistently.
-   At viewports wider than 1440px, keep the container centered.
-   Do not add another 100px margin outside a 1440px container. The
    100px is the container's horizontal internal padding.

Suggested starting pattern:

``` css
.container {
  width: 100%;
  max-width: 1440px;
  margin-inline: auto;
  padding-inline: 100px;
  box-sizing: border-box;
}
```

### Mobile reference

The mobile Figma frame is **390px** wide.

-   Use `16px` left and right page padding at the 390px reference width.
-   Ensure the page does not overflow horizontally.
-   Reflow grids, navigation, cards, typography, images, and spacing to
    match the mobile frame.
-   Do not merely scale down the desktop layout.
-   Preserve the intended content order and interaction behavior.

Suggested mobile container behavior:

``` css
@media (max-width: 767px) {
  .container {
    padding-inline: 16px;
  }
}
```

### Required breakpoints

Use these standard breakpoints consistently:

``` css
/* Tablet and smaller desktop */
@media (max-width: 1024px) {
}

/* Mobile */
@media (max-width: 767px) {
}

/* Small mobile */
@media (max-width: 390px) {
}
```

-   Write base styles for desktop first, then add responsive overrides
    in descending breakpoint order.
-   Use the breakpoints where the layout actually needs to change; do
    not add empty or unnecessary media queries.
-   At exactly 390px, the small-mobile query applies. Ensure the 390px
    Figma reference still uses the intended 16px gutters.
-   Test intermediate widths as well as the exact Figma frame widths.
-   If the existing theme already defines a breakpoint system, reconcile
    it with these required breakpoints rather than introducing
    conflicting duplicate breakpoints.

## 8. Buttons: Primary and Secondary

Define shared button styles in a global stylesheet, for example:

``` text
assets/buttons.css
```

Create two reusable button variants:

-   `.b-primary`
-   `.b-secondary`

Use a common base class such as `.btn` for shared typography, alignment,
dimensions, border radius, transitions, and interaction behavior.

Requirements:

-   Extract the actual button colors, dimensions, typography, border
    radius, and other visual properties from Figma.
-   Match the two button types shown in the design.
-   Define consistent `:hover`, `:focus-visible`, `:active`, and
    `:disabled` states.
-   Provide a clearly visible keyboard focus indicator.
-   Maintain sufficient text/background contrast.
-   Use semantic `<button>` elements for actions and `<a>` elements for
    navigation.
-   Do not use clickable `<div>` elements.
-   Reuse the shared classes instead of redefining button styles inside
    each section.
-   Load the shared button stylesheet once from `layout/theme.liquid`.

## 9. Accessibility

-   Use semantic landmarks and heading levels in a logical order.
-   Use descriptive `alt` text for meaningful images; use empty alt text
    for decorative images.
-   Ensure interactive elements are keyboard accessible.
-   Provide visible focus styles using `:focus-visible`.
-   Use accessible names for icon-only buttons.
-   Use correct labels and associations for form fields.
-   Do not add ARIA attributes where native HTML semantics already
    provide the required behavior.
-   Do not place focusable elements inside `aria-hidden="true"`
    elements.
-   Ensure menus, dialogs, sliders, and other interactive controls
    expose appropriate state and keyboard behavior.
-   Respect reduced-motion preferences when adding nonessential
    animation.

## 10. JavaScript Rules

-   Add JavaScript only when required for interaction.
-   Keep each section's behavior in its matching asset file, for example
    `assets/hero.js`.
-   Scope selectors to the section root. Do not use broad selectors that
    affect other sections.
-   Support multiple instances of the same section on a page.
-   Initialize safely when Shopify dynamically reloads sections in the
    theme editor.
-   Clean up event listeners when appropriate.
-   Avoid global variables. If a global namespace is genuinely required,
    use a project-specific namespace.
-   Avoid duplicate event listeners and duplicate analytics or
    interaction events.
-   Handle missing DOM elements safely.
-   Do not use inline event attributes such as `onclick`.
-   Do not add a JavaScript library for a simple interaction that can be
    implemented with vanilla JavaScript.

## 11. Shopify Liquid and Theme Editor Requirements

-   Use valid Liquid syntax and valid section schema JSON.
-   Give settings clear labels, sensible defaults, and appropriate input
    types.
-   Use blocks for repeatable content when appropriate.
-   Use Shopify image filters and responsive image techniques rather
    than unnecessarily serving oversized images.
-   Use `image_url` and `image_tag` appropriately, with meaningful alt
    text.
-   Use Shopify routes and objects rather than hardcoded storefront URLs
    wherever possible.
-   Use `routes.cart_url`, `routes.search_url`, product URLs, and other
    Shopify-provided routes as appropriate.
-   Ensure product variants, prices, compare-at prices, and availability
    reflect live Shopify data.
-   Do not hardcode product content from the Figma mockup into
    production Liquid.
-   Keep section settings and block IDs stable when editing existing
    sections to avoid unnecessarily breaking merchant content.
-   Do not remove existing theme settings, app integrations, or
    functionality without explicit approval.

## 12. Performance

-   Avoid loading unnecessary JavaScript or CSS.
-   Avoid duplicate asset loading.
-   Use responsive images and appropriate image sizes.
-   Lazy-load below-the-fold images where appropriate.
-   Do not lazy-load the primary above-the-fold hero/LCP image; use
    suitable high-priority loading only where justified.
-   Avoid layout shifts by providing image dimensions or aspect ratios.
-   Avoid excessive DOM nesting and expensive scroll/resize handlers.
-   Use event delegation when it makes the implementation simpler and
    more efficient.
-   Do not add third-party libraries without a clear need.

## 13. Visual QA Checklist

For each completed section, verify:

-   [ ] Desktop layout matches the relevant Figma frame at 1440px.
-   [ ] Desktop container is centered and uses the intended 100px
    horizontal padding.
-   [ ] Mobile layout matches the relevant Figma frame at 390px.
-   [ ] Mobile horizontal padding is 16px.
-   [ ] Layout adapts correctly at 1024px, 767px, and 390px.
-   [ ] Typography, colors, spacing, borders, radii, and shadows match
    the design.
-   [ ] Images use the correct crop, aspect ratio, and positioning.
-   [ ] Buttons use the shared primary/secondary classes and have
    hover/focus states.
-   [ ] Reusable snippets are used instead of duplicated markup.
-   [ ] Shopify data is dynamic wherever applicable.
-   [ ] Theme editor settings and blocks work as expected.
-   [ ] No horizontal overflow is introduced.
-   [ ] No console errors, Liquid errors, or avoidable network errors
    are present.
-   [ ] Existing unrelated theme functionality remains intact.

## 14. Change Management and Reporting

-   Before editing, inspect the relevant files and explain the intended
    changes briefly.
-   Make small, focused changes.
-   Do not overwrite existing files blindly. Read and understand them
    first.
-   Do not modify unrelated sections, templates, settings, or global
    styles while implementing a single section unless the change is
    required and explained.
-   Do not remove existing code just because it is unfamiliar.
-   If a requested change requires a global adjustment, explain the
    impact before applying it.
-   After implementation, report:
    1.  What was implemented.
    2.  Files created or modified.
    3.  Reusable snippets or global assets used.
    4.  Responsive behavior and interactions added.
    5.  Verification performed.
    6.  Any remaining gaps or questions.

## 15. Critical Instruction for the Agent

**Work only on the section the user currently asks for.**

Do not automatically implement all homepage sections, all templates, or
the full website. Do not jump to the next section after finishing one.
First complete the requested section, verify it, summarize the result,
and wait for the user's next instruction.

If Figma details are unavailable, do not pretend to have inspected them.
Ask the user for the relevant frame screenshot or design details. Never
invent design measurements or assets and present them as Figma
specifications.
