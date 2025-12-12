# Media Streaming Platform - Design Style Guide

## Design Philosophy

### Color Palette
- **Primary**: Deep charcoal (#1a1a1a) and rich black (#0d0d0d) for main backgrounds
- **Accent**: Electric blue (#00d4ff) for interactive elements and highlights
- **Secondary**: Warm gold (#ffb700) for premium features and ratings
- **Text**: Pure white (#ffffff) for primary text, light gray (#b3b3b3) for secondary text
- **Success**: Emerald green (#10b981) for watched indicators and confirmations

### Typography
- **Display Font**: "Canela" - Bold serif for cinematic headings and hero text
- **Body Font**: "Suisse Int'l" - Clean sans-serif for navigation and content
- **Accent Font**: "JetBrains Mono" - Monospace for technical details and timestamps

### Visual Language
- **Cinematic Depth**: Layered shadows and subtle gradients create immersive depth
- **Premium Materials**: Glass morphism effects and soft glows for interactive elements
- **Motion Design**: Smooth 60fps animations with easing curves inspired by Netflix
- **Content-First**: Minimal UI chrome that doesn't compete with movie artwork

## Visual Effects & Animation

### Core Libraries Implementation
1. **Anime.js**: Smooth page transitions, button hover states, loading animations
2. **Pixi.js**: Particle effects for background ambiance and hero section
3. **ECharts.js**: Analytics dashboard with custom dark theme visualizations
4. **Splide.js**: Infinite carousel for featured content and movie collections
5. **Typed.js**: Typewriter effect for hero taglines and dynamic text
6. **Splitting.js**: Letter-by-letter text animations for section headers
7. **Matter.js**: Floating movie poster physics in background
8. **Shader-park**: Volumetric lighting effects behind hero content

### Header Effects
- **Aurora Gradient Flow**: Animated background using CSS gradients and transforms
- **Floating Particles**: Subtle dust motes and light rays using Pixi.js
- **Parallax Layers**: Multi-depth scrolling with movie poster silhouettes

### Text Effects
- **Typewriter Hero Text**: Main tagline appears with typing animation
- **Color Cycling Emphasis**: Key words pulse with electric blue highlights
- **Split Letter Stagger**: Section headers animate in letter by letter
- **Gradient Text Animation**: Premium features have animated gold gradients

### Interactive Elements
- **3D Tilt Hover**: Movie cards lift and tilt on hover with shadow expansion
- **Glow Expansion**: Buttons and links get electric blue glow on interaction
- **Ripple Effects**: Click feedback with expanding blue circles
- **Morphing Icons**: Play button transforms to pause with smooth transitions

### Background Styling
- **Consistent Dark Theme**: Deep charcoal background throughout all pages
- **Subtle Texture**: Film grain overlay for cinematic authenticity
- **Gradient Overlays**: Blue-to-purple gradients on section dividers
- **Floating Elements**: Movie-related particles and light effects

## Component Styling

### Navigation Bar
- **Glass Morphism**: Semi-transparent with backdrop blur
- **Floating Design**: Elevated above content with soft shadow
- **Active States**: Smooth underline animations for current page

### Movie Cards
- **Aspect Ratio**: 2:3 portrait for movie posters
- **Hover States**: Scale up 1.05x with shadow expansion
- **Overlay Info**: Gradient mask reveals title and rating on hover
- **Play Button**: Centered overlay with pulsing glow effect

### Video Player
- **Custom Controls**: Dark theme with glass morphism
- **Progress Bar**: Gradient fill with smooth scrubbing
- **Quality Selector**: Dropdown with resolution options
- **Subtitle Toggle**: Animated CC icon with state changes

### Filter System
- **Pill Design**: Rounded buttons with active/inactive states
- **Smooth Transitions**: Filter changes animate content reorganization
- **Search Bar**: Expanding input with focus glow

### Loading States
- **Skeleton Screens**: Animated placeholders for content loading
- **Progress Indicators**: Circular progress with percentage
- **Buffering Animation**: Pulsing dots for video loading

This design system creates a premium streaming experience that feels both familiar and innovative, combining the best of Netflix's usability with unique visual flair that showcases your personal movie collection beautifully.