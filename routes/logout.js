const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  // delete the session
  req.session.destroy();

  // end FusionAuth session
  res.send('You have been logged out');
});

module.exports = router;
