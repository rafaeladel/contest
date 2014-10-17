var router = require("express").Router(),
    controller = require("../controllers/userController");

router.get("/api/users", controller.list);
router.get("/api/users/:id", controller.index);
router.post("/api/users", controller.create);
router.put("/api/users/:id", controller.update);
router.delete("/api/users/:id", controller.delete);

module.exports = router;