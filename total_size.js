var fs = require('fs');

var all_done = function(size) {
  // console.log("Total size:", size);
  console.log("Total size: ", result);
  errors.forEach(function(e){
      console.log(e);
  });
}

var handleFile = function(stats, i, filenames, total, curpath) {
  if (i === filenames.length - 1) {
    result += stats.size;
    all_done(total + stats.size);
  } else {
    result += stats.size;
    processFile(i+1, filenames, total+stats.size, curpath);
  }
}

var handleDir = function(i, filenames, total, curpath) {
    var name = `${curpath}/${filenames[i]}`;
    fs.readdir(name, function(err, newfilenames) {
       if (err) {
           errors.push(String(err))
           return;
       }
      processFile(0, newfilenames, 0, name);
    });
  if (i === filenames.length - 1) {
    all_done(total);
  } else {
    processFile(i+1, filenames, total, curpath);
  }
}
var testname = '.';

var processFile = function(i, filenames, total, curpath) {
  var name = `${curpath}/${filenames[i]}`;
  if (typeof filenames[i] != "undefined"){
    // console.log(`we are processing ${curpath}/${filenames[i]}`)
    fs.stat(name, function(err, stats) {
      if (err) {
          errors.push(String(err))
          return;
      }
      if (stats.isFile()) {
        handleFile(stats, i, filenames, total, curpath);
      } else {
        handleDir(i, filenames, total, curpath);
      }
    });
  }

}

var path = process.argv[2];
console.log("Current Directory: ", path);
var result = 0;
var errors = [];
fs.readdir(path, function(err, filenames) {
  if (err){
      console.log(String(err));
      return;
  }
  // console.log("Number of Directory Entries:", filenames.length)
  processFile(0, filenames, 0, path);
});
