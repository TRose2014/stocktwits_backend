const express = require('express');
const router = express.Router();
require('dotenv').config();

router.get('/', (req, res) => {
  res.redirect(`https://api.stocktwits.com/api/2/oauth/authorize?client_id=${process.env.client_id}&response_type=code&redirect_uri=${process.env.redirect_uri}&scope=read,watch_lists,publish_messages,publish_watch_lists,direct_messages,follow_users,follow_stocks`);
});

module.exports = router;
