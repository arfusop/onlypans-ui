import { createSlice } from '@reduxjs/toolkit'

import { DARK, LIGHT } from '../../utilities/constants'

type SetThemeAction = {
    type: string
    payload: {
        theme: 'DARK' | 'LIGHT'
    }
}

export const themeSlice = createSlice({
    name: 'theme',
    initialState: { mode: DARK },
    reducers: {
        setTheme: (state, action: SetThemeAction) => {
            state.mode = action.payload.theme
        }
    }
})

export const { setTheme } = themeSlice.actions
export default themeSlice.reducer
