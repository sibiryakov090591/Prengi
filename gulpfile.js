let gulp = require("gulp"),
    sass = require("gulp-sass"),
    browserSync = require("browser-sync"),
    uglify = require("gulp-uglify"),
    concat = require("gulp-concat"),
    rename = require("gulp-rename"),
    autoprefixer = require("gulp-autoprefixer"),
    sourcemaps = require("gulp-sourcemaps");

gulp.task("scss", function () {
    return gulp
        .src("src/styles/**/*.{scss,sass}")
        .pipe(sourcemaps.init())
        .pipe(sass({ outputStyle: "compressed" }))
        .pipe(autoprefixer({ cascade: false }))
        .pipe(rename({ suffix: ".min" }))
        .pipe(sourcemaps.write("./"))
        .pipe(gulp.dest("src/css"))
        .pipe(browserSync.reload({ stream: true }));
});

gulp.task("html", function () {
    return gulp.src("src/**/*.html").pipe(browserSync.reload({ stream: true }));
});

gulp.task("script", function () {
    return gulp.src("src/**/*.js").pipe(browserSync.reload({ stream: true }));
});

gulp.task("js", function () {
    return gulp
        .src([
            "src/js/libs/**/*.js",
            "node_modules/slick-carousel/slick/slick.js",
            "node_modules/magnific-popup/dist/jquery.magnific-popup.js",
        ])
        .pipe(concat("libs.min.js"))
        .pipe(uglify())
        .pipe(gulp.dest("src/js"))
        .pipe(browserSync.reload({ stream: true }));
});

gulp.task("browser-sync", function () {
    browserSync.init({
        server: {
            baseDir: "src/",
        },
        notify: false,
    });
});

gulp.task("watch", function () {
    gulp.watch("src/styles/**/*.{scss,sass}", gulp.parallel("scss"));
    gulp.watch("src/**/*.html", gulp.parallel("html"));
    gulp.watch("src/js/*.js", gulp.parallel("script"));
});

gulp.task("default", gulp.parallel("scss", "js", "browser-sync", "watch"));