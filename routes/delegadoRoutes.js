const express = require('express');
const router = express.Router();
const delegadoController = require('../controllers/delegadoController');

router.get('/', delegadoController.index);
router.get('/:id', delegadoController.show);
router.post('/', delegadoController.create);
router.put('/:id', delegadoController.update);
router.delete('/:id', delegadoController.delete);

module.exports = router;
