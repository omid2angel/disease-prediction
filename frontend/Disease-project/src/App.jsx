import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import FormSelect from "../pages/FormSelect";
import FormInput from "../pages/FormInput";
import '../src/App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/select" element={<FormSelect />} />
        <Route path="/input" element={<FormInput />} />
      </Routes>
    </Router>
  );
}

export default App;







