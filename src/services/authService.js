import { url, requestConfig } from "../utils/config";

const registerAnUser = async data =>{
    const config = requestConfig('POST', data)

    try {
        const res = await fetch(url+'/register', config)
            .then(res => res.json())
            .catch(err => err)
        if(!res.errors) localStorage.setItem('user', JSON.stringify(res))
        return res
    } catch (error) {
        console.log(error.message)
    }
}


const logout = ()=>{
    localStorage.clear()
}
const login = async data =>{
    const config = requestConfig('POST', data)

    try {
        const res = await fetch(url+'/login',config)
                        .then(res => res.json())
                        .catch(err =>err)
        if(!res.errors) localStorage.setItem('user', JSON.stringify(res))
        return res
    } catch (error) {
        console.log(error.message)
    }
}
const authService = {
    registerAnUser,
    logout,
    login
}

export default authService