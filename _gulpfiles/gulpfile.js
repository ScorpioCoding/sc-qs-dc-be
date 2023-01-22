const { src, dest, watch, series } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const postcss = require("gulp-postcss");
const cssNano = require("cssnano");
const terser = require("gulp-terser");

//Views for Site
function copyAdminViews() {
  return src("../dev/views/admin/**/*.phtml").pipe(
    dest("../html/App/Modules/Admin/Views/")
  );
}

function copyImages() {
  return src("../dev/img/**/*.{gif,png,jpg,jpeg,svg}").pipe(
    dest("../html/public/img/")
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
  watch("../dev/views/admin/**/*.phtml", copyAdminViews);
  watch("../dev/img/**/*.{gif,png,jpg,jpeg,svg}", copyImages);
  watch("../dev/scss/**/*.scss", scssTask);
  watch("../dev/js/**/*.js", jsTask);
}

exports.default = series(
  copyAdminViews,
  copyImages,
  scssTask,
  jsTask,
  watchTask
);
