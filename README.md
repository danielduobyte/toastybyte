# ToastyByte

A modern, professional toast notification library for React and Next.js with **zero dependencies**.

## Features

- **Zero Dependencies**: No external CSS frameworks or animation libraries required - pure CSS animations
- **14 Design Presets**: Modern, Minimal, Neomorphic, Playful, Brutalist, Premium, Gradient, Outlined, Terminal, 3D, Cyberpunk, Oldschool, Steampunk, and Pastel
- **Light & Dark Themes**: Manual control about design presets based on the project fitting
- **Fully Responsive**: Auto-centers on mobile devices, respects positioning on desktop
- **Multiple Positions**: Display toasts in 6 different positions (top/bottom × left/center/right)
- **4 Variants**: Pre-styled success, error, warning, and info toasts with icons
- **12 Transitions**: Slide, fade, scale, bounce, flip, zoom, blur, swing, rotate, elastic, drop, and roll animations
- **Description Field**: Add secondary text below the main message for detailed context
- **Font Sizing System**: Predefined size scale (xs-xxl) with separate title/description control
- **Auto-dismiss**: Configurable duration with automatic removal and pause on hover
- **Progress Bar**: Visual countdown indicator
- **TypeScript**: Full type safety with exported types
- **Compatibility**: Compatible with React and Next.js

## Installation

```bash
npm install toastybyte
# or
yarn add toastybyte
# or
pnpm add toastybyte
```

## Setup

### 1. Import the CSS

The components needs to be imported once in your application. Choose the method that works best for your setup:

#### Next.js App Router (app/layout.tsx)

```tsx
import { ToastProvider, ToastContainer } from 'toastybyte';
import 'toastybyte/styles.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ToastProvider>
          {children}
          <ToastContainer />
        </ToastProvider>
      </body>
    </html>
  );
}
```

#### Next.js Pages Router (pages/_app.tsx)

```tsx
import { ToastProvider, ToastContainer } from 'toastybyte';
import 'toastybyte/styles.css';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ToastProvider>
      <Component {...pageProps} />
      <ToastContainer />
    </ToastProvider>
  );
}
```

#### React (main.tsx / index.tsx)

```tsx
import { ToastProvider, ToastContainer } from 'toastybyte';
import 'toastybyte/styles.css';
import ReactDOM from 'react-dom/client';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ToastProvider>
    <App />
    <ToastContainer />
  </ToastProvider>
);
```

## Usage

### Basic Usage

```tsx
'use client'; // Add this for Next.js App Router

import { useToast } from 'toastybyte';

export default function MyComponent() {
  const { success, error, warning, info } = useToast();

  return (
    <div>
      <button onClick={() => success('Operation successful!')}>
        Success Toast
      </button>
      <button onClick={() => error('Something went wrong!')}>
        Error Toast
      </button>
      <button onClick={() => warning('Be careful!')}>
        Warning Toast
      </button>
      <button onClick={() => info('Here is some info')}>
        Info Toast
      </button>
    </div>
  );
}
```

### Design Presets & Themes

```tsx
const { success } = useToast();

// Use a specific design preset
success('Payment successful!', {
  design: 'cyberpunk', // or 'modern', 'brutalist', 'pastel', etc.
  theme: 'dark', // 'light', 'dark', or 'auto'
});

// Different designs showcase
success('Modern design', { design: 'modern' });
success('Minimal design', { design: 'minimal' });
success('Neomorphic design', { design: 'neomorphic' });
success('Playful design', { design: 'playful' });
success('Brutalist design', { design: 'brutalist' });
success('Premium design', { design: 'premium' });
success('Gradient design', { design: 'gradient' });
success('Outlined design', { design: 'outlined' });
success('Terminal design', { design: 'terminal' });
success('3D design', { design: 'threed' });
success('Cyberpunk design', { design: 'cyberpunk' });
success('Oldschool design', { design: 'oldschool' });
success('Steampunk design', { design: 'steampunk' });
success('Pastel design', { design: 'pastel' });
```

### Custom Position

```tsx
const { success } = useToast();

success('Saved!', {
  position: 'bottom-right', // or 'top-left', 'top-center', etc.
});
```

### Custom Transitions

```tsx
const { info } = useToast();

// Different animation transitions
info('Slide animation', { transition: 'slide' });
info('Fade animation', { transition: 'fade' });
info('Scale animation', { transition: 'scale' });
info('Bounce animation', { transition: 'bounce' });
info('Flip animation', { transition: 'flip' });
info('Zoom animation', { transition: 'zoom' });
info('Blur animation', { transition: 'blur' });
info('Swing animation', { transition: 'swing' });
info('Rotate animation', { transition: 'rotate' });
info('Elastic animation', { transition: 'elastic' });
info('Drop animation', { transition: 'drop' });
info('Roll animation', { transition: 'roll' });
```

### Custom Duration

```tsx
const { info } = useToast();

// Show for 3 seconds
info('Quick message', { duration: 3000 });

// Show indefinitely (manual dismiss only)
info('Sticky message', { duration: 0 });
```

### Description Field

Add secondary text below the main message:

