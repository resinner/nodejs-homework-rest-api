const express = require('express');

const ctrl = require("../../controllers/auth-controllers");

const { validateBody } = require('../../middlewares/valideteBody');

const { upload } = require("../../middlewares/upload");

const authenticate = require("../../middlewares/authenticate")

const { schemas } = require("../../models/user");

const router = express.Router();

// singup
router.post("/register", validateBody(schemas.registerSchema), ctrl.register);

router.get("/verify/:verificationCode", ctrl.verify);

router.post("/verify", validateBody(schemas.emailSchema), ctrl.resendVerifyEmail);

// singin
router.post("/login", validateBody(schemas.loginSchema), ctrl.login);

router.get("/current", authenticate, ctrl.getCurrent);

router.post("/logout", authenticate, ctrl.logout);

router.patch("/", authenticate, validateBody(schemas.subscriptionSchema), ctrl.updateUserSubscription);

router.patch("/avatars", authenticate, upload.single("avatar"), ctrl.updateAvatar);

module.exports = router;