const Joi = require("joi");

const Contact = require("../models/contact")

const HttpError = require("../helpers/httpError");

const contactsAddSchema = Joi.object({
  name: Joi.string().min(2).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(10).required(),
  favorite: Joi.boolean(),
});

const updateFavoriteSchemas = Joi.object({
  favorite: Joi.boolean().required(),
}); 


const getAllContacts = async (req, res, next) => {
  try {
    const result = await Contact.find({}, "-createdAt, -updateAt");
    res.json(result);
  } catch (error) {
    next(error);
  }
};



const getContactById = async (req, res, next) => {
  try {
    const { id } = req.params;
      const result = await Contact.findById(id);
    if (!result) {
      throw HttpError(404, `Not found`);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};


const addContact = async (req, res, next) => {
  try {
    const { error } = contactsAddSchema.validate(req.body);
    if (error) {
      throw HttpError(400, `missing required name field`);
    }
    const result = await Contact.create(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};


const deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Contact.findByIdAndRemove(id);
    if (!result) {
      throw HttpError(404, `Not found`);
    }
    res.status(200).json({
      message: "contact deleted",
    });
  } catch (error) {
    next(error);
  }
};


const updateContact = async (req, res, next) => {
  try {
    const { error } = contactsAddSchema.validate(req.body);
    if (error) {
      throw HttpError(400, `missing fields`);
    }
    const { id } = req.params;
    const result = await Contact.findByIdAndUpdate(id, req.body, {new:true});
    if (!result) {
      throw HttpError(404, `Not found`);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};


const updateStatusContact = async (req, res, next) => {
  try {
    const { error } = updateFavoriteSchemas.validate(req.body);
    if (error) {
      throw HttpError(400, `missing field favorite`);
    }
    const { id } = req.params;
    const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
    if (!result) {
      throw HttpError(404, `Not found`);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};


module.exports = {
  getAllContacts,
  getContactById,
  addContact,
  deleteContact,
  updateContact,
  updateStatusContact,
};