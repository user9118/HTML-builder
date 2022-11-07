const fs = require('fs');

const  readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('line', (input) => {
  if (input == 'exit') {
    rl.close();
  } else {
    fs.appendFile('./02-write-file/text.txt', input, () => {
      console.log('допишите данные или закройте')
    });
  };
});

rl.question('Введите данные: \n', (input) => {
  if (input == 'exit') {
    rl.close();
  } else {
    fs.writeFile('./02-write-file/text.txt', input, () => {
      console.log('допишите данные или закройте')
    });
  };
});



rl.on('close', () => {
  console.log('Консоль закрывается')
})
