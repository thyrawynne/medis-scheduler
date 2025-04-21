const express = require('express');
const router = express.Router();
const dokterController = require('../controllers/dokterController');

router.get('/', dokterController.getDokter);
router.post('/', dokterController.tambahDokter);

module.exports = router;
