---
name: AgriDetect
colors:
  surface: '#f4faff'
  surface-dim: '#cfdce4'
  surface-bright: '#f4faff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#e9f6fd'
  surface-container: '#e3f0f8'
  surface-container-high: '#ddeaf2'
  surface-container-highest: '#d7e4ec'
  on-surface: '#111d23'
  on-surface-variant: '#41493e'
  inverse-surface: '#263238'
  inverse-on-surface: '#e6f3fb'
  outline: '#717a6d'
  outline-variant: '#c0c9bb'
  surface-tint: '#2a6b2c'
  primary: '#00450d'
  on-primary: '#ffffff'
  primary-container: '#1b5e20'
  on-primary-container: '#90d689'
  inverse-primary: '#91d78a'
  secondary: '#006e1c'
  on-secondary: '#ffffff'
  secondary-container: '#91f78e'
  on-secondary-container: '#00731e'
  tertiary: '#3a3c2b'
  on-tertiary: '#ffffff'
  tertiary-container: '#525341'
  on-tertiary-container: '#c6c7af'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#acf4a4'
  primary-fixed-dim: '#91d78a'
  on-primary-fixed: '#002203'
  on-primary-fixed-variant: '#0c5216'
  secondary-fixed: '#94f990'
  secondary-fixed-dim: '#78dc77'
  on-secondary-fixed: '#002204'
  on-secondary-fixed-variant: '#005313'
  tertiary-fixed: '#e4e4cc'
  tertiary-fixed-dim: '#c8c8b0'
  on-tertiary-fixed: '#1b1d0e'
  on-tertiary-fixed-variant: '#474836'
  background: '#f4faff'
  on-background: '#111d23'
  surface-variant: '#d7e4ec'
typography:
  display:
    fontFamily: Inter
    fontSize: 42px
    fontWeight: '700'
    lineHeight: 52px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-caps:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.05em
  status-number:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '700'
    lineHeight: 24px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  container-margin: 24px
  gutter: 16px
  touch-target-min: 48px
  card-padding: 20px
---

## Brand & Style
The design system is built on a foundation of **Corporate Modernism** infused with **Tactile Functionalism**. It is engineered to bridge the gap between sophisticated AI data analysis and the practical, high-stakes environment of modern agriculture. The interface must feel "Government-Ready"—authoritative, stable, and precise—while remaining "Farmer-Friendly" through high legibility and approachable visual metaphors.

The aesthetic prioritizes clarity and immediate comprehension. It avoids unnecessary decorative elements, using whitespace and structural grid alignment to reduce cognitive load for users who may be operating in high-glare outdoor environments or under significant time pressure.

## Colors
The palette is rooted in the "Deep Forest" primary green, symbolizing stability and established expertise. The "Growth Green" secondary serves as the active accent for primary actions and positive progression. "Soft Earth" (#F5F5DC) is used for subtle background grounding to reduce the harshness of pure white in outdoor settings.

A strict semantic color system governs risk assessment. These colors are high-contrast to ensure they are distinguishable even on lower-quality mobile displays or under direct sunlight. Surface neutrals utilize a Blue-Grey scale to maintain a professional, technical "AI" feel without appearing cold.

## Typography
This design system utilizes **Inter** exclusively for its exceptional legibility and neutral, systematic character. The type scale is intentionally generous to accommodate users in active field environments.

- **Headlines:** Use tighter letter spacing and heavier weights to establish a clear hierarchy.
- **Body Text:** Maintains a minimum of 16px to ensure readability for older demographics and accessibility in mobile contexts.
- **Status Numbers:** Specifically defined for data points (e.g., moisture levels, pest counts) to ensure they stand out within cards.
- **Hierarchy:** Use the "Label-Caps" style for secondary metadata to prevent it from competing with primary action text.

## Layout & Spacing
The layout follows a **Fluid Grid** model with a standard 12-column structure for desktop and a 4-column structure for mobile. 

- **Touch-First Philosophy:** All interactive elements must maintain a minimum hit area of 48x48px. 
- **Information Density:** Spacing is "breathable" (20px-24px internal padding) to prevent the UI from feeling cluttered with data.
- **Safe Zones:** High-priority status indicators are always positioned in the top-right or centered within cards to ensure they are the first things seen during a "glance-and-go" check.

## Elevation & Depth
Hierarchy is established through **Tonal Layering** combined with **Ambient Shadows**. 

- **Surface Levels:** The base background uses the "Soft Earth" tone. Primary cards use a pure white surface to "pop" from the background.
- **Shadows:** Use highly diffused, low-opacity shadows (Blur: 12px, Y: 4px, Opacity: 8% Black) to create a sense of physical objects resting on a surface. This tactile feel makes the UI elements feel more interactable to non-technical users.
- **Active State:** When pressed, elements should use a slight inner shadow or a weight increase in the border to simulate physical displacement.

## Shapes
The shape language is defined by **Softened Precision**. While the system is professional, hard 90-degree corners are avoided to maintain an approachable feel.

- **Primary Cards/Inputs:** 12px (`rounded-lg`) to 16px (`rounded-xl`) corner radius.
- **Buttons:** Fully rounded (pill-shaped) for primary actions to distinguish them clearly from informational cards.
- **Status Badges:** Small 4px radius to maintain a slightly more formal, "tag-like" appearance.

## Components
- **Buttons:** Primary buttons use the "Growth Green" background with white text. Secondary buttons use a "Deep Forest" outline. Targets are large and clear.
- **Status Cards:** These are the heart of the system. They must feature a large visual icon, a clear bold metric, and a color-coded "Risk Bar" at the very top edge of the card.
- **Input Fields:** Use thick 2px borders when focused. Labels should always be visible (not floating) to ensure the user never loses context.
- **Chips/Filters:** Used for toggling between different crops or field sectors. These should be large enough to tap easily with a thumb.
- **Progress Indicators:** Use thick, rounded tracks to show growth cycles or task completion, avoiding thin, hard-to-see lines.
- **Iconography:** Use thick-stroke (2pt) "Geometric" icons. Icons should be descriptive and filled when active to provide clear visual feedback.