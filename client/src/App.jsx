// ...existing code...
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ExploreCities from "./pages/ExploreCities";
import CityDetails from "./pages/CityDetails";
import AiChatbot from "./pages/AiChatbot";
import AdminPanel from "./pages/AdminPanel";
import Navbar from "./pages/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/explore" element={<ExploreCities />} />
        <Route path="/city/:id" element={<CityDetails />} />
        <Route path="/chatbot" element={<AiChatbot />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute roleRequired="admin">
              <AdminPanel />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
};

export default App;
