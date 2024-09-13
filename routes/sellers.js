const express = require('express');
const router = express.Router();
var cors = require('cors');
const app = express();
app.use(cors())
var corsOptions = {
  origin: ['http://3.249.114.12/', 'https://beta.gaiauae.com', 'http://3.249.114.12:8080/', 'http://3.249.114.12:3000/'],
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
const landlordsController = require("../controllers/landlordsController")

router.get('/:page',cors(corsOptions), landlordsController.homeMaintenanceServicesDubai)

// https://www.allsopp.com/
/** ****************************************************************************
 *                       search - "POST /api/search/param"
 ***************************************************************************** */

router.post('/', cors(corsOptions), (req, res) => {
 
});

module.exports = router;
