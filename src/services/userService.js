const url = process.env.REACT_APP_API_URL
const getUserById = async (userId, token) => {
    try {
        const user = await fetch(url+'/user/'+userId,{
            method:"GET",
            headers:{
                "authorization": 'Bearer '+token
            }
        })
            .then(res => res.json())
            .catch( err => err)
        return user
    } catch (error) {
        console.log(error.message)
    }

}

const updateProfile = async (data, token, image = null) =>{
    const updateUser = new FormData()
    updateUser.append('profileImage', image)
    if (data.name) updateUser.append('name', data.name)
    updateUser.append('bio', data.bio)
    try {
        
        const res = await fetch(url+'/user',{
            method:"PUT",
            body: updateUser ,
            headers:{
                "Authorization": "Bearer " +token,
            }
        })  
            .then(res => res.json())
            .catch( err => err)
        if(res.users) return res.errors
        return res

    } catch (error) {
        console.log(error.message)
    }



}

const userService = {
    getUserById,
    updateProfile
}
export default userService