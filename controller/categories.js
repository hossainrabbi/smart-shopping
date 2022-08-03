const { default: mongoose } = require('mongoose');
const Categories = require('../model/Categories');
const error = require('../utils/error');

exports.postCategory = async (req, res, next) => {
  const { categoryName } = req.body;

  try {
    if (!categoryName) throw error('please provide category name', 400);

    let category = await Categories.findOne({
      categoryName: categoryName.toLowerCase(),
    });
    if (category) throw error('category already exist', 400);

    category = new Categories({ categoryName: categoryName.toLowerCase() });
    category = await category.save();

    res.status(201).json(category);
  } catch (err) {
    next(err);
  }
};

exports.getCategory = async (_req, res, next) => {
  try {
    const category = await Categories.find();

    res.status(200).json(category);
  } catch (err) {
    next(err);
  }
};

exports.deleteCategory = async (req, res, next) => {
  const { categoryId } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(categoryId))
      throw error('category not found', 404);

    let category = await Categories.findById(categoryId);
    if (!category) throw error('category not found', 404);

    await category.remove();

    res.status(203).send();
  } catch (err) {
    next(err);
  }
};

exports.updateCategory = async (req, res, next) => {
  const { categoryId } = req.params;
  const { categoryName } = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(categoryId))
      throw error('category not found', 404);

    let category = await Categories.findById(categoryId);
    if (!category) throw error('category not found', 404);

    category = await Categories.findOne({
      categoryName: categoryName.toLowerCase(),
    });
    if (category) throw error('this category already exist', 400);

    category = await Categories.findByIdAndUpdate(
      categoryId,
      { categoryName: categoryName.toLowerCase() },
      { new: true }
    );

    res.status(200).json(category);
  } catch (err) {
    next(err);
  }
};
