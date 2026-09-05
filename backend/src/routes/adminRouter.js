const express = require("express")
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware")
const adminController = require("../controllers/adminController")

router.get("/", authMiddleware, adminController.getAdmins)
router.post("/", authMiddleware, adminController.createAdmin)
router.delete("/:id", authMiddleware, adminController.deleteAdmin)
router.patch("/:id", authMiddleware, adminController.patchAdmin)


module.exports = router;