var router = require("express").Router();

router.get("/", function(req, res) {
    res.send("Admin page"); 
});

module.exports = router;