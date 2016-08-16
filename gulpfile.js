const gulp = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins');
const browserSync = require('browser-sync').create();
const del = require('del');
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');

const $ = gulpLoadPlugins();
const OOYALA_VERSION = '4.5.5';

/**
 * Lint
 */
gulp.task('lint', () => {
  return gulp.src([
    './*.js',
    'routes/*.js',
    'frontend/scripts/**/*.js',
    'test/spec/**/*.js'])
    .pipe($.xo());
});

/**
 * Convert SCSS -> CSS
 */
gulp.task('styles', () => {
  return gulp.src('frontend/styles/**/*.scss')
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.sass.sync({
      outputStyle: 'expanded',
      precision: 10,
      includePaths: ['.']
    }).on('error', $.sass.logError))
    .pipe($.autoprefixer({browsers: ['> 1%', 'last 2 versions', 'Firefox ESR']}))
    .pipe($.cssnano({safe: true, autoprefixer: false}))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('dist/styles'))
    .pipe(browserSync.reload({stream: true}));
});

/**
 * Convert ES6 -> ES5
 */
gulp.task('scripts', () => {
  const props = {
    entries: ['frontend/scripts/main.js'],
    transform: [babelify]
  };

  return browserify(props).bundle()
    .on('error', $.util.log.bind($.util, 'Browserify Error'))
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe($.sourcemaps.init())
    .pipe($.uglify())
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('dist/scripts'))
    .pipe(browserSync.reload({stream: true}));
});

/**
 * Build HTML with processing external assets
 */
gulp.task('html', () => {
  return gulp.src('frontend/*.html')
    .pipe($.plumber())
    .pipe($.replace('OOYALA_VERSION', OOYALA_VERSION))
    .pipe($.htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('views'))
    .pipe(browserSync.reload({stream: true}));
});

/**
 * Optimize images
 */
gulp.task('images', () => {
  return gulp.src('frontend/images/**/*')
    .pipe($.plumber())
    .pipe($.cache($.imagemin({
      progressive: true,
      interlaced: true,
      // don't remove IDs from SVGs, they are often used
      // as hooks for embedding and styling
      svgoPlugins: [{cleanupIDs: false}]
    })))
    .pipe(gulp.dest('dist/images'))
    .pipe(browserSync.reload({stream: true}));
});

/**
 * Copy font files
 */
gulp.task('fonts', () => {
  return gulp.src('frontend/fonts/**/*.{eot,svg,ttf,woff,woff2}')
    .pipe(gulp.dest('dist/fonts'))
    .pipe(browserSync.reload({stream: true}));
});

/**
 * Copy other files
 */
gulp.task('extras', () => {
  return gulp.src([
    'frontend/*.*',
    'frontend/vendor/**/*.*',
    '!frontend/*.html'
  ], {
    dot: true
  }).pipe(gulp.dest('dist'))
  .pipe(browserSync.reload({stream: true}));
});

/**
 * Clean
 */
gulp.task('clean', del.bind(null, ['dist', 'views/*.tpl.html']));

/**
 * Compile
 */
gulp.task('compile', ['styles', 'scripts', 'html', 'images', 'fonts', 'extras'], () => {
  return gulp.src('dist/**/*').pipe($.size({title: 'build', gzip: true}));
});

/**
 * Build
 */
gulp.task('build', ['lint'], () => {
  gulp.start('compile');
});

/**
 * Clean and Build
 */
gulp.task('default', ['clean'], () => {
  gulp.start('build');
});

/**
 * Run
 */
gulp.task('serve', ['build'], () => {
  // Start server
  $.nodemon({
    script: './',
    ext: 'js html',
    ignore: [
      'node_modules',
      'bin',
      'views/*.tpl.html',
      'frontend',
      'dist',
      'gulpfile.js'
    ],
    env: {
      NODE_ENV: 'development'
    },
    stdout: false
  }).on('readable', function () {
    this.stdout.on('data', chunk => {
      if (/^Listening on/.test(chunk)) {
        // Open browser
        browserSync.init({
          notify: false,
          port: 9000,
          proxy: 'localhost:3000',
          serveStatic: ['dist']
        }, () => {});
      }
    });
    this.stdout.pipe(process.stdout);
    this.stderr.pipe(process.stderr);
  });

  gulp.watch([
    './*.js',
    'routes/*.js',
    'frontend/scripts/**/*.js',
    'test/spec/**/*.js'
  ], ['lint']);
  gulp.watch('frontend/styles/**/*.scss', ['styles']);
  gulp.watch('frontend/scripts/**/*.js', ['scripts']);
  gulp.watch('frontend/*.html', ['html']);
  gulp.watch('frontend/images/**/*', ['images']);
  gulp.watch('frontend/fonts/**/*', ['fonts']);
  gulp.watch([
    'frontend/*.*',
    'frontend/vendor/**/*.*',
    '!frontend/*.html'
  ], ['extras']);
});
