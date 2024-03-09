const express = require('express');
const router = express.Router();
const postCtrl = require('../Controllers/posteController')
const authorize=require('../middleware/authorize');

router.post('/add',authorize(['Entreprise']),postCtrl.addPoste);
router.get('/:id?', postCtrl.getPosts);
router.put('/:id' ,authorize(['Entreprise']),postCtrl.updatePoste);
router.delete('/:id' ,authorize(['Entreprise']),postCtrl.deleteApp);

module.exports = router;