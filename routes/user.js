const express = require('express');
const router = express.Router();
const request = require('request');

router.get('/', (req, res) => {

	console.log('req2', req.session);
	console.log('req3', req.session.token);

	if(req.session.token) {
		request(
			{
				method: 'GET',
				uri: `https://api.stocktwits.com/api/2/search/symbols.json?access_token=${req.session.token}&q=AAPL`
			},
			// callback
			(error, response, body) => {
				// save token to session
				req.session.token = JSON.parse(body).access_token;
				req.session.data = body.results;

				// redirect to the React app
				res.redirect('https://infallible-booth-e191ee.netlify.app/');
			}

		);
	}else{
		res.send('There was an issue');
	}
});

module.exports = router;
