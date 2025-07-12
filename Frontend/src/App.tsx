import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from "./pages/Layout";
import Auth from './pages/auth/Auth';
import Home from './pages/Home';
import TiptapEditor from './components/editor/tiptap';
import Answer from './components/editor/Answer'
import Answers from './components/Answers'


function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Layout />}>
					{/* <Route index element={<HomePage />} /> */}
          <Route path="/:questionId/answer" element={<Answer />} />
          <Route path="/:questionId/answers" element={<Answers />} />
          {/* <Route path="/:questionId/answers"  */}
<Route path="editor" element={<TiptapEditor/>}/>

					<Route path="auth" element={<Auth />} />
					<Route path="home" element={<Home />} />
				</Route>
			</Routes>
		</Router>
	);
}


export default App;