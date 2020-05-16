const express = require('express');
const router = express.Router();
const request = require('request');
const fetch = require('node-fetch');
require('dotenv').config();

router.get('/', (req, res) => {
	fetch(`https://api.stocktwits.com/api/2/oauth/token?client_id=${process.env.client_id}&client_secret=${process.env.client_secret}&code=${req.query.code}&q&grant_type=authorization_code&redirect_uri=${process.env.redirect_uri}`, {method: 'POST'})
		.then((res) => {
			console.log('res', res);
			return res.json();
		})
		.then(res.redirect('http://localhost:3000/'))
		.catch((err) => {
			console.log(err);
		});
});

// router.get('/', (req, res) => {
// 	console.log('Inside oauth-callback');
// 	console.log('req-query', req.query);
// 	request(
// 		{
// 			method: 'POST',
// 			uri: `https://api.stocktwits.com/api/2/oauth/token?client_id=${process.env.client_id}&client_secret=${process.env.client_secret}&code=${req.query.code}&q&grant_type=authorization_code&redirect_uri=${process.env.redirect_uri}`
// 		},

// 		// callback
// 		(error, response, body) => {
// 			console.log('body2', body);
// 			// save token to session
// 			req.session.token = JSON.parse(body).access_token;
// 			// res.send({res:body.results});
// 			// res.set({
// 			// 	'content-type': 'application/json',
// 			// 	'content-length': '100',
// 			// 	'body': body,
// 			// });

// 			// console.log('res', res);
// 			// res.body = body.results;
// 			// console.log('res', res.body);
// 			res.send(body);

// 			// redirect to the React app
// 			// res.redirect('http://localhost:3000/');
// 		}
// 	);
// });

module.exports = router;
