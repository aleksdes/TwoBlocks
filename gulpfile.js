'use strict';
const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const pug = require('gulp-pug');
const image = require('gulp-image');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const imagemin = require('gulp-imagemin');
const cache = require('gulp-cache');
const {series,parallel} = require('gulp');

function style() {
    return gulp.src(['app/styles/*.scss'])
        .pipe(sourcemaps.init())
        .pipe(sass().on('error',sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false 
        }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.stream());
}

function styleSlick() {
    return gulp.src(['app/slick/*.scss'])
        .pipe(sourcemaps.init())
        .pipe(sass().on('error',sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false 
        }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('dist/slick'))
        .pipe(browserSync.stream());
}

function jsx() {
    return gulp.src(['app/js/**/*.js'])
        .pipe(babel())
        .pipe(gulp.dest('dist/js'))
        .pipe(uglify())
        .pipe(rename({ extname: '.min.js' }))
        .pipe(gulp.dest('dist/js'))
        .pipe(browserSync.stream());
}
function jsxSlick() {
    return gulp.src(['app/slick/*.js'])
        .pipe(babel())
        .pipe(uglify())
        .pipe(gulp.dest('dist/slick'))
        .pipe(browserSync.stream());
}

function pugs() {
    return gulp.src('app/pages/*.pug')
    .pipe(pug({
        pretty:true
    }))
    .pipe(gulp.dest('dist'));
}

function img() {
    return gulp.src('app/img/*/**')
    .pipe(image({
        pretty:true
    }))
    .pipe(cache(imagemin({
        interlaced: true
      })))
    .pipe(gulp.dest('dist/img'));
}

function watch() {
    browserSync.init({
        server: {
            baseDir: "./dist",
            index: "/index.html"
        },
        port:3001
    });
    gulp.watch('app/styles/**/*.scss', { ignoreInitial: false }, style);
    gulp.watch('app/js/*.js', { ignoreInitial: false }, jsx);
    gulp.watch('app/slick/*.scss', { ignoreInitial: false }, styleSlick);
    gulp.watch('app/slick/*.js', { ignoreInitial: false }, jsxSlick);
    gulp.watch('app/pages/**/*.pug', { ignoreInitial: false }, pugs);
    gulp.watch('app/img', { ignoreInitial: false }, img);
    gulp.watch('dist/*.html').on('change', browserSync.reload);
    gulp.watch('app/js/**/*.js').on('change', browserSync.reload);
}

exports.default = pugs;
exports.default = style;
exports.default = watch;
