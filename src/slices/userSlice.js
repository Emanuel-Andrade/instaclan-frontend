import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import userService from '../services/userService'


const initialState = {
    gettedUser: {}, 
    loading: false,
    success: false,
    error: null,
    message: null
}

export const getUserById = createAsyncThunk('user/getUserById',
    async (id, thunkAPI) =>{
        
        const user = thunkAPI.getState().auth.user
        try {
            if(!id){
                const res = await userService.getUserById(user._id, user.token)            
                return res
            }
            const res = await userService.getUserById(id, user.token)            
            return res
        } catch (error) {
            console.log(error.message)
        }

    }
)
export const updateProfile = createAsyncThunk('user/updateProfile',
    async (data, thunkAPI) =>{
        let user ={ name: data.name, bio:data.bio }
        if(!data.name) user = {bio:data.bio}
        if(!data.bio) user = {name:data.name}
        if(!data.name && !data.bio) user = {bio:''}

        const token = thunkAPI.getState().auth.user.token
        try {
            const res = await userService.updateProfile(user,token,data.image)   
            if(res.errors) return thunkAPI.rejectWithValue(res.errors[0])
            return res
        } catch (error) {
            console.log(error.message)
        }

    }
)


export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        resetMessage: (state)=>{
            state.message = null
        }
    },
    extraReducers: (builder) =>{
        builder.addCase(getUserById.pending, state =>{
            state.loading = true,
            state.error = false
        }).addCase( getUserById.fulfilled, (state, action) =>{
            state.loading = false,
            state.error = false,
            state.gettedUser = action.payload
        }).addCase(updateProfile.pending, state =>{
            state.loading = true,
            state.error = false
        }).addCase( updateProfile.fulfilled, (state, action) =>{
            state.loading = false,
            state.error = false,
            state.success= true,
            state.message= "Atualizado com sucesso"
            state.gettedUser = action.payload
        }).addCase(updateProfile.rejected, (state, action) =>{
            state.loading = false,
            state.error = action.payload,
            state.success = false
        })
    }

})
export const { resetMessage } = userSlice.actions

export default userSlice.reducer