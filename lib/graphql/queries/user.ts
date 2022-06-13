import gql from 'graphql-tag'

export const GET_LOGGED_IN_USER = gql`
    query loggedInUser {
        getLoggedInUser {
            id
            email
            firstName
            lastName
            dob
            gender
            height
            weight
            goalWeight
            bodyFat
            goalBodyFat
            activityLevel
        }
    }
`
