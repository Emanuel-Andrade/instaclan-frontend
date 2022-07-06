import {
  BrowserRouter, Routes, Route, Navigate,
} from 'react-router-dom';
import './App.css';

// Components
import NavBar from './components/NavBar'
import Footer from './components/Footer'

// Hooks
import  useAuth  from './hooks/useAuth'

// Pages
import Home from './pages/Home/Home';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import EditProfile from './pages/EditProfile/EditProfile';
import Profile from './pages/Profile/Profile';
import Photo from './pages/Photo/Photo';
import Search from './pages/Search/Search';
 
function App() {
  const { auth} =useAuth()
  return (
    <div className="App">
          <BrowserRouter>
          <NavBar/>
            <div className="container">
              <Routes>
                <Route path="/instaclan" element={ auth? <Home/>: <Navigate to='/login'/> } />
                <Route path="/" element={ auth? <Home/>: <Navigate to='/login'/> } />
                <Route path="/search" element={ auth? <Search/>: <Navigate to='/login'/> } />
                <Route path="/profile" element={ auth? <EditProfile/>: <Navigate to='/login'/> } />
                <Route path="/images/:id" element={ auth? <Photo/>: <Navigate to='/login'/> } />
                <Route path="/users/:id" element={ auth? <Profile/>: <Navigate to='/'/> } />
                <Route path="/login" element={ !auth? <Login/>: <Navigate to='/'/> } />
                <Route path="/register" element={ !auth? <Register/>: <Navigate to='/'/> } />
              </Routes>
            </div>
          <Footer/>
        </BrowserRouter>
    

    </div>
  );
}

export default App;
