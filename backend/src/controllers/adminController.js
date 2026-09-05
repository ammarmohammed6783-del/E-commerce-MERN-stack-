const User = require("../models/user");
const AppError = require("../utils/AppError")

exports.getAdmins = async (req, res, next) => {
    try {
        const admins = await User.find({ role: "admin" });

        res.status(200).json({
            msg: "Admins returned successfully",
            admins
        });

    } catch (err) {
        const error = new AppError("Error getting admins", 500);
        next(error);
    }
};



exports.inviteAdmin = async (req, res, next) => {
    try {
        const { userName, email } = req.body;

        // Generate random invitation token
        const invitationToken = crypto.randomBytes(32).toString("hex");

        const invitationExpires = Date.now() + 24 * 60 * 60 * 1000;

        const user = await User.create({
            userName,
            email,
            role: "admin",
            password: undefined,
            invitationToken,
            invitationExpires,
            isActive: false
        });

        // For now, just return the link
        const invitationLink =
            `http://localhost:3000/accept-invitation?token=${invitationToken}`;

        res.status(201).json({
            msg: "Admin invitation created",
            invitationLink
        });

    } catch (err) {
        const error = new AppError("error inviting the new admin", 500)
        next(error);
    }
};







exports.deleteAdmin = async (req, res, next) => {
    try {
        const adminId = req.params.id;

        const deletedAdmin = await User.findOneAndDelete({
            _id: adminId,
            role: "admin"
        });

        if (!deletedAdmin) {
            return next(
                new AppError("Admin not found", 404)
            );
        }

        res.status(200).json({
            msg: "Admin deleted successfully"
        });

    } catch (err) {
        const error = new AppError(
            "Error deleting admin",
            500
        );

        next(error);
    }
};

exports.patchAdmin = async (req, res, next) => {
    try {
        const adminId = req.params.id;

        // Admin can only modify themselves
        if (adminId !== req.userId) {
            return next(
                new AppError(
                    "You can only modify your own account",
                    403
                )
            );
        }

        const { userName, email } = req.body;

        const admin = await User.findOne({
            _id: adminId,
            role: { $in: ["admin", "superAdmin"] }
        });

        if (!admin) {
            return next(
                new AppError("Admin not found", 404)
            );
        }

        admin.userName = userName ?? admin.userName;
        admin.email = email ?? admin.email;

        await admin.save();

        res.status(200).json({
            msg: "Account updated successfully",
            admin
        });

    } catch (err) {
        next(new AppError("Error updating account", 500));
    }
};