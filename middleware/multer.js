const multer = require('multer')
const upload = multer({ dest: 'temp/' }) // store to temp file
//const upload = multer() // no dest, use buffer 
const multiUpload = upload.fields([
  { name: 'avatar', maxCount: 1 },
  { name: 'cover', maxCount: 1 },
])
module.exports = {
  multiUpload,
}
