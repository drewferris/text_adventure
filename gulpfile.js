const gulp = require('gulp');
const del = require('del');
const webpack = require('webpack-stream');
const Server = require('karma').Server;

const paths = {
  html: './app/index.html',
  js: './app/js/client.js',
  css: ',/app/css/app.css',
  tests: './test/controller_test.js'
};

gulp.task('bundle', ['clean'], () => {
  return gulp.src(paths.js)
    .pipe(webpack({output:{filename: 'bundle.js'}}))
    .pipe(gulp.dest('build'));
});

gulp.task('clean', () => {
  return del('./build/**/*');
});

gulp.task('copy', ['clean'], () => {
  return gulp.src(paths.html)
    .pipe(gulp.dest('./build'));
});

gulp.task('bundle:test', () => {
  return gulp.src(paths.tests)
    .pipe(webpack({output:{filename:'test_bundle.js'}}))
    .pipe(gulp.dest('./test'));
});

gulp.task('karma', ['bundle:test'], (done) => {
  new Server({
    configFile: __dirname + '/karma.conf.js'
  }, done).start();
});

gulp.task('build', ['bundle', 'clean', 'copy']);

gulp.task('test:client', ['bundle:test', 'karma']);

// gulp.task('webpack:dev', function() {
//   return gulp.src('./app/js/client.js')
//     .pipe(webpack({
//       output: {
//         filename: 'bundle.js'
//       }
//     }))
//     .pipe(gulp.dest('build/'));
// });
//
// gulp.task('staticfiles:dev', function() {
//   return gulp.src('./app/**/*.html')
//   .pipe(gulp.dest('build/'));
// });
//
// gulp.task('staticcssfiles:dev', function() {
//   return gulp.src('./app/css/*.css')
//   .pipe(gulp.dest('build/'));
// });
//
// gulp.task('bundle:test', () => {
//   return gulp.src(__dirname + '/test/*_test.js')
//   .pipe(webpack({
//     output: {
//       filename: 'test_bundle.js'
//     }
//   }))
//   .pipe(gulp.dest(__dirname + '/test'));
// });
//
// gulp.task('build:dev', ['staticfiles:dev','staticcssfiles:dev', 'webpack:dev']);
// gulp.task('default', ['build:dev']);
