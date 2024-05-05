import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/auth/login";
import AuthMiddleware from "./core/middleware/auth-middleware";
import { AuthProvider } from "./core/context/auth-context";
import AdminPage from "./pages/admin.page";
import { ContactPage } from "./pages/contacts.page";
import { ToastContainer } from "react-toastify";
import { CommandesPage } from "./pages/commandes.page";

function App() {
  return (
    <div className="h-screen w-screen">
      <BrowserRouter>
        <AuthMiddleware>
          <AuthProvider>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/auth" element={<Login />} />
              <Route path="/dashboard/admin" element={<AdminPage />} />
              <Route path="/dashboard/commandes" element={<CommandesPage />} />
              <Route path="/dashboard/contacts" element={<ContactPage />} />
            </Routes>
          </AuthProvider>
        </AuthMiddleware>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;
