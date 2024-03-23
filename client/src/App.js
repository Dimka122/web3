import CustomHeader from "./components/CustomHeader";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import User from "./pages/User";
import ErrorPage from "./pages/ErrorPage";
import { Routes,Route } from "react-router-dom";


function App() {
  return (
    <div className="App">
      <CustomHeader/>

      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path='/user/:userAdr' element={<User/>} />
        <Route path='*' element={<ErrorPage/>} />
      </Routes>
    </div>
  );
}
export default App;