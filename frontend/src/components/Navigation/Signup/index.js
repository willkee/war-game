import { useState } from "react";
import { useDispatch } from "react-redux";
import { signup } from "../../../store/user";

const Signup = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const [errors, setErrors] = useState([]);

	const dispatch = useDispatch();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setErrors([]);

		try {
			if (confirmPassword) {
				if (password === confirmPassword) {
					await dispatch(signup(username, password));
				} else {
					setErrors(["Passwords do not match."]);
				}
			} else {
				setErrors(["Please confirm your password."]);
			}
			setUsername("");
			setPassword("");
			setConfirmPassword("");
		} catch (err) {
			console.error("Error: ", err);
		}
	};
	return (
		<div>
			<div>
				{errors.length > 0 &&
					errors.map((err, i) => <div key={i}>{err}</div>)}
			</div>
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					placeholder="Username"
				></input>
				<input
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					placeholder="Password"
				></input>
				<input
					type="password"
					value={confirmPassword}
					onChange={(e) => setConfirmPassword(e.target.value)}
					placeholder="Confirm Password"
				></input>
				<button>Sign Up</button>
			</form>
		</div>
	);
};

export default Signup;
