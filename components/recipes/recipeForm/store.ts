import {
    UPDATE,
    REPLACE,
    ADD_ERROR,
    REMOVE_ERROR
} from '../../../utilities/constants'

type InitialRecipeFormState = {
    rating: number | null
    skill: number | null
    name: string
    servings: number | null
    ingredients: string[]
    directions: string[]
    notes: string[]
    category: string
    prepTime: string | null
    cookTime: string | null
}

export const initialState: InitialRecipeFormState = {
    rating: null,
    skill: null,
    name: '',
    servings: null,
    ingredients: [],
    prepTime: null,
    cookTime: null,
    directions: [],
    notes: [],
    category: ''
}

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
