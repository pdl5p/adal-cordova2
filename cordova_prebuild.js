
var gulp = require('gulp');
var path  = require('path');

var gulpfile = path.join(__dirname, '/gulpfile.js');

// process.stdout.write('Compiling SCSS');

require(gulpfile);

gulp.start('build');