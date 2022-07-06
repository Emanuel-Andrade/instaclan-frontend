import { useSelector,useDispatch } from 'react-redux'
import { useParams, Link} from 'react-router-dom'
import { useState, useEffect } from 'react'
import  ReactLoading  from 'react-loading'


import './Photo.css'
import { getPhotoById, like, comment } from '../../slices/photoSlice'
import { upload } from '../../utils/config'
import PhotoItem from '../../components/PhotoItem'
import LikeContainer from '../../components/LikeContainer'
import  Message  from '../../components/Message'

const Photo = () => {
    const {id} = useParams()
    const { photo, loading, error } =useSelector( state => state.photo)
    const { user } =useSelector( state => state.auth)
    const dispatch = useDispatch()
    const [ commentText,setCommentText ] = useState('')
    



    useEffect(() =>{
        dispatch(getPhotoById(id))
    },[like,dispatch])


    const handleComment = e =>{
        e.preventDefault()
        const data ={
            photoId: photo._id,
            comment: commentText
        }
        dispatch(comment(data))
        setCommentText('')

    }

        
    if(loading) return (
        <ReactLoading className='loading' type='bubbles'  color='#0096f6' height={100} width={100} />
    )

    return (
        <div className='container'>
            <PhotoItem photo={photo} />
            <LikeContainer photo={photo} user={user} />
            { photo.comments && (
                <div className="comments">
                    <h3> Comentários:({photo.comments.length})</h3>
                    <form onSubmit={handleComment}>
                        <input 
                            type="text"
                            onChange={ e => setCommentText( e.target.value )}
                            value ={ commentText}
                            placeholder='Insira seu comentário ...'
                        />
                        <button> Enviar </button>
                    {error && <Message msg={error} type='error' />}
                    </form>
                    {photo.comments.length === 0 && <h4> Ainda não há comentários </h4>}
                    { photo.comments && photo.comments.map( comment =>(
                        <div className="comment" key={Math.random()}>
                            <div className="author">
                                {comment.userProfile && <img alt={comment.userProfile} src={`${upload}/users/${comment.userProfile}`} /> }
                                <Link to={`/users/${comment.userId}`} > {comment.userName} </Link>
                            </div>
                            <p> {comment.comment} </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Photo