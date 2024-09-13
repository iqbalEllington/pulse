const express = require('express');
const router = express.Router();
var cors = require('cors');
const app = express();
app.use(cors())
var corsOptions = {
  origin: ['http://3.249.114.12/', 'https://beta.gaiauae.com', 'http://3.249.114.12:8080/', 'http://3.249.114.12:3000/'],
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
const search_controller = require("../controllers/searchController")
const cms_controller = require("../controllers/cmsController")
router.get('/dubai/properties/areas/:businessType/:propertyStatus/:keyword',cors(corsOptions), search_controller.location)
router.get('/mortgages',cors(corsOptions), cms_controller.mortgages)
router.get('/dubai/properties/areas/:keyword',cors(corsOptions), search_controller.islocation)
router.get('/mapview/:businessType/:propertyStatus/:param3?/:param4?/:param5?/:param6?/:param7?',cors(corsOptions), search_controller.mapsMarker)
router.get('/:businessType/:propertyStatus/:param3?/:param4?/:param5?/:param6?/:param7?/:param8?',cors(corsOptions), search_controller.search)

// router.get('/dubai/properties/areas/:businesstype/:status/:keyword',search_controller.location)
router.get('/:category/:filter', search_controller.index);
// https://www.allsopp.com/
/** ****************************************************************************
 *                       search - "POST /api/search/param"
 ***************************************************************************** */

router.post('/', cors(corsOptions), (req, res) => {
 
});

module.exports = router;
