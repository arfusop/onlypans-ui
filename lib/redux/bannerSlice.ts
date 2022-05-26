import { createSlice } from '@reduxjs/toolkit'

// type BannerPayload = {
//     type: 'error' | 'warning' | 'info' | 'success'
//     message: string
// }

const initialState = {
    status: '',
    message: ''
}

// TODO
// ADD TYPES
export const bannerSlice = createSlice({
    name: 'banner',
    initialState,
    reducers: {
        showBanner: (state, action) => {
            state.status = action.payload.status
            state.message = action.payload.message
        },
        closeBanner: state => {
            state.status = ''
            state.message = ''
        }
    }
})

// Action creators are generated for each case reducer function
export const { showBanner, closeBanner } = bannerSlice.actions

export default bannerSlice.reducer
