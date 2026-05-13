const express = require("express");

const {
  getEquipment,
  createEquipment,
  updateEquipment,
  deleteEquipment
} = require("../controllers/equipmentController");

const router = express.Router();


// GET + POST
router.route("/")
  .get(getEquipment)
  .post(createEquipment);


// PUT + DELETE
router.route("/:id")
  .put(updateEquipment)
  .delete(deleteEquipment);


module.exports = router;