var gulp = require('gulp');
var	watch = require('gulp-watch');
var	connect = require('gulp-connect');
	


gulp.task('connect', function() { 
	connect.server({
		port: 9999,
		root: '.',
		livereload: true
	});
});

gulp.task('html', function() {
	gulp.src('*.html')
		.pipe(connect.reload());
});

gulp.task('css', function() {
	gulp.src('css/*.css')
		.pipe(connect.reload())
});

gulp.task('watch', function () {
  gulp.watch(['*.html'], ['html']);
  gulp.watch(['css/*.css'], ['css']);
});

gulp.task('default', ['connect', 'watch', 'css', 'html']);

