import express from "express";
import {
    addBlog,
    updateBlog,
     deleteBlog,
      getBlog 
} from "../admin/blog.js";
const router = express.Router();
router.post("/addBlog", addBlog);
router.get("/getBlog", getBlog);
router.put("/editBlog/:id", updateBlog);
router.delete("/deleteBlog/:id", deleteBlog);
export default router;
