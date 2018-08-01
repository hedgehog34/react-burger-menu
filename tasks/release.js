var git = require('gulp-git');

module.exports = function(gulp, config) {
  gulp.task('commit:version', function() {
    return gulp.src(config.files)
      .pipe(git.add())
      .pipe(git.commit('v' + config.version));
  });

  gulp.task('push', function() {
    git.push('origin', 'master', function(err) {
      console.log(err);
      if (err) throw err;
    });
  });
};
