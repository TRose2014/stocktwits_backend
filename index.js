const express = require('express');
const session = require('express-session');
const cors = require('cors');
require('dotenv').config();

// configure Express app and install the JSON middleware for parsing JSON bodies
const app = express();
app.use(express.json());

// configure sessions
app.use(session(
	{
		secret: '1234567890',
		resave: false,
		saveUninitialized: false,
		cookie: {
			secure: 'auto',
			httpOnly: true,
			maxAge: 3600000
		}
	})
);

// var allowedOrigins = ['http://localhost:3000',
// 	'https://infallible-booth-e191ee.netlify.app',
// 	'https://infallible-booth-e191ee.netlify.app/',
// 	'https://infallible-booth-e191ee.netlify.app/user',
// ];
// app.use(cors({
// 	credentials: true,
// 	methods: 'GET',
// 	origin: function(origin, callback){
// 		// allow requests with no origin 
// 		// (like mobile apps or curl requests)
// 		if(!origin) return callback(null, true);
// 		if(allowedOrigins.indexOf(origin) === -1){
// 			var msg = 'The CORS policy for this site does not ' +
//                 'allow access from the specified Origin.';
// 			return callback(new Error(msg), false);
// 		}
// 		return callback(null, true);
// 	}
// }));

// configure CORS
app.use(cors(
	{
		origin: 'https://infallible-booth-e191ee.netlify.app',
		credentials: true,
	})
);
//cors
// app.use(function(req, res, next) {
// 	res.header('Access-Control-Allow-Origin', '*');
// 	res.header('Access-Control-Allow-Methods', '*');
// 	res.header('Access-Control-Allow-Headers', '*');
// 	res.header('Access-Control-Allow-Credentials', true);
// 	next();
// });
// app.options('/user', function (req, res) {
// 	res.setHeader('Access-Control-Allow-Origin', '*');
// 	res.setHeader('Access-Control-Allow-Methods', '*');
// 	res.setHeader('Access-Control-Allow-Headers', '*');
// 	res.setHeader('Access-Control-Allow-Credentials', true);
// 	res.end();
// });

app.options('/user', cors());

// use routes
app.use('/user', cors(), require('./routes/user'));
app.use('/login', cors(), require('./routes/login'));
app.use('/oauth-callback', cors(), require('./routes/oauth-callback'));
app.use('/logout', require('./routes/logout'));
// app.use('/set-user-data', require('./routes/set-user-data'));

// start server
app.listen(process.env.PORT, () => console.log(`Stockwits example app listening on port ${process.env.PORT}.`));
