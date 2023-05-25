const express = require('express');

const ctrl = require("../../controllers/auth-controllers");

const { validateBody } = require('../../middlewares/valideteBody');

const authenticate = require("../../middlewares/authenticate")

const { schemas } = require("../../models/user");

const router = express.Router();

// singup
router.post("/register", validateBody(schemas.registerSchema), ctrl.register);

// singin
router.post("/login", validateBody(schemas.loginSchema), ctrl.login);

router.get("/current", authenticate, ctrl.getCurrent);

router.post("/logout", authenticate, ctrl.logout);

router.patch("/", authenticate, validateBody(schemas.subscriptionSchema), ctrl.updateUserSubscription);

module.exports = router;