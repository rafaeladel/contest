var router = require("express").Router(),
    controller = require("../controllers/scoreController");

router.get("/api/scores", controller.list);
router.get("/api/scores/:id", controller.index);
router.get("/api/scores/user/:user_id/match/:match_id", controller.getSpecific)
router.post("/api/user/:user_id/match/:match_id/scores/add", controller.create);
router.put("/api/user/:user_id/match/:match_id/scores/edit", controller.update);
router.delete("/api/scores/:id", controller.delete);

module.exports = router;