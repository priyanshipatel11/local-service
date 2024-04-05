const router = require('express').Router()
const subcategoryController = require('../controllers/SubcategoryController')

router.post('/subcategory',subcategoryController.createSubCategory)
router.get('/subcategory',subcategoryController.getSubCategories)
router.get('/subcategory/:id',subcategoryController.getSubCategoryById)
router.put('/subcategory/:id',subcategoryController.updateSubCategoryById)
router.delete('/subcategory/:id',subcategoryController.deleteSubCategoryById)

module.exports = router