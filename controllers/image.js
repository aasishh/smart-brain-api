const Clarifai = require('clarifai')

const app = new Clarifai.App({
 apiKey: '07db4fad6e42416ab834d6edcff481ee'
});

const handleApiCall = (req, res) => {
	app.models
	     .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
	     .then(data => res.json(data))
	     .catch(err => res.status(400).json('Clarifai API not responding'))
}

const handleImage = (req, res, db) => {
	const { id } = req.body;

	db('users').where('id', '=', id)
	  .increment('entries', 1)
	  .returning('entries')
	  .then(data => res.json(data[0]))
	  .catch(err => res.status(400).json('cannot update entries'))
}

module.exports = {
	handleImage: handleImage,
	handleApiCall: handleApiCall
}