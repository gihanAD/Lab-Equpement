const Equipment = require("../models/Equipment");


// GET ALL EQUIPMENT
const getEquipment = async (req, res) => {
  try {

    const equipment = await Equipment.find();

    res.status(200).json(equipment);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};


// CREATE EQUIPMENT
const createEquipment = async (req, res) => {
  try {

    const { name, category, quantity, availableQuantity, condition } = req.body;

    // validation
    if (!name || !category || !quantity || !availableQuantity) {
      return res.status(400).json({
        message: "Please fill all fields"
      });
    }

    const equipment = await Equipment.create({
      name,
      category,
      quantity,
      availableQuantity,
      condition
    });

    res.status(201).json(equipment);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};


// UPDATE EQUIPMENT
const updateEquipment = async (req, res) => {
  try {

    const equipment = await Equipment.findById(req.params.id);

    if (!equipment) {
      return res.status(404).json({
        message: "Equipment not found"
      });
    }

    const updatedEquipment = await Equipment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json(updatedEquipment);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};


// DELETE EQUIPMENT
const deleteEquipment = async (req, res) => {
  try {

    const equipment = await Equipment.findById(req.params.id);

    if (!equipment) {
      return res.status(404).json({
        message: "Equipment not found"
      });
    }

    await equipment.deleteOne();

    res.status(200).json({
      message: "Equipment deleted"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};


module.exports = {
  getEquipment,
  createEquipment,
  updateEquipment,
  deleteEquipment
};