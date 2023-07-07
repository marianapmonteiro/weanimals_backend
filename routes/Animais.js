const express = require("express");
const router = express.Router();
const AnimalController = require("../controllers/AnimalController");
const { uploadEspecie } = require("../middlewares/EspecieUploadImg");
const { uploadRaca } = require("../middlewares/RacaUploadImg")
const Auth = require("../middlewares/Auth")


router.post("/pareamentopet", AnimalController.pareamentoPet);

router.post("/addespecie", Auth, uploadEspecie.array("imagens", 5), AnimalController.addEspecie);
router.post("/addraca", Auth, uploadRaca.array("imagens", 5), AnimalController.addRaca);

router.get("/getespecies", AnimalController.getEspecies);
router.get("/getracas", AnimalController.getRacas);
router.get("/getespeciesbyid", Auth, AnimalController.getEspeciesByAuthorId);
router.get("/getracasbyid", Auth, AnimalController.getRacasByAuthorId);
router.get("/getcomunidades", AnimalController.getComunidades);



module.exports = router;
