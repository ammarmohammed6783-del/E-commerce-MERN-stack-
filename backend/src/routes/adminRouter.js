const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const restrictTo = require("../middleware/restrictTo");

const adminController = require("../controllers/adminController");

const validate = require("../middleware/validate");
const { inviteAdminSchema } = require("../schemas/adminSchema");

router.get(
    "/",
    authMiddleware,
    restrictTo("admin", "superAdmin"),
    adminController.getAdmins
);


router.post(
    "/invite",
    authMiddleware,
    restrictTo("superAdmin"),
    validate(inviteAdminSchema),
    adminController.inviteAdmin
);


router.post(
    "/accept-invitation",
    adminController.acceptInvitation
);


router.delete(
    "/:id",
    authMiddleware,
    restrictTo("superAdmin"),
    adminController.deleteAdmin
);


router.patch(
    "/:id",
    authMiddleware,
    restrictTo("admin", "superAdmin"),
    adminController.patchAdmin
);


module.exports = router;