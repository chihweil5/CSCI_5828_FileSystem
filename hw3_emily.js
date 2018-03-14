var fs = require('fs');

var all_done = function(size) {
  // console.log("Total size:", size);
  console.log("Result so far:", result);
}

var handleFile = function(stats, i, filenames, total, curpath) {
  if (i === filenames.length - 1) {
    result += stats.size;
    all_done(total + stats.size);
  } else {
    result += stats.size;
    processFile(i+1, filenames, total+stats.size, curpath);
  }
  // console.log(`size of ${filenames[i]} is ${stats.size}`);
}

var handleDir = function(i, filenames, total, curpath) {
   fs.readdir(curpath + `/${filenames[i]}`, function(err, newfilenames) {
       if (err) {
           console.log(`Error: ${err}`);
           return;
       }
      // console.log(`Number of ${filenames[i]} Directory Entries:`, newfilenames.length)
      processFile(0, newfilenames, 0, curpath + `/${filenames[i]}`);
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
  
  if (`${filenames[i]}` != `undefined`){
    // console.log(`we are processing ${curpath}/${filenames[i]}`)
    fs.stat(name, function(err, stats) {
      if (err) {
          console.log(`Error: ${err}`);
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
fs.readdir(path, function(err, filenames) {
  if (err) throw err;
  // console.log("Number of Directory Entries:", filenames.length)
  processFile(0, filenames, 0, path);
});