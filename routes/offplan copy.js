const express = require('express');
const router = express.Router();
var cors = require('cors');
const app = express();
app.use(cors())
var corsOptions = {
  origin: ['https://beta.gaiauae.com', 'http://ff:3000/', 'http://3.249.114.12:8080/', 'http://3.249.114.12:3000/'],
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
const offplan = require("../controllers/offplanController")
router.get('/dubai-communities/:community',cors(corsOptions), offplan.communityguide)
router.get('/off-plan',cors(corsOptions), offplan.index)
router.get('/off-plan/:planName',cors(corsOptions), offplan.index)
router.get('/:page',cors(corsOptions), offplan.communities)
// https://www.allsopp.com/
/** ****************************************************************************
 *                       search - "POST /api/search/param"
 ***************************************************************************** */

router.post('/', cors(corsOptions), (req, res) => {
 
});

module.exports = router;
