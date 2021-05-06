const express = require('express');
const cors = require('cors');
const monk = require('monk');

const app = express();

const db = monk('localhost/main');
const info = db.get('kays');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
	res.json({
		message: 'Kaya!'
	});
});

app.get('/kays', (req, res) => {
	info.find().then(dats=>{
		res.json(dats);
	});
});

function isValidSend(x) {
	return x.name && x.name.toString().trim() !== '' && x.content && x.content.toString() !== '';
}

app.post('/kays', (req, res) => {
	if (isValidSend(req.body)) {
		//insert to dn
		const rep = {
			name: req.body.name.toString(),
			content: req.body.content.toString(),
			created: new Date()
		};
		console.log(rep);
		info.insert(rep);
		res.json(rep);

	} else {
		res.status(422);
		res.json({
			message: "Bad Data"
		});
	}
});

app.listen(5000, () => {
	console.log('Listening on http://localhost:5000');
});