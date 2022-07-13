import { csrfFetch } from "./csrf";

const SET_USER = "session/setUser";
const REMOVE_USER = "session/removeUser";

const setUser = (user) => ({
	type: SET_USER,
	payload: user,
});

const removeUser = () => ({
	type: REMOVE_USER,
});

export const login = (username, password) => async (dispatch) => {
	const response = await csrfFetch("/api/users/login", {
		method: "POST",
		body: JSON.stringify({ username, password }),
	});
	const data = await response.json();
	dispatch(setUser(data.user));
	return response;
};

export const restoreUser = () => async (dispatch) => {
	const response = await csrfFetch("/api/users");
	const data = await response.json();
	dispatch(setUser(data.user));
	return response;
};

export const signup = (user) => async (dispatch) => {
	const { username, password } = user;
	const response = await csrfFetch("/api/users/signup", {
		method: "POST",
		body: JSON.stringify({
			username,
			password,
		}),
	});
	const data = await response.json();
	dispatch(setUser(data.user));
	return response;
};

export const logout = () => async (dispatch) => {
	const response = await csrfFetch("/api/users/logout", {
		method: "DELETE",
	});
	dispatch(removeUser());
	return response;
};

const userReducer = (state = { user: null }, action) => {
	let newState;
	switch (action.type) {
		case SET_USER:
			newState = { ...state, user: action.payload };
			return newState;
		case REMOVE_USER:
			newState = { ...state, user: null };
			return newState;
		default:
			return state;
	}
};

export default userReducer;
