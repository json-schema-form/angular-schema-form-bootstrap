var gulp = require('gulp'),
  webserver = require('gulp-webserver');

gulp.task('serve', function() {
  gulp.src('.')
    .pipe(webserver({
      livereload: true,
      directoryListing: true,
      open: true
    }));
});

