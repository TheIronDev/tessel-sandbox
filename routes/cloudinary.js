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
	req.pipe(writeStream);

	writeStream.on('data', function(result){
		console.log('writing what should be streamable data... ');
		console.log(result)
	});

	writeStream.on('end', function () {
		console.log('req is finished write streaming, now it read streams...');

		readStream = fs.createReadStream('picture-' + newDate.toISOString() + '.jpg').pipe(cloudinaryStream);

		res.send('Writing finished, now lets let the readStream stream up to cloudinary');
	});

	// This is here incase any errors occur
	writeStream.on('error', function (err) {
		console.log(err);
	});
});

module.exports = router;
