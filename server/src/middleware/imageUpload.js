const multer = require('multer')
const path = require('path')

const ALLOWED_TYPES = /jpeg|jpg|png|gif/

/**
 * สร้าง multer upload middleware
 * @param {string} uploadDir - ชื่อโฟลเดอร์ย่อยภายใน public/uploads (เช่น '' หรือ 'coffee')
 */
function createImageUpload (uploadDir = '') {
  const destination = uploadDir
    ? path.join(__dirname, '../../public/uploads', uploadDir)
    : path.join(__dirname, '../../public/uploads')

  const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, destination),
    filename: (req, file, cb) =>
      cb(null, Date.now() + path.extname(file.originalname))
  })

  const fileFilter = (req, file, cb) => {
    const extValid = ALLOWED_TYPES.test(path.extname(file.originalname).toLowerCase())
    const mimeValid = ALLOWED_TYPES.test(file.mimetype)

    if (extValid && mimeValid) {
      cb(null, true)
    } else {
      cb(new Error('Only image files are allowed (jpeg, jpg, png, gif)'))
    }
  }

  return multer({
    storage,
    limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
    fileFilter
  }).single('image')
}

module.exports = createImageUpload
