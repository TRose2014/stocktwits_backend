const express = require('express');
const router = express.Router();
const request = require('request');

router.get('/', (req, res) => {
	// res.send({
	// 	user: {
	// 		email: 'shortyshort789@aol.com'
	// 	}
	// });

	console.log('req2', req.session);

	if(req.session.token) {
		request(
			{
				method: 'GET',
				uri: `https://api.stocktwits.com/api/2/search/symbols.json?access_token=${req.session.token}&q=AAPL`
			},
			// callback
			(error, response, body) => {
				console.log('body', body);
				// save token to session
				// res.send(JSON.parse(body));
				req.session.token = JSON.parse(body).access_token;
				req.session.data = body.results;

				// redirect to the React app
				res.redirect('https://infallible-booth-e191ee.netlify.app');
			}

		);
	}else{
		res.send('There was an issue');
	}
});

// router.get('/', (req, res) => {
//   // token in session -> get user data and send it back to the react app
//   if (req.session.token) {
//     request(
//       // POST request to /introspect endpoint
//       {
//         method: 'POST',
//         uri: `http://localhost:${config.fusionAuthPort}/oauth2/introspect`,
//         form: {
//           'client_id': config.clientID,
//           'token': req.session.token
//         }
//       },

//       // callback
//       (error, response, body) => {
//         let introspectResponse = JSON.parse(body);

//         // valid token -> get more user data and send it back to the react app
//         if (introspectResponse.active) {
//           request(
//             // GET request to /registration endpoint
//             {
//               method: 'GET',
//               uri: `http://localhost:${config.fusionAuthPort}/api/user/registration/${introspectResponse.sub}/${config.applicationID}`,
//               json: true,
//               headers: {
//                 'Authorization': config.apiKey
//               }
//             },

//             // callback
//             (error, response, body) => {
//               res.send(
//                 {
//                   token: {
//                     ...introspectResponse,
//                   },
//                   ...body
//                 }
//               );
//             }
//           );
//         }

//         // expired token -> send nothing
//         else {
//           req.session.destroy();
//           res.send({});
//         }
//       }
//     );
//   }

//   // no token -> send nothing
//   else {
//     res.send({});
//   }
// });

module.exports = router;
