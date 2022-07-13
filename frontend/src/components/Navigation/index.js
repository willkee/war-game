import { useState } from "react";
import { useSelector } from "react-redux";
import Login from "./Login";
import Logout from "./Logout";
import Signup from "./Signup";

const Navigation = () => {
	const [toggle, setToggle] = useState("login");
	const activeUser = useSelector((state) => state.user.user);
	return (
		<div>
			{!activeUser ? (
				<>
					{toggle === "login" && (
						<>
							<Login />
							<div onClick={() => setToggle("signup")}>
								Sign up instead?
							</div>
						</>
					)}
					{toggle === "signup" && (
						<>
							<Signup />
							<div onClick={() => setToggle("login")}>
								Log in instead?
							</div>
						</>
					)}
				</>
			) : (
				<>
					<div>Welcome back, {activeUser.username}!</div>
					<Logout />
				</>
			)}
		</div>
	);
};

export default Navigation;
