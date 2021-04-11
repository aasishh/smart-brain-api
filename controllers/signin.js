const handleSignin = (db, bcrypt) => (req, res) => {
	const {email, password} = req.body;
	if (!email || !password){
		return res.status(400).json('incorrect form submission');
	}
	db.select('email', 'hash').from('login')
		.where('email', '=', email)
		.then(data => {
			const matchedUser = bcrypt.compareSync(password, data[0].hash)
			if (matchedUser) {
				return db.select('*').from('users') 
					.where({email: email}) // same as .where('email', '=', email)
					.then(user => {
						res.json(user[0])
					})
					.catch(err => res.status(400).json('Error getting user'))
			} else {
				res.status(400).json('Unable to match user')
			}
		})
		.catch(err => res.status(400).json('Invalid user info'))
}

module.exports = {
	handleSignin: handleSignin
}