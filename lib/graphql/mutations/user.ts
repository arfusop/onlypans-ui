import gql from 'graphql-tag'

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            id
            email
            token
        }
    }
`

export const REGISTER_USER = gql`
    mutation register($email: String!, $password: String!) {
        register(email: $email, password: $password) {
            id
            email
            token
        }
    }
`

export const FORGOT_PASSWORD = gql`
    mutation forgotPassword($email: String!) {
        sendPasswordResetEmail(email: $email) {
            id
        }
    }
`

export const RESET_PASSWORD = gql`
    mutation resetPassword(
        $email: String!
        $password: String!
        $newPassword: String!
    ) {
        updatePassword(
            email: $email
            password: $password
            newPassword: $newPassword
        ) {
            id
        }
    }
`