```tsx
const { success, error } = useToast();

// Success with description
success('Upload Complete', {
  description: 'Your file has been uploaded successfully and is now processing',
});

// Error with detailed description
error('Connection Failed', {
  description: 'Unable to connect to the server. Please check your internet connection and try again.',
});

// Info with description
info('New Update Available', {
  description: 'Version 2.0 is ready to install. Click here to update now.',
});
```

### Advanced Example

```tsx
const { toast } = useToast();

// Full control with all options
toast('Complex notification', {
  variant: 'success',
  description: 'Your changes have been saved successfully',
  position: 'top-center',
  duration: 5000,
  design: 'premium',
  theme: 'dark',
  transition: 'bounce',
  showProgressBar: true,
  showCloseButton: true,
  pauseOnHover: true,
});
```

## API Reference

### `useToast()`

Returns an object with the following methods:

- `toast(message, options?)` - Show a toast with full control
- `success(message, options?)` - Show a success toast
- `error(message, options?)` - Show an error toast
- `warning(message, options?)` - Show a warning toast
- `info(message, options?)` - Show an info toast

### Options

```typescript
interface ToastOptions {
  variant?: 'success' | 'error' | 'warning' | 'info';
  position?: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
  duration?: number; // milliseconds, 0 for no auto-dismiss
  design?: 'modern' | 'minimal' | 'neomorphic' | 'playful' | 'brutalist' | 'premium' | 'gradient' | 'outlined' | 'terminal' | 'threed' | 'cyberpunk' | 'oldschool' | 'steampunk' | 'pastel';
  theme?: 'light' | 'dark' | 'auto';
  transition?: 'slide' | 'fade' | 'scale' | 'bounce' | 'flip' | 'zoom' | 'blur' | 'swing' | 'rotate' | 'elastic' | 'drop' | 'roll';
  description?: string;
  icon?: React.ReactNode;
  showProgressBar?: boolean;
  showCloseButton?: boolean;
  pauseOnHover?: boolean;
  style?: ToastStyle; // Custom styling
}
```

## Positions

ToastyByte supports 6 positions:

- `top-left`
- `top-center`
- `top-right`
- `bottom-left`
- `bottom-center`
- `bottom-right` (default)

## Variants

- **success**: Green with checkmark icon
- **error**: Red with X icon
- **warning**: Yellow with warning icon
- **info**: Blue with info icon (default)

## Design Presets

ToastyByte includes 14 designed presets:

1. **modern** - Sleek glassmorphism with gradients
2. **minimal** - Clean and simple
3. **neomorphic** - Soft 3D shadows
4. **playful** - Fun and colorful
5. **brutalist** - Bold and stark
6. **premium** - Elegant and luxurious
7. **gradient** - Vibrant gradients
8. **outlined** - Transparent with borders
9. **terminal** - Developer-inspired
10. **threed** - Elevated with shadows
11. **cyberpunk** - Neon futuristic
12. **oldschool** - Retro vibes
13. **steampunk** - Vintage industrial
14. **pastel** - Soft and gentle

## Custom Styling

You can customize individual toasts with custom styles:

```tsx
success('Custom styled toast', {
  style: {
    borderRadius: '0.5rem',
    backdropBlur: 'lg',
    colors: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      border: '#667eea',
      text: '#ffffff',
    },
    font: {
      family: 'monospace',
      size: '16px',
      weight: 600,
    },
  },
});
```

### Font Sizing System

ToastyByte includes a predefined font size scale that you can use for consistent typography:

```tsx
const { success, info } = useToast();

// Use predefined sizes: xs, sm, md, lg, xl, xxl
success('Large Title', {
  style: {
    font: {
      titleSize: 'xl',        // Extra large title
      descriptionSize: 'md',  // Medium description
    },
  },
});

// Separate control for title and description
info('Custom Typography', {
  description: 'This description is extra small',
  style: {
    font: {
      titleSize: 'lg',        // 16px
      descriptionSize: 'xs',  // 10px
    },
  },
});

// Or use custom values
success('Custom Sizes', {
  description: 'With custom pixel values',
  style: {
    font: {
      titleSize: '20px',      // Custom pixel value
      descriptionSize: '1rem', // Custom rem value
      weight: 700,
    },
  },
});

// Available predefined sizes:
// xs   = 10px
// sm   = 12px (default for description)
// md   = 14px (default for title)
// lg   = 16px
// xl   = 18px
// xxl  = 20px
```

### Advanced Font Customization

```tsx
success('Stylized Text', {
  description: 'With text stroke effect',
  style: {
    font: {
      family: '"Comic Sans MS", cursive',
      titleSize: 'xxl',
      descriptionSize: 'sm',
      weight: 900,
      strokeWidth: '1px',      // Text outline
      strokeColor: '#000000',  // Outline color
    },
  },
});
```

## TypeScript

ToastyByte is written in TypeScript and includes full type definitions. All types are exported:

```typescript
import type {
  Toast,
  ToastVariant,
  ToastPosition,
  ToastOptions,
  ToastTransition,
  ToastTheme,
  DesignType
} from 'toastybyte';
```
## Browser Support

ToastyByte works in all modern browsers that support ES2020:

- Chrome/Edge 80+
- Firefox 72+
- Safari 13.1+
- Opera 67+

## License

MIT
