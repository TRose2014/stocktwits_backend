const express = require('express');
const router = express.Router();
const request = require('request');
require('dotenv').config();

console.log('Hello!! WTF');

router.get('/', (req, res) => {
	console.log('Inside oauth-callback');
	console.log('req', req.query);
	console.log('res', res);
	request(
		// POST request to /token endpoint
		{
			method: 'POST',
			// uri: `https://api.stocktwits.com/api/2/oauth/token?client_id=${config.client_id}&client_secret=${config.client_secret}&code=${req.query.code}&grant_type=authorization_code&redirect_uri=${config.redirect_uri}`
			uri: `https://api.stocktwits.com/api/2/oauth/token?client_id=${process.env.client_id}&client_secret=${process.env.client_secret}&code=${req.query.code}&q&grant_type=authorization_code&redirect_uri=${process.env.redirect_uri}`
			// uri: `http://localhost:${config.fusionAuthPort}/oauth2/token`,
			// form: {
			//   'client_id': config.clientID,
			//   'client_secret': config.clientSecret,
			//   'code': req.query.code,
			//   'grant_type': 'authorization_code',
			//   'redirect_uri': config.redirectURI
			// }
		},

		// callback
		(error, response, body) => {
			// save token to session
			req.session.token = JSON.parse(body).access_token;

			// redirect to the React app
			res.redirect(`http://localhost:${process.env.client_port}`);
		}
	);
});

module.exports = router;
