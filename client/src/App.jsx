import { Navigate, Routes, Route } from "react-router-dom";
import { useContext } from "react";
import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage";
import SourcesPage from "./components/SourcesPage";
import Navbar from "./widgets/Navbar";
import { StateContext } from "./state";

function NotFound() {
  return (
    <div>
      <h1> 404 Not Found</h1>{" "}
    </div>
  );
}

function App() {
  const { state } = useContext(StateContext);

  const isAuth = Boolean(state.token);

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route
          exact
          path="/"
          element={isAuth ? <Navigate to="/home" /> : <LoginPage />}
        />
        <Route
          path="/home"
          exact
          element={isAuth ? <HomePage /> : <Navigate to="/" />}
        />
        <Route path="/sources" element={<SourcesPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
// {isAuth ? <HomePage /> : <Navigate to="/" />
