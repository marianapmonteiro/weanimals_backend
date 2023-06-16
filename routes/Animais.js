const express = require("express");
const router = express.Router();
const AnimalController = require("../controllers/AnimalController");
const { uploadEspecie } = require("../middlewares/EspecieUploadImg");

router.post("/addespecie", uploadEspecie.array("imagens", 5), AnimalController.addEspecie);
router.post("/addraca", AnimalController.addRaca);

router.get("/getespecies", AnimalController.getEspecies);
router.get("/getracas", AnimalController.getRacas);

module.exports = router;
