var express = require('express');
var cloudinary = require('cloudinary');
var fs = require('fs');
var cloudinaryConfig = require('../config/cloudinary');

var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
	res.send('respond cloudinary results');
});

router.post('/', function(req, res, next) {
	stream = cloudinary.uploader.upload_stream(function(result) {
			console.log(result);
			res.send('Done:<br/> <img src="' + result.url + '"/><br/>' +
			cloudinary.image(result.public_id, {
				format: "png",
				width: 100,
				height: 130,
				crop: "fill"
			}));
		},
		{
			public_id: req.body.title
		});
	fs.createReadStream(req.files.image.path, {encoding: 'binary'}).on('data', stream.write).on('end', stream.end);
});

module.exports = router;
