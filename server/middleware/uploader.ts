import Busboy from 'busboy'
import path from 'path'
import sharp from 'sharp'

export default defineEventHandler(async (event) => {
  if (event.method === 'POST'||event.method === 'PUT') {
    const contentType = getRequestHeader(event, "content-type")
    console.log('hit', contentType?.includes('multipart/form-data;'))
    if (contentType?.includes('multipart/form-data;')) await useFiles(event)
  }
})

function translit(word:string) {
  const converter = {
    'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd',
    'е': 'e', 'ё': 'e', 'ж': 'zh', 'з': 'z', 'и': 'i',
    'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n',
    'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't',
    'у': 'u', 'ф': 'f', 'х': 'h', 'ц': 'c', 'ч': 'ch',
    'ш': 'sh', 'щ': 'sch', 'ь': '', 'ы': 'y', 'ъ': '',
    'э': 'e', 'ю': 'yu', 'я': 'ya'
  } as Record<string,string>

  let answer = '';
  if (word) {
    word = word.toLowerCase();

    for (var i = 0; i < word.length; ++i) {
      if (converter[word[i]] == undefined) {
        answer += word[i];
      } else {
        answer += converter[word[i]];
      }
    }
    answer = answer.replace(/[^-0-9a-z]/g, '-');
    answer = answer.replace(/[-]+/g, '-');
    answer = answer.replace(/^\-|-$/g, '');
  }
  return answer;
}

const useFiles = async (event: any) => {
  const { req } = event
  if (req.method === 'POST' || req.method === 'PUT') {
    return new Promise((resolve) => {
      const files = [] as any
      const fields = {} as any
      const busboy = Busboy({ headers: req.headers })
      let i = 1
      busboy.on('file', (name, file, info) => {
        console.log(fields)
        const { filename, encoding, mimeType } = info
        
        //! #############################################################################################
        const { promisify } = require('util')
        const fs = require('fs')
        const convert = require('heic-convert')

        (async () => {
          const inputBuffer = await promisify(fs.readFile)('/path/to/my/image.heic');
          const outputBuffer = await convert({
            buffer: inputBuffer, // the HEIC file buffer
            format: 'JPEG',      // output format
            quality: 1           // the jpeg compression quality, between 0 and 1
          })
          await promisify(fs.writeFile)('./result.jpg', outputBuffer);
        })()
        //! #############################################################################################
        

        // const newFileName = info.filename
        const newFileName = translit(fields.newName + ' ' + i ) + '.webp'
        i++
        console.log(`File [${name}]: filename: ${filename}, encoding: ${encoding}, mimeType: ${mimeType}`)
        console.log(path.join(process.cwd(), '../public/img/img'))
        const saveTo = path.join(process.cwd(), '../public/img', `${newFileName}`)
        // console.log('saveTo', saveTo)
        // file.pipe(fs.createWriteStream(saveTo))
        const data = [] as any
        let fileAsBuffer

        file.on('data', (chunk) => {
          data.push(chunk)
        })
        .on('close', async () => {
          // merge data chunks with buffer and attach them to body
          fileAsBuffer = Buffer.concat(data)
          
          await sharp(fileAsBuffer)
          .webp({ quality: 70 })
          // .resize({ width: 1920 })
          .toFile(saveTo)
        })
        .on('end', () => {
          files.push({
            fieldname: name,
            filename,
            newFileName,
            encoding,
            mimetype: mimeType,
          })
        })
      })
      busboy.on('field', (name, value, info) => {
        fields[name] = value
      })
      busboy.on('finish', () => {
        event.context.files = files
        event.context.fields = fields
        // resolve({ files, fields })
        resolve({})
      })
      req.pipe(busboy)
    })
  }
}