import './App.css';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Remove from './components/Remove';
import Welcome from './components/Welcome';
import Error from './components/Error';
import { Route, Routes } from 'react-router-dom';
import ConfirmOTP from './components/ConfirmOTP';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<SignUp/>}/>
        <Route path="/Login" element={<Login/>}/>
        <Route path="/Welcome" element={<Welcome/>}/>
        <Route path="/Error" element={<Error/>}/>
        <Route path="/Remove" element={<Remove/>}/>
        <Route path="/ConfirmOTP" element={<ConfirmOTP/>}/>
      </Routes>
    </div>
  );
}

export default App;
