import "./styles.css";
import { HashRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import Login from "./components/Login"
import Purchase from "./pages/Purchase";
import Loader from "./components/Loader";
import { useSelector } from "react-redux";
import ProtectedRoutes from "./components/ProtectedRoutes";

function App() {
  const isLoading = useSelector(state => state.isLoading)
  return (
    <HashRouter>
      <div className="App">
        {isLoading && <Loader />}
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/purchase" element={<Purchase />} />
          </Route>
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;