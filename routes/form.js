const express = require('express');
const router = express.Router();
var cors = require('cors');
const app = express();

const multer  = require('multer')
const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/career/resumes"); //important this is a direct path fron our current file to storage location
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "--" + file.originalname);
  },
});
const upload = multer({ storage: fileStorageEngine });
app.use(cors())
var corsOptions = {
  origin: ['https://beta.gaiauae.com', 'http://ff:3000/', 'http://3.249.114.12:8080/', 'http://3.249.114.12:3000/'],
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
const form_controller = require("../controllers/formsController")
router.post('/book-valuation',cors(corsOptions), form_controller.bookValuation)
router.post('/applycoupon',cors(corsOptions), form_controller.applycoupon) 
router.post('/mortgages',cors(corsOptions), form_controller.mortgageEnquiry)
router.post('/book-appoinment',cors(corsOptions), form_controller.bookAppoinment)
router.post('/general',cors(corsOptions), form_controller.general)
router.post('/subscription',cors(corsOptions), form_controller.subscription)
router.post('/enquiry/:type',cors(corsOptions), form_controller.enquiry)
router.post('/career/:job',upload.single('resume'),cors(corsOptions), form_controller.careerForm)

// router.post('/formvaluation',cors(corsOptions), form_controller.formValuation)
router.get('/formwizard/:form',cors(corsOptions), form_controller.formWizard)
router.get('/formwizard/q/:qid',cors(corsOptions), form_controller.formWizardq)
router.post('/formwizard/',cors(corsOptions), form_controller.formWizardqa)
// https://www.allsopp.com/
/** ****************************************************************************
 *                       search - "POST /api/search/param"
 ***************************************************************************** */

router.post('/', cors(corsOptions), (req, res) => {
 
});

module.exports = router;
