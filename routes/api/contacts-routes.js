const express = require("express");

const isValidId = require("../../middlewares/isValidId")

const router = express.Router();

const contactsControllers = require("../../controllers/contact-controllers");

router.get("/", contactsControllers.getAllContacts);

router.get("/:id", isValidId, contactsControllers.getContactById);

router.post("/", contactsControllers.addContact);

router.delete("/:id", isValidId, contactsControllers.deleteContact);

router.put("/:id", isValidId, contactsControllers.updateContact);

router.patch(
  "/:id/favorite",
  isValidId,
  contactsControllers.updateStatusContact
);

module.exports = router;