var fs = require('fs');

var all_done = function(size) {
  console.log("Total size:", size);
}

var handleFile = function(stats, i, filenames, total, curpath) {
  if (i === filenames.length - 1) {
    all_done(total + stats.size);
  } else {
    processFile(i+1, filenames, total+stats.size, curpath);
  }
}

var handleDir = function(i, filenames, total, curpath) {
  if (i === filenames.length - 1) {
    //path = path + `/${filenames[i]}`;
    fs.readdir(curpath + `/${filenames[i]}`, function(err, newfilenames) {
      if (err) throw err;
      console.log(`Number of ${filenames[i]} Directory Entries:`, newfilenames.length)
      processFile(0, newfilenames, 0, curpath + `/${filenames[i]}`);
    });

    all_done(total);
  } else {
    //path = path + `/${filenames[i]}`;
    fs.readdir(curpath + `/${filenames[i]}`, function(err, newfilenames) {
      if (err) throw err;
      console.log(`Number of ${filenames[i]} Directory Entries:`, newfilenames.length)
      processFile(0, newfilenames, 0, curpath + `/${filenames[i]}`);
    });
    processFile(i+1, filenames, total, curpath);
  }
}
var testname = '.';

var processFile = function(i, filenames, total, curpath) {
  var name = `${curpath}/${filenames[i]}`;
  console.log(`we are processing ${curpath}/${filenames[i]}`)
  fs.stat(name, function(err, stats) {
    if (err) throw err;
    if (stats.isFile()) {
      handleFile(stats, i, filenames, total, curpath);
    } else {
      handleDir(i, filenames, total, curpath);
    }
  });
}

var path = process.argv[2];
console.log("Current Directory: ", path);

fs.readdir(path, function(err, filenames) {
  if (err) throw err;
  console.log("Number of Directory Entries:", filenames.length)
  processFile(0, filenames, 0, path);
});