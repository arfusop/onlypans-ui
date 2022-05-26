import { createSlice } from '@reduxjs/toolkit'

type BannerPayload = {
    status: 'error' | 'warning' | 'info' | 'success' | null
    message: string | null
}
type BannerAction = {
    type: string
    payload: BannerPayload
}

const initialState: BannerPayload = {
    status: null,
    message: null
}

export const bannerSlice = createSlice({
    name: 'banner',
    initialState,
    reducers: {
        showBanner: (state, action: BannerAction) => {
            state.status = action.payload.status
            state.message = action.payload.message
        },
        closeBanner: state => {
            state.status = null
            state.message = null
        }
    }
})

// Action creators are generated for each case reducer function
export const { showBanner, closeBanner } = bannerSlice.actions

export default bannerSlice.reducer
