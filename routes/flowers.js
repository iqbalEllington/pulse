const express= require("express");
const router = express.Router();
const app = express();
const productController = require("../controllers/productsController");
const subscriptionController = require("../controllers/subscriptionController");
const { route } = require("./about");
router.get("/subscription/", subscriptionController.subscriptions)
router.get("/subscription/weekly", subscriptionController.subscriptions)
// router.get("/subscription/monthly", subscriptionController.subscriptions)
router.get("/subscription/weekly/:subscription", subscriptionController.subscription)
router.get("/subscription/monthly/:subscription", subscriptionController.subscription)
router.get("/subscription/:subscription", subscriptionController.subscription)

router.get("/flower-shop/", productController.flowers)
router.get("/flower-shop/occasions-and-categories/:category", productController.flowerscat)
router.get("/flower-shop/:product", productController.product)
router.get("/plant-shop/", productController.plants)
router.get("/plant-shop/:product", productController.product)

// router.get("/move-in-instructions/buildings", cors(corsOptions), cmsControlelr.moveInInstruction)
// router.get("/move-in-instructions/types", cors(corsOptions), cmsControlelr.moveInInstruction)

module.exports = router