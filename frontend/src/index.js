import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "./store";
import { restoreCSRF, csrfFetch } from "./store/csrf";

import "./index.css";
import App from "./App";

const store = configureStore();

if (process.env.NODE_ENV !== "production") {
	restoreCSRF();
	window.csrfFetch = csrfFetch;
	window.store = store;
}

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</Provider>
	</React.StrictMode>,
	document.getElementById("root")
);
