const express = require('express');
const bodyParser = require('body-parser');
// const requireAuth = require('../middleware/requireAuth');
const {getAll,getById,create,updateById,deleteById} = require ('../controllers/customerController')
// const upload = require('../middleware/Multer');

const router = express.Router();
// router.use(requireAuth);
// Add bodyParser middleware to parse request bodies
router.use(bodyParser.json());

router.get('/get', getAll);

router.get('/get/:id', getById);

router.post('/create', create);

router.put('/update/:id',updateById);

router.delete('/delete/:id', deleteById);

module.exports = router;