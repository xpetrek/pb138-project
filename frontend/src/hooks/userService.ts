import { BACKEND_URL } from '../utils/constants';

const signUp = (name: string, email: string, password: string) => {
	let returnResponse;
	fetch(`${BACKEND_URL}/signup`, {
		method: 'POST',
		body: JSON.stringify({ name, email, password }),
		headers: {
			'Content-Type': 'application/json'
		}
	})
		.then(response => console.log(response.json()))
		.then(response => {
			console.log(response);
			returnResponse = response;
		});
	return returnResponse;
};

const logIn = (email: string, password: string) => {
	let returnResponse;
	fetch(`${BACKEND_URL}/login`, {
		method: 'POST',
		body: JSON.stringify({ email, password }),
		headers: {
			'Content-Type': 'application/json'
		}
	})
		.then(response => console.log(response.json()))
		.then(response => {
			console.log(response);
			returnResponse = response;
		});
	return returnResponse;
};

const userService = {
	signUp,
	logIn
};

export default userService;
