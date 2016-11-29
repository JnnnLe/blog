//start the fun

//import module express server
import express from 'express';

//create instance of our app (syntax is specific to express)
const app = express();

//REST - Express
// GET it girl 
app.get('/hi', (req, res) => {
	res.send('Hi there Mr Gulbrandsen');
});

//start the server and set a port
app.listen(1337);

