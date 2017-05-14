var gulp = require('gulp');
var	watch = require('gulp-watch');
var	connect = require('gulp-connect');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');


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

// gulp.task('scripts', function(){
//     return gulp.src('scripts/*.js')
//         .pipe(concat('main.js'))
//         .pipe(uglify())
//         .pipe(gulp.dest('scripts/'))
// });

gulp.task('default', ['connect', 'watch', 'css', 'html']);

