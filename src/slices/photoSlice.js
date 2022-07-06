import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import photoServices from "../services/photoService";

const initialState ={
    photos: [],
    photo: {},
    error: false,
    success: false,
    message: false,
    loading: false
}

export const publishPhoto = createAsyncThunk("photo/publish",
    async (data, thunkAPI) =>{
        try {
            const photo  = await photoServices.publishPhoto(data.title, data.image, data.token)

            if (photo.errors) return thunkAPI.rejectWithValue(photo.errors[0]) 

            return photo
        } catch (error) {
            console.log(error.message)
        }
    }
)
export const deletePhoto = createAsyncThunk("photo/delete",
    async(photoId, thunkAPI) =>{
        const token = thunkAPI.getState().auth.user.token
        try {
            const res = await photoServices.deletePhoto(photoId, token)

            if (res.errors) return thunkAPI.rejectWithValue(res.errors[0])
            return res
        } catch (error) {
            
        }
    }
)
export const getUserPhotos = createAsyncThunk( 'photo/getUserPhotos',
    async (data, thunkAPI)=>{

        try {
            const photos = await photoServices.getUserPhotos(data.id, data.token)

            if(photos.errors) return thunkAPI.rejectWithValue(photos.errors[0])
            return photos

        } catch (error) {
            
        }

    }
)
export const updatePhoto = createAsyncThunk('photo/update',
async (data, thunkAPI) =>{
    
    const token = thunkAPI.getState().auth.user.token

    try {
        
        const res = await photoServices.updatePhoto(data.title, data.photoId, token)

        if(res.errors) return thunkAPI.rejectWithValue(res.errors[0])
        return res

    } catch (error) {
        console.log(error.message)
    }


}
)
export const getPhotoById = createAsyncThunk("photo/GetById",
    async(photoId, thunkAPI) =>{

        try {
            
            const token =thunkAPI.getState().auth.user.token

            const res = await photoServices.getPhotoByID(photoId,token)

            if(res.errors) return thunkAPI.rejectWithValue(res.errors[0])
            return res

        } catch (error) {
            
        }

    }
)
export const like = createAsyncThunk( "photo/like",
async (photoId, thunkAPI) =>{
    const token = thunkAPI.getState().auth.user.token

    try {
        
        const res = await photoServices.like(photoId, token)

        if (res.errors) return thunkAPI.fulfillWithValue(res.errors[0])

        const photos =  await photoServices.getAllPhotos()
        return {res, photos}

    } catch (error) {
        console.log(error.message)
    }

})
export const comment = createAsyncThunk("photo,comment",
async (data, thunkAPI) =>{
    const token = thunkAPI.getState().auth.user.token
    try {
        
        const res = await photoServices.comment({comment: data.comment}, data.photoId, token)

        if (res.errors) return thunkAPI.rejectWithValue(res.errors[0])

        const photo = await photoServices.getPhotoByID(data.photoId,token)

        return photo

    } catch (error) {
        console.log(error.mesage)
    }

})
export const getAllPhotos = createAsyncThunk("photo/getAll",
async () => {

    try {
        const photos = await photoServices.getAllPhotos()
        return photos
    } catch (error) {
        console.log(error.mesage)
    }

})
export const searchPhotos = createAsyncThunk("photo,search",
async (query, thunkAPI) =>{
    const token = thunkAPI.getState().auth.user.token

    try {
        const photos  = await photoServices.search(query, token)

        if(photos.errors) return thunkAPI.rejectWithValue(photo.errors[0])

        return photos
    } catch (error) {
        console.log(error.mesage)
    }
})


export const photosSlice = createSlice({
    name: 'photos',
    initialState,
    reducers: {
        reset: state => {
            state.message = false,
            state.success = false,
            state.error = false
        }
    },
    extraReducers: builder =>{
        builder.addCase(publishPhoto.pending, state =>{
            state.loading = true,
            state.error =false,
            state.success = false
        }).addCase( publishPhoto.fulfilled, (state, action) =>{
            state.loading =false,
            state.photo = action.payload,
            state.photos.unshift(state.photo),
            state.error = false,
            state.success = false
            state.message = "Foto publicada com sucesso"
        }).addCase(publishPhoto.rejected, (state,action)=>{
            state.loading =false,
            state.photo = {},
            state.error =action.payload,
            state.success =false
        }).addCase( getUserPhotos.pending, state =>{
            state.loading =true,
            state.error = false,
            state.message = false
        }).addCase( getUserPhotos.fulfilled, (state, action) =>{
            state.loading = false,
            state.error = false,
            state.photos = action.payload  
        }).addCase(deletePhoto.rejected, (state,action)=>{
            state.loading =false,
            state.error =action.payload,
            state.success =false
        }).addCase( deletePhoto.pending, state =>{
            state.loading =true,
            state.error = false,
            state.message = false
        }).addCase( deletePhoto.fulfilled, (state, action) =>{
            state.loading = false,
            state.error = false,
            state.success = true
            state.photos = action.payload
        }).addCase(updatePhoto.rejected, (state,action)=>{
            state.loading =false,
            state.error =action.payload,
            state.success =false
        }).addCase( updatePhoto.pending, state =>{
            state.loading =true,
            state.error = false,
            state.message = false
        }).addCase( updatePhoto.fulfilled, (state, action) =>{
            state.loading = false,
            state.error = false,
            state.success = true,
            state.photos.map( photo =>{
                if(photo.image === action.payload.image){
                    return photo.title = action.payload.title
                }
                return photo
            })
        }).addCase( getPhotoById.pending, state =>{
            state.loading =true,
            state.error = false,
            state.message = false
        }).addCase( getPhotoById.fulfilled, (state, action) =>{
            state.loading = false,
            state.error = false,
            state.photo = action.payload  
        }).addCase(getPhotoById.rejected, (state,action)=>{
            state.loading =false,
            state.error =action.payload,
            state.success =false
            state.photo ={}
        }).addCase( like.pending, state =>{
            state.loading =true,
            state.error = false,
            state.message = false
        }).addCase( like.fulfilled, (state, action) =>{
            state.loading = false,
            state.error = false,
            state.photo = action.payload.res
            state.photos = action.payload.photos 
            
        }).addCase(comment.pending, state =>{
            state.loading = true,
            state.error =false,
            state.success = false
        }).addCase( comment.fulfilled, (state, action) =>{
            state.loading =false,
            state.photo = action.payload
        }).addCase(comment.rejected, (state,action)=>{
            state.loading =false,
            state.error =action.payload,
            state.success =false
        }).addCase(getAllPhotos.pending, state =>{
            state.loading = true,
            state.error =false,
            state.success = false
        }).addCase( getAllPhotos.fulfilled, (state, action) =>{
            state.loading =false,
            state.photos = action.payload
        }).addCase( searchPhotos.pending, state =>{
            state.loading =true,
            state.error = false,
            state.message = false
        }).addCase( searchPhotos.fulfilled, (state, action) =>{
            state.loading = false,
            state.error = false,
            state.photos = action.payload  
        }).addCase(searchPhotos.rejected, (state,action)=>{
            state.loading =false,
            state.error =action.payload,
            state.success =false
            state.photos = []
        })
    }
})
export const { reset } = photosSlice.actions

export default photosSlice.reducer