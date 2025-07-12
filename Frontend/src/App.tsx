import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from "./pages/Layout";
import Auth from './pages/auth/Auth';
import Home from './pages/Home';


function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Layout />}>
					{/* <Route index element={<HomePage />} /> */}

					<Route path="auth" element={<Auth />} />
					<Route path="home" element={<Home />} />
				</Route>
			</Routes>
		</Router>
	);
}


export default App;