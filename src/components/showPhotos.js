import PhotoItem from './PhotoItem'
import LikeContainer from './LikeContainer'
import './ShowPhoto.css'
import { useNavigate } from 'react-router-dom'




const ShowPhotos = ( photos) => {
  const Navigate = useNavigate()


  if(!photos) return(
    <p> Não foi encontrada nenhuma publicação :/ </p>
  )
  return (
    <div id='photo'>
        { photos.photos && photos.photos.map( photo =>(
      <div key={photo._id} >
        <div onClick={ () => Navigate('/images/'+photo._id)}> <PhotoItem photo={photo} /> </div>
        <LikeContainer photo={photo} user={photos.user}/>
      </div>
    ))}
    </div>
  )
}

export default ShowPhotos


