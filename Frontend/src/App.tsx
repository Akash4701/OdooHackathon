import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from "./pages/Layout";
import Auth from './pages/auth/Auth';
import Home from './pages/Home';
import TiptapEditor from './components/editor/tiptap';


function App() {
  return (
              <Router>
                <Routes>
                  <Route path="/" element={<Layout />}>
                    {/* <Route index element={<HomePage />} /> */}
                    
                    <Route path="signup" element={<SignUp />} />
                    <Route path="login" element={<Login />} />
                  </Route>
                </Routes>
              </Router>
  );
}


export default App;