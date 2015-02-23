var express = require('express');
var cloudinary = require('cloudinary');
var fs = require('fs');
var cloudinaryConfig = require('../config/cloudinary');

var router = express.Router();

cloudinary.config(cloudinaryConfig);

/* GET users listing. */
router.get('/', function(req, res, next) {
	res.send('respond cloudinary results');
});

router.post('/', function(req, res, next) {

	console.log('Streaming in so I can stream out to stream out.');

	var newDate = new Date(),
		cloudinaryStream = cloudinary.uploader.upload_stream(function(result) {
			console.log('cloudinary is finished streaming... I think... maybe... stay tuned..');
			console.log(result)
		}),
		writeStream = fs.createWriteStream('picture-' + newDate.toISOString() + '.jpg'),
		readStream;

	// This pipes the POST data to the file (because we are receiving an octet stream)
	req.pipe(cloudinaryStream);


});

module.exports = router;
