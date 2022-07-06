import { Link } from 'react-router-dom'
import { upload } from '../utils/config'


import './PhotoItem.css'
const Photo = (photoObj) => {
  const photo = photoObj.photo
  return (
    <div>
      {photo.image && 
        <div className="photo-container">
            <img className='photo' src={upload+'/photos/'+photo.image} alt="photo.title" />
            <div className="title"> 
                <h2> {photo.title} </h2>
                <p className='photo-author' > publicada por: <Link to={'/users/'+photo.userId} > {photo.userName} </Link> </p>
            </div>
        </div>
      }
    </div>
  )
}

export default Photo