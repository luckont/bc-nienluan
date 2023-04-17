const express = require('express');
const hoidongs = require('../controllers/hoidong.controller');
const router = express.Router();

router.route('/')
    .get(hoidongs.findAll)
    .post(hoidongs.create)
    .delete(hoidongs.deleteAll);


router.route("/statusST")
    .get(hoidongs.findAllStatusST);
    
router.route('/:id') 
    .get(hoidongs.findOne)
    .put(hoidongs.update)
    .delete(hoidongs.delete);

module.exports = router;