const express = require('express');
const router = express.Router();
var cors = require('cors');
const app = express();
app.use(cors())
var corsOptions = {
  origin: ['beta.gaiauae.com', 'http://localhost:8080/', 'http://3.249.114.12:8080/', 'http://3.249.114.12:3000/'],
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
const team_controller = require("../controllers/about/team")
const news_controller = require("../controllers/about/newsController")
const videos_controller = require("../controllers/about/videosController")
const career_controller = require("../controllers/about/careerController")
const cmsController = require("../controllers/cmsController")
router.get('/our-team', team_controller.get_team)
router.get('/our-team/:tag', team_controller.get_team)
router.get('/news-and-blogs', news_controller.get_news)
router.get('/news-and-blogs/page-:page/:limit', news_controller.get_news)
router.get('/news-and-blogs/:filtertag', news_controller.get_news)
router.get('/news-and-blogs/:filtertag/page-:page', news_controller.get_news)
router.get('/videos', videos_controller.get_videos)
router.get('/videos/page-:page', videos_controller.get_videos)
router.get('/videos/:filtertag', videos_controller.get_videos)
router.get('/videos/:filtertag/page-:page', videos_controller.get_videos)
router.get('/careers-at-allsopp-and-allsopp', career_controller.get_careers)
router.get('/careers-at-allsopp-and-allsopp/:filtertag', career_controller.get_careers)
router.get('/our-services', cmsController.aboutus)
router.get('/our-team/profile/:id', team_controller.get_team_profile)
router.get('/our-team/team-filter', team_controller.get_datafilters)
router.get('/:page', cmsController.complaintsProcedure)
// https://www.allsopp.com/
/** ****************************************************************************
 *                       search - "POST /api/search/param"
 ***************************************************************************** */

router.post('/', cors(corsOptions), (req, res) => {
 
});

module.exports = router;
