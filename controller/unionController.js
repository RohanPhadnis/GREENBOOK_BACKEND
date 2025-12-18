import Unions from "../model/unionModel.js";

export const create = async (req, res) => {
  try {
    const newUnion = new Unions(req.body);
    const { registrationNumber } = newUnion;

    const unionExist = await Unions.findOne({ registrationNumber });
    if (unionExist) {
      return res.status(400).json({ message: "Union already exists." });
    }
    const savedData = await newUnion.save();
    // res.status(200).json(savedData);
    res.status(200).json({ message: "Union Added Successfully!" });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

export const getAllUnions = async (req, res) => {
  try {
    const unionData = await Unions.find();
    if (!unionData || unionData.length === 0) {
      return res.status(404).json({ message: "Union data not found" });
    }
    res.status(200).json(unionData);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

export const getUnionById = async (req, res) => {
  try {
    const id = req.params.id;
    const unionExist = await Unions.findById(id);
    if (!unionExist) {
      return res.status(404).json({ message: "Union not found" });
    }
    res.status(200).json(unionExist);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

export const update = async (req, res) => {
  try {
    const id = req.params.id;
    const unionExist = await Unions.findById(id);
    if (!unionExist) {
      return res.status(404).json({ message: "Union not found" });
    }
    const updatedData = await Unions.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(updatedData);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

export const deleteUnion = async (req, res) => {
  try {
    const id = req.params.id;
    const unionExist = await Unions.findById(id);
    if (!unionExist) {
      return res.status(404).json({ message: "Union not found" });
    }
    await Unions.findByIdAndDelete(id);
    res.status(200).json({ message: "Union deleted successfully" });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};
