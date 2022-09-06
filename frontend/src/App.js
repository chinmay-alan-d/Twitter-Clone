import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Home from "./pages/Home";
import Tweet from "./pages/Tweet";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import { AuthProvider } from "./Helper/AuthProvider";
import { Restrict } from "./Helper/Restrict";
import Logout from "./pages/Logout";
import Search from "./pages/Search";
import User from "./pages/User";

function App() {
  return (
    <div>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Restrict><Home /></Restrict>}/>
            <Route path="/tweet" element={<Restrict><Tweet /></Restrict>}/>
            <Route path="/search" element={<Restrict><Search /></Restrict>}/>
            <Route path="/profile" element={<Restrict><Profile /></Restrict>}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/logout" element={<Logout/>}/>
            <Route path="/:profile" element={<Restrict><User/></Restrict>}/>
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
