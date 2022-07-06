import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import ReactLoading from 'react-loading'

import './Search.css';
import { useQuery } from '../../hooks/useQuery';
import ShowPhotos from '../../components/showPhotos';
import { searchPhotos } from '../../slices/photoSlice';
import { like } from '../../slices/photoSlice';

const Search = () => {
    const {loading, photos} = useSelector( state => state.photo)
    const { user } = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const search = useQuery()
    const query = search.get('q')
  
    useEffect(()=>{
        dispatch((searchPhotos(query)))
    },[query,like])
  
    const handleLike = (photo) =>{
      dispatch(like(photo.id))
    }
  
  
  if(loading) return(
    <ReactLoading className='loading' type='bubbles'  color='#0096f6' height={100} width={100} />
  
  )
  
  return(
    <div id="search">
        <h2> Busca atual: {query}</h2>
        <ShowPhotos photos={photos} handleLike={handleLike} user={user} />
    </div>
  )
  
}

export default Search