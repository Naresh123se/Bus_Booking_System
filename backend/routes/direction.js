import express from 'express';
const router = express.Router();

const CLIENT_URL = "http://localhost:4000/";
router.get("/login/success1", (req, res) => {
    if (req.user) {
      res.status(200).json({
        success: true,
        message: "successfull",
        user: req.user,
        
        
      });
    }
  });
  
  export default router;