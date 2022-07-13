import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Cards from "./components/Cards";
import Player from "./components/Player";
import Navigation from "./components/Navigation";
import { restoreUser } from "./store/user";

function App() {
	const [isLoaded, setIsLoaded] = useState(false);
	const dispatch = useDispatch();

	useEffect(() => {
		const restore = async () => await dispatch(restoreUser());
		setIsLoaded(true);

		restore();
	}, [dispatch]);
	return (
		<div>
			{isLoaded && (
				<>
					<Navigation />
					<Player />
					<Cards />
				</>
			)}
		</div>
	);
}

export default App;
