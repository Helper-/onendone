var shell = require('shelljs');

// Remove all old files/directories if they exist
shell.rm('-rf', 'dist/*');
shell.rm('-rf', 'dist/public');

// Create the directory
shell.mkdir('dist/public/');

// Copy files to the directories.
shell.cp('-R', 'src/public/js', 'dist/public/');
shell.cp('-R', 'src/public/fonts', 'dist/public/');
shell.cp('-R', 'src/public/images', 'dist/public/');
shell.cp('src/index.html', 'dist/');