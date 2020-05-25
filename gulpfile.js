'use strict';
const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const pug = require('gulp-pug');
const image = require('gulp-image');

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
        .pipe(gulp.dest('dist/js'))
        .pipe(browserSync.stream());
}
function jsxSlick() {
    return gulp.src(['app/slick/*.js']) 
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
    gulp.watch('app/styles/**/*.scss', style);
    gulp.watch('app/js/*.js', jsx);
    gulp.watch('app/slick/*.scss', styleSlick);
    gulp.watch('app/slick/*.js', jsxSlick);
    gulp.watch('app/pages/**/*.pug', pugs);
    gulp.watch('app/img', img);
    gulp.watch('dist/*.html').on('change', browserSync.reload);
    gulp.watch('app/js/**/*.js').on('change', browserSync.reload);
}

exports.default = pugs;
exports.default = style;
exports.default = watch;
