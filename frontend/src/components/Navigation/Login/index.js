import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../../store/user";
const Login = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [errors, setErrors] = useState([]);

	const activeUser = useSelector((state) => state.user.user);
	console.log(activeUser);

	const dispatch = useDispatch();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setErrors([]);

		try {
			await dispatch(login(username, password));
			setUsername("");
			setPassword("");
		} catch (err) {
			const e = await err.json();
			if (e && e.errors) setErrors(e.errors);
		}
	};
	return (
		<div>
			<div>Login</div>
			{errors.length > 0 &&
				errors.map((err, i) => <div key={i}>{err}</div>)}
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					placeholder="Username"
					required
				></input>
				<input
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					placeholder="Password"
					required
					autoComplete="none"
				></input>
				<button type="submit">Log In</button>
			</form>
		</div>
	);
};

export default Login;
