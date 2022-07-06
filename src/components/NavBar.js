import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { BsSearch, BsHouseDoorFill, BsFillPersonFill, BsFillCameraFill } from 'react-icons/bs'
import './NavBar.css';


import useAuth from '../hooks/useAuth';
import { useDispatch, useSelector } from 'react-redux';
import { logout, reset } from '../slices/authSlice';




const NavBar = () => {
  const Navigate = useNavigate()
  const {auth} = useAuth()
  const {user} = useSelector(state => state.auth)
  const dispatch = useDispatch()

  const [ query, setQuery ] = useState('')

  const handleClick = () =>{
    dispatch(logout())
    dispatch(reset())
  }

  const handleSearch = (e) =>{
    e.preventDefault()
    Navigate(`/search?q=${query}`)
    setQuery('')
  }


  return(
    <nav id='nav'>
    <Link to='/' > InstaClone </Link>
    <form id="search-form" onSubmit={handleSearch}>
      <BsSearch onClick={handleSearch}/>
      <input type="text" placeholder='Digite sua pesquisa' value={query} onChange={e => setQuery(e.target.value)} />
    </form>
    <ul id="nav-links">
      { auth && <li> <NavLink to='/'> <BsHouseDoorFill/> </NavLink> </li>}
      { user && <li> <NavLink to={`/profile`}> <BsFillPersonFill/> </NavLink> </li>}      
      { user && <li> <NavLink to={`/users/${user._id}`}> <BsFillCameraFill/> </NavLink> </li>}      
      { user && <li> <NavLink to={`/login`}> <span onClick={handleClick} > Sair </span> </NavLink> </li>}      
      { !auth && <li> <NavLink to='/login'> Entrar </NavLink> </li> }
      {!auth && <li> <NavLink to='/register'> Cadastrar </NavLink> </li>}
    </ul>
  </nav>
  )

}

export default NavBar;
