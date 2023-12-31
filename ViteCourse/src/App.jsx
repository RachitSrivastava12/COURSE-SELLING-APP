import Signup from "./Signup";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signin from "./Signin";
import Addcourse from "./Addcourse";
import AppBar from "./AppBar";
import Courses from "./Courses";
import Courseinfo from "./ Courseinfo";
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';
function App() {
  return (
    <Router>
      <Routes>
        {/* Corrected route with the colon before the parameter name */}
        {/*<Route path="/Courseinfo/:courseId" element={<Courseinfo />} />
        <Route path="/courses" element={<Courses />} />
        {/* You might want to render AppBar on a different route */}
        <Route path="/Courseinfo/:courseId" element={<Courseinfo />} />
         <Route path="/courses" element={<Courses />} />
         <Route path="/" element={<AppBar />} />
        <Route path="/addCourse" element={<Addcourse />} />
        <Route path="/login" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}
export default App;
