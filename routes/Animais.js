const express = require("express");
const router = express.Router();

const AnimalController = require("../controllers/AnimalController");

router.post("/addespecie", AnimalController.addEspecie);
router.post("/addraca", AnimalController.addRaca);

router.get("/getespecies", AnimalController.getEspecies);
router.get("/getracas", AnimalController.getRacas);

module.exports = router;
