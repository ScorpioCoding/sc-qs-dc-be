const { src, dest, watch, series } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const postcss = require("gulp-postcss");
const cssNano = require("cssnano");
const terser = require("gulp-terser");

function copyImages() {
  return src("../dev/img/**/*.{gif,png,jpg,jpeg,svg}").pipe(
    dest("../html/public/img/")
  );
}

//Views for Site
function copySiteViews() {
  return src("../dev/views/site/**/*.phtml").pipe(
    dest("../html/App/Modules/Site/Views/")
  );
}

function scssTask() {
  return src("../dev/scss/**/*.scss")
    .pipe(sass())
    .pipe(postcss([cssNano()]))
    .pipe(dest("../html/public/css"));
}

function jsTask() {
  return src("../dev/js/**/*.js")
    .pipe(terser())
    .pipe(dest("../html/public/js"));
}

function watchTask() {
  watch("../dev/views/site/**/*.phtml", copySiteViews);
  watch("../dev/img/**/*.{gif,png,jpg,jpeg,svg}", copyImages);
  watch("../dev/scss/**/*.scss", scssTask);
  watch("../dev/js/**/*.js", jsTask);
}

exports.default = series(
  copySiteViews,
  copyImages,
  scssTask,
  jsTask,
  watchTask
);
