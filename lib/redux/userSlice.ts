import { createSlice } from '@reduxjs/toolkit'

type LoginAction = {
    type: string
    payload: {
        email: string
        id: number
    }
}

type InitialUserState = {
    id: number | null
    email: string
    password: string
    firstName: string
    lastName: string
    dob: Date | null
    height: number | null
    weight: number | null
    goalWeight: number | null
    bodyFat: number | null
    goalBodyFat: number | null
    activityLevel: string
}

const initialState: InitialUserState = {
    id: null,
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    dob: null,
    height: null,
    weight: null,
    goalWeight: null,
    bodyFat: null,
    goalBodyFat: null,
    activityLevel: ''
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action: LoginAction) => {
            state.email = action.payload.email
            state.id = action.payload.id
        },
        logout: state => {
            state = initialState
        }
    }
})

// Action creators are generated for each case reducer function
export const { login, logout } = userSlice.actions

export default userSlice.reducer
