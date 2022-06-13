import gql from 'graphql-tag'

export const GET_USER_CATEGORIES = gql`
    query getRecipeCategories {
        getRecipeCategories {
            name
            count
        }
    }
`
