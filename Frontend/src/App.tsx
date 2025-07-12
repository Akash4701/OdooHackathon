import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from "./pages/Layout";
import Auth from './pages/auth/Auth';
import Home from './pages/Home';
import TiptapEditor from './components/editor/tiptap';
import { Toaster } from 'react-hot-toast';

function App() {
	return (
		<>
		<Router>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<Home />} />
					<Route path="editor" element={<TiptapEditor />} />
					<Route path="auth" element={<Auth />} />
					<Route path="home" element={<Home />} />
				</Route>
			</Routes>
		</Router>
		<Toaster position="top-right" />
		</>
	);
}

export default App;
