const path = require('path');
const fs = require('fs');

const tampPath = './06-build-page/template.html';
const stylePath = './06-build-page/components/';

//создать папку
fs.mkdir('./06-build-page/project-dist', () => {
});

let tegs;
let regexp = /{{[a-z]*}}/gi;

//найти теги в шаблоне, 
fs.readFile(tampPath, 'utf8', function(error, html) {
  if(error) throw error;
  tegs = html.match(regexp);
  for (let i in tegs) {
    let teg = tegs[i].toString();
    teg = teg.replace(/[^a-z]+/g, '');
    //найти файл с названием тега и заменить исходный html
    fs.readFile(stylePath + teg + '.html', 'utf8', function(err, htmlTeg) {
      if(err) throw err;
      html = html.replace(tegs[i], htmlTeg);
      //записать в файл
      fs.writeFile('./06-build-page/project-dist/index.html', html, () => {})
    })
  }
})

//css
//создать или обнулить файл
fs.writeFile('./06-build-page/project-dist/style.css', '', () => {
});

//список всех файлов
let getFiles = function (dir, allFiles) {
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

let files = getFiles('./06-build-page/styles');

//записать содержимое файлов .css в итоговый
for (let i in files) {
  if (path.extname(files[i]) == '.css') {
    fs.readFile(files[i], 'utf8', function(error, styles) {
      if(error) throw error;
      fs.appendFile('./06-build-page/project-dist/style.css', styles, (error) => {
        if(error) throw error;
      })
    })
  }
}

//копировать папку

//создать папку
fs.mkdir('./06-build-page/project-dist/assets', () => {
});

//список всей файлов в папке и подпапках
let getAllFiles = function (dir, allFiles) {
  allFiles = allFiles || [];
  let filesInFolder = fs.readdirSync(dir);
  for (let i in filesInFolder) {
    let name = dir + '/' + filesInFolder[i];
    if (fs.statSync(name).isDirectory()) {
      let nameNew = name.replace(/06-build-page/, '06-build-page/project-dist');
      fs.mkdir(nameNew, () => { });
      getAllFiles(name, allFiles);
    } else {
      allFiles.push(name);
      console.log(name);
      let nameNew = name.replace(/06-build-page/, '06-build-page/project-dist');
      fs.copyFile(name, nameNew, (err) => {});
    }
  }
  return allFiles;
};

files = getAllFiles('./06-build-page/assets');