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
	console.log('Because I am submitting an image (and nothing else), req.body should be the image buffer, I think.');
	console.log('Trying stream.on("open") now.... makes sense why it wasnt working before');

	var readStream = fs.createReadStream(req.body);

	// This will wait until we know the readable stream is actually valid before piping
	readStream.on('open', function () {
		// This just pipes the read stream to the response object (which goes to the client)
		readStream.pipe(cloudinary.uploader.upload_stream(function(result) {
			console.log(result);
		}));
	});

	// This catches any errors that happen while creating the readable stream (usually invalid names)
	readStream.on('error', function(err) {
		res.end(err);
	});
});

module.exports = router;
