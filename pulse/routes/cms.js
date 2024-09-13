const express= require("express");
const router = express.Router();
const cmsControlelr = require("../controllers/cmsController");
router.get("/faq/:page", cmsControlelr.faq)
router.get("/stories", cmsControlelr.stories)
router.get("/terms-and-conditions", cmsControlelr.terms)
router.get("/priacy-policy", cmsControlelr.privacy)
router.get("/redirector/:type/:id", cmsControlelr.redirector)

// router.get("/move-in-instructions/buildings", cors(corsOptions), cmsControlelr.moveInInstruction)
// router.get("/move-in-instructions/types", cors(corsOptions), cmsControlelr.moveInInstruction)

module.exports = router