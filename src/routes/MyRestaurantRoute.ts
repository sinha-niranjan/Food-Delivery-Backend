import express from "express";
import MyRestaurantController from "../controllers/MyRestaurantController";
import multer from "multer";
import { jwtCheck, jwtParse } from "../middleware/auth";
import { validateMyRestaurantResquest } from "../middleware/validation";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5mb
  },
});

// /api/my/restaurant
router.post(
  "/",
  upload.single("imageFile"),
  validateMyRestaurantResquest,
  jwtCheck,
  jwtParse,
  MyRestaurantController.createMyRestaurant
);

export default router;
