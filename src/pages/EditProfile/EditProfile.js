import { useEffect,useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import ReactLoading from 'react-loading';

import './EditProfile.css'
import Message from '../../components/Message'

// Redux
import { getUserById, resetMessage, updateProfile } from '../../slices/userSlice'

const EditProfile =  () => {
    const upload ='http://localhost:4008/uploads/users/'
    const [name, setName] = useState('')
    const [bio, setBio] = useState('')
    const [profileImage, setProfileImage] = useState('')
    const [previewImage, setPreviewImage] = useState('')
    const { gettedUser, error, message, loading} = useSelector(state => state.user)
    const dispatch = useDispatch()
    const Navigate = useNavigate()

    const handleSubmit = (e)=>{
        e.preventDefault()

        const data = {
            name: name? name : null,
            bio,
            image:profileImage
        }
        dispatch(updateProfile(data))

    }
    const handleFile = (e)=>{

        const image = e.target.files[0]

        setPreviewImage(image)


        setProfileImage(image)


    }
  

    useEffect(()=>{
       dispatch(getUserById())
        dispatch(resetMessage())
    
    },[])

    
    if(loading) return (
        <ReactLoading className='loading' type='bubbles'  color='#0096f6' height={100} width={100} />
    )
        
    
  return (
    <div id='edit-profile' >
        <h2> Editar Perfil </h2>
        
            <form onSubmit={handleSubmit} >
            { (gettedUser.profileImage || previewImage) && (
                <img id="profile-image" 
                src={previewImage? URL.createObjectURL(previewImage): upload+gettedUser.profileImage }
                />
            )}
            <label>
                <span>Altera foto de Perfil:</span>
                <input 
                    type="file" 
                    onChange ={e => handleFile(e)}
                />
            </label>
            <label>
                <span>Nome:</span>
                <input 
                    type="text" 
                    placeholder={gettedUser.name}
                    onChange={e =>{setName(e.target.value)}}
                    value={name}     
                />
            </label>
            <label>
                <span>Email:</span>
                <input type="text" placeholder={gettedUser.email}disabled />
            </label>
            <label>
                <span>Bio:</span>
                <input 
                    type="text-area" 
                    placeholder={gettedUser.bio}
                    onChange={ e => setBio(e.target.value)}
                />
            </label>
            <label>
                <span>Senha:</span>
                <input type="text"disabled placeholder="*******" />
                <span className='password'> Para atualizar senha <a onClick={e => Navigate('/recovery')}> clique aqui </a> </span>
            </label>
            <button> Atualizar </button>
            { error && <Message msg={[error]} type="error" />  }
            { message && <Message msg={[message]} type="success" />  }
        </form>
        
    </div>
  )
}

export default EditProfile