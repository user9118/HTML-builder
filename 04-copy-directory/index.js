const path = require('path');
const fs = require('fs');

fs.mkdir('./04-copy-directory/files-copy', () => {
});

let getAllFiles = function (dir, allFiles) {
  allFiles = [];
  let filesInFolder = fs.readdirSync(dir);
  for (let i in filesInFolder) {
    let name = dir + '/' + filesInFolder[i];
    if (fs.statSync(name).isDirectory()) {
    } else {
      allFiles.push(name);
    }
  }
  return allFiles;
};

let files = getAllFiles('./04-copy-directory/files');
console.log(files);

for (let i in files) {
  let newFile = './04-copy-directory/files-copy/' + path.basename(files[i])
  fs.copyFile(files[i], newFile, (err) => {
    if (err) throw err; // не удалось скопировать файл
    console.log('Файл успешно скопирован');
  });
};

