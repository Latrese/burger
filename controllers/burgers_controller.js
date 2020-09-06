var express = require("express");
var burger = require("../models/burgers");

var router = express.Router();

router.get("/", function(req, res) {
  burger.selectAll(function(data) {
    var handlebarsObj = {
      burgers: data
    };
    console.log(handlebarsObj);
    res.render("index", handlebarsObj);
  });

  router.post("/api/burgers", function(req, res) {
    burger.insertOne(["burger_name", "devoured"], function(result) {
      res.json({ id: result.insertId });
    });
  });
  router.put("/api/burgers/:id", function(req, res) {
    var condition = "id =" + req.params.id;

    console.log("condition", condition);
    burger.updateOne({ devoured: req.body.devoured }, condition, function(
      result
    ) {
      if ((result, changedRows === 0)) {
        return res.status(404).end();
      } else {
        res.status(200).end();
      }
    });
  });
});
module.export = router;