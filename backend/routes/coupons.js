import express from "express";
import {
  addCoupons,
  updateCoupons,
  deleteCoupons,
  getCoupons,
} from "../admin/coupons.js";
const router = express.Router();
router.post("/addCoupons", addCoupons);
router.get("/getCoupons", getCoupons);
router.put("/editCoupons/:id", updateCoupons);
router.delete("/deleteCoupons/:id", deleteCoupons);
export default router;
