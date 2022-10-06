const {Router} = require("express")

const router =  Router();



router.get("/", function (req, res) {
    res.json({
      msg: "peticion get-rutas",
    });
  });

  router.post("/", function (req, res) {
      res.json({
        msg: "peticion post",
      });
    });

    router.put("/:id", function (req, res) {
      res.json({
        msg: "peticion put",
      });
    });

    router.delete("/:id", function (req, res) {
      res.json({
        msg: "peticion delete",
      });
    });

    module.exports = router;