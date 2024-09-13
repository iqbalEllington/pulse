const express= require("express");
const router = express.Router();
const app = express();
const cmsControlelr = require("../controllers/cmsController");
router.get("/", cmsControlelr.getOffices)
router.get("/:office", cmsControlelr.getOffice)

// router.get("/move-in-instructions/buildings", cors(corsOptions), cmsControlelr.moveInInstruction)
// router.get("/move-in-instructions/types", cors(corsOptions), cmsControlelr.moveInInstruction)

module.exports = router