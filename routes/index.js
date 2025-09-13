const express = require('express');
const router = express.Router();
const {register, login, getData, updatePassword} = require('../controllers/profile.js');
const {auth} = require('../middlewares/middleware.js');

router.post('/register', register);
router.post('/login',  login);
router.get('/view', auth ,getData);
router.put('/update', auth, updatePassword);

module.exports = router;
