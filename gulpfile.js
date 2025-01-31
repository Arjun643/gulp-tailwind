const gulp = require('gulp');
const postcss = require('gulp-postcss');
const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const ejs = require('gulp-ejs');
const browserSync = require('browser-sync').create();
const { rimraf } = require('rimraf');
const fs = require('fs/promises');

// File paths
const paths = {
  css: {
    src: 'src/css/style.css',
    dest: 'dist/css'
  },
  html: {
    src: 'src/pages/**/*.html',
    layouts: 'src/layout/**/*.html',
    dest: 'dist'
  },
  js: {
    src: 'src/js/**/*.js',
    dest: 'dist/js'
  },
  images: {
    src: 'src/images/**/*',
    dest: 'dist/images'
  }
};

// Clean dist
async function clean() {
  await rimraf('./dist');
}

// Create directories
async function createDirs() {
  try {
    await fs.mkdir('dist', { recursive: true });
    await Promise.all([
      fs.mkdir(paths.css.dest, { recursive: true }),
      fs.mkdir(paths.js.dest, { recursive: true }),
      fs.mkdir(paths.images.dest, { recursive: true })
    ]);
  } catch (err) {
    console.error('Error creating directories:', err);
  }
}

// CSS task
function css() {
  return gulp.src(paths.css.src)
    .pipe(postcss([
      tailwindcss('./tailwind.config.js'),
      autoprefixer(),
      cssnano()
    ]))
    .pipe(gulp.dest(paths.css.dest))
    .pipe(browserSync.stream());
}

// HTML task
function html() {
  return gulp.src(paths.html.src)
    .pipe(ejs({}, {}, { ext: '.html' }))
    .pipe(gulp.dest(paths.html.dest))
    .pipe(browserSync.stream());
}

// JavaScript task
function js() {
  return gulp.src(paths.js.src)
    .pipe(gulp.dest(paths.js.dest))
    .pipe(browserSync.stream());
}

// Images task
function images() {
  return gulp.src(paths.images.src)
    .pipe(gulp.dest(paths.images.dest))
    .pipe(browserSync.stream());
}

// Watch files
function watchFiles() {
  browserSync.init({
    server: {
      baseDir: './dist'
    },
    open: true,
    notify: false
  });
  gulp.watch([
    'src/pages/**/*.html',
    'src/layout/**/*.html',
    'src/components/**/*.html'
  ], html);

  // Watch CSS and HTML files for Tailwind changes
  gulp.watch([
    'src/**/*.html',
    'src/**/*.css',
    'tailwind.config.js'
  ], css);

  // Watch JavaScript files
  gulp.watch(paths.js.src, js);

  // Watch image files
  gulp.watch(paths.images.src, images);
}

// Build task
const build = gulp.series(clean, createDirs, gulp.parallel(css, html, js, images));

// Dev task
const dev = gulp.series(build, watchFiles);

exports.css = css;
exports.html = html;
exports.js = js;
exports.images = images;
exports.clean = clean;
exports.build = build;
exports.default = dev; 