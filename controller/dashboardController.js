import Users from "../model/userModel.js";
import Unions from "../model/unionModel.js";
import { checkSession } from "./userController.js";

/**
 * Gets the dashboard data for the user.
 * @param {*} req 
 * @param {*} res 
 */
export const dashboard = async (req, res) => {
    try {
        const {email, sessionId} = req.body || {};

        if (!email || !sessionId) {
            return res.status(401).json({ message: "Email and sessionId are required" });
        }

        const sessionValid = await checkSession({ email, sessionId });
        if (!sessionValid) {
            return res.status(401).json({ message: "Invalid session" });
        }

        const user = await Users.findOne({ email: email.toLowerCase().trim() });
        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
};

/**
 * Verify that the post request has a valid email and sessionId before allowing the operation
 * Ensure the user type is a FARMER
 * Add the union to the database as in unionController.js
 * Update the farmerInfo of the user to include the new union's ID
 * The farmerInfo field should have an array called "unions" which holds the IDs of the unions created by the farmer
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
export const authenticatedCreate = async (req, res) => {
  try {
    const { email, sessionId } = req.body || {};

    if (!email || !sessionId) {
      return res.status(401).json({ message: "Email and sessionId are required" });
    }

    const sessionValid = await checkSession({ email, sessionId });
    if (!sessionValid) {
      return res.status(401).json({ message: "Invalid session" });
    }

    const user = await Users.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    if (user.type !== "FARMER") {
      return res.status(403).json({ message: "Access denied" });
    }

    const newUnion = new Unions(req.body);
    const { registrationNumber } = newUnion;

    const unionExist = await Unions.findOne({ registrationNumber });
    if (unionExist) {
      return res.status(400).json({ message: "Union already exists." });
    }
    const savedData = await newUnion.save();

    await Users.updateOne(
      { _id: user._id },
      { $addToSet: { "farmerInfo.unions": savedData._id } }
    );
    // res.status(200).json(savedData);
    res.status(200).json({ message: "Union Added Successfully!" });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

/**
 * Verify that the post request has a valid email and sessionId before allowing the operation
 * Ensure the user type is a CORPORATE
 * Get all unions from the database as in unionController.js
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
export const authenticatedGetAllUnions = async (req, res) => {
  try {
    const { email, sessionId } = req.body || {};

    if (!email || !sessionId) {
      return res.status(401).json({ message: "Email and sessionId are required" });
    }

    const sessionValid = await checkSession({ email, sessionId });
    if (!sessionValid) {
      return res.status(401).json({ message: "Invalid session" });
    }

    const user = await Users.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    if (user.type !== "CORPORATE") {
      return res.status(403).json({ message: "Access denied" });
    }

    const unionData = await Unions.find();
    if (!unionData || unionData.length === 0) {
      return res.status(404).json({ message: "Union data not found" });
    }
    res.status(200).json(unionData);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

/**
 * Verify that the post request has a valid email and sessionId before allowing the operation
 * If the user type is CORPORATE, give access to all unions
 * If the user type is FARMER, give access only to unions created by that farmer
 * Get union by ID from the database as in unionController.js
 * @param {*} req 
 * @param {*} res 
 * @returns
 */
export const authenticatedGetUnionById = async (req, res) => {
  try {
    const { email, sessionId } = req.body || {};

    if (!email || !sessionId) {
      return res.status(401).json({ message: "Email and sessionId are required" });
    }

    const sessionValid = await checkSession({ email, sessionId });
    if (!sessionValid) {
      return res.status(401).json({ message: "Invalid session" });
    }

    const user = await Users.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    const id = req.params.id;
    const unionExist = await Unions.findById(id);
    if (!unionExist) {
      return res.status(404).json({ message: "Union not found" });
    }

    if (user.type === "FARMER") {
      const unionIds = Array.isArray(user.farmerInfo?.unions)
        ? user.farmerInfo.unions
        : [];
      const ownsUnion = unionIds.some((unionId) => String(unionId) === id);
      if (!ownsUnion) {
        return res.status(403).json({ message: "Access denied" });
      }
    }

    res.status(200).json(unionExist);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

/**
 * Verify that the post request has a valid email and sessionId before allowing the operation
 * Ensure the user type is a FARMER and that the farmer is the creator of the union
 * Update union by ID from the database as in unionController.js
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
export const authenticatedUpdate = async (req, res) => {
  try {
    const { email, sessionId } = req.body || {};

    if (!email || !sessionId) {
      return res.status(401).json({ message: "Email and sessionId are required" });
    }

    const sessionValid = await checkSession({ email, sessionId });
    if (!sessionValid) {
      return res.status(401).json({ message: "Invalid session" });
    }

    const user = await Users.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    if (user.type !== "FARMER") {
      return res.status(403).json({ message: "Access denied" });
    }

    const id = req.params.id;
    const unionExist = await Unions.findById(id);
    if (!unionExist) {
      return res.status(404).json({ message: "Union not found" });
    }

    const unionIds = Array.isArray(user.farmerInfo?.unions)
      ? user.farmerInfo.unions
      : [];
    const ownsUnion = unionIds.some((unionId) => String(unionId) === id);
    if (!ownsUnion) {
      return res.status(403).json({ message: "Access denied" });
    }

    const updatedData = await Unions.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(updatedData);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

/**
 * Verify that the post request has a valid email and sessionId before allowing the operation
 * Ensure the user type is a FARMER and that the farmer is the creator of the union
 * Delete union by ID from the database as in unionController.js
 * Delete the union ID from the farmer's farmerInfo.unions array as well
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
export const authenticatedDeleteUnion = async (req, res) => {
  try {
    const { email, sessionId } = req.body || {};

    if (!email || !sessionId) {
      return res.status(401).json({ message: "Email and sessionId are required" });
    }

    const sessionValid = await checkSession({ email, sessionId });
    if (!sessionValid) {
      return res.status(401).json({ message: "Invalid session" });
    }

    const user = await Users.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    if (user.type !== "FARMER") {
      return res.status(403).json({ message: "Access denied" });
    }

    const id = req.params.id;
    const unionExist = await Unions.findById(id);
    if (!unionExist) {
      return res.status(404).json({ message: "Union not found" });
    }

    const unionIds = Array.isArray(user.farmerInfo?.unions)
      ? user.farmerInfo.unions
      : [];
    const ownsUnion = unionIds.some((unionId) => String(unionId) === id);
    if (!ownsUnion) {
      return res.status(403).json({ message: "Access denied" });
    }

    await Unions.findByIdAndDelete(id);
    await Users.updateOne(
      { _id: user._id },
      { $pull: { "farmerInfo.unions": id } }
    );
    res.status(200).json({ message: "Union deleted successfully" });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};
