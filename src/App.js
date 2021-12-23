import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Search from "./pages/search/Search";
import Messenger from "./pages/messenger/Messenger";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
function App() {
  const { user } = useContext(AuthContext);
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={user ? <Home /> : <Register />}></Route>
      </Routes>
      <Routes>
        <Route
          path="/login"
          element={user ? <Navigate to="/" /> : <Login />}
        ></Route>
      </Routes>
      <Routes>
        <Route
          path="/register"
          element={user ? <Navigate to="/" /> : <Register />}
        ></Route>
      </Routes>
      <Routes>
        <Route path="/profile/:userId" element={<Profile />}></Route>
      </Routes>
      <Routes>
        <Route path="/search/:searhQuery" element={<Search />}></Route>
      </Routes>
      <Routes>
        <Route
          path="/messenger"
          element={user ? <Messenger /> : <Navigate to="/register" />}
        ></Route>
      </Routes>
    </Router>
  );
}

export default App;
