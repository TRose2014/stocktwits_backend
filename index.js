const express = require('express');
const session = require('express-session');
const cors = require('cors');
require('dotenv').config();

const app = express();
//install the JSON middleware for parsing JSON bodies
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

var allowedOrigins = ['http://localhost:3000',
	'https://infallible-booth-e191ee.netlify.app',
	'https://infallible-booth-e191ee.netlify.app/',
	'http://localhost:3000/',
	'https://stockwits-backend.herokuapp.com/user',
	'https://stockwits-backend.herokuapp.com/',
];
app.use(cors({
	credentials: true,
	methods: 'GET',
	origin: function(origin, callback){
		// allow requests with no origin 
		if(!origin) return callback(null, true);
		if(allowedOrigins.indexOf(origin) === -1){
			var msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
			return callback(new Error(msg), false);
		}
		return callback(null, true);
	}
}));


// use routes
app.use('/user', require('./routes/user'));
app.use('/login', require('./routes/login'));
app.use('/oauth-callback', require('./routes/oauth-callback'));
app.use('/logout', require('./routes/logout'));

// start server
app.listen(process.env.PORT, () => console.log(`Stockwits example app listening on port ${process.env.PORT}.`));
