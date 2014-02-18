var gulp = require('gulp'),
  jshint = require('gulp-jshint');

gulp.task('lint', function() {
  gulp.src('*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// // Rerun the task when a file changes
// gulp.task('watch', function () {
//   gulp.watch(paths.scripts, ['scripts']);
//   gulp.watch(paths.images, ['images']);
// });

gulp.task('default', ['lint']);