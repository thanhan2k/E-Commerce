const router = require('express').Router();
const ctrls = require('../controllers/product');
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken');
const uploader = require('../config/cloudinary.config');

router.post('/', [verifyAccessToken, isAdmin], ctrls.createProduct);
router.get('/', ctrls.getProducts);
router.put('/ratings', verifyAccessToken, ctrls.ratings);

router.put('/:pid', [verifyAccessToken, isAdmin], ctrls.updateProduct);
router.put('/upload-img/:pid', [verifyAccessToken, isAdmin], uploader.array('images', 10), ctrls.uploadImagesProduct);
router.delete('/:pid', [verifyAccessToken, isAdmin], ctrls.deleteProduct);
router.get('/:pid', ctrls.getProduct);

module.exports = router;

// CRUD | create - read - update - delete | POST - GET - PUT - DELETE
