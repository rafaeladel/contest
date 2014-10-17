var router = require("express").Router(),
    controller = require("../controllers/matchController");

router.get("/api/matches", controller.list);
router.get("/api/matches/:id", controller.index);
router.post("/api/matches", controller.create);
router.put("/api/matches/:id", controller.update);
router.delete("/api/matches/:id", controller.delete);

module.exports = router;