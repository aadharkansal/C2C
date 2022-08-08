import { Route, Routes } from "react-router-dom";
import './App.css';
import Login from './components/pages/Login';
import NotFound from './components/pages/NotFound';
import Register from './components/pages/Register';
import Layout from './components/layout/Layout';
import LoanRequests from "./components/pages/LoanRequests";
import LoansGiven from "./components/pages/LoanGiven";
import LoansTaken from "./components/pages/LoanTaken";
import Account from "./components/pages/Account";
import PrivateRoutes from "./utility/PrivateRoutes";
import LoanCreate from "./components/pages/LoanCreate";
import { AuthProvider } from './context/AuthContext'

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<PrivateRoutes><LoanRequests /></PrivateRoutes>} />
            <Route path="/loans/given" element={<PrivateRoutes><LoansGiven /></PrivateRoutes>} />
            <Route path="/loans/taken" element={<PrivateRoutes><LoansTaken /></PrivateRoutes>} />
            <Route path="/account" element={<PrivateRoutes><Account /></PrivateRoutes>} />
            <Route path="/loans/create" element={<PrivateRoutes><LoanCreate /></PrivateRoutes>} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </Layout>
      </AuthProvider>
    </div>
  );
}

export default App;
