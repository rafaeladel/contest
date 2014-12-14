var router = require("express").Router(),
    controller = require("../controllers/contestController");

router.get("/api/contests", controller.list);
router.get("/api/contests/:id", controller.index);
router.post("/api/contests", controller.create);
router.post("/api/contests/:contest_id/questions/add", controller.manageQuestions);
router.put("/api/contests/:id", controller.update);
router.delete("/api/contests/:id", controller.delete);

module.exports = router;