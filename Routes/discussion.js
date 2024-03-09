const express = require('express');
const router = express.Router();
const discussionCtrl = require('../Controllers/discussionController')



router.post('/add',discussionCtrl.createDiscussion);
router.post('/send/:id',discussionCtrl.sendMessage);
router.delete('/:id',discussionCtrl.deleteDiscussion);
router.get('/:id?',discussionCtrl.getDiscussions);


module.exports = router;