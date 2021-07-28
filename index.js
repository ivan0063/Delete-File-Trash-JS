const { resolve } = require('path');
const { readdir } = require('fs').promises;
const fs = require('fs');

async function* getFiles(dir) {
  const dirents = await readdir(dir, { withFileTypes: true });
  for (const dirent of dirents) {
    const res = resolve(dir, dirent.name);
    if (dirent.isDirectory()) {
      yield* getFiles(res);
    } else {
      yield res;
    }
  }
}

const direcotrio = process.argv[2];
const extencion = process.argv[3];

console.log('ruta', direcotrio);
console.log('archivos con extencion .', extencion);

;(async () => {
    let files = [];

    for await (const f of getFiles(direcotrio)) {
        if(f.match(extencion)) {
            files.push(f);
            fs.unlinkSync(f);
        }
    }

    console.log(files.length);
  })()