import { createSlice } from '@reduxjs/toolkit'

type RegisterAction = {
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
    gender: string
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
    gender: '',
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
        register: (state, action: RegisterAction) => {
            state.email = action.payload.email
            state.id = action.payload.id
            state.loggedIn = true
        },
        refreshUser: (state: any, action: RefreshUserAction) => {
            state.id = action.payload.id
            state.email = action.payload?.email ?? ''
            state.password = action.payload?.password ?? ''
            state.firstName = action.payload?.firstName ?? ''
            state.lastName = action.payload?.lastName ?? ''
            state.dob = action.payload?.dob ?? null
            state.gender = action.payload?.gender ?? ''
            state.height = action.payload?.height ?? null
            state.weight = action.payload?.weight ?? null
            state.goalWeight = action.payload?.goalWeight ?? null
            state.bodyFat = action.payload?.bodyFat ?? null
            state.goalBodyFat = action.payload?.goalBodyFat ?? null
            state.activityLevel = action.payload?.activityLevel ?? ''
            state.loggedIn = true
        },
        logout: (state: any) => {
            Object.keys(state).forEach((key: string) => {
                const copyOfInitial = initialState as any // TODO: Dig into this...
                state[key] = copyOfInitial[key]
            })
        }
    }
})

// Action creators are generated for each case reducer function
export const { register, logout, refreshUser } = userSlice.actions

export default userSlice.reducer
