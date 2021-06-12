const {src, dest, parallel, series, watch} = require('gulp');
const sass = require('gulp-sass');
const notify = require('gulp-notify');
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();
const fileinclude = require('gulp-file-include');
const htmlmin = require('gulp-htmlmin');
const ttf2woff = require('gulp-ttf2woff');
const ttf2woff2 = require('gulp-ttf2woff2');
const image = require('gulp-image');
const del = require('del');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const uglify = require('gulp-uglify-es').default;
const concat = require('gulp-concat');

// Styles =====> //
const styles = () => {
  return src(['./src/scss/**/*.scss', './src/blocks/_blocks.scss'])
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'expanded'
    }).on('error', notify.onError()))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(autoprefixer({
      cascade: false,
    }))
    .pipe(cleanCSS({
      level: 2
    }))
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

// Html Build //
const htmlMinify = () => {
	return src('./src/pages/**/*.html')
		.pipe(htmlmin({
			collapseWhitespace: true
		}))
		.pipe(dest('./app'));
}

// Scripts =====> //
const scripts = () => {
  src('./src/js/libs/**.js')
		.pipe(concat('vendor.js'))
		.pipe((uglify().on("error", notify.onError())))
		.pipe(dest('./app/js/'))
  return src([
    './src/js/main.js',
    './src/blocks/_blocks.js'
  ])
    .pipe(webpackStream({
      output: {
        filename: 'main.js'
      },
      module: {
        rules: [
          {
            test: /\.m?js$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: [
                  ['@babel/preset-env', { targets: "defaults" }]
                ]
              }
            }
          }
        ]
      }
    }))
    .pipe(sourcemaps.init())
    .pipe(uglify().on("error", notify.onError()))
    .pipe(sourcemaps.write('.'))
    .pipe(dest('./app/js'))
    .pipe(browserSync.stream())
}

// Scripts Backend //
const scriptsBackend = () => {
	src('./src/js/libs/**.js')
    .pipe(concat('vendor.js'))
    .pipe(uglify().on("error", notify.onError()))
		.pipe(dest('./app/js/'))
  return src([
    './src/js/main.js',
    './src/blocks/_blocks.js'
  ])
    .pipe(webpackStream({
      output: {
        filename: 'main.js'
      },
      mode: 'none',
      module: {
        rules: [
          {
            test: /\.m?js$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: [
                  ['@babel/preset-env', { targets: "defaults" }]
                ]
              }
            }
          }
        ]
      }
    }))
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
    './src/blocks/_blocks.js'
  ])
    .pipe(webpackStream({
      output: {
        filename: 'main.js'
      },
      module: {
        rules: [
          {
            test: /\.m?js$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: [
                  ['@babel/preset-env', { targets: "defaults" }]
                ]
              }
            }
          }
        ]
      }
    }))
    .pipe(uglify().on("error", notify.onError()))
    .pipe(dest('./app/js'))
}

// Images =====> //
const imgToApp = () => {
  return src([
    './src/img/**/*.jpg',
    './src/img/**/*.png',
    './src/img/**/*.webp',
    './src/img/**/*.icon',
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
    './src/img/**/*.icon',
    './src/img/**/*.gif',
    './src/img/**/*.jpeg',
    './src/img/**/*.svg',
  ])
    .pipe(image())
    .pipe(dest('./app/img'));
}

// Fonts =====> //
const fonts = () => {
  src('./src/fonts/**.ttf')
    .pipe(ttf2woff())
    .pipe(dest('./app/fonts/'))
  return src('./src/fonts/**.ttf')
    .pipe(ttf2woff2())
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

  watch(['./src/scss/**/*.scss', './src/blocks/_blocks.scss'], styles);
  watch('./src/pages/*.html', htmlInclude);
  watch('./src/img/**/*.{jpg, png, webp, ico, gif, jpeg, svg}', imgToApp);
  watch('./src/fonts/**.ttf', fonts);
  watch(['./src/js/main.js', './src/js/vendor.js', './src/blocks/_blocks.js'], scripts);
  watch('./src/resources/**', resources);
}


exports.default = series(clean, parallel(htmlInclude, scripts, fonts, imgToApp, resources), styles, watchFiles);

exports.build = series(clean, parallel(htmlMinify, scriptsBuild, fonts, imgToApp, resources), stylesBuild, imgOptimize);

exports.backend = series(clean, parallel(htmlInclude, scriptsBackend, stylesBackend, fonts, imgToApp, imgOptimize, resources));
