import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import './Auth.css';

import { login, reset } from '../../slices/authSlice';
import Message from '../../components/Message';


const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [stringError, setStringError] = useState('')

  const dispatch = useDispatch()

  
  const {loading, error} = useSelector( state => state.auth)
  
  useEffect(()=>{
    if(typeof error === 'string') setStringError(error)
  },[error])

  useEffect(()=>{
    setEmail('')
    setPassword('')
    setStringError('')
  },[])


  const handleSubmit = e =>{
    e.preventDefault()

    const user =
    {
       email, password
    }

    dispatch(login(user))

  }

  useEffect(()=>{
    dispatch(reset())
  },[dispatch])


  return (



    <div id='login'>
      <h1> InstaClone </h1>
      <p> Entre na sua conta </p>
      <form onSubmit={handleSubmit}>
        { stringError && <Message msg={[error]} type="error" />  }
          <label >
            <span> Email: </span>
            <input 
              type="string" 
              name='email' 
              placeholder='email@email.com'
              onChange={ e=> setEmail(e.target.value) }
              value={email}
              
          />
          </label>
          <label >
            <span> Senha: </span>
            <input 
              type="password" 
              name='password' 
              placeholder='********'
              onChange={ e=> setPassword(e.target.value) }
              value={password}
              
          />
          </label>

          { !loading && <button> Entrar </button> }
          { loading && <button disabled > Entrando </button> }
      </form>
      <p> Não possui uma conta? <Link to='/register'> Cadastre-se </Link> </p>
    </div>
  

  )


}

export default Login;
