# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2025-09-02

### 🎉 Initial Release

#### ✨ Added
- **50+ Animation Presets** including entrance, physics, 3D, and attention-seeking animations
- **Core Components:**
  - `<Reveal>` - Main animation component with intersection observer
  - `<Stagger>` - Staggered animations for multiple children
  - `<AnimateText>` - Character and word-by-word text animations
  - `<MultiAnimation>` - Complex animation combinations
  - `<AnimationSequence>` - Timeline-based animation sequences
  - `<AnimationComposer>` - Advanced animation choreography

#### 🎨 Animation Categories
- **Entrance Animations:** fadeIn, slideIn, zoomIn, rotate, flip variants
- **Physics Animations:** springBounce, elasticIn, gravityFall, pendulumSwing, jello, magneticPull, rubberBandSnap, inertiaScroll
- **3D Effects:** flip3D, rotate3D, perspectiveLeft, cubeRotateIn, door3D, unfold3D, helix3D, carousel3D
- **Morphing Effects:** morphCircleToSquare, morphBlob, liquidMorph, textScramble, clipReveal, gradientShift
- **Attention Seekers:** bounce, pulse, shake, swing, wobble, flash

#### 🔧 Features
- **TypeScript Support** - Full type safety with intelligent autocomplete
- **Next.js Compatibility** - SSR/SSG ready with App Router and Pages Router support
- **Accessibility** - Automatic `prefers-reduced-motion` support
- **Tree Shaking** - Import only what you need
- **Global Configuration** - Set default animation properties
- **Custom Animations** - Override any preset with custom properties
- **Responsive Design** - Works on all screen sizes
- **Zero Dependencies** (except peer dependencies)

#### 📦 Bundle
- Core package: ~35KB gzipped
- Tree-shakeable imports
- ES modules and CommonJS support
- TypeScript declarations included

#### 🌐 Framework Support
- React 16.8+ (hooks support required)
- Next.js App Router and Pages Router
- Vite + React
- Create React App
- Remix
- Gatsby
- Server-Side Rendering compatible

#### 🧪 Tested Scenarios
- Next.js App Router with SSR
- Dynamic content and state changes
- Multiple animations per page
- Production builds and optimizations
- Reduced motion preferences

### 📝 Documentation
- Comprehensive README with examples
- TypeScript type definitions
- Component prop documentation
- Next.js integration guide
- Troubleshooting section

---

## Development Notes

### Version Numbering
- `0.x.x` - Pre-release versions during initial development
- `1.0.0` - First stable release (planned after user feedback)
- `1.x.x` - Feature additions and improvements
- `2.x.x` - Major breaking changes (if needed)

### Upcoming Features (Roadmap)
- [ ] React 19 compatibility
- [ ] Additional physics presets
- [ ] Scroll-triggered animations
- [ ] Advanced easing functions
- [ ] Performance optimizations
- [ ] Animation recording/playback
- [ ] Visual animation builder (premium)

### Known Limitations
- Requires Framer Motion as peer dependency
- Client-side only animations (no CSS-based fallbacks)
- Intersection Observer API required (modern browsers)

---

*For the latest updates and documentation, visit [motion-presets.dev](https://motion-presets.dev)*