const handleRegister = (req, res, db, bcrypt) => {
	const {name, email, password} = req.body;
	if (!email || !name || !password){
		return res.status(400).json('incorrect form submission');
	}
	const hash = bcrypt.hashSync(password);
		db.transaction(trx => {
			trx.insert({      //two ways of updating or inserting, 1) trx.insert({...}).into('...').returning('*')
				hash: hash,   // using knex(here, as a example of transaction) 2) trx('...').insert({...}).returning('*')
				email: email
			})
			.into('login')
			.returning('email') //returns array from database
			.then(loginEmail => {
				return trx('users')//returns to the function
					.returning('*')
					.insert({
						email: loginEmail[0], // passing as object from an above returned array
						name: name,
						joined: new Date()
					})
					.then(user => res.json(user[0]))
			})
			.then(trx.commit)
			.catch(trx.rollback)
		})	
		.catch(err => console.log(err))
}


module.exports = {
	handleRegister: handleRegister
}