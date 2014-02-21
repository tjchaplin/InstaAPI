var gulp = require('gulp'),
  jshint = require('gulp-jshint'),
  mocha = require('gulp-mocha');

var paths = {
	scripts: ['./lib/*.js', './test/**/*.js']
};

gulp.task('lint', function() {
  gulp.src(paths.scripts)
	.pipe(jshint())
	.pipe(jshint.reporter('default'));
});

gulp.task('test', function() {
  gulp.src(paths.scripts)
	.pipe(mocha());
});

gulp.task('watch', function () {
  gulp.watch(paths.scripts, ['lint', 'test']);
});

gulp.task('default', ['lint', 'test', 'watch']);