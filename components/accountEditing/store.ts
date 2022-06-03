type InitialUserState = {
    id: number | null
    email: string
    password: string
    firstName: string
    lastName: string
    dob: Date | null
    gender: string
    height: string
    weight: string
    goalWeight: string
    bodyFat: string
    goalBodyFat: string
    activityLevel: string
    errors: any
}

export const initialState: InitialUserState = {
    id: null,
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    dob: null,
    gender: '',
    height: '',
    weight: '',
    goalWeight: '',
    bodyFat: '',
    goalBodyFat: '',
    activityLevel: '',
    errors: {}
}

export const UPDATE = 'UPDATE'
export const REPLACE = 'REPLACE'
export const ADD_ERROR = 'ADD ERROR'
export const REMOVE_ERROR = 'REMOVE ERROR'

type actionType = {
    type: string
    payload: {
        label: string
        data: any
    }
}

export const reducer = (state: any, action: actionType) => {
    const { type, payload } = action
    switch (type) {
        case UPDATE:
            return {
                ...state,
                [payload.label]: payload.data
            }
        case REPLACE:
            return { ...state, ...payload }
        case ADD_ERROR:
            return {
                ...state,
                errors: {
                    ...state.errors,
                    [payload.label]: payload.data
                }
            }
        case REMOVE_ERROR:
            const errorsToUpdate = { ...state.errors }
            delete errorsToUpdate[payload.label]
            return {
                ...state,
                errors: {
                    ...errorsToUpdate
                }
            }
        default:
            return state
    }
}
