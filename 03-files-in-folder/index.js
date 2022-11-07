
const path = require('path');
const fs = require('fs');

let getAllFiles = function (dir, allFiles){
  allFiles = allFiles || [];
    let filesInFolder = fs.readdirSync(dir);
    for (let i in filesInFolder) {
        let name = dir + '/' + filesInFolder[i];
        if (fs.statSync(name).isDirectory()){
          //getAllFiles(name, allFiles);
        } else {
            allFiles.push(name);
        }
    }
    return allFiles;
};

let files = getAllFiles('./03-files-in-folder/secret-folder');

for (let i in files) {
  fs.stat(files[i], function(err, stats) {
    console.log("Имя файла " + path.basename(files[i], path.extname(files[i])) +
    " расширение " + path.extname(files[i]) + 
    ' размер ' + stats["size"]
    )
  })
}
