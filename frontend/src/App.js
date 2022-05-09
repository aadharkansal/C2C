import { Route, Routes } from "react-router-dom";
import './App.css';
import Dashboard from "./components/pages/Dashboard";
import Login from './components/pages/Login';
import NotFound from './components/pages/NotFound';
import Register from './components/pages/Register';
import Layout from './components/layout/Layout';
import LoanRequests from "./components/pages/LoanRequests";
import Account from "./components/pages/Account";

function App() {
  return (
    <div className="App">
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/loans" element={<LoanRequests />} />
          <Route path="/account" element={<Account />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
