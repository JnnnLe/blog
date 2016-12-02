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

// GET an article
app.get('/api/articles', (request, res) => {
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

//GET specified article using id
app.get('/api/articles/:id', (request, res) => {
	//':' is server side indicator, indicating a wild card - but it is not shown in on the client side 
	//get the value from url
	const id = request.params.id; //params === url (obj) parameter
  Article.findOne({_id: id}).exec()
  .then((article) => {
  	res.send(article);
  })
  .catch((error) => {
  	res.status(404).send(error);
  });
});


/////////////////////////////////////////////////////
									//HELPER FN//

//Creating helper fn for string validation 
//TODO: maybe put these fn in a utility file?
const validateString = (str) => {return str && str.trim().length ? true : false};

/////////////////////////////////////////////////////


//POST(adding) an article
app.post('/api/articles', (request, res) => {
	//make sure the title + body are not empty or empty strings
	if (!validateString(request.body.title) || 
		  !validateString(request.body.body)) {
		return res.status(400).send('Please make sure you have a title and body in your article.');
	} 

	//add new article to db
	new Article(request.body).save()
	.then((article) => { // saved!
		res.send(article);
	})
	.catch((error) => {
		res.status(500).send(error);
	});
});

//PUT(update) article
app.put('/api/articles', (request, res) => {
	//validate the current body with helper fn
	if (!validateString(request.body.title) || 
		  !validateString(request.body.body)) {
		return res.status(400).send('Please make sure you have a title and body in your article.');
	} 

	//update an article based on id and set new values
	Article.update({_id: request.body.id}, request.body).exec() //mongoose Article, exec === execute this action and return a promise
	.then((article) => {
		res.send(article);
	})
	.catch((error) => {
		res.status(500).send(error);
	});
});

//DELETE
app.delete('/api/articles/:id', (request, res) => { //the ':' is server side indicator, indicating a wild card - but it is not shown in on the client side 
	//get the value from url
	const id = request.params.id; //params === url (obj) parameter
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

