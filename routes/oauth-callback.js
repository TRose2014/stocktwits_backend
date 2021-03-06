const express = require('express');
const router = express.Router();
const request = require('request');
require('dotenv').config();

router.get('/', (req, res) => {
	request(
		{
			method: 'POST',
			uri: `https://api.stocktwits.com/api/2/oauth/token?client_id=${process.env.client_id}&client_secret=${process.env.client_secret}&code=${req.query.code}&q&grant_type=authorization_code&redirect_uri=${process.env.redirect_uri}`
		},

		// callback
		(error, response, body) => {
			// save token to session
			req.session.token = JSON.parse(body).access_token;

			// redirect to the React app
			res.redirect(`https://infallible-booth-e191ee.netlify.app/#${req.session.token}`);
		}
	);
});

module.exports = router;
