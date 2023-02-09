const express = require("express");
const router = express.Router();
const controllers = require("../Controllers/usersControllers");
const upload = require("../multerconfig/storageConfig")


// routes
router.post("/user/register", upload.single("user_profile"), controllers.userpost);
router.get("/user/details", controllers.userget)
router.get("/user/:id", controllers.singleuserget)
router.put("/user/edit/:id", upload.single("user_profile"), controllers.useredit)
router.delete("/user/delete/:id", controllers.userdelete)


module.exports = router;