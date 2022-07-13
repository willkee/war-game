import { useDispatch } from "react-redux";
import { logout } from "../../../store/user";

const Logout = () => {
	const dispatch = useDispatch();

	const handleLogout = async (e) => {
		e.preventDefault();
		try {
			await dispatch(logout());
		} catch (err) {
			console.error("Error: ", err);
		}
	};
	return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;
