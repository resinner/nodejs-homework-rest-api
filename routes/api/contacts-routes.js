const express = require("express");

const isValidId = require("../../middlewares/isValidId");
const authenticate = require("../../middlewares/authenticate")

const { validateBody } = require("../../middlewares/valideteBody");

const { schemas } = require("../../models/contact");

const contactsControllers = require("../../controllers/contact-controllers");

const router = express.Router();

router.get("/", authenticate, contactsControllers.getAllContacts);

router.get("/:id", authenticate, isValidId, contactsControllers.getContactById);

router.post("/", authenticate, validateBody(schemas.contactsAddSchema), contactsControllers.addContact);

router.put("/:id", authenticate, isValidId, validateBody(schemas.contactsAddSchema), contactsControllers.updateContact);

router.delete("/:id", authenticate, isValidId, contactsControllers.deleteContact);

router.patch("/:id/favorite", authenticate, isValidId, validateBody(schemas.updateFavoriteSchema), contactsControllers.updateStatusContact);

module.exports = router;