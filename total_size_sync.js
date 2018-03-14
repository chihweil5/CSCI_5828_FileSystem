
var fs = require('fs');

var is_file = function(name) {
  return fs.statSync(name).isFile();
};

var get_size = function(name) {
  return fs.statSync(name).size;
};

var readDir = function(path) {
    var entries = fs.readdirSync(path);
    var files = [];
    entries.forEach(function(name) {
        var filename = `${path}/${name}`;
        if(fs.statSync(filename).isFile()) {
            files.push(filename);
        } else {
            readDir(filename);
        }
    });

    files.forEach(function(name) {
      total += get_size(name);
    });
}

var path = process.argv[2];
var total   = 0;
readDir(path);


console.log("Total size:", total);
