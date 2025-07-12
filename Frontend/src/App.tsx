import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from "./pages/Layout";
import SignUp from "./pages/auth/SignUp";
import Login from "./pages/auth/Login";
import TiptapEditor from './components/editor/tiptap';


function App() {
  return (
              <Router>
                <Routes>
                  <Route path="/" element={<Layout />}>
                    {/* <Route index element={<HomePage />} /> */}
                    <Route path="editor" element={<TiptapEditor/>}/>
                    <Route path="signup" element={<SignUp />} />
                    <Route path="login" element={<Login />} />
                  </Route>
                </Routes>
              </Router>
  );
}


export default App;