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
	gulp.src('assets/css/*.css')
		.pipe(connect.reload())
});

gulp.task('js', function(){
  gulp.src('assets/js/*.js')
    .pipe(connect.reload())
});

gulp.task('watch', function () {
  gulp.watch(['*.html'], ['html']);
  gulp.watch(['assets/css/*.css'], ['css']);
  gulp.watch(['assets/js/*.js'], ['js']);
});

gulp.task('default', ['connect', 'watch', 'css', 'html', 'js']);

