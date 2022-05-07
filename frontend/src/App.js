import { Route, Routes } from "react-router-dom";
import './App.css';
import Login from './components/pages/Login';
import NotFound from './components/pages/NotFound';
import Register from './components/pages/Register';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<p>HOME PAGE</p>} />
        <Route path="/terms" element={<p>Terms & Conditions</p>} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
