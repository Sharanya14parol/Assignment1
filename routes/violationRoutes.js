const express = require('express');
const router = express.Router();
const violationController = require('../controllers/violationController');

router.post('/add', violationController.addViolation);
router.get('/list', violationController.getViolations);
router.delete('/undo', violationController.undoViolation);
router.get('/logReport', violationController.logViolationReport);

module.exports = router;

