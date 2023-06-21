const express = require("express");
const router = express.Router();
const Auth = require("../middlewares/Auth")

const UserController = require("../controllers/UserController");

router.post("/altperfil", Auth, UserController.AltPerfil);


module.exports = router;
