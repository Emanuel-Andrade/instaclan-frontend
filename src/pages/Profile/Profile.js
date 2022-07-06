import { Link, useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { BsFillEyeFill, BsPencilFill, BsXLg } from 'react-icons/bs'
import { useState, useEffect, useRef } from 'react'
import ReactLoading from 'react-loading';


import './Profile.css'
import  Message  from '../../components/Message'
import { getUserById } from '../../slices/userSlice'
import { publishPhoto, reset, getUserPhotos, deletePhoto, updatePhoto } from '../../slices/photoSlice'
import { upload } from '../../utils/config'



const Profile = () => {
    const Navigate =useNavigate()
    const [ title , setTitle ] = useState('')
    const [show, setShow] = useState(false);
    const [ file , setFile ] = useState('')
    const [ editInput , setEditInput ] = useState(false)
    const [ deletePhotoId , setDeletePhotoID ] = useState(false)
    const [ updatePhotoTitle , setUpdatePhotoTitle ] = useState('')
    const { id } = useParams()
    const { gettedUser, loading } = useSelector( state => state.user)
    const {user} = useSelector( state => state.auth)
    const dispatch = useDispatch()
    const { error, message, photos } = useSelector(state => state.photo)

    useEffect(()=>{
        const data = {id, token: user.token}
        dispatch(getUserById(id))
        dispatch(getUserPhotos(data))
        dispatch(reset())
    },[])

    const handleModal = photoId =>{    
        setShow(true)
        setDeletePhotoID(photoId)
        
    }
    const handleDelete= () =>{
        dispatch(deletePhoto(deletePhotoId))
        setShow(false)
        setDeletePhotoID('')
    }
    
    const handleSubmit = e =>{
        e.preventDefault()
        
        const data = {
            title,
            image: file,
            token: user.token
        }

        dispatch(publishPhoto(data))

        setTitle('')
        setFile('')
    }

    const handlefile = (e) =>{
       const image = e.target.files[0]
       setFile(image)
    }

    const handleUpdate = (photoId) =>{

        const data ={
            title: updatePhotoTitle,
            photoId,
        }
        dispatch(updatePhoto(data))
        setUpdatePhotoTitle('')
        if(error) return
        setEditInput(false)
    }

    const handleEditInput = (photoId) =>{

        if (editInput) return setEditInput(false)
        if (!editInput) setEditInput(photoId)
    }

    if(loading) return (
        <ReactLoading className='loading' type='bubbles'  color='#0096f6' height={100} width={100} />
    )
        

  return (  
    <div className='profile'>
        {show && 
            <div className="modal">
                
                <div className="modal-container">
                <div className="modal-header">
                    <h2 className="modal-title"> Atenção!  </h2>
                </div>

                <div className="modal-body">
                    <p>Essa ação é irreversível, pretende continuar?</p>
                </div>

                <div className="modal-footer">
                    <ul>
                        <li><button onClick={ e => setShow(false)} className='btn-modal'  > Cancelar </button></li>
                        <li><button onClick={handleDelete} className='btn-modal danger' > Excluir </button></li>
                    </ul>
                </div>
                </div>
            </div>
        }
          
        <div className="profile-header">
            { gettedUser.profileImage && <img src={`${upload}/users/${gettedUser.profileImage}`} alt="Image" /> }
            <div className="profile-description">
                <h2> {gettedUser.name} </h2>
                <p> {gettedUser.bio} </p>
                </div>
        </div>
            { id === user._id && (
                <>
                    <div className="new-photo">
                        <h3> Compartilhe algum momento </h3>
                        { file && <img id="publish-foto" src={ URL.createObjectURL(file)}/> }
                        { file && title && <p> {title} </p> }
                            <form onSubmit={handleSubmit}>
                                <label >
                                    Título:
                                    <input 
                                        type="text" 
                                        placeholder='Escreva algum título'
                                        onChange={ e => setTitle(e.target.value)}
                                        value= { title} 
                                    />
                                </label>
                                <label >
                                    Imagem:
                                    <input 
                                        type="file"
                                        onChange={ e => handlefile(e) }
                                     />
                                </label>
                                <button> Enviar </button>
                            </form>
                            {error && <Message msg={error} type='error' />}
                            {message && <Message msg={message} type='success' />}
                    </div>
                </>
            ) }
            <div className="user-photos">
                <h2> Fotos de {gettedUser.name} </h2>
                <div className="photos-container">
                   { photos && 
                        photos.map( photo =>(
                            <div key={photo._id} className="photo">
                                {photo.image && 
                                    <img onClick={e => Navigate(`/images/${photo._id}`)} src={`${upload}/photos/${photo.image}`} alt={photo.title} />
                                }
                                 { editInput === photo._id && 
                                    <>
                                    <input onChange={e =>setUpdatePhotoTitle(e.target.value)} 
                                        value= {updatePhotoTitle}
                                        className='edit-input' 
                                        placeholder={photo.title}
                                        type="text"  /> 
                                    <button onClick={e => handleUpdate(photo._id)} > Atualizar </button>
                                    </>
                                }
                                {id === user._id && 
                                <div className="actions">
                                    <Link to={`/images/${photo._id}`} > <BsFillEyeFill/> </Link>
                                    <div onClick={ () => handleEditInput(photo._id)}  > <BsPencilFill/> </div>
                                    <div className='danger' onClick={ () => handleModal(photo._id)} > <BsXLg/> </div>
                                </div>
                                }
                                
                            </div>
                        ))
                    } 
                </div>
            </div>

    </div>
  )
}

export default Profile