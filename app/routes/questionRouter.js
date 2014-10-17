var router = require("express").Router(),
    controller = require("../controllers/questionController");

router.get("/api/questions", controller.list);
router.get("/api/questions/:id", controller.index);
router.post("/api/questions", controller.create);
router.put("/api/questions/:id", controller.update);
router.delete("/api/questions/:id", controller.delete);

module.exports = router;