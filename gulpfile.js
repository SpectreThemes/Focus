var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var util = require('gulp-util');
var livereload = require('gulp-livereload');
var postcss = require('gulp-postcss');
var concat = require('gulp-concat');
var bower = require('gulp-main-bower-files');
var gulpFilter = require('gulp-filter');
var uglify = require('gulp-uglify');
var zip = require('gulp-zip');
var imagemin = require('gulp-imagemin');
var del = require('del');

// Clean
gulp.task('clean', function() {
    return del(['./assets', './*.zip']);
});

// CSS
gulp.task('css', function() {
    var processors = [
        require('precss'),
        require('autoprefixer'),
        require('rucksack-css'),
        require('lost'),
        require('cssnano')({zindex: false})
    ];

    if (util.env.prod) {
        return gulp.src('./src/css/index.css')
            .pipe(postcss(processors))
            .pipe(gulp.dest('./assets/css'));
    } else {
        return gulp.src('./src/css/index.css')
            .pipe(sourcemaps.init())
            .pipe(postcss(processors))
            .pipe(sourcemaps.write())
            .pipe(gulp.dest('./assets/css'))
            .pipe(livereload());
    }
});

// JavaScript
gulp.task('js', function() {
    if (util.env.prod) {
        return gulp.src('./src/js/index.js')
            .pipe(uglify())
            .pipe(gulp.dest('./assets/js'));
    } else {
        return gulp.src('./src/js/index.js')
            .pipe(sourcemaps.init())
            .pipe(uglify())
            .pipe(sourcemaps.write())
            .pipe(gulp.dest('./assets/js'));
    }
});

// Bower
gulp.task('bower', function() {
    var filterJS = gulpFilter('**/*.js', { restore: true });
    var filterCSS = gulpFilter('**/*.css', { restore: true });
    return gulp.src('./bower.json')
        .pipe(bower({
            overrides: {
                "jQuery-widowFix": {
                    main: 'js/jquery.widowFix-1.3.2.js'
                },
                "prism": {
                    main: [
                        'prism.js',
                        'themes/prism-okaidia.css'
                    ]
                }
            }
        }))
        .pipe(filterJS)
        .pipe(concat('js/vendor.js'))
        .pipe(uglify())
        .pipe(filterJS.restore)
        .pipe(filterCSS)
        .pipe(concat('css/vendor.css'))
        .pipe(postcss([require('cssnano')]))
        .pipe(filterCSS.restore)
        .pipe(gulp.dest('./assets'));
});

// Images
gulp.task('images', function() {
    if (util.env.prod) {
        return gulp.src('./src/images/**/*')
            .pipe(imagemin())
            .pipe(gulp.dest('./assets/images'));
    } else {
        return gulp.src('./src/images/**/*')
            .pipe(gulp.dest('./assets/images'));
    }
});

// Fonts
gulp.task('fonts', function() {
    return gulp.src('./src/fonts/**/*')
        .pipe(gulp.dest('./assets/fonts'));
});

// Zip
gulp.task('zip', function() {
    return gulp.src(['./*.hbs', './partials/*.hbs', './assets/**/*', './package.json', 'LICENSE'], {base: '.'})
        .pipe(zip('focus.zip'))
        .pipe(gulp.dest('./'));
});

// Watch JavaScript
gulp.task('watch:js', function() {
    return gulp.watch('./src/js/**/*.js', ['js']);
});

// Watch CSS
gulp.task('watch:css', function() {
    livereload.listen();
    return gulp.watch('./src/css/**/*.css', ['css']);
});

// Watch Images
gulp.task('watch:images', function() {
    return gulp.watch('./src/images/**/*', ['images']);
});

// Watch Everything
gulp.task('watch', ['watch:js', 'watch:css', 'watch:images']);

// Build
gulp.task('build', ['css', 'js', 'bower', 'images', 'fonts']);

// Default Task
gulp.task('default', ['watch']);
