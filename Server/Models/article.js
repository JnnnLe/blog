//blog articles consist of:
	//title
	//very short abstract
	//content
	//date stamp
	//tag words

import mongoose from 'mongoose';

const articleSchema = mongoose.Schema({
	title: String,
	abstract: String,
	date: { type: Date, default: Date.now },
	body: mongoose.Schema.Types.Mixed,
	tags: [String]
});

//great OPTION for REMOVING particular(sensitive info) and/or desired format
articleSchema.options.toJSON = {
	transform: (docStoreFrmDB, returnObj) => {
		returnObj.id = returnObj._id;
		delete returnObj._id;
		delete returnObj.__v;
	}
};

//exporting file for interfile access :) O happy day!
module.exports = mongoose.model('articles', articleSchema);