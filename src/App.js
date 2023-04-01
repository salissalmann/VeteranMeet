import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotesStates from './context/NotesStates';
import Login from './components/Login';
import SignUp from './components/SignUp';
import AddPost from './components/AddPost';
import CommunitySignUp from './components/CommunitySignUp';
import CommunityLogin from './components/CommunityLogin';
import CommunityDashboard from './components/CommunityDashboard';
import VeteranDashboard from './components/VeteranDashboard';

function App() {

  return (
  <NotesStates>
    <div className="App">
        <BrowserRouter>
          <Routes>          
            <Route path="/" element={<Login/>} />
            <Route path="/VeteranDashboard" element={<VeteranDashboard/>} />
            <Route path="/About" element={<AddPost/>} />
            <Route path="/Login" element={<Login/>} />
            <Route path="/SignUp" element={<SignUp/>} />
            <Route path="/JoinCommunity" element={<CommunitySignUp/>}/>  
            <Route path="/CommunityLogin" element={<CommunityLogin/>}/>
            <Route path="/CommunityDashboard" element={<CommunityDashboard/>}/>
          </Routes>
      </BrowserRouter>
    </div>
  </NotesStates>
  );
}

export default App;
