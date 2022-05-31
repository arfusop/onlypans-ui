import { createSlice } from '@reduxjs/toolkit'

import { DARK, LIGHT } from '../../utilities/constants'

export const themeSlice = createSlice({
    name: 'theme',
    initialState: { mode: DARK },
    reducers: {
        setTheme: (state, action) => {
            state.mode = action.payload.theme
        }
    }
})

export const { setTheme } = themeSlice.actions
export default themeSlice.reducer
