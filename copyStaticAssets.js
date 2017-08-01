var shell = require('shelljs');

// First make sure the directories exist
shell.mkdir('dist/public/');
shell.mkdir('dist/public/js');
shell.mkdir('dist/public/fonts');
shell.mkdir('dist/public/images');

// Copy files to the directories.
shell.cp('-R', 'src/public/js', 'dist/public/');
shell.cp('-R', 'src/public/fonts', 'dist/public/');
shell.cp('-R', 'src/public/images', 'dist/public/');