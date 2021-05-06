const form = document.querySelector('form');
const loadingElement = document.querySelector('.loading');
const API_URL = 'http://localhost:5000/kays';

loadingElement.style.display = '';

listAll();

form.addEventListener('submit', (event)=>{
	event.preventDefault();
	const formData = new FormData(form);
	const name = formData.get('name');
	const content = formData.get('content');

	const rep = {
		name,
		content
	};
	console.log(rep);
	form.style.display = 'none';
	loadingElement.style.display = '';

	fetch(API_URL, {
		method: 'POST', 
		body: JSON.stringify(rep),
		headers: {
			'content-type': 'application/json'
		}
	}).then(response => response.json()).then(createdData => {
		console.log(createdData);
		form.reset();
		form.style.display = '';
		loadingElement.style.display = 'none';
	});
});

function listAll(){
	fetch(API_URL).then(response => response.json()).then(info => {
		console.log(info);
	});
}
