import { createSlice } from '@reduxjs/toolkit'

type LoginAction = {
    type: string
    payload: {
        email: string
        id: number
    }
}

type RefreshUserAction = {
    type: string
    payload: InitialUserState
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
    loggedIn: boolean
}

export const initialState: InitialUserState = {
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
    activityLevel: '',
    loggedIn: false
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action: LoginAction) => {
            state.email = action.payload.email
            state.id = action.payload.id
            state.loggedIn = true
        },
        refreshUser: (state, action: RefreshUserAction) => {
            state.email = action.payload.email
            state.id = action.payload.id
            state.firstName = action.payload.firstName
            state.lastName = action.payload.lastName
            state.dob = action.payload.dob
            state.height = action.payload.height
            state.weight = action.payload.weight
            state.goalWeight = action.payload.goalWeight
            state.bodyFat = action.payload.bodyFat
            state.goalBodyFat = action.payload.goalBodyFat
            state.activityLevel = action.payload.activityLevel
            state.loggedIn = true
        },
        logout: state => {
            state = initialState
        }
    }
})

// Action creators are generated for each case reducer function
export const { login, logout, refreshUser } = userSlice.actions

export default userSlice.reducer
