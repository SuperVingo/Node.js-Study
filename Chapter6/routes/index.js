const express= require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.render('index', { title: 'Express', fruit: 'banana', isLoggedIn : true });
});

module.exports = router;