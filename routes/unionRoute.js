import express from "express";
import {
  create,
  deleteUnion,
  getAllUnions,
  getUnionById,
  update,
} from "../controller/unionController.js";
import { register, login, checkSessionEndpoint } from "../controller/userController.js";
import {
  dashboard
} from "../controller/dashboardController.js";
import {
  authenticatedCreate,
  authenticatedDeleteUnion,
  authenticatedGetAllUnions,
  authenticatedGetUnionById,
  authenticatedUpdate,
} from "../controller/dashboardController.js";

const route = express.Router();

route.post("/union", create);
route.get("/unions", getAllUnions);
route.get("/unions/:id", getUnionById);
route.put("/update/union/:id", update);
route.delete("/delete/union/:id", deleteUnion);
route.post("/auth/union", authenticatedCreate);
route.post("/auth/unions", authenticatedGetAllUnions);
route.post("/auth/unions/:id", authenticatedGetUnionById);
route.post("/auth/update/union/:id", authenticatedUpdate);
route.post("/auth/delete/union/:id", authenticatedDeleteUnion);

// login & registration routes
route.post("/register", register);
route.post("/login", login);
route.post("/checkSession", checkSessionEndpoint);

// dashboards
route.post("/dashboard", dashboard);

export default route;
