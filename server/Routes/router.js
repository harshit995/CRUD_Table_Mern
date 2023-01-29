const express = require("express")
const router = express.Router();
const controllers = require("../Controllers/usersControllers")

router.post('/user/register', controllers.userpost)



module.exports = router;