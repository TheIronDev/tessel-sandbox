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
	console.log('debugging whats wrong..');
	console.log(req.body);
	var stream = cloudinary.uploader.upload_stream(function(result) {
			console.log(result);
		});

	fs.createReadStream(req.body).pipe(stream);
});

module.exports = router;
