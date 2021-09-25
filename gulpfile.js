const {src, dest, parallel, series, watch} = require('gulp');
const sass = require('gulp-sass');
const notify = require('gulp-notify');
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();
const fileinclude = require('gulp-file-include');
const image = require('gulp-image');
const del = require('del');
const uglify = require('gulp-uglify-es').default;
const concat = require('gulp-concat');
const gcmq = require('gulp-group-css-media-queries');
const babel = require('gulp-babel');

// Styles =====> //
const styles = () => {
  return src(['./src/scss/**/*.scss', './src/blocks/_blocks.scss'])
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'expanded'
    }).on('error', notify.onError()))
    .pipe(autoprefixer({
      cascade: false,
    }))
    .pipe(gcmq())
    .pipe(sourcemaps.write('.'))
    .pipe(dest('./app/css/'))
    .pipe(browserSync.stream());
}

// Styles Backend //
const stylesBackend = () => {
  return src(['./src/scss/**/*.scss', './src/blocks/_blocks.scss'])
		.pipe(sass().on('error', notify.onError()))
    .pipe(autoprefixer({
      cascade: false,
		}))
    .pipe(gcmq())
		.pipe(dest('./app/css/'))
};

// Styles Build //
const stylesBuild = () => {
  return src(['./src/scss/**/*.scss', './src/blocks/_blocks.scss'])
    .pipe(sass({
      outputStyle: 'expanded'
    }).on('error', notify.onError()))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(autoprefixer({
      cascade: false,
    }))
    .pipe(gcmq())
    .pipe(cleanCSS({
      level: 2
    }))
    .pipe(dest('./app/css/'))
}

// Html =====> //
const htmlInclude = () => {
  return src('./src/pages/*.html')
    .pipe(fileinclude({
      prefix: '@',
      basepath: '@file'
    }))
    .pipe(dest('./app'))
    .pipe(browserSync.stream());
}

// Scripts =====> //
const scripts = () => {
  src('./src/js/libs/**.js')
		.pipe(concat('vendor.js'))
		.pipe(dest('./app/js/'))
  return src([
    './src/js/main.js',
    './src/blocks/modules/**/*.js',
    './src/blocks/components/**/*.js'
  ])
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(concat('main.js'))
    .pipe(sourcemaps.init())
    .pipe(sourcemaps.write('.'))
    .pipe(dest('./app/js'))
    .pipe(browserSync.stream())
}

// Scripts Backend //
const scriptsBackend = () => {
	src('./src/js/libs/**.js')
    .pipe(concat('vendor.js'))
		.pipe(dest('./app/js/'))
  return src([
    './src/js/main.js',
    './src/blocks/modules/**/*.js',
    './src/blocks/components/**/*.js'
  ])
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(concat('main.js'))
    .pipe(dest('./app/js'))
};

// Scripts Build //
const scriptsBuild = () => {
  src('./src/js/libs/**.js')
		.pipe(concat('vendor.js'))
		.pipe(uglify().on("error", notify.onError()))
		.pipe(dest('./app/js/'))
  return src([
    './src/js/main.js',
    './src/blocks/modules/**/*.js',
    './src/blocks/components/**/*.js'
  ])
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(concat('main.js'))
    .pipe(uglify().on("error", notify.onError()))
    .pipe(dest('./app/js'))
}

// Images =====> //
const imgToApp = () => {
  return src([
    './src/img/**/*.jpg',
    './src/img/**/*.png',
    './src/img/**/*.webp',
    './src/img/**/*.ico',
    './src/img/**/*.gif',
    './src/img/**/*.jpeg',
    './src/img/**/*.svg',
  ])
    .pipe(dest('./app/img'))
}

// ImgOptimize //
const imgOptimize = () => {
  return src([
    './src/img/**/*.jpg',
    './src/img/**/*.png',
    './src/img/**/*.webp',
    './src/img/**/*.ico',
    './src/img/**/*.gif',
    './src/img/**/*.jpeg',
    './src/img/**/*.svg',
  ])
    .pipe(image())
    .pipe(dest('./app/img'));
}

// Fonts =====> //
const fonts = () => {
  return src('./src/fonts/**/*')
    .pipe(dest('./app/fonts/'))
}

// Resources =====> //
const resources = () => {
  return src('./src/resources/**/*')
    .pipe(dest('./app'))
}

// Clean =====> //
const clean = () => {
  return del(['./app/*'])
}


// Watch //
const watchFiles = () => {
  browserSync.init({
    tunnel: "nevertry",
    server: {
      baseDir: './app'
    }
  });

  watch(['./src/scss/**/*.scss', './src/blocks/_blocks.scss', './src/blocks/**/*.scss'], styles);
  watch(['./src/pages/*.html', './src/blocks/**/*.html'], htmlInclude);
  watch(['./src/img/**/*.jpg', './src/img/**/*.png', './src/img/**/*.webp', './src/img/**/*.ico', './src/img/**/*.gif', './src/img/**/*.jpeg', './src/img/**/*.svg'], imgToApp);
  watch('./src/fonts/**/*', fonts);
  watch(['./src/js/main.js', './src/blocks/components/**/*.js', './src/blocks/modules/**/*.js'], scripts);
  watch('./src/resources/**', resources);
}


exports.default = series(clean, parallel(htmlInclude, scripts, fonts, imgToApp, resources), styles, watchFiles);

exports.build = series(clean, parallel(htmlInclude, scriptsBuild, fonts, imgToApp, imgOptimize, resources), stylesBuild, imgOptimize);

exports.backend = series(clean, parallel(htmlInclude, scriptsBackend, stylesBackend, fonts, imgToApp, imgOptimize, resources));
