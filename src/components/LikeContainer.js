import { useDispatch } from 'react-redux'
import { BsHeart, BsHeartFill } from 'react-icons/bs'


import { like } from '../slices/photoSlice'
import './LikeContainer.css'

const LikeContainer = ({photo, user}) => {
  const dispatch = useDispatch()

  const handleLike = (photoId) =>{
    dispatch(like(photoId))
  }

  return (
    <div className='like'>
        {photo.likes && user && (
            <>
                {photo.likes.includes(user._id) && <BsHeartFill onClick={ () => handleLike(photo._id) } /> }
                 {!photo.likes.includes(user._id) && <BsHeart onClick={ () => handleLike(photo._id) } />}
                <p> {photo.likes.length} Like(s) </p>
            </>
        )}

    </div>
  )
}

export default LikeContainer