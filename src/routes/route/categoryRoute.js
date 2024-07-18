const express = require('express');
const router = express.Router();
const {
  createCategory,
  deleteCategory,
  updateCategory,
  listOfCategory,
  getSingleCategory,
} = require('../../controllers/categoryController');
const { verifyToken, isAdmin } = require('../../utils/auth');

router.post('/createCategory', verifyToken, isAdmin, createCategory);

router.put('/deleteCategory', verifyToken, isAdmin, deleteCategory);

router.put('/updateCategory', verifyToken, isAdmin, updateCategory);

router.get('/listOfCategory', verifyToken, isAdmin, listOfCategory);

router.get('/getsinglecategory', verifyToken, isAdmin, getSingleCategory);

module.exports = router;
