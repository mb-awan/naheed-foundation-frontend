import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Donation from "./pages/Donation";
import Form from "./pages/Form";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/donation" element={<Donation />} />
        <Route path="/form" element={<Form />} />
      </Routes>
    </div>
  );
};

export default App;
