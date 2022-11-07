const path = require('path');
const fs = require('fs');

//создать или обнулить файл
fs.writeFile('./05-merge-styles/project-dist/bundle.css', 'data', () => {
});

//список всех файлов
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

let files = getAllFiles('./05-merge-styles/styles');

//записать содержимое файлов .css в итоговый
for (let i in files) {
  if (path.extname(files[i]) == '.css') {
    fs.readFile(files[i], 'utf8', function(error, styles) {
      if(error) throw error;
      fs.appendFile('./05-merge-styles/project-dist/bundle.css', styles, (error) => {
        if(error) throw error;
      })
    })
  }
}

