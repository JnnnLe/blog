//start the fun

//import module express server
import express from 'express';
import bodyParser from 'body-parser';

//create instance of our app (syntax is specific to express)
const app = express();

//middleware: runs before every single fn in the server
// In this case we will import body-parser to format the body of the data
//the request data type is JSON
app.use(bodyParser.json());
//line 15, just has to be
app.use(bodyParser.urlencoded({extended: true}));

const articles = [];


//REST - Express
// GET it girl 
app.get('/articles', (req, res) => {
	res.send(articles);
});

//POST
app.post('/articles', (req, res) => {
	articles.push(req.body);
	res.send('Me done');
});

//start the server and set a port
app.listen(1337);

