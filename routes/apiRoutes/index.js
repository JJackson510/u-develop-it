const express = require('express');
const router = express.Router();

router.use(require('./voteRoutes.js'));
router.use(require('./candidateRoutes'));
router.use(require('./partyRoutes'));
router.use(require('./voterRoutes.js'));
module.exports = router;