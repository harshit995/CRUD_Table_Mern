const multer = require("multer");



//storage config
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "./uploads")
    }
})