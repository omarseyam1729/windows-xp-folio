# Windows XP Portfolio

A pixel-perfect Windows XP-themed portfolio built with React 19, Vite, and Tailwind CSS.

**Note:** This entire portfolio was vibe coded - built with creative flow and intuitive development rather than strict planning. Every component, interaction, and pixel was crafted in the moment.

## Features

- 🪟 Classic Windows XP desktop interface
- 📱 Draggable windows with minimize/maximize/close functionality
- 🎨 Pixel-perfect Windows XP styling
- 🖱️ Interactive desktop icons
- 📋 Start menu navigation
- 📊 Taskbar with window management

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
windows-xp-folio/
├── src/
│   ├── components/      # Windows XP UI components
│   │   ├── Desktop.jsx
│   │   ├── DesktopIcon.jsx
│   │   ├── StartMenu.jsx
│   │   ├── Taskbar.jsx
│   │   └── Window.jsx
│   ├── pages/          # Portfolio pages
│   │   ├── About.jsx
│   │   ├── Projects.jsx
│   │   └── Contact.jsx
│   ├── App.jsx         # Main app component
│   ├── main.jsx        # React entry point
│   └── index.css       # Global styles
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.js
```

## Customization

### Update Portfolio Content

Edit the files in `src/pages/`:
- `About.jsx` - Your about section
- `Projects.jsx` - Your projects showcase
- `Contact.jsx` - Your contact information

### Windows XP Colors

The Windows XP color palette is defined in `tailwind.config.js`. You can customize colors there.

## Technologies Used

- **React 19** - Latest React with improved performance and new features
- **Vite** - Lightning-fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework for rapid UI development
- **React Router DOM** - Declarative routing for React applications

## Development Philosophy

This portfolio was **entirely vibe coded** - meaning it was built through creative flow, intuitive decision-making, and spontaneous implementation rather than rigid planning. Every feature, from draggable icons to the Paint app, emerged organically during development. The codebase reflects a natural, iterative approach to building something fun and nostalgic.

## License

MIT

