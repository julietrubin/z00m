var mongoose = require('mongoose');

var Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId;

var Player = new Schema({
	id		: Number,
    name   	: String,
    email   : String,
    score   : Number, 
    created : { type: Date, default: Date.now},
    last_modified :  { type: Date, default: Date.now} 
});

mongoose.model('Player', Player);
var Player = mongoose.model('Player');