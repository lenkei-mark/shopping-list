const express = require("express");
const router = express.Router();
const ShoppingList = require("../schemas/ShoppingList");

//Create a shopping list and redirect to uniqe ID
router.get("/", (req, res, next) => {
  ShoppingList.create(req.body).then((list) => {
    res.send(list);
  });
});

//GET a shopping list DONE
router.get("/:id", (req, res, next) => {
  ShoppingList.findById({ _id: req.params.id }).then((list) => {
    res.send(list.products);
  });
});

/*CREATE a shopping list DONE
router.post('/', (req, res, next) => {
    ShoppingList.create(req.body).then((list) => {
        res.send({
            message: "Shopping list created",
            id: list.id
        });
    })
});*/

//DELETE a shopping list DONE
router.delete("/:id", (req, res, next) => {
  ShoppingList.findByIdAndRemove({ _id: req.params.id }).then((list) => {
    res.send(list);
  });
});

//CREATE item for a shopping list DONE
router.post("/:id", (req, res, next) => {
  let product = {
    product: req.body.product,
    quantity: req.body.quantity,
    quantityType: req.body.quantityType,
  };

  ShoppingList.findOneAndUpdate(
    { _id: req.params.id },
    { $push: { products: product } }
  ).then(() => {
    ShoppingList.findOne({ _id: req.params.id }).then((products) =>
      res.send(products)
    );
  });
});

//DELETE item from a shopping list DONE
router.delete("/:id/:itemid", (req, res, next) => {
  ShoppingList.findByIdAndUpdate(req.params.id, {
    $pull: { products: { _id: req.params.itemid } },
  }).then((err) => res.send(err));
});

module.exports = router;
