const url = process.env.REACT_APP_API_URL

const publishPhoto = async (title, file, token) =>{
    const data = new FormData()
    if(title ) data.append('title',title)
    if(file)data.append('image',file)

    try {
        const photo = await fetch(`${url}/image`,{
            method:"POST",
            body: data,
            headers:{
                "Authorization" : "Bearer " +token
            }
        })
            .then(res => res.json())
            .catch( err => err)
        return photo
    } catch (error) {
    
    }   

}

const getUserPhotos = async (userId, token) =>{

    try {
        const photos = await fetch(`${url}/user/images/${userId}`,{
            method:"GET",
            headers:{
                "Authorization": "Bearer " +token
            }
        })
            .then(res => res.json())
            .catch(err => err)

        return photos

    } catch (error) {
        console.log(error.message)
    }

}

const deletePhoto = async (photoId, token )=>{

    try {
        
        const photo = await fetch(`${url}/images/${photoId}`,{
            method:"DELETE",
            headers:{
                "Authorization": "Bearer " +token
            }
        }).then( res => res.json())
          .catch(err => err)
          
          return photo

    } catch (error) {
        console.log(error.message)
    }

}

const updatePhoto = async (title, photoId, token) =>{

    const data = {title}
    try {
        
        const editedPhoto =await fetch(`${url}/images/${photoId}`,{
            method:"PUT",
            body: JSON.stringify(data),
            headers:{
                "Authorization": "Bearer "+token,
                "Content-Type": "application/json"
            }
        }).then(res => res.json())
           .catch( err => err)
        return editedPhoto

    } catch (error) {
        console.log(error.message)
    }

}

const getPhotoByID = async (photoId, token) =>{

    try {
        const photo = await fetch(`${url}/images/${photoId}`,{
            headers:{
                "Authorization": "Bearer" +token
            }
        })
            .then(res => res.json())
            .catch(err => err)
        return photo
    } catch (error) {
        return error.message        
    }

}
const like = async (id, token) => {

    try {
        const res = await fetch(url+'/like/'+id,{
            method: "PUT",
            headers:{
                "Authorization": "Bearer "+token
            }
        }).then(res=> res.json()).catch( err => err)
        return res
    } catch (error) {
        console.log(error.message)
        return error.message
    }

}
const comment = async (comment, photoId, token) =>{
    try {
        const res = await fetch(url+'/comment/'+photoId,{
            method:"PUT",
            headers:{
                "Authorization": "Bearer " +token,
                "Content-Type": "application/json"
            },
            body:JSON.stringify(comment)
        }).then(res => res.json()).catch( err => err)

        return res

    } catch (error) {
        return error.message
    }

}
const getAllPhotos = async () =>{
    try {
        const photos = await fetch(url+"/images",{method:"GET"}).then( res => res.json()).catch( err => err)
        return photos
        
    } catch (error) {
        return error.message        
    }


}
const search = async (query, token) =>{

    try {
        const photos = await fetch(url+'/images/search?q='+query,{
            method:"GET",
            headers:{
                "Authorization": "Bearer "+token
            }
        }).then(res => res.json()).catch(err => err)

        return photos
    } catch (error) {
        return error.message
    }

}

const photoServices = {
    publishPhoto,
    getUserPhotos,
    deletePhoto,
    updatePhoto,
    getPhotoByID,
    like,
    comment,
    getAllPhotos,
    search
}

export default photoServices