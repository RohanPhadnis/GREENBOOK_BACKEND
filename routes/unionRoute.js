import express from "express";
import {
  create,
  deleteUnion,
  getAllUnions,
  getUnionById,
  update,
} from "../controller/unionController.js";

const route = express.Router();

route.post("/union", create);
route.get("/unions", getAllUnions);
route.get("/unions/:id", getUnionById);
route.put("/update/union/:id", update);
route.delete("/delete/union/:id", deleteUnion);

export default route;
