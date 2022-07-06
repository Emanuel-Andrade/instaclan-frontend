import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import './Auth.css';

import { register, reset } from '../../slices/authSlice';
import Message from '../../components/Message';

const Register = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
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
    setName('')
    setConfirmPassword('')
  },[])


  const handleSubmit = e =>{
    e.preventDefault()

    const user =
    {
      name, email, password, confirmPassword
    }

     dispatch(register(user))

  }

  useEffect(()=>{
    dispatch(reset())
  },[dispatch])

  return(
    <div id='register'>
      <h1> InstaClone </h1>
      <p> Cadastre para começar sua história </p>
      <form onSubmit={handleSubmit}>
        { stringError && <Message msg={[error]} type="error" />  }
        <label >
          <span>Nome:</span>
          <input 
            type="text" 
            name='name' 
            placeholder='João Silva'
            onChange={ e=> setName(e.target.value) }
            value={name}
            
          />
        </label>
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
          <label >
            <span> Confirme a senha: </span>
            <input 
              type="password" 
              name='confirmPassword' 
              placeholder='********'
              onChange={ e=> setConfirmPassword(e.target.value) }
              value={confirmPassword}
              
          />
          </label>
          { !loading && <button> Cadastrar </button> }
          { loading && <button disabled > Cadastrando </button> }
      </form>
      <p> Já possui uma conta? <Link to='/login'> Conecte-se </Link> </p>
    </div>
  )


};

export default Register;
