import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import AuthHandler from "./pages/AuthHandler";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";

export default function App() {
	return (<>
		<Navbar/>
		<BrowserRouter>
			<Routes>
				<Route
					path="/"
					element={<Home />}
				/>

				<Route
					path="/auth-handler"
					element={<AuthHandler />}
				>
					<Route
						index
						element={<Navigate to="/login" />}
					/>
					<Route
						path="login"
						element={<Login />}
					/>
					<Route
						path="register"
						element={<Register />}
					/>
				</Route>
			</Routes>
		</BrowserRouter>
		</>
	);
}
