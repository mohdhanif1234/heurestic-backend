
import fs from "fs"
import os from "os"
import path from "path"
import { fileURLToPath } from 'url';

// writing on a file
// fs.writeFile('sample1.txt','bhai yeh bhi likh do',()=>{
//     console.log('sample1.txt ban gayi')
// })
// console.log('file pe likhne ka kaam ho gaya')

// reading from a file sync
// const contents = fs.readFileSync('sample.txt')

// console.log('Contents of the  file is-----', contents.toString())

// read file async
// fs.readFile('sample1.txt', "utf-8", (error, fileData) => {

//     console.log('Errror is----', error)
//     console.log('File data is-----', fileData)
// })

// os module
const arch = os.arch()
// console.log('Architecture is----', arch)

const cpus = os.cpus()
// console.log('CPUS is----', cpus)

// console.log('Home dir is---', os.homedir())

// console.log('hostname is----',os.hostname())

// console.log('free mem of my machine---',os.freemem())

// console.log('platform---',os.platform())

// path module

console.log('Basename is -----', path.basename('sample.txt'))

console.log('dirname---',path.dirname('sample.txt'))

console.log('extension is----',path.extname('sample.txt'))

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
console.log(dirname)
