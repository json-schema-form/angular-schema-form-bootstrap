var gulp = require('gulp'),
  streamqueue = require('streamqueue'),
  minifyHtml = require('gulp-minify-html'),
  templateCache = require('gulp-angular-templatecache'),
  concat = require('gulp-concat'),
  rename = require('gulp-rename'),
  uglify = require('gulp-uglify');

gulp.task('templates', function() {
  var stream = streamqueue({objectMode: true});
  stream.queue(
    gulp.src('./src/**/*.html')
    .pipe(minifyHtml({
      empty: true,
      spare: true,
      quotes: true
    }))
    .pipe(templateCache({
      module: 'schemaForm',
      root: 'decorators/bootstrap/'
    }))
    );

  stream.done()
  .pipe(rename('angular-schema-form-bootstrap-templates.js'))
  .pipe(gulp.dest('./src'))
  .pipe(uglify())
  .pipe(rename('angular-schema-form-bootstrap-templates.min.js'))
  .pipe(gulp.dest('./src'));

});
