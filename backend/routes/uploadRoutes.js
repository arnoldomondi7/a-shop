import path from "path"
import express from "express"
import multer from "multer"

const uploadRouter = express.Router()

//where to store the file(s3, cloudinary etc)
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/") //null===error but no error hence null.
  },
  //describes how filenames will be formated.
  filename(req, file, cb) {
    cb(
      null,
      //extname-> is the file extension.
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    )
  },
})

//check file types.
//on the docs.
function fileFilter(req, file, cb) {
  const filetypes = /jpe?g|png|webp/
  const mimetypes = /image\/jpe?g|image\/png|image\/webp/

  const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
  const mimetype = mimetypes.test(file.mimetype)

  if (extname && mimetype) {
    cb(null, true)
  } else {
    cb(new Error("Images only!"), false)
  }
}

//doing the actual upload
const upload = multer({ storage, fileFilter })
const uploadSingleImage = upload.single("image")

uploadRouter.post("/", (req, res) => {
  uploadSingleImage(req, res, function (err) {
    if (err) {
      res.status(400).send({ message: err.message })
    }

    res.status(200).send({
      message: "Image uploaded successfully",
      image: `/${req.file.path}`,
    })
  })
})

export default uploadRouter
