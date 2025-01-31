# Gulp Tailwind Project

A modern web development boilerplate using Gulp and Tailwind CSS for efficient development workflow.

## 📁 Project Structure
```
gulp-tailwind-project/
├── src/                  # Source files
│   ├── styles/          # Tailwind CSS styles
│   │   ├── main.css     # Main CSS file
│   │   ├── components/  # Component styles
│   │   └── utilities/   # Custom utilities
│   ├── scripts/         # JavaScript files
│   │   ├── main.js      # Main JS file
│   │   └── components/  # JS components
│   ├── templates/       # EJS templates
│   │   ├── partials/    # Reusable parts
│   │   └── pages/       # Page templates
│   └── images/          # Asset files
├── dist/                # Production build
├── gulpfile.js         # Gulp configuration
├── package.json        # Dependencies
├── tailwind.config.js  # Tailwind config
├── postcss.config.js   # PostCSS config
└── .gitignore         # Git ignore file
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm (comes with Node.js)
- Git (for version control)

### Required Dependencies

The project requires the following key dependencies:

```json
{
  "dependencies": {
    "tailwindcss": "^3.x",
    "gulp": "^4.x",
    "gulp-postcss": "^9.x",
    "autoprefixer": "^10.x",
    "browser-sync": "^2.x",
    "cssnano": "^5.x",
    "ejs": "^3.x"
  }
}
```

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/gulp-tailwind-project.git
cd gulp-tailwind-project
```

2. Install dependencies:
```bash
npm install / pnpm install 
```

## 🛠 Configuration Guide

### 1. Tailwind CSS Setup

1. Create `src/styles/main.css` with basic Tailwind directives:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Custom styles below */
```

2. Configure `tailwind.config.js`:
```javascript
module.exports = {
  content: [
    "./src/**/*.ejs",
    "./src/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1E40AF",
        secondary: "#1F2937",
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
};
```

### 2. PostCSS Configuration

Create `postcss.config.js`:
```javascript
module.exports = {
  plugins: {
    'tailwindcss': {},
    'autoprefixer': {},
    'cssnano': process.env.NODE_ENV === 'production' ? {} : false
  },
};
```

### 3. Gulp Configuration

Create `gulpfile.js`:
```javascript
const gulp = require('gulp');
const postcss = require('gulp-postcss');
const browserSync = require('browser-sync').create();
const ejs = require('gulp-ejs');
const rename = require('gulp-rename');

// CSS processing
function css() {
  return gulp.src('src/styles/main.css')
    .pipe(postcss())
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream());
}

// EJS processing
function templates() {
  return gulp.src('src/templates/pages/*.ejs')
    .pipe(ejs())
    .pipe(rename({ extname: '.html' }))
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream());
}

// Watch files
function watchFiles() {
  browserSync.init({
    server: {
      baseDir: './dist'
    }
  });
  
  gulp.watch('src/styles/**/*.css', css);
  gulp.watch('src/templates/**/*.ejs', templates);
}

exports.default = gulp.series(css, templates, watchFiles);
exports.build = gulp.series(css, templates);
```

### 4. EJS Templates Setup

Create basic template structure:

1. Create `src/templates/partials/header.ejs`:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><%= title %></title>
    <link href="/css/main.css" rel="stylesheet">
</head>
<body>
```

2. Create `src/templates/partials/footer.ejs`:
```html
    <script src="/js/main.js"></script>
</body>
</html>
```

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm run dev`|
| `npm run dev` | Start development server with live reload |
| `npm run build` | Create production build |
| `npm run clean` | Clean the dist directory |
| `pnpm run build` 

Add these scripts to your `package.json`:
```json
{
  "scripts": {
    "dev": "gulp",
    "build": "NODE_ENV=production gulp build",
    "clean": "rm -rf dist/*"
  }
}
```

## 🔧 Common Issues & Solutions

1. **Tailwind classes not working**
   - Verify content paths in tailwind.config.js
   - Check if PostCSS is properly configured
   - Clear cache: `npm run clean && npm run build`

2. **Live reload not working**
   - Check if BrowserSync port (default 3000) is available
   - Verify file paths in gulpfile.js

3. **Build errors**
   - Update Node.js to latest LTS version
   - Delete node_modules and package-lock.json
   - Run `npm install` again

## 🎯 Roadmap

- [ ] SCSS support integration
- [ ] PurgeCSS implementation for optimized builds
- [ ] Enhanced Gulp tasks for better performance
- [ ] Image optimization with gulp-imagemin
- [ ] CSS minification and bundling
- [ ] JavaScript module bundling

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📧 Support

For support, email your-email@example.com or open an issue in the repository.