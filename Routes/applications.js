const express = require('express');
const router = express.Router();
const ApplicationCtrl = require('../Controllers/appController')
const authorize = require('../middleware/authorize')



router.post('/add',authorize(['Worker']),ApplicationCtrl.addApp);
router.get('/:id?', ApplicationCtrl.getApps);
router.put('/:id' ,authorize(['Worker']),ApplicationCtrl.updateApp);
router.delete('/:id' ,authorize(['Worker']),ApplicationCtrl.deleteApp);

module.exports = router;