import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    email: '',
    password: ''
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action) => {
            state = action.payload
        }
    }
})

// Action creators are generated for each case reducer function
export const { login } = userSlice.actions

export default userSlice.reducer
