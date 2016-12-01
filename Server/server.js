//start the fun

//import module express server
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
//es5 promise deprecaited in Moongoose, override with es6 Promise
mongoose.Promise = Promise;
import Article from './Models/article';

//connect mongoose to db
//localhost was given in the terminal when downloaded, last portion is the created name for the db = 'blog'
//create this file for me mongo database
mongoose.connect('mongodb://localhost:27017/blog');

//create instance of our app (syntax is specific to express)
const app = express();

//middleware: runs before every single fn in the server
// In this case we will import body-parser to format the body of the data
//the request data type is JSON
app.use(bodyParser.json());
//line 15, just has to be
app.use(bodyParser.urlencoded({extended: true}));


//REST - Express
// GET an aqrticle
app.get('/api/articles', (req, res) => {
	//get article from db
	//articleSchema OPTIONS format gets implemented in find
	Article.find({}).exec() //rn promise, async call
	.then((articles) => {
		//rn articles
		res.send(articles);
	})
	.catch((error) => {
		res.status(500).send(error);
	});
});

//POST an article
app.post('/api/articles', (req, res) => {
	//add new article to db
	new Article(req.body).save()
	.then((article) => { // saved!
		res.send(article);
	})
	.catch((error) => {
		res.status(500).send(error);
	});
});

//PUT 

//DELETE
app.delete('/api/articles/:id', (req, res) => {
	//get the value from url
	const id = req.params.id; //params === url (obj) parameter
	//find the article with that id
	Article.find({_id: id}).remove().exec() //delete article
	.then(() => {
		res.status(200).send(); //if 200 return then success
	})
	.catch((error) => {
		res.status(500).send(error);
	});
});

//start the server and set a port
app.listen(1337);

