import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/login"  element={<Login />} />
        <Route path="/signup"  element={<Signup />} />
      </Routes>
    </div>
  );
};

export default App;
