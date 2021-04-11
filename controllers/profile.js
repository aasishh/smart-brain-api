const handleProfile = (req, res) => {
	const { id } = req.params;
	db.select('*').from('users')
		.where({id}) // same as .where({id: id}) or .where('id', '=', id)
		.then(user => { 
			if (user.length) {
				res.json(user[0])
			} else {
				res.status(404).json('user not found')
			}	
		})
		.catch(err => res.status(404).json('trouble getting user!'))
}

module.exports = {
	handleProfile: handleProfile
}