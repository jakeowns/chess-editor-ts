var gulp = require('gulp');
var sass = require('gulp-sass');
var ts = require('gulp-typescript');

gulp.task('styles', function() {
	gulp.src(['app/scss/**/*.scss', '!app/scss/**/_*.scss'])
		.pipe(sass({
			outputStyle: 'compressed',
			errLogToConsole: true
		}))
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('./app/css/'));
});
gulp.task('scripts', function() {
	gulp.src(['app/ts/AppConfig.ts'])
		.pipe(ts({
			removeComments: true,
			module: 'amd',
			out: 'app.js'
		}))
		.pipe(gulp.dest('app/js'));
});

gulp.task('default', function() {
	gulp.watch('app/scss/**/*.scss', ['scripts', 'styles']);
});
