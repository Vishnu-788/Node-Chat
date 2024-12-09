import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/LoginForm";
import Signup from "./pages/SignupForm";
import AuthCheck from "./HOC/AuthCheck";

function App() {
  return (
    <div className="app">
      <div className="pages bg-slate-900">
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <AuthCheck>
                  <Home />
                </AuthCheck>
              }
            />

            <Route path="/login" element={<Login />} />

            <Route path="/signup" element={<Signup />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
