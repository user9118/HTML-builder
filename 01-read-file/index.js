const fs = require('fs');

let readStream = new fs.ReadStream('./01-read-file/text.txt');

readStream.on ('data', (chunk) => {
  console.log(chunk.toString());
})

