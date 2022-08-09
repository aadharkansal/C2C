import { Route, Routes } from "react-router-dom";
import './App.css';
import Layout from './components/layout/Layout';
import Account from "./components/pages/Account";
import LoanCreate from "./components/pages/LoanCreate";
import LoansGiven from "./components/pages/LoanGiven";
import LoanRequests from "./components/pages/LoanRequests";
import LoansTaken from "./components/pages/LoanTaken";
import Login from './components/pages/Login';
import NotFound from './components/pages/NotFound';
import Register from './components/pages/Register';
import { AuthProvider } from './context/AuthContext';
import LoggedOutRoutes from './utility/LoggedOutRoutes';
import PrivateRoutes from "./utility/PrivateRoutes";
import ServerError from "./components/pages/ServerError";

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
            <Route path="/login" element={<LoggedOutRoutes><Login /></LoggedOutRoutes>} />
            <Route path="/register" element={<LoggedOutRoutes >< Register /></LoggedOutRoutes>} />
            <Route path="/server_error" element={<ServerError />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </Layout>
      </AuthProvider>
    </div>
  );
}

export default App;
