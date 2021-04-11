const express = require('express')
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors')
const knex = require('knex')

const register = require('./controllers/register')
const signin = require('./controllers/signin')
const profile = require('./controllers/profile')
const image = require('./controllers/image')

const app = express();

app.use(express.json());
app.use(cors());

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'passw0rd75',
    database : 'smart-brain'
  }
});




// users database as an array of objects
/*const database = {
	users: [
		{
			id: '123',
			name: 'John',
			email: 'john@gmail.com',
			password: 'cookies',
			entries: 0,
			joined: new Date()
		},
		{
			id: '124',
			name: 'Sally',
			email: 'sally@gmail.com',
			password: 'bananas',
			entries: 0,
			joined: new Date()
		}
	],
	login: [
		{
			id: '789',
			hash: '',
			email: 'john@gmail.com'
		}
	]
}*/

app.get('/', (req, res) => {
	db.select('*').from('users')
		.then(users => {
			res.json(users)
		})
})

app.post('/signin', signin.handleSignin(db, bcrypt)) //new ES6 way

app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })

app.get('/profile/:id', (req, res) => { profile.handleProfile(req, res, db) })

app.put('/image', (req, res) => { image.handleImage(req, res, db) })

app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) })

const port = process.env.PORT
app.listen(port, () => {
	console.log(`app is running on port ${port}`);
})

