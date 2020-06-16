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

app.use(cors());

// use routes
app.use('/user', require('./routes/user'));
app.use('/login', require('./routes/login'));
app.use('/oauth-callback', require('./routes/oauth-callback'));
app.use('/logout', require('./routes/logout'));

// start server
app.listen(process.env.PORT, () => console.log(`Stockwits example app listening on port ${process.env.PORT}.`));
