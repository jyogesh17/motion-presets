# 🎭 Framer Motion Templates & Presets

[![npm version](https://badge.fury.io/js/motion-presets.svg)](https://www.npmjs.com/package/motion-presets)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-Compatible-black.svg)](https://nextjs.org/)

**50+ Ready-to-use Framer Motion Templates & Examples.** Transform complex Framer Motion code into simple one-line components. Perfect for modals, page transitions, and UI animations.

Transform this complex Framer Motion code:
```jsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, delay: 0.3 }}
>
  <Card />
</motion.div>
```

Into this simple one-liner:
```jsx
<Reveal preset="fadeInUp" delay={0.3}>
  <Card />
</Reveal>
```

## ✨ Features

- 🎯 **50+ Animation Presets** - fadeIn, slideIn, bounce, rotate, and more
- 🚀 **One-Line Usage** - No complex configuration needed
- 📱 **Fully Responsive** - Works on all screen sizes
- ♿ **Accessibility First** - Respects `prefers-reduced-motion`
- 🔧 **TypeScript Ready** - Full type safety out of the box
- ⚡ **Next.js Compatible** - SSR/SSG ready with zero config
- 🎨 **Highly Customizable** - Override any property you need
- 🪶 **Lightweight** - Only 35KB gzipped
- 🌳 **Tree Shakeable** - Import only what you use

## 📦 Installation

```bash
npm install motion-presets framer-motion
```

```bash
yarn add motion-presets framer-motion
```

```bash
pnpm add motion-presets framer-motion
```

> **Note:** `framer-motion` is a peer dependency and must be installed separately.

## 🚀 Quick Start

### Basic Usage

```jsx
import { Reveal } from 'motion-presets'

function App() {
  return (
    <div>
      <Reveal preset="fadeIn">
        <h1>Hello World!</h1>
      </Reveal>
      
      <Reveal preset="slideInUp" delay={0.2}>
        <p>This slides up after a delay</p>
      </Reveal>
      
      <Reveal preset="zoomIn" delay={0.4}>
        <button>Zoom in button</button>
      </Reveal>
    </div>
  )
}
```

### With Next.js App Router

```jsx
'use client'

import { Reveal, Stagger } from 'motion-presets'

export default function Page() {
  return (
    <div>
      <Reveal preset="fadeInUp">
        <h1>Server-Side Rendered</h1>
      </Reveal>
      
      <Stagger preset="slideInLeft" staggerChildren={0.1}>
        {items.map(item => (
          <div key={item.id}>{item.content}</div>
        ))}
      </Stagger>
    </div>
  )
}
```

## 🎨 Available Presets

### Entrance Animations
- `fadeIn`, `fadeInUp`, `fadeInDown`, `fadeInLeft`, `fadeInRight`
- `slideInUp`, `slideInDown`, `slideInLeft`, `slideInRight`
- `zoomIn`, `zoomOut`
- `rotate`, `rotateIn`
- `flip`, `flipX`, `flipY`

### Physics Animations
- `springBounce`, `elasticIn`, `gravityFall`
- `pendulumSwing`, `jello`, `magneticPull`
- `rubberBandSnap`, `inertiaScroll`

### 3D Effects
- `flip3D`, `rotate3D`, `perspectiveLeft`
- `cubeRotateIn`, `door3D`, `unfold3D`
- `helix3D`, `carousel3D`

### Attention Seekers
- `bounce`, `pulse`, `shake`
- `swing`, `wobble`, `flash`

[View all presets →](https://motion-presets.dev/presets)

## 🧩 Components

### `<Reveal>`
The main component for animating elements when they come into view.

```jsx
<Reveal
  preset="fadeInUp"
  delay={0.3}
  duration={0.8}
  once={true}
  className="my-class"
>
  <YourContent />
</Reveal>
```

**Props:**
- `preset` - Animation preset name
- `delay` - Animation delay in seconds (default: 0)
- `duration` - Animation duration in seconds (default: 0.5)
- `once` - Animate only once when first visible (default: true)
- `className` - CSS class to apply

### `<Stagger>`
Animate multiple children with a staggered delay.

```jsx
<Stagger preset="fadeInUp" staggerChildren={0.1}>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</Stagger>
```

### `<AnimateText>`
Animate text character by character or word by word.

```jsx
<AnimateText 
  text="Hello World!" 
  preset="fadeIn"
  by="character"
  staggerDelay={0.05}
/>
```

## 🎛️ Advanced Usage

### Custom Animations

```jsx
import { Reveal } from 'motion-presets'

<Reveal 
  preset="fadeIn"
  customize={{
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 1, ease: "backOut" }
  }}
>
  <div>Custom animation</div>
</Reveal>
```

### Combining Multiple Presets

```jsx
import { MultiAnimation } from 'motion-presets'

<MultiAnimation
  animations={[
    { preset: 'fadeIn', delay: 0 },
    { preset: 'rotate', delay: 0.2 },
    { preset: 'bounce', delay: 0.4 }
  ]}
>
  <div>Complex animation</div>
</MultiAnimation>
```

### Using Preset Functions

```jsx
import { springBounce, fadeInUp } from 'motion-presets'

<Reveal preset={springBounce()}>
  <div>Physics-based animation</div>
</Reveal>

<Reveal preset={fadeInUp({ duration: 2 })}>
  <div>Customized preset</div>
</Reveal>
```

## ⚙️ Configuration

### Global Configuration

```jsx
import { setGlobalAnimationConfig } from 'motion-presets'

// Set global defaults
setGlobalAnimationConfig({
  defaultDuration: 0.8,
  defaultEase: 'easeOut',
  respectReducedMotion: true,
  defaultOnce: true
})
```

### Reduced Motion Support

Motion Presets automatically respects the user's `prefers-reduced-motion` setting:

```jsx
// Animations are automatically disabled for users who prefer reduced motion
<Reveal preset="fadeIn" respectReducedMotion={true}>
  <div>Accessible animation</div>
</Reveal>
```

## 🔧 TypeScript

Full TypeScript support with intelligent autocomplete:

```tsx
import { Reveal, PresetName } from 'motion-presets'

const preset: PresetName = 'fadeInUp'

interface Props {
  children: React.ReactNode
  animationType: PresetName
}

function AnimatedCard({ children, animationType }: Props) {
  return (
    <Reveal preset={animationType}>
      {children}
    </Reveal>
  )
}
```

## 📊 Bundle Size

- **Core package:** ~35KB gzipped
- **Tree-shakeable:** Import only what you use
- **Comparison:** Framer Motion is ~100KB+

```jsx
// Only imports fadeIn preset - minimal bundle impact
import { fadeIn } from 'motion-presets'
```

## 🌐 Framework Compatibility

- ✅ **Next.js** (App Router & Pages Router)
- ✅ **Vite + React**
- ✅ **Create React App**
- ✅ **Remix**
- ✅ **Gatsby**
- ✅ **Server-Side Rendering**

## 🎯 Examples

### Landing Page Hero
```jsx
<div className="hero">
  <Reveal preset="fadeInUp" delay={0.2}>
    <h1>Welcome to Our App</h1>
  </Reveal>
  <Reveal preset="fadeInUp" delay={0.4}>
    <p>The best solution for your needs</p>
  </Reveal>
  <Reveal preset="zoomIn" delay={0.6}>
    <button>Get Started</button>
  </Reveal>
</div>
```

### Card Grid
```jsx
<Stagger preset="slideInUp" staggerChildren={0.1}>
  {products.map(product => (
    <ProductCard key={product.id} product={product} />
  ))}
</Stagger>
```

### Form Validation
```jsx
<form>
  {errors.name && (
    <Reveal preset="shake" triggerOnce={false}>
      <ErrorMessage>Name is required</ErrorMessage>
    </Reveal>
  )}
</form>
```

## 🎨 Framer Motion Templates Gallery

### Modal with Framer Motion
Create beautiful animated modals with zero configuration:

```jsx
import { Reveal } from 'motion-presets'

function Modal({ isOpen, onClose, children }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <Reveal preset="fadeIn">
            <div className="modal-backdrop" onClick={onClose} />
          </Reveal>
          
          {/* Modal Content */}
          <Reveal preset="zoomIn" delay={0.1}>
            <div className="modal-content">
              {children}
            </div>
          </Reveal>
        </>
      )}
    </AnimatePresence>
  )
}
```

### Page Transition Framer Motion Snippets
Smooth page transitions for Next.js:

```jsx
import { PageTransition } from 'motion-presets'

// In your _app.js or layout
function MyApp({ Component, pageProps, router }) {
  return (
    <PageTransition key={router.pathname} preset="slideInRight">
      <Component {...pageProps} />
    </PageTransition>
  )
}

// Individual page transitions
<Reveal preset="fadeInUp" delay={0.2}>
  <h1>Welcome to the new page!</h1>
</Reveal>
```

### Carousel with Framer Motion
Interactive carousel with gesture support:

```jsx
import { Stagger, MultiAnimation } from 'motion-presets'

function ImageCarousel({ images }) {
  return (
    <div className="carousel">
      <Stagger preset="slideInLeft" staggerChildren={0.1}>
        {images.map((image, index) => (
          <MultiAnimation
            key={index}
            animations={[
              { preset: 'fadeIn', delay: 0 },
              { preset: 'zoomIn', delay: 0.2 }
            ]}
          >
            <img src={image.src} alt={image.alt} />
          </MultiAnimation>
        ))}
      </Stagger>
    </div>
  )
}
```

## 🐛 Troubleshooting

### Common Framer Motion Problems Solved

**Framer Motion Drag Constraints Not Working**
```jsx
// ❌ Common mistake - incorrect constraint setup
<motion.div drag dragConstraints={{ left: 0, right: 0 }}>
  Not working properly
</motion.div>

// ✅ Correct approach with Motion Presets
<Reveal preset="draggable" dragConstraints={{ left: -100, right: 100 }}>
  <div>Drag me within bounds!</div>
</Reveal>

// ✅ Alternative - use ref for dynamic constraints
const constraintsRef = useRef(null)
<div ref={constraintsRef}>
  <Reveal preset="draggable" dragConstraints={constraintsRef}>
    <div>Drag within parent!</div>
  </Reveal>
</div>
```

**Framer Motion Examples Not Working in Next.js**
```jsx
// ❌ Server-side rendering issues
import { motion } from 'framer-motion' // Causes hydration errors

// ✅ Use Motion Presets for SSR compatibility
'use client'
import { Reveal } from 'motion-presets'

export default function Page() {
  return (
    <Reveal preset="fadeIn">
      <div>Works perfectly with Next.js!</div>
    </Reveal>
  )
}
```

**Page Transition Framer Motion Snippet Issues**
```jsx
// ❌ Common page transition problems
<AnimatePresence>
  <Component key={router.pathname} />
</AnimatePresence>

// ✅ Working page transitions with Motion Presets
import { PageTransition } from 'motion-presets'

function MyApp({ Component, pageProps, router }) {
  return (
    <AnimatePresence mode="wait">
      <PageTransition 
        key={router.pathname} 
        preset="slideInRight"
        exitPreset="slideOutLeft"
      >
        <Component {...pageProps} />
      </PageTransition>
    </AnimatePresence>
  )
}
```

### Common Issues

**"Cannot resolve module"**
```bash
# Make sure you have framer-motion installed
npm install framer-motion
```

**SSR Hydration Issues**
```jsx
// Use 'use client' directive in Next.js components
'use client'
import { Reveal } from 'motion-presets'
```

**Animations not working**
```jsx
// Make sure the element has content or dimensions
<Reveal preset="fadeIn">
  <div style={{ minHeight: '100px' }}>
    Content here
  </div>
</Reveal>
```

**Modal with Framer Motion Not Closing Properly**
```jsx
// ✅ Proper modal animation with cleanup
import { AnimatePresence } from 'framer-motion'

function App() {
  const [isOpen, setIsOpen] = useState(false)
  
  return (
    <AnimatePresence>
      {isOpen && (
        <Reveal preset="fadeIn" onAnimationComplete={() => setIsOpen(false)}>
          <Modal onClose={() => setIsOpen(false)}>
            Modal content
          </Modal>
        </Reveal>
      )}
    </AnimatePresence>
  )
}
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## 📝 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🔗 Links

- [GitHub Repository](https://github.com/jyogesh17/motion-presets)
- [NPM Package](https://www.npmjs.com/package/motion-presets)
- [Issues & Bugs](https://github.com/jyogesh17/motion-presets/issues)

## ⭐ Show Your Support

If this project helped you, please consider giving it a ⭐ on [GitHub](https://github.com/jyogesh17/motion-presets)!

---

Made with ❤️ by [Yogesh Jadhav](https://github.com/jyogesh17)