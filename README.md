# 🎭 Motion Presets

[![npm version](https://badge.fury.io/js/%40motion-presets%2Fcore.svg)](https://www.npmjs.com/package/@motion-presets/core)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-Compatible-black.svg)](https://nextjs.org/)

**Beautiful React animations made simple.** One-line animation presets built on [Framer Motion](https://www.framer.com/motion/).

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
npm install @motion-presets/core framer-motion
```

```bash
yarn add @motion-presets/core framer-motion
```

```bash
pnpm add @motion-presets/core framer-motion
```

> **Note:** `framer-motion` is a peer dependency and must be installed separately.

## 🚀 Quick Start

### Basic Usage

```jsx
import { Reveal } from '@motion-presets/core'

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

import { Reveal, Stagger } from '@motion-presets/core'

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
import { Reveal } from '@motion-presets/core'

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
import { MultiAnimation } from '@motion-presets/core'

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
import { springBounce, fadeInUp } from '@motion-presets/core'

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
import { setGlobalAnimationConfig } from '@motion-presets/core'

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
import { Reveal, PresetName } from '@motion-presets/core'

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
import { fadeIn } from '@motion-presets/core'
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

## 🐛 Troubleshooting

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
import { Reveal } from '@motion-presets/core'
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

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## 📝 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🔗 Links

- [Documentation](https://motion-presets.dev)
- [Interactive Playground](https://motion-presets.dev/playground)
- [GitHub Repository](https://github.com/yourusername/motion-presets)
- [NPM Package](https://www.npmjs.com/package/@motion-presets/core)
- [Issues & Bugs](https://github.com/yourusername/motion-presets/issues)

## ⭐ Show Your Support

If this project helped you, please consider giving it a ⭐ on [GitHub](https://github.com/yourusername/motion-presets)!

---

Made with ❤️ by [Your Name](https://github.com/yourusername)